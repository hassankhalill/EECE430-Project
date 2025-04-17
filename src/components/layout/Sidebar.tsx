
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  Calendar, 
  ClipboardList, 
  FileText, 
  Home, 
  Settings, 
  User, 
  Users, 
  BarChart3, 
  Search 
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  userRole: "patient" | "doctor" | "admin";
}

export const Sidebar = ({ isOpen, userRole = "patient" }: SidebarProps) => {
  const location = useLocation();

  // Map of navigation items by user role with role-specific dashboard paths
  const navigationItems = {
    patient: [
      { name: "Dashboard", path: "/patient", icon: Home },
      { name: "Find Doctor", path: "/find-doctor", icon: Search },
      { name: "Appointments", path: "/appointments", icon: Calendar },
      { name: "Medical History", path: "/medical-history", icon: FileText },
      { name: "Settings", path: "/settings", icon: Settings },
    ],
    doctor: [
      { name: "Dashboard", path: "/doctor", icon: Home },
      { name: "My Schedule", path: "/schedule", icon: Calendar },
      { name: "Patients", path: "/patients", icon: Users },
      { name: "Appointments", path: "/doctor/appointments", icon: ClipboardList },
      { name: "Settings", path: "/settings", icon: Settings },
    ],
    admin: [
      { name: "Dashboard", path: "/admin", icon: BarChart3 },
      { name: "Users", path: "/users", icon: Users },
      { name: "Doctors", path: "/doctors", icon: User },
      { name: "Analytics", path: "/analytics", icon: BarChart3 },
      { name: "Settings", path: "/settings", icon: Settings },
    ]
  };

  // Get navigation items for current role
  const items = navigationItems[userRole];

  return (
    <div 
      className={cn(
        "fixed inset-y-0 left-0 z-20 flex w-64 flex-col border-r bg-sidebar transition-transform lg:translate-x-0 lg:static",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className="flex h-14 items-center border-b px-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-bold text-xl text-health-primary">HealthEase</span>
        </Link>
      </div>
      
      <div className="flex-1 overflow-auto py-6 px-4">
        <nav className="space-y-1">
          {items.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium",
                  isActive 
                    ? "bg-health-primary text-white" 
                    : "text-gray-700 hover:bg-health-light"
                )}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
      
      <div className="border-t p-4">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-health-primary flex items-center justify-center text-white">
            {userRole.charAt(0).toUpperCase()}
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium">John Doe</span>
            <span className="text-xs text-gray-500 capitalize">{userRole}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
