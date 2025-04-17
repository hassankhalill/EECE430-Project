import { Layout } from "@/components/layout/Layout";
import { DoctorCard } from "@/components/doctors/DoctorCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const FindDoctor = () => {
  // Mock data for doctors
  const doctors = [
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
      name: "Dr. Ahmad Khoury",
      specialty: "Orthopedic Surgeon",
      rating: 4.7,
      availableSlots: 2,
      experience: "12 years"
    },
    {
      id: "103",
      name: "Dr. Mohammad Al-Khalil",
      specialty: "Cardiologist",
      rating: 4.9,
      availableSlots: 1,
      experience: "20 years"
    },
    {
      id: "104",
      name: "Dr. Layla Haddad",
      specialty: "Dermatologist",
      rating: 4.6,
      availableSlots: 5,
      experience: "8 years"
    },
    {
      id: "105",
      name: "Dr. Rania Khoury",
      specialty: "Pediatrician",
      rating: 4.8,
      availableSlots: 4,
      experience: "10 years"
    },
    {
      id: "106",
      name: "Dr. Omar Zaydan",
      specialty: "Ophthalmologist",
      rating: 4.5,
      availableSlots: 3,
      experience: "14 years"
    }
  ];

  const specialties = ["All Specialties", "Cardiology", "Dermatology", "Neurology", "Ophthalmology", "Orthopedics", "Pediatrics"];

  // Mock handlers
  const handleBookAppointment = (doctorId: string) => {
    console.log("Booking appointment with doctor:", doctorId);
  };

  return (
    <Layout userRole="patient">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Find a Doctor</h1>
          <p className="text-gray-500">Search for specialists and book appointments</p>
        </div>

        {/* Search Filters */}
        <div className="bg-white p-4 rounded-lg border space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Search by doctor name" 
                className="pl-9"
              />
            </div>
            <div className="w-full md:w-48">
              <Select defaultValue="All Specialties">
                <SelectTrigger>
                  <SelectValue placeholder="Specialty" />
                </SelectTrigger>
                <SelectContent>
                  {specialties.map((specialty) => (
                    <SelectItem key={specialty} value={specialty}>
                      {specialty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="w-full md:w-48">
              <Select defaultValue="any">
                <SelectTrigger>
                  <SelectValue placeholder="Availability" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any Time</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="tomorrow">Tomorrow</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="bg-health-primary hover:bg-health-secondary">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="bg-health-light">
              Available Now
            </Badge>
            <Badge variant="outline" className="bg-health-light">
              Top Rated
            </Badge>
            <Badge variant="outline" className="bg-health-light">
              Emergency Available
            </Badge>
          </div>
        </div>

        {/* Search Results */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">
              {doctors.length} Doctors Available
            </h2>
            <Select defaultValue="rating">
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="availability">Most Available</SelectItem>
                <SelectItem value="experience">Most Experienced</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {doctors.map((doctor) => (
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

export default FindDoctor;
