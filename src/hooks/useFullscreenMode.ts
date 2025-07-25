import { useEffect, useCallback } from 'react';

interface FullscreenOptions {
  onFullscreenExit?: () => void;
  onCopyAttempt?: () => void;
  isEnabled?: boolean;
}

export const useFullscreenMode = (options: FullscreenOptions = {}) => {
  const { onFullscreenExit, onCopyAttempt, isEnabled = true } = options;

  const enterFullscreen = useCallback(async () => {
    if (!isEnabled) return;

    try {
      if (document.documentElement.requestFullscreen) {
        await document.documentElement.requestFullscreen();
      }
    } catch (error) {
      console.error('Failed to enter fullscreen:', error);
    }
  }, [isEnabled]);

  const exitFullscreen = useCallback(async () => {
    try {
      if (document.exitFullscreen && document.fullscreenElement) {
        await document.exitFullscreen();
      }
    } catch (error) {
      console.error('Failed to exit fullscreen:', error);
    }
  }, []);

  useEffect(() => {
    if (!isEnabled) return;

    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        onFullscreenExit?.();
      }
    };

    // Prevent copy, cut, paste, print, save
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isEnabled) return;

      // Prevent Ctrl+C, Ctrl+V, Ctrl+X, Ctrl+A, Ctrl+P, Ctrl+S
      if (e.ctrlKey && ['c', 'v', 'x', 'a', 'p', 's'].includes(e.key.toLowerCase())) {
        e.preventDefault();
        onCopyAttempt?.();
      }

      // Prevent F12, Ctrl+Shift+I, Ctrl+U
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && e.key === 'I') ||
        (e.ctrlKey && e.key === 'u')
      ) {
        e.preventDefault();
        onCopyAttempt?.();
      }

      // Prevent Escape to exit fullscreen
      if (e.key === 'Escape' && document.fullscreenElement) {
        e.preventDefault();
      }
    };

    // Prevent right-click context menu
    const handleContextMenu = (e: MouseEvent) => {
      if (isEnabled) {
        e.preventDefault();
        onCopyAttempt?.();
      }
    };

    // Prevent text selection
    const handleSelectStart = (e: Event) => {
      if (isEnabled) {
        e.preventDefault();
      }
    };

    // Prevent drag and drop
    const handleDragStart = (e: DragEvent) => {
      if (isEnabled) {
        e.preventDefault();
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('selectstart', handleSelectStart);
    document.addEventListener('dragstart', handleDragStart);

    // Add CSS to prevent text selection
    if (isEnabled) {
      document.body.style.userSelect = 'none';
      document.body.style.webkitUserSelect = 'none';
      // @ts-ignore - Legacy browser support
      document.body.style.mozUserSelect = 'none';
      // @ts-ignore - Legacy browser support  
      document.body.style.msUserSelect = 'none';
    }

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('selectstart', handleSelectStart);
      document.removeEventListener('dragstart', handleDragStart);

      // Restore text selection
      document.body.style.userSelect = '';
      document.body.style.webkitUserSelect = '';
      // @ts-ignore - Legacy browser support
      document.body.style.mozUserSelect = '';
      // @ts-ignore - Legacy browser support
      document.body.style.msUserSelect = '';
    };
  }, [isEnabled, onFullscreenExit, onCopyAttempt]);

  return {
    enterFullscreen,
    exitFullscreen,
    isFullscreen: !!document.fullscreenElement
  };
};