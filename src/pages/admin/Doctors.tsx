import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { 
  MoreHorizontal, 
  Search, 
  UserPlus, 
  Mail, 
  Phone, 
  Calendar, 
  Briefcase,
  Building,
  Clock
} from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

// Mock data for doctors
const mockDoctors = [
  {
    id: "1",
    name: "Dr. Mohammad Al-Khalil",
    email: "mohammad.khalil@example.com",
    phone: "03 123777",
    specialty: "Cardiology",
    clinic: "Central Medical Center",
    availability: "Mon, Wed, Fri",
    patients: 45,
    status: "active",
    joinDate: "2024-11-15",
  },
  {
    id: "2",
    name: "Dr. Rania Khoury",
    email: "rania.khoury@example.com",
    phone: "76 888222",
    specialty: "Pediatrics",
    clinic: "Children's Wellness Center",
    availability: "Mon-Fri",
    patients: 78,
    status: "active",
    joinDate: "2025-01-10",
  },
  {
    id: "3",
    name: "Dr. Omar Zaydan",
    email: "omar.zaydan@example.com",
    phone: "03 333999",
    specialty: "Dermatology",
    clinic: "Skin Health Clinic",
    availability: "Tue, Thu, Sat",
    patients: 53,
    status: "inactive",
    joinDate: "2024-09-22",
  },
  {
    id: "4",
    name: "Dr. Hassan Ibrahim",
    email: "hassan.ibrahim@example.com",
    phone: "76 444555",
    specialty: "Neurology",
    clinic: "Brain & Spine Institute",
    availability: "Wed, Thu, Fri",
    patients: 37,
    status: "active",
    joinDate: "2025-02-18",
  },
  {
    id: "5",
    name: "Dr. Layla Haddad",
    email: "layla.haddad@example.com",
    phone: "03 666777",
    specialty: "Orthopedics",
    clinic: "Joint Care Center",
    availability: "Mon, Tue, Wed",
    patients: 62,
    status: "active",
    joinDate: "2024-12-05",
  },
];

// Mock specialties data
const specialties = [
  "Cardiology",
  "Pediatrics",
  "Dermatology",
  "Neurology",
  "Orthopedics",
  "Internal Medicine",
  "Gastroenterology",
  "Ophthalmology",
  "Oncology",
  "Radiology",
];

