import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/ThemeToggle";
import { 
  Shield, 
  Eye, 
  Brain, 
  Zap, 
  BookOpen, 
  Users, 
  CheckCircle, 
  Star,
  ArrowRight,
  Camera,
  Monitor,
  Lock
} from "lucide-react";

interface LandingPageProps {
  onGetStarted: () => void;
}

export const LandingPage = ({ onGetStarted }: LandingPageProps) => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Proctoring",
      description: "Advanced face detection and behavior monitoring ensure exam integrity"
    },
    {
      icon: Eye,
      title: "Real-time Monitoring",
      description: "Continuous surveillance with instant alerts for suspicious activities"
    },
    {
      icon: Shield,
      title: "Secure Environment",
      description: "Fullscreen mode with tab switching prevention and copy-paste protection"
    },
    {
      icon: Lock,
      title: "Anti-Cheating Technology", 
      description: "Multiple layers of security to prevent academic dishonesty"
    },
    {
      icon: BookOpen,
      title: "Multi-subject Support",
      description: "Wide range of technical subjects with expert-curated questions"
    },
    {
      icon: Zap,
      title: "Instant Results",
      description: "Immediate scoring and detailed performance breakdown"
    }
  ];

  const stats = [
    { value: "10,000+", label: "Successful Exams" },
    { value: "99.8%", label: "Detection Accuracy" },
    { value: "24/7", label: "Support Available" },
    { value: "100+", label: "Universities Trust Us" }
  ];

  return (
    <div className="min-h-screen bg-gradient-bg">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-sm border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-primary rounded-xl flex items-center justify-center shadow-lg">
              <Camera className="h-5 w-5 sm:h-6 sm:w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">EduGuard</h1>
              <p className="text-xs sm:text-sm text-muted-foreground hidden sm:block">AI-Powered Secure Exam Portal</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <ThemeToggle />
            <Button onClick={onGetStarted} size="sm" className="sm:size-default">
              <span className="hidden sm:inline">Get Started</span>
              <span className="sm:hidden">Start</span>
              <ArrowRight className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
            <Badge className="mb-4 px-3 py-1 sm:px-4 sm:py-2 bg-gradient-primary text-primary-foreground text-sm">
              🚀 India's Most Trusted Exam Platform
            </Badge>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Secure Online Exams with 
              <span className="bg-gradient-primary bg-clip-text text-transparent"> AI Proctoring</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed px-4">
              Experience the future of online examinations with our advanced AI-powered proctoring system. 
              Ensure academic integrity while providing a seamless testing experience.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mt-6 sm:mt-8 px-4">
              <Button 
                size="lg" 
                onClick={onGetStarted}
                className="bg-gradient-primary hover:opacity-90 text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 w-full sm:w-auto"
              >
                Start Your Exam
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 w-full sm:w-auto">
                Watch Demo
                <Monitor className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-card/50">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-muted-foreground font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose EduGuard?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Advanced technology ensuring secure and fair examinations for students and institutions
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-gradient-card hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 hover:border-primary/50">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Available Exams Section */}
      <section className="py-20 px-4 bg-card/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Available Examinations</h2>
            <p className="text-xl text-muted-foreground">
              Choose from our comprehensive collection of technical assessments
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "Data Structures & Algorithms", questions: 100, duration: "120 min" },
              { name: "Java Programming", questions: 75, duration: "90 min" },
              { name: "C++ Programming", questions: 75, duration: "90 min" },
              { name: "Cyber Security Fundamentals", questions: 80, duration: "100 min" },
              { name: "Full Stack Web Development", questions: 85, duration: "110 min" }
            ].map((exam, index) => (
              <Card key={index} className="bg-gradient-card hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{exam.name}</span>
                    <Badge variant="secondary">{exam.duration}</Badge>
                  </CardTitle>
                  <CardDescription>
                    <div className="flex items-center space-x-4 text-sm">
                      <span className="flex items-center space-x-1">
                        <BookOpen className="h-4 w-4" />
                        <span>{exam.questions} questions</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <CheckCircle className="h-4 w-4 text-accent" />
                        <span>Available</span>
                      </span>
                    </div>
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-6">Ready to Begin Your Secure Exam?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of students who trust EduGuard for their online examinations. 
              Start your journey towards academic success today.
            </p>
            <Button 
              size="lg" 
              onClick={onGetStarted}
              className="bg-gradient-primary hover:opacity-90 text-lg px-12 py-6"
            >
              Begin Examination
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12 px-4">
        <div className="container mx-auto">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-4">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Camera className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">EduGuard</span>
            </div>
            <p className="text-muted-foreground">
              Securing academic integrity through advanced AI technology
            </p>
            <div className="flex justify-center space-x-6 text-sm text-muted-foreground">
              <span>© 2024 EduGuard. All rights reserved.</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};