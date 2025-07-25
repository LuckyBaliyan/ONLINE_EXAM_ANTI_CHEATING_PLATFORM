import { useFaceDetection } from "@/hooks/useFaceDetection";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Camera, AlertTriangle, Users } from "lucide-react";
import { useState, useCallback } from "react";

interface CameraFeedProps {
  onCheatingDetected?: (type: 'no-face' | 'multiple-faces', count: number) => void;
  isExamActive?: boolean;
}

export const CameraFeed = ({ onCheatingDetected, isExamActive = false }: CameraFeedProps) => {
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [alertType, setAlertType] = useState<'warning' | 'error'>('warning');
  const [cheatingEvents, setCheatingEvents] = useState(0);

  const handleNoFace = useCallback(() => {
    if (!isExamActive) return;
    
    const newCount = cheatingEvents + 1;
    setCheatingEvents(newCount);
    setAlertMessage("Face not detected! Please ensure you're visible to the camera.");
    setAlertType('error');
    onCheatingDetected?.('no-face', newCount);
    
    setTimeout(() => setAlertMessage(""), 3000);
  }, [isExamActive, cheatingEvents, onCheatingDetected]);

  const handleMultipleFaces = useCallback(() => {
    if (!isExamActive) return;
    
    const newCount = cheatingEvents + 1;
    setCheatingEvents(newCount);
    setAlertMessage("Multiple faces detected! Only one person should be taking the exam.");
    setAlertType('error');
    onCheatingDetected?.('multiple-faces', newCount);
    
    setTimeout(() => setAlertMessage(""), 3000);
  }, [isExamActive, cheatingEvents, onCheatingDetected]);

  const handleFaceDetected = useCallback(() => {
    if (alertMessage) {
      setAlertMessage("");
    }
  }, [alertMessage]);

  const { videoRef, canvasRef, isLoading, faceCount } = useFaceDetection({
    onNoFace: handleNoFace,
    onMultipleFaces: handleMultipleFaces,
    onFaceDetected: handleFaceDetected,
    onError: (error) => {
      setAlertMessage(error);
      setAlertType('error');
    }
  });

  const getStatusColor = () => {
    if (!isExamActive) return "border-muted";
    if (faceCount === 1) return "border-accent animate-pulse-camera";
    if (faceCount === 0) return "border-destructive animate-warning-shake";
    if (faceCount > 1) return "border-warning animate-warning-shake";
    return "border-muted";
  };

  const getStatusIcon = () => {
    if (faceCount === 1) return <Camera className="h-4 w-4 text-accent" />;
    if (faceCount === 0) return <AlertTriangle className="h-4 w-4 text-destructive" />;
    if (faceCount > 1) return <Users className="h-4 w-4 text-warning" />;
    return <Camera className="h-4 w-4 text-muted-foreground" />;
  };

  const getStatusText = () => {
    if (!isExamActive) return "Camera ready";
    if (faceCount === 1) return "Monitoring active";
    if (faceCount === 0) return "Face not detected";
    if (faceCount > 1) return "Multiple faces detected";
    return "Initializing...";
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <div className={`relative w-full max-w-sm mx-auto rounded-lg overflow-hidden border-4 transition-all duration-300 ${getStatusColor()}`}>
          {isLoading ? (
            <div className="aspect-video bg-muted flex items-center justify-center">
              <div className="text-center">
                <Camera className="h-8 w-8 mx-auto mb-2 text-muted-foreground animate-pulse" />
                <p className="text-sm text-muted-foreground">Loading camera...</p>
              </div>
            </div>
          ) : (
            <>
              <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                className="w-full aspect-video object-cover bg-black"
                style={{ display: 'block' }}
              />
              <canvas
                ref={canvasRef}
                className="absolute top-0 left-0 w-full h-full pointer-events-none"
                style={{ mixBlendMode: 'multiply' }}
              />
            </>
          )}
        </div>

        {/* Status indicator */}
        <div className="flex items-center justify-center mt-2 space-x-2">
          {getStatusIcon()}
          <span className="text-sm font-medium">
            {getStatusText()}
          </span>
          {isExamActive && (
            <span className="text-xs text-muted-foreground">
              ({faceCount} face{faceCount !== 1 ? 's' : ''})
            </span>
          )}
        </div>
      </div>

      {/* Alert message */}
      {alertMessage && (
        <Alert className={`animate-fade-in ${alertType === 'error' ? 'border-destructive' : 'border-warning'}`}>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription className="font-medium">
            {alertMessage}
          </AlertDescription>
        </Alert>
      )}

      {/* Cheating events counter for exam mode */}
      {isExamActive && cheatingEvents > 0 && (
        <div className="text-center p-2 bg-destructive/10 rounded-lg">
          <p className="text-sm text-destructive font-medium">
            Suspicious activities detected: {cheatingEvents}
          </p>
        </div>
      )}
    </div>
  );
};