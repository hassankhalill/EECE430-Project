
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";

interface DoctorCardProps {
  doctor: {
    id: string;
    name: string;
    specialty: string;
    imageUrl?: string;
    rating: number;
    availableSlots: number;
    experience: string;
  };
  onBookAppointment: (doctorId: string) => void;
}

export const DoctorCard = ({ doctor, onBookAppointment }: DoctorCardProps) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex flex-col">
            <CardTitle className="text-lg">{doctor.name}</CardTitle>
            <CardDescription>{doctor.specialty}</CardDescription>
          </div>
          <Badge variant="outline" className="bg-health-light">
            ⭐ {doctor.rating}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="flex items-center gap-4 mb-2">
          <div className="h-16 w-16 bg-health-light rounded-full flex items-center justify-center">
            {doctor.imageUrl ? (
              <img 
                src={doctor.imageUrl} 
                alt={doctor.name} 
                className="h-full w-full rounded-full object-cover" 
              />
            ) : (
              <span className="text-xl font-bold text-health-primary">
                {doctor.name.charAt(0)}
              </span>
            )}
          </div>
          <div>
            <p className="text-sm text-gray-500">Experience</p>
            <p className="font-medium">{doctor.experience}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Calendar className="h-4 w-4 text-health-primary" />
          <span>
            {doctor.availableSlots} {doctor.availableSlots === 1 ? 'slot' : 'slots'} available
          </span>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Button 
          className="w-full bg-health-primary hover:bg-health-secondary"
          onClick={() => onBookAppointment(doctor.id)}
        >
          Book Appointment
        </Button>
      </CardFooter>
    </Card>
  );
};
