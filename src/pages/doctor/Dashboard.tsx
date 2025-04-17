import { Layout } from "@/components/layout/Layout";
import { AppointmentCard } from "@/components/appointments/AppointmentCard";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { Button } from "@/components/ui/button";
import { 
  AlertTriangle, 
  Calendar, 
  Clock, 
  FileText, 
  Users
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const DoctorDashboard = () => {
  // Mock data for doctor dashboard
  const todayAppointments = [
    {
      id: "1",
      doctorName: "Fatima Al-Ahmad",
      specialty: "Follow-up",
      date: "Today",
      time: "10:00 AM",
      status: "upcoming" as const,
    },
    {
      id: "2",
      doctorName: "Yousef Mansour",
      specialty: "New Patient",
      date: "Today",
      time: "11:30 AM",
      status: "upcoming" as const,
    },
    {
      id: "3",
      doctorName: "Jihad Al-Mahmoud",
      specialty: "Consultation",
      date: "Today",
      time: "2:00 PM",
      status: "emergency" as const,
    }
  ];

  const emergencyRequests = [
    {
      id: "101",
      patientName: "Karim Najjar",
      reason: "Severe chest pain",
      requestTime: "1 hour ago",
      priority: "high"
    }
  ];
  
  // Mock handlers
  const handleAddNotes = (appointmentId: string) => {
    console.log("Adding notes for appointment:", appointmentId);
  };

  const handleApproveEmergency = (requestId: string) => {
    console.log("Approving emergency request:", requestId);
  };

  const handleRejectEmergency = (requestId: string) => {
    console.log("Rejecting emergency request:", requestId);
  };

  return (
    <Layout userRole="doctor">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Welcome, Dr. Hassan</h1>
            <p className="text-gray-500">Here's your schedule for today</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <FileText className="h-4 w-4" />
              Manage Schedule
            </Button>
            <Button className="gap-2 bg-health-primary hover:bg-health-secondary">
              <Calendar className="h-4 w-4" />
              Block Time
            </Button>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatsCard 
            title="Today's Appointments" 
            value={todayAppointments.length} 
            icon={<Calendar className="h-4 w-4" />}
          />
          <StatsCard 
            title="Emergency Requests" 
            value={emergencyRequests.length} 
            icon={<AlertTriangle className="h-4 w-4" />}
            className={emergencyRequests.length > 0 ? "border-health-error" : ""}
          />
          <StatsCard 
            title="Patients Seen Today" 
            value={2} 
            icon={<Users className="h-4 w-4" />}
          />
          <StatsCard 
            title="Available Slots" 
            value={4} 
            icon={<Clock className="h-4 w-4" />}
          />
        </div>

        {/* Emergency Requests */}
        {emergencyRequests.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Emergency Requests</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {emergencyRequests.map((request) => (
                <Card key={request.id} className="border-l-4 border-l-health-error">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{request.patientName}</CardTitle>
                      <Badge className="bg-health-error text-white">
                        Emergency
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-4">
                    <div className="mb-3">
                      <p className="text-sm text-gray-500">Reason:</p>
                      <p className="font-medium">{request.reason}</p>
                    </div>
                    <div className="text-sm text-gray-500">
                      Requested {request.requestTime}
                    </div>
                    <div className="mt-4 flex gap-2">
                      <Button 
                        className="bg-health-primary hover:bg-health-secondary"
                        size="sm"
                        onClick={() => handleApproveEmergency(request.id)}
                      >
                        Approve
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleRejectEmergency(request.id)}
                      >
                        Decline
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Today's Schedule */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Today's Schedule</h2>
          <div className="bg-white rounded-lg border p-4">
            <div className="space-y-4">
              {todayAppointments.map((appointment) => (
                <div key={appointment.id} className="flex flex-col md:flex-row gap-4 p-3 border-b last:border-0">
                  <div className="w-24 text-center">
                    <div className="text-health-primary font-medium">{appointment.time}</div>
                  </div>
                  <div className="flex-1">
                    <AppointmentCard 
                      appointment={appointment}
                      userRole="doctor"
                      onAddNotes={handleAddNotes}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Weekly Overview */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Weekly Overview</h2>
            <Button variant="link" className="text-health-primary">View Calendar</Button>
          </div>
          <Card>
            <CardContent className="p-4">
              <div className="grid grid-cols-7 gap-4">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, index) => (
                  <div 
                    key={day} 
                    className={`text-center p-2 rounded-md ${index === 2 ? 'bg-health-primary text-white' : 'bg-gray-100'}`}
                  >
                    <div className="font-medium">{day}</div>
                    <div className="text-xs mt-1">{index === 2 ? '3 appointments' : index === 3 ? '2 appointments' : '0 appointments'}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default DoctorDashboard;
