import { Layout } from "@/components/layout/Layout";
import { AppointmentCard } from "@/components/appointments/AppointmentCard";
import { DoctorCard } from "@/components/doctors/DoctorCard";
import { WaitlistCard } from "@/components/waitlist/WaitlistCard";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Search, User } from "lucide-react";
import { Input } from "@/components/ui/input";

const PatientDashboard = () => {
  // Mock data for patient dashboard
  const upcomingAppointments = [
    {
      id: "1",
      doctorName: "Dr. Mohammad Al-Khalil",
      specialty: "Cardiologist",
      date: "Wed, 12 Apr 2025",
      time: "10:00 AM",
      status: "upcoming" as const,
    },
    {
      id: "2",
      doctorName: "Dr. Layla Haddad",
      specialty: "Dermatologist",
      date: "Fri, 14 Apr 2025",
      time: "2:30 PM",
      status: "upcoming" as const,
    }
  ];

  const recommendedDoctors = [
    {
      id: "101",
      name: "Dr. Hassan Ibrahim",
      specialty: "Neurologist",
      rating: 4.8,
      availableSlots: 3,
      experience: "15 years"
    },
    {
      id: "102",
      name: "Dr. Rania Khoury",
      specialty: "Orthopedic Surgeon",
      rating: 4.7,
      availableSlots: 2,
      experience: "12 years"
    }
  ];
  
  const waitlistItems = [
    {
      id: "201",
      doctorName: "Dr. Omar Zaydan",
      specialty: "Dermatologist",
      requestDate: "10 Apr 2025",
      urgency: "medium" as const,
      position: 3,
      estimatedWaitTime: "~5 days"
    }
  ];

  // Mock handlers
  const handleBookAppointment = (doctorId: string) => {
    console.log("Booking appointment with doctor:", doctorId);
  };

  const handleCancelAppointment = (appointmentId: string) => {
    console.log("Cancelling appointment:", appointmentId);
  };

  const handleRescheduleAppointment = (appointmentId: string) => {
    console.log("Rescheduling appointment:", appointmentId);
  };

  const handleCancelWaitlist = (waitlistId: string) => {
    console.log("Cancelling waitlist:", waitlistId);
  };

  const handleUpgradeToEmergency = (waitlistId: string) => {
    console.log("Upgrading to emergency:", waitlistId);
  };

  const handleViewNotes = (appointmentId: string) => {
    console.log("Viewing notes for appointment:", appointmentId);
  };

  return (
    <Layout userRole="patient">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Welcome back, Ali</h1>
            <p className="text-gray-500">Here's what's happening with your health</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Calendar className="h-4 w-4" />
              Book Appointment
            </Button>
            <Button className="gap-2 bg-health-primary hover:bg-health-secondary">
              <Search className="h-4 w-4" />
              Find Doctor
            </Button>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatsCard 
            title="Upcoming Appointments" 
            value={upcomingAppointments.length} 
            icon={<Calendar className="h-4 w-4" />}
            description="You have appointments scheduled this week"
          />
          <StatsCard 
            title="Active Waitlists" 
            value={waitlistItems.length} 
            icon={<Clock className="h-4 w-4" />}
            description="You're on the waitlist for some specialists"
          />
          <StatsCard 
            title="Medical Notes" 
            value={3} 
            icon={<User className="h-4 w-4" />}
            description="Recent medical notes from your doctors"
          />
        </div>

        {/* Upcoming Appointments */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Upcoming Appointments</h2>
          {upcomingAppointments.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {upcomingAppointments.map((appointment) => (
                <AppointmentCard 
                  key={appointment.id}
                  appointment={appointment}
                  userRole="patient"
                  onCancelAppointment={handleCancelAppointment}
                  onRescheduleAppointment={handleRescheduleAppointment}
                  onViewNotes={handleViewNotes}
                />
              ))}
            </div>
          ) : (
            <div className="bg-health-light rounded-lg p-4 text-center">
              <p>No upcoming appointments. Book with a doctor to get started.</p>
              <Button className="mt-2 bg-health-primary hover:bg-health-secondary">
                Find a Doctor
              </Button>
            </div>
          )}
        </div>

        {/* Waitlists */}
        {waitlistItems.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Your Waitlists</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {waitlistItems.map((waitlist) => (
                <WaitlistCard 
                  key={waitlist.id}
                  waitlistItem={waitlist}
                  onCancelWaitlist={handleCancelWaitlist}
                  onUpgradeToEmergency={handleUpgradeToEmergency}
                />
              ))}
            </div>
          </div>
        )}

        {/* Recommended Doctors */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Recommended Doctors</h2>
            <Button variant="link" className="text-health-primary">View All</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recommendedDoctors.map((doctor) => (
              <DoctorCard 
                key={doctor.id}
                doctor={doctor}
                onBookAppointment={handleBookAppointment}
              />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PatientDashboard;
