import { useEffect, useRef } from 'react';

interface TabVisibilityOptions {
  onTabSwitch?: () => void;
  onTabReturn?: () => void;
  isEnabled?: boolean;
  onWarningLimit?: () => void;
  maxWarnings?: number;
}

export const useTabVisibility = (options: TabVisibilityOptions = {}) => {
  const { onTabSwitch, onTabReturn, isEnabled = true, onWarningLimit, maxWarnings = 2 } = options;
  const tabSwitchCount = useRef(0);

  useEffect(() => {
    if (!isEnabled) return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        tabSwitchCount.current += 1;
        onTabSwitch?.();
        if (tabSwitchCount.current >= maxWarnings) {
          onWarningLimit?.();
        }
      } else {
        onTabReturn?.();
      }
    };

    const handleBlur = () => {
      if (isEnabled) {
        tabSwitchCount.current += 1;
        onTabSwitch?.();
        if (tabSwitchCount.current >= maxWarnings) {
          onWarningLimit?.();
        }
      }
    };

    const handleFocus = () => {
      if (isEnabled) {
        onTabReturn?.();
      }
    };

    // Prevent right-click context menu
    const handleContextMenu = (e: MouseEvent) => {
      if (isEnabled) {
        e.preventDefault();
      }
    };

    // Prevent F12, Ctrl+Shift+I, etc.
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isEnabled) return;

      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && e.key === 'I') ||
        (e.ctrlKey && e.shiftKey && e.key === 'C') ||
        (e.ctrlKey && e.key === 'u')
      ) {
        e.preventDefault();
        onTabSwitch?.();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleBlur);
    window.addEventListener('focus', handleFocus);
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleBlur);
      window.removeEventListener('focus', handleFocus);
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onTabSwitch, onTabReturn, isEnabled]);

  return {
    tabSwitchCount: tabSwitchCount.current,
    resetCount: () => { tabSwitchCount.current = 0; }
  };
};