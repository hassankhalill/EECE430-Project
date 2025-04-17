import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { AppointmentCard } from "@/components/appointments/AppointmentCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield } from "lucide-react";

// Mock data for appointments
const upcomingAppointments = [
  {
    id: "1",
    doctorName: "Dr. Nadia Al-Hassan",
    specialty: "Cardiologist",
    date: "April 15, 2025",
    time: "10:30 AM",
    status: "upcoming" as const,
  },
  {
    id: "2",
    doctorName: "Dr. Layla Haddad",
    specialty: "Dermatologist",
    date: "April 21, 2025",
    time: "2:00 PM",
    status: "upcoming" as const,
  },
  {
    id: "3",
    doctorName: "Dr. Hassan Ibrahim",
    specialty: "Neurologist",
    date: "April 28, 2025",
    time: "9:15 AM",
    status: "emergency" as const,
  }
];

const pastAppointments = [
  {
    id: "4",
    doctorName: "Dr. Nadia Al-Hassan",
    specialty: "Cardiologist",
    date: "March 15, 2025",
    time: "11:30 AM",
    status: "completed" as const,
    notes: "Patient has shown improvement in blood pressure levels. Continue with prescribed medication."
  },
  {
    id: "5",
    doctorName: "Dr. Ahmad Khoury",
    specialty: "Orthopedic Surgeon",
    date: "March 8, 2025",
    time: "3:45 PM",
    status: "completed" as const,
  },
  {
    id: "6",
    doctorName: "Dr. Omar Zaydan",
    specialty: "Ophthalmologist",
    date: "February 25, 2025",
    time: "10:00 AM",
    status: "cancelled" as const,
  }
];

const Appointments = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  
  const handleCancelAppointment = (id: string) => {
    // In a real app, this would call an API
    console.log(`Cancelling appointment ${id}`);
    // Show success toast
  };

  const handleRescheduleAppointment = (id: string) => {
    // In a real app, this would open a reschedule dialog
    console.log(`Rescheduling appointment ${id}`);
  };

  const handleViewNotes = (id: string) => {
    // In a real app, this would open a modal with full notes
    console.log(`Viewing notes for appointment ${id}`);
  };

  return (
    <Layout userRole="patient">
      <div className="space-y-6">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold tracking-tight">Appointments</h1>
          <p className="text-muted-foreground">
            Manage your upcoming and past appointments.
          </p>
        </div>

        <Tabs defaultValue="upcoming" onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming" className="space-y-4">
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
                    userRole="patient"
                    onCancelAppointment={handleCancelAppointment}
                    onRescheduleAppointment={handleRescheduleAppointment}
                  />
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="past" className="space-y-4">
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
                    userRole="patient"
                    onViewNotes={appointment.notes ? handleViewNotes : undefined}
                  />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Appointments;
