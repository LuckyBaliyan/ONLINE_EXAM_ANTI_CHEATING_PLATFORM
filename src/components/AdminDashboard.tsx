import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Plus, 
  Users, 
  FileText, 
  Clock, 
  AlertTriangle, 
  BarChart3,
  Eye,
  Download,
  Shield
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AdminDashboardProps {
  user: { name: string; email: string };
  onLogout: () => void;
}

export const AdminDashboard = ({ user, onLogout }: AdminDashboardProps) => {
  const [activeTab, setActiveTab] = useState("overview");
  const { toast } = useToast();

  // Mock data
  const exams = [
    {
      id: "1",
      title: "Data Structures & Algorithms",
      students: 45,
      duration: 120,
      status: "active",
      cheatingEvents: 12
    },
    {
      id: "2",
      title: "Computer Networks", 
      students: 38,
      duration: 90,
      status: "scheduled",
      cheatingEvents: 0
    }
  ];

  const submissions = [
    {
      id: "1",
      studentName: "John Doe",
      examTitle: "Data Structures & Algorithms",
      score: 85,
      cheatingEvents: 2,
      completedAt: "2024-12-20 14:30",
      riskLevel: "low"
    },
    {
      id: "2",
      studentName: "Jane Smith",
      examTitle: "Data Structures & Algorithms", 
      score: 92,
      cheatingEvents: 0,
      completedAt: "2024-12-20 14:25",
      riskLevel: "none"
    },
    {
      id: "3",
      studentName: "Mike Johnson",
      examTitle: "Data Structures & Algorithms",
      score: 67,
      cheatingEvents: 5,
      completedAt: "2024-12-20 14:45",
      riskLevel: "high"
    }
  ];

  const handleCreateExam = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Exam Created",
      description: "New exam has been created successfully",
    });
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case "high": return "bg-destructive text-destructive-foreground";
      case "medium": return "bg-warning text-warning-foreground";
      case "low": return "bg-accent text-accent-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-bg">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-accent rounded-lg flex items-center justify-center">
              <Shield className="h-5 w-5 text-accent-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold">EduGuard Admin</h1>
              <p className="text-sm text-muted-foreground">Exam Management Portal</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="font-medium">{user.name}</p>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
            <Button variant="outline" onClick={onLogout}>
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="create">Create Exam</TabsTrigger>
            <TabsTrigger value="results">Results</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <FileText className="h-8 w-8 text-primary" />
                    <div>
                      <p className="text-2xl font-bold">{exams.length}</p>
                      <p className="text-sm text-muted-foreground">Active Exams</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <Users className="h-8 w-8 text-accent" />
                    <div>
                      <p className="text-2xl font-bold">83</p>
                      <p className="text-sm text-muted-foreground">Total Students</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <BarChart3 className="h-8 w-8 text-warning" />
                    <div>
                      <p className="text-2xl font-bold">12</p>
                      <p className="text-sm text-muted-foreground">Cheating Events</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="h-8 w-8 text-destructive" />
                    <div>
                      <p className="text-2xl font-bold">3</p>
                      <p className="text-sm text-muted-foreground">High Risk</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Active Exams */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Active Exams</h2>
              <div className="space-y-4">
                {exams.map((exam) => (
                  <Card key={exam.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle>{exam.title}</CardTitle>
                        <Badge className={exam.status === 'active' ? 'bg-accent' : 'bg-warning'}>
                          {exam.status}
                        </Badge>
                      </div>
                      <CardDescription>
                        <div className="flex items-center space-x-4 text-sm">
                          <span className="flex items-center space-x-1">
                            <Users className="h-4 w-4" />
                            <span>{exam.students} students</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{exam.duration} minutes</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <AlertTriangle className="h-4 w-4" />
                            <span>{exam.cheatingEvents} violations</span>
                          </span>
                        </div>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Export Results
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Create Exam Tab */}
          <TabsContent value="create" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Create New Exam</CardTitle>
                <CardDescription>
                  Set up a new proctored exam with AI monitoring
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCreateExam} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="title">Exam Title</Label>
                      <Input id="title" placeholder="Enter exam title" required />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="duration">Duration (minutes)</Label>
                      <Input id="duration" type="number" placeholder="120" required />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Select required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select subject" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="computer-science">Computer Science</SelectItem>
                          <SelectItem value="mathematics">Mathematics</SelectItem>
                          <SelectItem value="physics">Physics</SelectItem>
                          <SelectItem value="engineering">Engineering</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="total-marks">Total Marks</Label>
                      <Input id="total-marks" type="number" placeholder="100" required />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="instructions">Instructions</Label>
                    <Textarea 
                      id="instructions" 
                      placeholder="Enter exam instructions for students..."
                      rows={4}
                    />
                  </div>
                  
                  <div className="space-y-4">
                    <Label>Proctoring Settings</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="face-detection">Face Detection</Label>
                        <Select defaultValue="strict">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="strict">Strict - Auto submit after 5 violations</SelectItem>
                            <SelectItem value="moderate">Moderate - Warning only</SelectItem>
                            <SelectItem value="lenient">Lenient - Logging only</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="tab-switching">Tab Switching</Label>
                        <Select defaultValue="strict">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="strict">Strict - Auto submit after 3 switches</SelectItem>
                            <SelectItem value="moderate">Moderate - Warning only</SelectItem>
                            <SelectItem value="disabled">Disabled</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                  
                  <Button type="submit" className="w-full bg-gradient-accent hover:opacity-90">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Exam
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Results Tab */}
          <TabsContent value="results" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Exam Results</h2>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export All
              </Button>
            </div>
            
            <div className="space-y-4">
              {submissions.map((submission) => (
                <Card key={submission.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <h3 className="font-semibold">{submission.studentName}</h3>
                        <p className="text-sm text-muted-foreground">{submission.examTitle}</p>
                        <p className="text-xs text-muted-foreground">Completed: {submission.completedAt}</p>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <div className="text-center">
                          <p className="text-2xl font-bold">{submission.score}%</p>
                          <p className="text-xs text-muted-foreground">Score</p>
                        </div>
                        
                        <div className="text-center">
                          <p className="text-2xl font-bold text-destructive">{submission.cheatingEvents}</p>
                          <p className="text-xs text-muted-foreground">Violations</p>
                        </div>
                        
                        <Badge className={getRiskColor(submission.riskLevel)}>
                          {submission.riskLevel} risk
                        </Badge>
                        
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Cheating Detection Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Face detection violations</span>
                      <span className="font-bold">8</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tab switching violations</span>
                      <span className="font-bold">4</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Multiple faces detected</span>
                      <span className="font-bold">2</span>
                    </div>
                    <div className="flex justify-between border-t pt-4">
                      <span className="font-semibold">Total violations</span>
                      <span className="font-bold text-destructive">14</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Average exam score</span>
                      <span className="font-bold">78.5%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Completion rate</span>
                      <span className="font-bold">94.2%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>On-time submissions</span>
                      <span className="font-bold">89.3%</span>
                    </div>
                    <div className="flex justify-between border-t pt-4">
                      <span className="font-semibold">Students flagged</span>
                      <span className="font-bold text-warning">12</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};