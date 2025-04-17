
import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { AppointmentCard } from "@/components/appointments/AppointmentCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User, Search, Filter } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// Mock data for appointments
const upcomingAppointments = [
  {
    id: "1",
    doctorName: "John Doe", // Patient name for doctor view
    specialty: "Regular Checkup",
    date: "April 15, 2025",
    time: "10:30 AM",
    status: "upcoming" as const,
  },
  {
    id: "2",
    doctorName: "Sarah Johnson",
    specialty: "Follow-up",
    date: "April 21, 2025",
    time: "2:00 PM",
    status: "upcoming" as const,
  },
  {
    id: "3",
    doctorName: "Michael Brown",
    specialty: "First Consultation",
    date: "April 28, 2025",
    time: "9:15 AM",
    status: "emergency" as const,
  }
];

const pastAppointments = [
  {
    id: "4",
    doctorName: "Emily Wilson",
    specialty: "Regular Checkup",
    date: "March 15, 2025",
    time: "11:30 AM",
    status: "completed" as const,
    notes: "Patient has shown improvement in blood pressure levels. Continue with prescribed medication."
  },
  {
    id: "5",
    doctorName: "Robert Chen",
    specialty: "Follow-up",
    date: "March 8, 2025",
    time: "3:45 PM",
    status: "completed" as const,
  },
  {
    id: "6",
    doctorName: "Jessica Martinez",
    specialty: "Emergency",
    date: "February 25, 2025",
    time: "10:00 AM",
    status: "cancelled" as const,
  }
];

const DoctorAppointments = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [selectedAppointment, setSelectedAppointment] = useState<string | null>(null);
  const [noteText, setNoteText] = useState("");
  
  const handleAddNotes = (id: string) => {
    setSelectedAppointment(id);
    // In a real app, would fetch existing notes if any
    setNoteText("");
  };

  const handleSaveNotes = () => {
    // In a real app, this would call an API to save notes
    console.log(`Saving notes for appointment ${selectedAppointment}: ${noteText}`);
    setSelectedAppointment(null);
    setNoteText("");
    // Show success toast
  };

  const handleCancelAppointment = (id: string) => {
    // In a real app, this would call an API
    console.log(`Cancelling appointment ${id}`);
  };

  const handleViewNotes = (id: string) => {
    // In a real app, this would open a modal with full notes
    console.log(`Viewing notes for appointment ${id}`);
  };

  const handleFilterChange = (value: string) => {
    // In a real app, this would filter appointments
    console.log(`Filtering by: ${value}`);
  };

  return (
    <Layout userRole="doctor">
      <div className="space-y-6">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold tracking-tight">Manage Appointments</h1>
          <p className="text-muted-foreground">
            View and manage your scheduled appointments with patients.
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Tabs defaultValue="upcoming" onValueChange={setActiveTab} className="w-full sm:w-auto">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="past">Past</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <Select defaultValue="all" onValueChange={handleFilterChange}>
              <SelectTrigger className="w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Appointments</SelectItem>
                <SelectItem value="regular">Regular Checkups</SelectItem>
                <SelectItem value="emergency">Emergency</SelectItem>
                <SelectItem value="followup">Follow-ups</SelectItem>
              </SelectContent>
            </Select>

            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search patients..."
                className="pl-8 h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
          </div>
        </div>

        <div className={activeTab === "upcoming" ? "block" : "hidden"}>
          {upcomingAppointments.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No upcoming appointments scheduled.</p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {upcomingAppointments.map((appointment) => (
                <AppointmentCard
                  key={appointment.id}
                  appointment={appointment}
                  userRole="doctor"
                  onCancelAppointment={handleCancelAppointment}
                />
              ))}
            </div>
          )}
        </div>
        
        <div className={activeTab === "past" ? "block" : "hidden"}>
          {pastAppointments.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No past appointments found.</p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {pastAppointments.map((appointment) => (
                <AppointmentCard
                  key={appointment.id}
                  appointment={appointment}
                  userRole="doctor"
                  onViewNotes={appointment.notes ? handleViewNotes : undefined}
                  onAddNotes={appointment.status === "completed" ? handleAddNotes : undefined}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Add Notes Dialog */}
      <Dialog open={selectedAppointment !== null} onOpenChange={(open) => !open && setSelectedAppointment(null)}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add Medical Notes</DialogTitle>
            <DialogDescription>
              Record notes for the patient's medical record.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Textarea
              placeholder="Enter detailed notes about the appointment..."
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              className="min-h-[150px]"
            />
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setSelectedAppointment(null)}
            >
              Cancel
            </Button>
            <Button 
              className="bg-health-primary hover:bg-health-secondary"
              onClick={handleSaveNotes}
            >
              Save Notes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default DoctorAppointments;
