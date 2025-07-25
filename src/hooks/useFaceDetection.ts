import { useEffect, useRef, useState, useCallback } from 'react';

interface FaceDetectionOptions {
  onNoFace?: () => void;
  onMultipleFaces?: () => void;
  onFaceDetected?: () => void;
  onError?: (error: string) => void;
}

export const useFaceDetection = (options: FaceDetectionOptions = {}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);
  const [faceCount, setFaceCount] = useState(0);
  const detectionIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Mock face detection for demo purposes (since we don't have real models)
  const mockFaceDetection = useCallback(() => {
    // Simulate face detection with random behavior for demo
    const random = Math.random();
    let detectedFaces = 1; // Default: one face detected
    
    // 10% chance of no face
    if (random < 0.1) {
      detectedFaces = 0;
    }
    // 5% chance of multiple faces  
    else if (random < 0.15) {
      detectedFaces = 2;
    }

    setFaceCount(detectedFaces);

    if (detectedFaces === 0) {
      options.onNoFace?.();
    } else if (detectedFaces > 1) {
      options.onMultipleFaces?.();
    } else {
      options.onFaceDetected?.();
    }

    // Draw mock detection on canvas
    if (canvasRef.current && videoRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw detection boxes for demo
        if (detectedFaces > 0) {
          ctx.strokeStyle = detectedFaces === 1 ? '#10b981' : '#f59e0b';
          ctx.lineWidth = 3;
          
          const boxWidth = 150;
          const boxHeight = 180;
          const x = (canvas.width - boxWidth) / 2;
          const y = (canvas.height - boxHeight) / 2;
          
          ctx.strokeRect(x, y, boxWidth, boxHeight);
          
          if (detectedFaces > 1) {
            // Draw second face box for multiple faces
            ctx.strokeRect(x + 50, y + 20, boxWidth, boxHeight);
          }
        }
      }
    }
  }, [options]);

  const startCamera = useCallback(async () => {
    console.log('Starting camera initialization...');
    try {
      // Check if mediaDevices is available
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera not supported in this browser');
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { 
          width: { ideal: 640, min: 480 },
          height: { ideal: 480, min: 360 },
          facingMode: 'user',
          frameRate: { ideal: 30, min: 15 }
        },
        audio: false
      });
      
      console.log('Camera stream obtained:', stream);
      
        // Force video to play immediately
        const video = videoRef.current;
        video.srcObject = stream;
        video.playsInline = true;
        video.muted = true;
        video.autoplay = true;
        
        // Try to play immediately
        const playVideo = async () => {
          try {
            await video.play();
            console.log('✅ Video playing');
            setIsLoading(false);
            setIsInitialized(true);
          } catch (e) {
            console.log('⚠️ Autoplay failed, will show video anyway');
            setIsLoading(false);
            setIsInitialized(true);
          }
        };

        video.onloadedmetadata = () => {
          console.log('📹 Video metadata loaded:', video.videoWidth, 'x', video.videoHeight);
          if (canvasRef.current) {
            canvasRef.current.width = video.videoWidth;
            canvasRef.current.height = video.videoHeight;
          }
          playVideo();
        };

        // Backup - set loading to false after 2 seconds
        setTimeout(() => {
          if (isLoading) {
            console.log('🔄 Fallback: Setting loading to false');
            setIsLoading(false);
            setIsInitialized(true);
          }
        }, 2000);
    } catch (error) {
      console.error('Error accessing camera:', error);
      let errorMessage = 'Camera access denied. Please allow camera permission for proctoring.';
      
      if (error instanceof Error) {
        if (error.name === 'NotAllowedError') {
          errorMessage = 'Camera permission denied. Please allow camera access and refresh the page.';
        } else if (error.name === 'NotFoundError') {
          errorMessage = 'No camera found. Please connect a camera device.';
        } else if (error.name === 'NotReadableError') {
          errorMessage = 'Camera is already in use by another application.';
        }
      }
      
      options.onError?.(errorMessage);
      setIsLoading(false);
    }
  }, [options]);

  const stopCamera = useCallback(() => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
    }
    
    if (detectionIntervalRef.current) {
      clearInterval(detectionIntervalRef.current);
      detectionIntervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
  }, [startCamera, stopCamera]);

  useEffect(() => {
    if (isInitialized && !isLoading) {
      // Start mock face detection
      detectionIntervalRef.current = setInterval(mockFaceDetection, 1000); // Check every second
      
      return () => {
        if (detectionIntervalRef.current) {
          clearInterval(detectionIntervalRef.current);
        }
      };
    }
  }, [isInitialized, isLoading, mockFaceDetection]);

  return {
    videoRef,
    canvasRef,
    isLoading,
    faceCount,
    stopCamera,
    startCamera: startCamera
  };
};