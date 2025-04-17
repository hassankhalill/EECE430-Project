
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, Calendar, Menu, LogIn } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { logoutUser } from "@/hooks/use-session";
import { useToast } from "@/hooks/use-toast";

interface NavbarProps {
  toggleSidebar: () => void;
  isAuthenticated?: boolean;
}

export const Navbar = ({ toggleSidebar, isAuthenticated = false }: NavbarProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Get user email for display in dropdown
  const userEmail = localStorage.getItem('userEmail') || '';
  
  const handleLogout = () => {
    logoutUser();
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    navigate("/auth");
  };

  return (
    <nav className="border-b bg-white px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={toggleSidebar} className="lg:hidden">
          <Menu className="h-5 w-5" />
        </Button>
        <Link to="/" className="flex items-center gap-2">
          <span className="font-bold text-xl text-primary">HealthEase Pro</span>
        </Link>
      </div>
      
      <div className="flex items-center gap-4">
        {isAuthenticated ? (
          <>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-destructive text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
            </Button>
            
            <Button variant="ghost" size="icon">
              <Calendar className="h-5 w-5" />
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="" alt="User" />
                    <AvatarFallback className="bg-primary text-white">JD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">John Doe</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {userEmail || "user@example.com"}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={() => navigate("/settings")}
                >
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => navigate("/settings")}
                >
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                >
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <Button 
            variant="default" 
            size="sm" 
            onClick={() => navigate("/auth")}
            className="flex items-center gap-1"
          >
            <LogIn className="h-4 w-4" />
            Log In
          </Button>
        )}
      </div>
    </nav>
  );
};
