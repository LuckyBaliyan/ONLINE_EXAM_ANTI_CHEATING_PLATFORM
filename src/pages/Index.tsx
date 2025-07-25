import { useState } from "react";
import { LandingPage } from "@/components/LandingPage";
import { Login } from "@/components/Login";
import { StudentDashboard } from "@/components/StudentDashboard";
import { AdminDashboard } from "@/components/AdminDashboard";
import { ExamInterface } from "@/components/ExamInterface";

type UserData = {
  email: string;
  role: 'student' | 'admin';
  name: string;
} | null;

type AppState = 'landing' | 'login' | 'dashboard' | 'exam' | 'results';

interface ExamResults {
  score: number;
  cheatingEvents: number;
}

const Index = () => {
  const [user, setUser] = useState<UserData>(null);
  const [appState, setAppState] = useState<AppState>('landing');
  const [currentExamId, setCurrentExamId] = useState<string | null>(null);
  const [examResults, setExamResults] = useState<ExamResults | null>(null);

  const handleLogin = (userData: { email: string; role: 'student' | 'admin'; name: string }) => {
    setUser(userData);
    setAppState('dashboard');
  };

  const handleGetStarted = () => {
    setAppState('login');
  };

  const handleLogout = () => {
    setUser(null);
    setAppState('landing');
    setCurrentExamId(null);
    setExamResults(null);
  };

  const handleStartExam = (examId: string) => {
    setCurrentExamId(examId);
    setAppState('exam');
  };

  const handleExamComplete = (results: ExamResults) => {
    setExamResults(results);
    setAppState('results');
  };

  const handleExitExam = () => {
    setCurrentExamId(null);
    setAppState('dashboard');
  };

  const handleBackToDashboard = () => {
    setExamResults(null);
    setAppState('dashboard');
  };

  // Landing page
  if (appState === 'landing') {
    return <LandingPage onGetStarted={handleGetStarted} />;
  }

  // Login screen
  if (appState === 'login') {
    return <Login onLogin={handleLogin} />;
  }

  // Results screen
  if (appState === 'results' && examResults) {
    return (
      <div className="min-h-screen bg-gradient-bg flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          <div className="text-center space-y-8">
            <div className="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
              <span className="text-3xl font-bold text-primary-foreground">
                {examResults.score}%
              </span>
            </div>
            
            <div className="space-y-4">
              <h1 className="text-4xl font-bold">Exam Completed!</h1>
              <p className="text-xl text-muted-foreground">
                Your exam has been submitted successfully
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-md mx-auto">
              <div className="text-center p-6 bg-card rounded-lg border">
                <div className="text-3xl font-bold text-accent mb-2">{examResults.score}%</div>
                <div className="text-sm text-muted-foreground">Final Score</div>
              </div>
              
              <div className="text-center p-6 bg-card rounded-lg border">
                <div className="text-3xl font-bold text-destructive mb-2">{examResults.cheatingEvents}</div>
                <div className="text-sm text-muted-foreground">Violations Detected</div>
              </div>
            </div>

            <div className="space-y-4">
              {examResults.cheatingEvents === 0 && (
                <div className="p-4 bg-accent/10 border border-accent rounded-lg">
                  <p className="text-accent font-medium">
                    Excellent! No violations were detected during your exam.
                  </p>
                </div>
              )}
              
              {examResults.cheatingEvents > 0 && (
                <div className="p-4 bg-warning/10 border border-warning rounded-lg">
                  <p className="text-warning font-medium">
                    {examResults.cheatingEvents} violation{examResults.cheatingEvents > 1 ? 's were' : ' was'} detected during your exam.
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    This may affect your final grade. Contact your instructor if you have questions.
                  </p>
                </div>
              )}
              
              <button
                onClick={handleBackToDashboard}
                className="px-8 py-3 bg-gradient-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Exam interface
  if (appState === 'exam' && currentExamId && user?.role === 'student') {
    return (
      <ExamInterface
        examId={currentExamId}
        onExamComplete={handleExamComplete}
        onExitExam={handleExitExam}
      />
    );
  }

  // Dashboard
  if (appState === 'dashboard' && user) {
    if (user.role === 'student') {
      return (
        <StudentDashboard
          user={user}
          onStartExam={handleStartExam}
          onLogout={handleLogout}
        />
      );
    } else {
      return (
        <AdminDashboard
          user={user}
          onLogout={handleLogout}
        />
      );
    }
  }

  // Fallback
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-bg">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">EduGuard</h1>
        <p className="text-xl text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
};

export default Index;