const Doctors = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [view, setView] = useState("table");
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<typeof mockDoctors[0] | null>(null);
  const [specialtyFilter, setSpecialtyFilter] = useState("all");
  
  // Filter doctors based on search query and specialty filter
  const filteredDoctors = mockDoctors.filter(doctor => {
    // Search filter
    const matchesSearch = 
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.clinic.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Specialty filter
    if (specialtyFilter === "all") return matchesSearch;
    return matchesSearch && doctor.specialty === specialtyFilter;
  });
  
  const handleEditDoctor = (doctor: typeof mockDoctors[0]) => {
    setSelectedDoctor(doctor);
    setIsEditDialogOpen(true);
  };
  
  const handleSaveDoctor = () => {
    // In a real app, this would save changes to the database
    console.log("Saving doctor:", selectedDoctor);
    setIsEditDialogOpen(false);
  };
  
  const handleChangeStatus = (doctorId: string, newStatus: string) => {
    console.log(`Changing status of doctor ${doctorId} to ${newStatus}`);
    // In a real app, this would update the doctor status in the database
  };
  
  const handleDeleteDoctor = (doctorId: string) => {
    console.log("Deleting doctor:", doctorId);
    // In a real app, this would delete the doctor or mark them for deletion
  };
  
  const handleAddDoctor = () => {
    console.log("Opening add doctor form");
    // In a real app, this would open a form to add a new doctor
  };

  return (
    <Layout userRole="admin">
      <div className="space-y-6">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold tracking-tight">Doctor Management</h1>
          <p className="text-muted-foreground">
            View and manage doctors registered in the system
          </p>
        </div>
        
        <Tabs defaultValue="table" onValueChange={setView} className="w-full">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <TabsList className="grid w-full grid-cols-2 sm:w-auto">
              <TabsTrigger value="table">Table View</TabsTrigger>
              <TabsTrigger value="cards">Card View</TabsTrigger>
            </TabsList>
            
            <div className="flex gap-4 items-center">
              <div className="relative w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search doctors..."
                  className="w-full pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <Button 
                className="gap-2 bg-health-primary hover:bg-health-secondary"
                onClick={handleAddDoctor}
              >
                <UserPlus className="h-4 w-4" />
                Add Doctor
              </Button>
            </div>
          </div>
          
          <div className="flex gap-2 flex-wrap mt-4">
            <Badge 
              className={specialtyFilter === "all" ? "bg-health-primary hover:bg-health-secondary cursor-pointer" : "bg-secondary cursor-pointer"} 
              onClick={() => setSpecialtyFilter("all")}
            >
              All Specialties
            </Badge>
            {specialties.map((specialty) => (
              <Badge 
                key={specialty}
                className={specialtyFilter === specialty ? "bg-health-primary hover:bg-health-secondary cursor-pointer" : "bg-secondary cursor-pointer"} 
                onClick={() => setSpecialtyFilter(specialty)}
              >
                {specialty}
              </Badge>
            ))}
          </div>
          
          <TabsContent value="table" className="mt-4">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px]">Name</TableHead>
                    <TableHead className="hidden md:table-cell">Specialty</TableHead>
                    <TableHead className="hidden lg:table-cell">Clinic</TableHead>
                    <TableHead className="hidden md:table-cell">Status</TableHead>
                    <TableHead className="hidden lg:table-cell">Patients</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDoctors.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center">
                        No doctors found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredDoctors.map((doctor) => (
                      <TableRow key={doctor.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="bg-health-light text-health-primary">
                                {doctor.name.split(' ')[1][0]}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div>{doctor.name}</div>
                              <div className="md:hidden text-xs text-muted-foreground">{doctor.specialty}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">{doctor.specialty}</TableCell>
                        <TableCell className="hidden lg:table-cell">{doctor.clinic}</TableCell>
                        <TableCell className="hidden md:table-cell">
                          <Badge
                            className={
                              doctor.status === "active" 
                                ? "bg-green-100 text-green-800" 
                                : "bg-gray-100 text-gray-800"
                            }
                          >
                            {doctor.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">{doctor.patients}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => handleEditDoctor(doctor)}>
                                Edit details
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => handleChangeStatus(doctor.id, doctor.status === "active" ? "inactive" : "active")}
                              >
                                {doctor.status === "active" ? "Deactivate" : "Activate"}
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem 
                                className="text-red-600"
                                onClick={() => handleDeleteDoctor(doctor.id)}
                              >
                                Remove doctor
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          
          <TabsContent value="cards" className="mt-4">
          {filteredDoctors.length === 0 ? (
            <div className="flex w-full items-center justify-center rounded-md border border-dashed p-8">
              <div className="flex flex-col items-center gap-1.5">
                <p className="text-sm text-muted-foreground">No doctors found</p>
              </div>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredDoctors.map((doctor) => (
                <Card key={doctor.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <div className="flex items-start gap-2">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-health-light text-health-primary">
                            {doctor.name.split(' ')[1][0]}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">{doctor.name}</CardTitle>
                          <CardDescription>{doctor.specialty}</CardDescription>
                        </div>
                      </div>
                      <Badge
                        className={
                          doctor.status === "active" 
                            ? "bg-green-100 text-green-800" 
                            : "bg-gray-100 text-gray-800"
                        }
                      >
                        {doctor.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3 pt-2">
                    <div className="flex items-center text-sm">
                      <Building className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>{doctor.clinic}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>{doctor.email}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>{doctor.phone}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>Available: {doctor.availability}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Briefcase className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>{doctor.patients} active patients</span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between pt-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleEditDoctor(doctor)}
                    >
                      Edit
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className={doctor.status === "active" ? "text-red-600 border-red-200 hover:bg-red-50" : "text-green-600 border-green-200 hover:bg-green-50"}
                      onClick={() => handleChangeStatus(doctor.id, doctor.status === "active" ? "inactive" : "active")}
                    >
                      {doctor.status === "active" ? "Deactivate" : "Activate"}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
        </Tabs>
      </div>
      
      {/* Edit Doctor Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Doctor</DialogTitle>
            <DialogDescription>
              Update the doctor's information and preferences.
            </DialogDescription>
          </DialogHeader>
          
          {selectedDoctor && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="name" className="text-right text-sm font-medium">
                  Name
                </label>
                <Input
                  id="name"
                  value={selectedDoctor.name}
                  onChange={(e) => setSelectedDoctor({...selectedDoctor, name: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="email" className="text-right text-sm font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  value={selectedDoctor.email}
                  onChange={(e) => setSelectedDoctor({...selectedDoctor, email: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="phone" className="text-right text-sm font-medium">
                  Phone
                </label>
                <Input
                  id="phone"
                  value={selectedDoctor.phone}
                  onChange={(e) => setSelectedDoctor({...selectedDoctor, phone: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="specialty" className="text-right text-sm font-medium">
                  Specialty
                </label>
                <Input
                  id="specialty"
                  value={selectedDoctor.specialty}
                  onChange={(e) => setSelectedDoctor({...selectedDoctor, specialty: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="clinic" className="text-right text-sm font-medium">
                  Clinic
                </label>
                <Input
                  id="clinic"
                  value={selectedDoctor.clinic}
                  onChange={(e) => setSelectedDoctor({...selectedDoctor, clinic: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="availability" className="text-right text-sm font-medium">
                  Availability
                </label>
                <Input
                  id="availability"
                  value={selectedDoctor.availability}
                  onChange={(e) => setSelectedDoctor({...selectedDoctor, availability: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="status" className="text-right text-sm font-medium">
                  Status
                </label>
                <select
                  id="status"
                  value={selectedDoctor.status}
                  onChange={(e) => setSelectedDoctor({...selectedDoctor, status: e.target.value})}
                  className="col-span-3 h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-health-primary hover:bg-health-secondary" onClick={handleSaveDoctor}>
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Doctors;
