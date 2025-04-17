
import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Calendar, Clock, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock data for doctor's schedule
const mockAppointments = [
  {
    id: "1",
    patientName: "Sarah Johnson",
    time: "09:00 AM",
    date: "2025-04-12",
    status: "confirmed",
    reason: "Annual checkup",
    isEmergency: false,
  },
  {
    id: "2",
    patientName: "Michael Chen",
    time: "10:30 AM",
    date: "2025-04-12",
    status: "confirmed",
    reason: "Flu symptoms",
    isEmergency: true,
  },
  {
    id: "3",
    patientName: "Emily Rodriguez",
    time: "01:15 PM",
    date: "2025-04-12",
    status: "confirmed",
    reason: "Follow-up visit",
    isEmergency: false,
  },
  {
    id: "4",
    patientName: "Robert Smith",
    time: "03:00 PM",
    date: "2025-04-12",
    status: "confirmed",
    reason: "Blood pressure check",
    isEmergency: false,
  },
  {
    id: "5",
    patientName: "Sophia Martinez",
    time: "11:00 AM",
    date: "2025-04-13",
    status: "confirmed",
    reason: "Skin rash examination",
    isEmergency: false,
  },
  {
    id: "6",
    patientName: "James Wilson",
    time: "02:30 PM",
    date: "2025-04-13",
    status: "pending",
    reason: "Chest pain",
    isEmergency: true,
  },
];

const Schedule = () => {
  const [activeDate, setActiveDate] = useState("2025-04-12");
  const [availableDates] = useState(["2025-04-12", "2025-04-13", "2025-04-14"]);
  
  // Filter appointments by date
  const filteredAppointments = mockAppointments.filter(app => app.date === activeDate);
  
  const handleApproveAppointment = (id: string) => {
    console.log("Approving appointment:", id);
    // In a real app, this would update the appointment status in the database
  };
  
  const handleRescheduleAppointment = (id: string) => {
    console.log("Rescheduling appointment:", id);
    // In a real app, this would open a reschedule dialog
  };
  
  const handleCancelAppointment = (id: string) => {
    console.log("Canceling appointment:", id);
    // In a real app, this would update the appointment status in the database
  };
  
  const handleBlockTime = () => {
    console.log("Opening block time dialog");
    // In a real app, this would open a dialog to block time slots
  };

  return (
    <Layout userRole="doctor">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">My Schedule</h1>
            <p className="text-gray-500">Manage your appointments and time slots</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2" onClick={handleBlockTime}>
              <Clock className="h-4 w-4" />
              Block Time
            </Button>
            <Button className="gap-2 bg-health-primary hover:bg-health-secondary">
              <Calendar className="h-4 w-4" />
              Create Appointment
            </Button>
          </div>
        </div>
        
        {/* Date Selection */}
        <div className="bg-white p-4 rounded-lg border">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <h2 className="text-lg font-medium">Select Date</h2>
            <Select value={activeDate} onValueChange={setActiveDate}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a date" />
              </SelectTrigger>
              <SelectContent>
                {availableDates.map(date => (
                  <SelectItem key={date} value={date}>
                    {new Date(date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Calendar View - This would be more interactive with a real calendar component */}
        <div className="bg-white p-4 rounded-lg border">
          <h2 className="text-xl font-semibold mb-4">
            {new Date(activeDate).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
          </h2>
          
          {filteredAppointments.length === 0 ? (
            <div className="py-8 text-center text-muted-foreground">
              <p>No appointments scheduled for this date.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredAppointments.map((appointment) => (
                <Card key={appointment.id} className={appointment.isEmergency ? "border-red-200" : ""}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{appointment.patientName}</CardTitle>
                        <p className="text-sm text-muted-foreground">{appointment.time}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {appointment.isEmergency && (
                          <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Emergency</Badge>
                        )}
                        <Badge className={appointment.status === "confirmed" ? "bg-green-100 text-green-800 hover:bg-green-200" : "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"}>
                          {appointment.status === "confirmed" ? "Confirmed" : "Pending"}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-4">Reason: {appointment.reason}</p>
                    <div className="flex gap-2 justify-end">
                      {appointment.status === "pending" && (
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="gap-1 text-green-600 border-green-200 hover:bg-green-50"
                          onClick={() => handleApproveAppointment(appointment.id)}
                        >
                          <Check className="h-4 w-4" />
                          Approve
                        </Button>
                      )}
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="gap-1"
                        onClick={() => handleRescheduleAppointment(appointment.id)}
                      >
                        <Calendar className="h-4 w-4" />
                        Reschedule
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="gap-1 text-red-600 border-red-200 hover:bg-red-50"
                        onClick={() => handleCancelAppointment(appointment.id)}
                      >
                        <X className="h-4 w-4" />
                        Cancel
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Schedule;
