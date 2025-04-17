import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NotFound from "./pages/NotFound";

// Patient Routes
import PatientDashboard from "./pages/patient/Dashboard";
import FindDoctor from "./pages/patient/FindDoctor";
import Appointments from "./pages/patient/Appointments";
import MedicalHistory from "./pages/patient/MedicalHistory";
import Settings from "./pages/patient/Settings";

// Doctor Routes
import DoctorDashboard from "./pages/doctor/Dashboard";
import DoctorAppointments from "./pages/doctor/Appointments";
import Schedule from "./pages/doctor/Schedule";
import Patients from "./pages/doctor/Patients";

// Admin Routes
import AdminDashboard from "./pages/admin/Dashboard";
import Users from "./pages/admin/Users";
import Doctors from "./pages/admin/Doctors";
import Analytics from "./pages/admin/Analytics";

// Auth Routes
import RoleSelection from "./pages/auth/RoleSelection";
import Login from "./pages/auth/Login";
import SignupPatient from "./pages/auth/SignupPatient";
import SignupDoctor from "./pages/auth/SignupDoctor";
import SignupAdmin from "./pages/auth/SignupAdmin";
import ForgotPassword from "./pages/auth/ForgotPassword";

const queryClient = new QueryClient();

// Import session management hooks
import { checkAuthenticated, getUserRole } from "./hooks/use-session";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Default redirect to auth if not authenticated */}
          <Route path="/" element={
            checkAuthenticated() ? (
              <Navigate to={`/${getUserRole()}`} replace />
            ) : (
              <Navigate to="/auth" replace />
            )
          } />
          
          {/* Auth Routes */}
          <Route path="/auth" element={<RoleSelection />} />
          <Route path="/auth/login/:role" element={<Login />} />
          <Route path="/auth/signup/patient" element={<SignupPatient />} />
          <Route path="/auth/signup/doctor" element={<SignupDoctor />} />
          <Route path="/auth/signup/admin" element={<SignupAdmin />} />
          <Route path="/auth/forgot-password" element={<ForgotPassword />} />
          
          {/* Patient Routes */}
          <Route path="/patient" element={<PatientDashboard />} />
          <Route path="/find-doctor" element={<FindDoctor />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/medical-history" element={<MedicalHistory />} />
          <Route path="/settings" element={<Settings />} />
          
          {/* Doctor Routes */}
          <Route path="/doctor" element={<DoctorDashboard />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/patients" element={<Patients />} />
          <Route path="/doctor/appointments" element={<DoctorAppointments />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/analytics" element={<Analytics />} />
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
