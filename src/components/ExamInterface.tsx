import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { CameraFeed } from "@/components/CameraFeed";
import { useTabVisibility } from "@/hooks/useTabVisibility";
import { useFullscreenMode } from "@/hooks/useFullscreenMode";
import { useToast } from "@/hooks/use-toast";
import { getQuestionsByExamId, getExamById } from "@/data/examQuestions";
import { 
  Clock, 
  Camera, 
  AlertTriangle, 
  CheckCircle, 
  ArrowLeft, 
  ArrowRight,
  Flag,
  Eye,
  Shield,
  Monitor
} from "lucide-react";

interface Question {
  id: string;
  text: string;
  options: string[];
  selectedAnswer?: number;
}

interface ExamInterfaceProps {
  examId: string;
  onExamComplete: (results: { score: number; cheatingEvents: number }) => void;
  onExitExam: () => void;
}

export const ExamInterface = ({ examId, onExamComplete, onExitExam }: ExamInterfaceProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [cheatingEvents, setCheatingEvents] = useState(0);
  const [tabSwitches, setTabSwitches] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [warnings, setWarnings] = useState<string[]>([]);
  const { toast } = useToast();

  // Get exam data and questions
  const examData = getExamById(examId);
  const questions = getQuestionsByExamId(examId);
  const [timeLeft, setTimeLeft] = useState((examData?.duration || 120) * 60); // Convert minutes to seconds


  const handleCheatingDetected = useCallback((type: 'no-face' | 'multiple-faces', count: number) => {
    setCheatingEvents(count);
    
    const message = type === 'no-face' 
      ? "Face not detected in camera! Please stay in front of the camera."
      : "Multiple faces detected! Only one person should be taking the exam.";
    
    setWarnings(prev => [...prev.slice(-2), message]);
    
    toast({
      title: "Cheating Alert",
      description: message,
      variant: "destructive"
    });

    // Auto-submit if too many violations
    if (count >= 5) {
      toast({
        title: "Exam Terminated",
        description: "Too many violations detected. Exam will be auto-submitted.",
        variant: "destructive"
      });
      setTimeout(() => handleSubmitExam(), 3000);
    }
  }, [toast]);

  const { tabSwitchCount } = useTabVisibility({
    onTabSwitch: () => {
      const newCount = tabSwitches + 1;
      setTabSwitches(newCount);
      toast({
        title: "Warning", 
        description: `Tab switch detected! ${2 - newCount} warnings remaining.`,
        variant: "destructive",
      });
    },
    onWarningLimit: () => {
      toast({
        title: "Exam Terminated",
        description: "Too many tab switches detected. Exam has been ended.",
        variant: "destructive", 
      });
      handleSubmitExam();
    },
    maxWarnings: 2,
    isEnabled: true
  });

  // Fullscreen and copy protection
  const { enterFullscreen, exitFullscreen } = useFullscreenMode({
    onFullscreenExit: () => {
      toast({
        title: "Fullscreen Exited",
        description: "Please keep the exam in fullscreen mode!",
        variant: "destructive"
      });
      setCheatingEvents(prev => prev + 1);
    },
    onCopyAttempt: () => {
      toast({
        title: "Copy Attempt Detected",
        description: "Copy/paste operations are not allowed!",
        variant: "destructive"
      });
      setCheatingEvents(prev => prev + 1);
    },
    isEnabled: true
  });

  // Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleSubmitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimerColor = () => {
    if (timeLeft < 300) return "text-timer-danger animate-timer-pulse"; // < 5 minutes
    if (timeLeft < 900) return "text-timer-warning"; // < 15 minutes
    return "text-foreground";
  };

  const handleAnswerSelect = (questionId: string, answerIndex: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const handleSubmitExam = async () => {
    setIsSubmitting(true);
    
    // Calculate score (mock)
    const answeredQuestions = Object.keys(answers).length;
    const score = Math.round((answeredQuestions / questions.length) * 100);
    
    setTimeout(() => {
      onExamComplete({ score, cheatingEvents: cheatingEvents + tabSwitches });
    }, 2000);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const currentQ = questions[currentQuestion];

  if (isSubmitting) {
    return (
      <div className="min-h-screen bg-exam-bg flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
        <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
          <CheckCircle className="h-8 w-8 text-primary-foreground" />
        </div>
        <h3 className="text-xl font-bold mb-2">Submitting Exam</h3>
        <p className="text-muted-foreground">Please wait while your answers are being processed...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-exam-bg">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
            <div className="flex items-center space-x-2 sm:space-x-4 w-full sm:w-auto">
              <h1 className="text-lg sm:text-xl font-bold flex items-center space-x-2">
                <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                <span className="truncate">{examData?.title || "Exam"}</span>
              </h1>
              <Badge variant="secondary" className="text-xs sm:text-sm whitespace-nowrap">
                {currentQuestion + 1} / {questions.length}
              </Badge>
            </div>
            
            <div className="flex items-center justify-between w-full sm:w-auto sm:space-x-4 lg:space-x-6">
              <div className="flex items-center space-x-3 sm:space-x-4">
                {/* Warnings */}
                {cheatingEvents > 0 && (
                  <div className="flex items-center space-x-1 sm:space-x-2 text-destructive">
                    <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span className="text-xs sm:text-sm font-medium">{cheatingEvents} Warnings</span>
                  </div>
                )}
                
                {/* Timer */}
                <div className={`flex items-center space-x-1 sm:space-x-2 font-mono text-sm sm:text-lg font-bold ${getTimerColor()}`}>
                  <Clock className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span>{formatTime(timeLeft)}</span>
                </div>
              </div>
              
              <Button variant="destructive" size="sm" className="sm:size-default" onClick={onExitExam}>
                <span className="hidden sm:inline">Exit Exam</span>
                <span className="sm:hidden">Exit</span>
              </Button>
            </div>
          </div>
          
          <Progress value={progress} className="mt-3 sm:mt-4" />
        </div>
      </header>

      <div className="container mx-auto px-4 py-4 sm:py-6 lg:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {/* Question Panel */}
          <div className="lg:col-span-3 space-y-4 sm:space-y-6 order-2 lg:order-1">
            {/* Current warnings */}
            {warnings.length > 0 && (
              <div className="space-y-2">
                {warnings.slice(-2).map((warning, index) => (
                  <Alert key={index} className="border-destructive animate-fade-in">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>{warning}</AlertDescription>
                  </Alert>
                ))}
              </div>
            )}

            {/* Question Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <Eye className="h-5 w-5 text-primary" />
                  <span>Question {currentQuestion + 1}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-lg leading-relaxed">{currentQ.text}</p>
                
                <div className="space-y-3">
                  {currentQ.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(currentQ.id, index)}
                      className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 hover:bg-muted/50 ${
                        answers[currentQ.id] === index
                          ? 'border-primary bg-primary/10'
                          : 'border-border'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-4 h-4 rounded-full border-2 ${
                          answers[currentQ.id] === index
                            ? 'border-primary bg-primary'
                            : 'border-muted-foreground'
                        }`} />
                        <span>{option}</span>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-between pt-6">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
                    disabled={currentQuestion === 0}
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Previous
                  </Button>
                  
                  <div className="flex space-x-2">
                    {currentQuestion === questions.length - 1 ? (
                      <Button
                        onClick={handleSubmitExam}
                        className="bg-gradient-accent hover:opacity-90"
                      >
                        <Flag className="h-4 w-4 mr-2" />
                        Submit Exam
                      </Button>
                    ) : (
                      <Button
                        onClick={() => setCurrentQuestion(prev => Math.min(questions.length - 1, prev + 1))}
                      >
                        Next
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4 sm:space-y-6 order-1 lg:order-2">
            {/* Camera Feed */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-sm">
                  <Camera className="h-4 w-4" />
                  <span>Live Monitoring</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CameraFeed 
                  onCheatingDetected={handleCheatingDetected}
                  isExamActive={true}
                />
              </CardContent>
            </Card>

            {/* Question Navigator */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-sm">
                  <Eye className="h-4 w-4" />
                  <span>Questions</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-8 sm:grid-cols-6 lg:grid-cols-5 gap-1 sm:gap-2">
                  {questions.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentQuestion(index)}
                      className={`aspect-square rounded-lg border-2 text-xs sm:text-sm font-medium transition-all duration-200 ${
                        index === currentQuestion
                          ? 'border-primary bg-primary text-primary-foreground'
                          : answers[questions[index].id] !== undefined
                          ? 'border-accent bg-accent text-accent-foreground'
                          : 'border-border bg-background hover:bg-muted'
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
                
                <div className="mt-4 text-xs space-y-1">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded bg-primary" />
                    <span>Current</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded bg-accent" />
                    <span>Answered</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded border border-border" />
                    <span>Not Answered</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};