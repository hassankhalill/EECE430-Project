
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MessageSquare, User } from "lucide-react";

interface AppointmentCardProps {
  appointment: {
    id: string;
    doctorName: string;
    specialty: string;
    date: string;
    time: string;
    status: "upcoming" | "completed" | "cancelled" | "emergency";
    notes?: string;
  };
  userRole: "patient" | "doctor" | "admin";
  onCancelAppointment?: (id: string) => void;
  onRescheduleAppointment?: (id: string) => void;
  onViewNotes?: (id: string) => void;
  onAddNotes?: (id: string) => void;
}

export const AppointmentCard = ({ 
  appointment, 
  userRole,
  onCancelAppointment,
  onRescheduleAppointment,
  onViewNotes,
  onAddNotes
}: AppointmentCardProps) => {
  
  const statusColors = {
    upcoming: "bg-blue-100 text-blue-800",
    completed: "bg-green-100 text-green-800",
    cancelled: "bg-gray-100 text-gray-800",
    emergency: "bg-health-error text-white"
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">
            {userRole === "doctor" ? "Patient Appointment" : "Doctor Appointment"}
          </CardTitle>
          <Badge className={statusColors[appointment.status]}>
            {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-3 space-y-3">
        <div className="flex items-center gap-2">
          <User className="h-4 w-4 text-health-primary" />
          <span className="font-medium">{appointment.doctorName}</span>
          <span className="text-sm text-gray-500">({appointment.specialty})</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-health-primary" />
          <span>{appointment.date}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-health-primary" />
          <span>{appointment.time}</span>
        </div>
        
        {appointment.notes && (
          <div className="flex items-start gap-2 bg-health-light p-2 rounded-md">
            <MessageSquare className="h-4 w-4 text-health-primary mt-0.5" />
            <span className="text-sm">{appointment.notes}</span>
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-0 flex gap-2 flex-wrap">
        {appointment.status === "upcoming" && onCancelAppointment && (
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onCancelAppointment(appointment.id)}
          >
            Cancel
          </Button>
        )}
        
        {appointment.status === "upcoming" && onRescheduleAppointment && (
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onRescheduleAppointment(appointment.id)}
          >
            Reschedule
          </Button>
        )}
        
        {userRole === "doctor" && appointment.status === "completed" && onAddNotes && (
          <Button 
            className="bg-health-primary hover:bg-health-secondary"
            size="sm"
            onClick={() => onAddNotes(appointment.id)}
          >
            Add Notes
          </Button>
        )}
        
        {appointment.notes && onViewNotes && (
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onViewNotes(appointment.id)}
          >
            View Notes
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
