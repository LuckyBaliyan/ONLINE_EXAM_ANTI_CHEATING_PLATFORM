import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CameraFeed } from "@/components/CameraFeed";
import { ThemeToggle } from "@/components/ThemeToggle";
import { creators, topPerformers, platformFeatures, whyChooseUs } from "@/data/creatorsData";
import { 
  Clock, Camera, FileText, Play, CheckCircle, AlertTriangle, 
  Users, Trophy, Star, Brain, Eye, Shield, BarChart, 
  BookOpen, Zap, Award, TrendingUp, Target
} from "lucide-react";

interface Exam {
  id: string;
  title: string;
  duration: number;
  questionsCount: number;
  status: 'upcoming' | 'available' | 'completed';
  startTime?: string;
  endTime?: string;
  score?: number;
}

interface StudentDashboardProps {
  user: { name: string; email: string };
  onStartExam: (examId: string) => void;
  onLogout: () => void;
}

export const StudentDashboard = ({ user, onStartExam, onLogout }: StudentDashboardProps) => {
  const [selectedExam, setSelectedExam] = useState<string | null>(null);
  const [showCameraTest, setShowCameraTest] = useState(false);

  // Import exam data
  const exams: Exam[] = [
    {
      id: "dsa",
      title: "Data Structures & Algorithms",
      duration: 120,
      questionsCount: 100,
      status: "available"
    },
    {
      id: "java", 
      title: "Java Programming",
      duration: 90,
      questionsCount: 75,
      status: "available"
    },
    {
      id: "cpp",
      title: "C++ Programming",
      duration: 90,
      questionsCount: 75,
      status: "available"
    },
    {
      id: "cybersecurity",
      title: "Cyber Security Fundamentals",
      duration: 100,
      questionsCount: 80,
      status: "available"
    },
    {
      id: "fullstack",
      title: "Full Stack Web Development",
      duration: 110,
      questionsCount: 85,
      status: "available"
    },
    {
      id: "completed_1",
      title: "Database Management",
      duration: 60,
      questionsCount: 30,
      status: "completed",
      score: 85
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-accent text-accent-foreground';
      case 'upcoming': return 'bg-warning text-warning-foreground';
      case 'completed': return 'bg-muted text-muted-foreground';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'available': return <Play className="h-4 w-4" />;
      case 'upcoming': return <Clock className="h-4 w-4" />;
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-bg">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-primary rounded-xl flex items-center justify-center shadow-lg">
                <Camera className="h-5 w-5 sm:h-6 sm:w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-lg sm:text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">EduGuard</h1>
                <p className="text-xs sm:text-sm text-muted-foreground hidden sm:block">AI-Powered Secure Exam Portal</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <ThemeToggle />
              <div className="text-right hidden md:block">
                <p className="font-medium text-sm">{user.name}</p>
                <p className="text-xs text-muted-foreground">{user.email}</p>
              </div>
              <Button variant="outline" size="sm" className="sm:size-default" onClick={onLogout}>
                <span className="hidden sm:inline">Logout</span>
                <span className="sm:hidden">Out</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="exams" className="w-full">
          <div className="overflow-x-auto">
            <TabsList className="grid w-full grid-cols-6 min-w-[600px] sm:min-w-0">
              <TabsTrigger value="exams" className="text-xs sm:text-sm">Exams</TabsTrigger>
              <TabsTrigger value="about" className="text-xs sm:text-sm">About</TabsTrigger>
              <TabsTrigger value="features" className="text-xs sm:text-sm">Features</TabsTrigger>
              <TabsTrigger value="performers" className="text-xs sm:text-sm hidden sm:flex">Top Performers</TabsTrigger>
              <TabsTrigger value="creators" className="text-xs sm:text-sm">Our Team</TabsTrigger>
              <TabsTrigger value="camera" className="text-xs sm:text-sm">Camera</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="exams" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
              {/* Exams List */}
              <div className="lg:col-span-2 space-y-4 sm:space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Your Exams</h2>
                  <p className="text-muted-foreground">Click on an exam to view details or start taking it</p>
                </div>

                <div className="space-y-4">
                  {exams.map((exam) => (
                    <Card 
                      key={exam.id} 
                      className={`cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-[1.02] border-2 ${
                        selectedExam === exam.id ? 'ring-2 ring-primary border-primary shadow-xl' : 'border-border hover:border-primary/50'
                      } bg-gradient-card`}
                      onClick={() => setSelectedExam(exam.id)}
                    >
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{exam.title}</CardTitle>
                          <Badge className={getStatusColor(exam.status)}>
                            <div className="flex items-center space-x-1">
                              {getStatusIcon(exam.status)}
                              <span className="capitalize">{exam.status}</span>
                            </div>
                          </Badge>
                        </div>
                        <CardDescription>
                          <div className="flex items-center space-x-4 text-sm">
                            <span className="flex items-center space-x-1">
                              <Clock className="h-4 w-4" />
                              <span>{exam.duration} minutes</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <FileText className="h-4 w-4" />
                              <span>{exam.questionsCount} questions</span>
                            </span>
                            {exam.score && (
                              <span className="flex items-center space-x-1">
                                <CheckCircle className="h-4 w-4" />
                                <span>Score: {exam.score}%</span>
                              </span>
                            )}
                          </div>
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        {exam.status === 'available' && (
                          <Button 
                            className="w-full bg-gradient-primary hover:opacity-90 transition-all duration-300 hover:scale-105 shadow-lg"
                            onClick={(e) => {
                              e.stopPropagation();
                              onStartExam(exam.id);
                            }}
                          >
                            <Play className="h-4 w-4 mr-2" />
                            Start Exam
                          </Button>
                        )}
                        {exam.status === 'upcoming' && exam.startTime && (
                          <div className="text-sm text-muted-foreground">
                            <p>Starts: {exam.startTime}</p>
                          </div>
                        )}
                        {exam.status === 'completed' && (
                          <div className="text-sm text-muted-foreground">
                            <p>Exam completed</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Instructions Card */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Exam Instructions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <p>• Camera monitoring is required</p>
                    <p>• Do not switch tabs or minimize window</p>
                    <p>• Keep your face visible at all times</p>
                    <p>• Use a quiet, well-lit environment</p>
                    <p>• No external help is allowed</p>
                    <p>• Exam will auto-submit when time expires</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="about" className="mt-6">
            <div className="space-y-8">
              <div className="text-center space-y-4">
                <h2 className="text-3xl font-bold">Why Choose EduGuard?</h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  India's most trusted AI-powered exam proctoring platform, ensuring academic integrity with cutting-edge technology
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {whyChooseUs.map((item, index) => (
                  <Card key={index} className="bg-gradient-card border-2 hover:border-primary/50 transition-colors">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>{item.title}</span>
                        <Badge variant="secondary" className="bg-gradient-primary text-primary-foreground">
                          {item.stats}
                        </Badge>
                      </CardTitle>
                      <CardDescription>{item.description}</CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="features" className="mt-6">
            <div className="space-y-8">
              <div className="text-center space-y-4">
                <h2 className="text-3xl font-bold">Platform Features</h2>
                <p className="text-lg text-muted-foreground">
                  Advanced technology ensuring secure and fair examinations
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {platformFeatures.map((feature, index) => {
                  const iconMap = { Brain, Eye, Shield, BarChart, BookOpen, Zap };
                  const IconComponent = iconMap[feature.icon as keyof typeof iconMap] || Brain;
                  
                  return (
                    <Card key={index} className="bg-gradient-card hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                          <IconComponent className="h-6 w-6 text-primary-foreground" />
                        </div>
                        <CardTitle>{feature.title}</CardTitle>
                        <CardDescription>{feature.description}</CardDescription>
                      </CardHeader>
                    </Card>
                  );
                })}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="performers" className="mt-6">
            <div className="space-y-8">
              <div className="text-center space-y-4">
                <h2 className="text-3xl font-bold flex items-center justify-center gap-2">
                  <Trophy className="h-8 w-8 text-yellow-500" />
                  Top Performers
                </h2>
                <p className="text-lg text-muted-foreground">
                  Celebrating excellence in our examination platform
                </p>
              </div>
              
              <div className="space-y-4">
                {topPerformers.map((performer, index) => (
                  <Card key={index} className="bg-gradient-card hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${
                            index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : index === 2 ? 'bg-amber-600' : 'bg-gradient-primary'
                          }`}>
                            {index + 1}
                          </div>
                          <div>
                            <h3 className="font-semibold">{performer.name}</h3>
                            <p className="text-sm text-muted-foreground">{performer.university}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center space-x-2">
                            <Star className="h-4 w-4 text-yellow-500" />
                            <span className="font-bold text-lg">{performer.score}%</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{performer.exam}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="creators" className="mt-6">
            <div className="space-y-8">
              <div className="text-center space-y-4">
                <h2 className="text-3xl font-bold">Meet Our Team</h2>
                <p className="text-lg text-muted-foreground">
                  The brilliant minds behind EduGuard's innovation
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {creators.map((creator) => (
                  <Card key={creator.id} className="bg-gradient-card hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <CardHeader className="text-center">
                      <Avatar className="w-24 h-24 mx-auto mb-4">
                        <AvatarImage src={creator.image} alt={creator.name} />
                        <AvatarFallback>{creator.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <CardTitle>{creator.name}</CardTitle>
                      <CardDescription className="font-medium text-primary">
                        {creator.role}
                      </CardDescription>
                      <p className="text-sm text-muted-foreground mt-2">
                        {creator.description}
                      </p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <p className="text-sm font-medium">Expertise:</p>
                        <div className="flex flex-wrap gap-1">
                          {creator.expertise.map((skill, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="camera" className="mt-6">
            <div className="max-w-2xl mx-auto space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Camera className="h-5 w-5" />
                    <span>Camera Test</span>
                  </CardTitle>
                  <CardDescription>
                    Test your camera and face detection before starting an exam
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button 
                    variant={showCameraTest ? "secondary" : "default"}
                    onClick={() => setShowCameraTest(!showCameraTest)}
                    className="w-full"
                  >
                    {showCameraTest ? "Hide Camera" : "Test Camera"}
                  </Button>

                  {showCameraTest && (
                    <div className="space-y-4">
                      <CameraFeed isExamActive={false} />
                      <div className="text-sm text-muted-foreground space-y-2">
                        <div className="flex items-center space-x-2">
                          <AlertTriangle className="h-4 w-4 text-warning" />
                          <span>Ensure good lighting</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <AlertTriangle className="h-4 w-4 text-warning" />
                          <span>Only one face should be visible</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <AlertTriangle className="h-4 w-4 text-warning" />
                          <span>Stay in frame during exam</span>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};