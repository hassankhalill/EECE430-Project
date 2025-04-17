import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Shield, User, Calendar, Search, Filter } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";

// Mock data for medical notes
const medicalNotes = [
  {
    id: "1",
    doctorName: "Dr. Nadia Al-Hassan",
    specialty: "Cardiologist",
    date: "March 15, 2025",
    title: "Routine Checkup",
    summary: "Blood pressure: 120/80. Heart rate: 72 bpm. Overall cardiovascular health is good.",
    fullNote: "Patient presented for routine cardiac evaluation. Blood pressure: 120/80 mmHg. Heart rate: 72 bpm, regular rhythm. Heart sounds: normal S1, S2 without murmurs, gallops, or rubs. Electrocardiogram: normal sinus rhythm, PR interval 160 ms, QRS duration 88 ms, QTc 410 ms. No ST-T wave abnormalities. Assessment: Cardiovascular health is stable and well-controlled. Continue current medication regimen. Follow up in 6 months."
  },
  {
    id: "2",
    doctorName: "Dr. Layla Haddad",
    specialty: "Dermatologist", 
    date: "February 8, 2025",
    title: "Skin Assessment",
    summary: "Mild eczema on forearms. Prescribed topical corticosteroid cream.",
    fullNote: "Patient presented with complaints of dry, itchy patches on both forearms ongoing for approximately 2 weeks. Physical examination revealed erythematous, scaly patches with mild excoriation consistent with eczema. No secondary infection present. Discussed potential triggers including weather changes and soaps/detergents. Prescribed hydrocortisone 1% cream to be applied twice daily for 7 days. Recommended daily moisturizing with fragrance-free emollient. Patient education provided on avoidance of hot water and potential irritants. Return in 2 weeks if no improvement."
  },
  {
    id: "3",
    doctorName: "Dr. Ahmad Khoury",
    specialty: "Orthopedic Surgeon",
    date: "January 22, 2025",
    title: "Follow-up: Knee Pain",
    summary: "Improvement in left knee mobility. Continue physical therapy exercises.",
    fullNote: "6-week follow-up after initial presentation for left knee pain. Patient reports approximately 60% improvement in pain levels following physical therapy regimen. Pain now rated as 3/10, down from 7/10 initially. Physical examination shows improved range of motion: flexion to 120 degrees (previously 90 degrees). Extension now complete. Mild crepitus still present. Strength improved to 4+/5. MRI results discussed with patient - showing mild degenerative changes but no meniscal tears or ligamentous injuries requiring surgical intervention. Plan: Continue physical therapy for an additional 4 weeks. Maintain anti-inflammatory medication as needed for pain. Return in 1 month for reassessment."
  }
];

const MedicalHistory = () => {
  const [filter, setFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");
  const [selectedNote, setSelectedNote] = useState<(typeof medicalNotes)[0] | null>(null);

  // Filter and sort notes
  const filteredNotes = [...medicalNotes]
    .filter(note => filter === "all" || note.specialty.toLowerCase().includes(filter.toLowerCase()))
    .sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });

  return (
    <Layout userRole="patient">
      <div className="space-y-6">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight">Medical History</h1>
            <Badge className="bg-health-primary">
              <Shield className="h-3 w-3 mr-1" /> Secure
            </Badge>
          </div>
          <p className="text-muted-foreground">
            Review your medical visit history and notes from healthcare providers.
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <Select value={sortOrder} onValueChange={setSortOrder}>
              <SelectTrigger className="w-[180px]">
                <Calendar className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Sort by date" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by specialty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Specialties</SelectItem>
                <SelectItem value="cardio">Cardiology</SelectItem>
                <SelectItem value="derma">Dermatology</SelectItem>
                <SelectItem value="ortho">Orthopedics</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search notes..."
              className="pl-8 h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
        </div>

        {filteredNotes.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No medical records found.</p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredNotes.map((note) => (
              <Card key={note.id} className="overflow-hidden transition-all hover:shadow-md">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{note.title}</CardTitle>
                </CardHeader>
                <CardContent className="pb-3 space-y-3">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-health-primary" />
                    <span className="font-medium">{note.doctorName}</span>
                    <span className="text-sm text-gray-500">({note.specialty})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-health-primary" />
                    <span>{note.date}</span>
                  </div>
                  <div className="flex items-start gap-2 bg-health-light p-2 rounded-md">
                    <FileText className="h-4 w-4 text-health-primary mt-0.5" />
                    <span className="text-sm line-clamp-2">{note.summary}</span>
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setSelectedNote(note)}
                      >
                        View Full Note
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                      <DialogHeader>
                        <DialogTitle>{selectedNote?.title}</DialogTitle>
                        <DialogDescription>
                          {selectedNote?.doctorName} - {selectedNote?.date}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 my-4">
                        <div className="bg-health-light p-4 rounded-md">
                          <p className="text-sm whitespace-pre-line">{selectedNote?.fullNote}</p>
                        </div>
                      </div>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button className="bg-health-primary hover:bg-health-secondary">Close</Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default MedicalHistory;
