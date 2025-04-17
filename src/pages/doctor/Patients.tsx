import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { FileText, Mail, Phone, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for patients
const mockPatients = [
  {
    id: "1",
    name: "Ali Abdullah",
    email: "ali.abdullah@example.com",
    phone: "(555) 123-4567",
    dob: "1985-06-15",
    lastVisit: "2025-03-28",
    upcomingAppointment: "2025-04-15",
    medicalConditions: ["Hypertension", "Asthma"],
    notes: 2,
  },
  {
    id: "2",
    name: "Mahmoud Khalil",
    email: "mahmoud.khalil@example.com",
    phone: "(555) 987-6543",
    dob: "1992-11-03",
    lastVisit: "2025-04-01",
    upcomingAppointment: "2025-04-22",
    medicalConditions: ["Diabetes Type 2"],
    notes: 5,
  },
  {
    id: "3",
    name: "Nour Al-Hadi",
    email: "nour.alhadi@example.com",
    phone: "(555) 456-7890",
    dob: "1978-02-27",
    lastVisit: "2025-03-15",
    upcomingAppointment: null,
    medicalConditions: ["Arthritis", "Hypothyroidism"],
    notes: 8,
  },
  {
    id: "4",
    name: "Samir Nassar",
    email: "samir.nassar@example.com",
    phone: "(555) 789-0123",
    dob: "1965-09-12",
    lastVisit: "2025-04-05",
    upcomingAppointment: "2025-04-19",
    medicalConditions: ["Coronary Artery Disease", "High Cholesterol"],
    notes: 12,
  },
  {
    id: "5",
    name: "Leila Karam",
    email: "leila.karam@example.com",
    phone: "(555) 234-5678",
    dob: "1998-07-21",
    lastVisit: "2025-02-10",
    upcomingAppointment: "2025-05-03",
    medicalConditions: ["Migraine"],
    notes: 3,
  }
];

const Patients = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  
  // Filter patients based on search query and tab
  const filteredPatients = mockPatients.filter(patient => {
    // Search filter
    const matchesSearch = 
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.medicalConditions.some(condition => 
        condition.toLowerCase().includes(searchQuery.toLowerCase())
      );
    
    // Tab filter
    if (activeTab === "all") return matchesSearch;
    if (activeTab === "upcoming") return matchesSearch && patient.upcomingAppointment !== null;
    if (activeTab === "recent") {
      const lastVisitDate = new Date(patient.lastVisit);
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return matchesSearch && lastVisitDate >= thirtyDaysAgo;
    }
    
    return matchesSearch;
  });
  
  const handleViewProfile = (id: string) => {
    console.log("Viewing patient profile:", id);
    // In a real app, this would navigate to the patient profile page
  };
  
  const handleAddNote = (id: string) => {
    console.log("Adding note for patient:", id);
    // In a real app, this would open a dialog to add a note
  };

  return (
    <Layout userRole="doctor">
      <div className="space-y-6">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold tracking-tight">My Patients</h1>
          <p className="text-muted-foreground">
            View and manage your assigned patients
          </p>
        </div>
        
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Tabs defaultValue="all" onValueChange={setActiveTab} className="w-full sm:w-auto">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="recent">Recent</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search patients..."
              className="w-full pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        {filteredPatients.length === 0 ? (
          <div className="flex w-full items-center justify-center rounded-md border border-dashed p-8">
            <div className="flex flex-col items-center gap-1.5">
              <p className="text-sm text-muted-foreground">No patients found</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPatients.map((patient) => (
              <Card key={patient.id}>
                <CardHeader className="pb-2">
                  <CardTitle>{patient.name}</CardTitle>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {patient.medicalConditions.map((condition, index) => (
                      <Badge key={index} variant="outline" className="bg-gray-100">
                        {condition}
                      </Badge>
                    ))}
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center text-sm">
                    <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>{patient.email}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>{patient.phone}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-muted-foreground">Last Visit</p>
                      <p>{new Date(patient.lastVisit).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Next Appointment</p>
                      <p>{patient.upcomingAppointment ? new Date(patient.upcomingAppointment).toLocaleDateString() : "None"}</p>
                    </div>
                  </div>
                  <div className="flex items-center text-sm mt-2">
                    <FileText className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>{patient.notes} notes</span>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleAddNote(patient.id)}
                  >
                    Add Note
                  </Button>
                  <Button 
                    className="bg-health-primary hover:bg-health-secondary" 
                    size="sm"
                    onClick={() => handleViewProfile(patient.id)}
                  >
                    View Profile
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Patients;
