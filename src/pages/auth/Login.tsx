
import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ArrowLeft, Loader2 } from "lucide-react";
import { loginUser } from "@/hooks/use-session";
import { useToast } from "@/hooks/use-toast";

// Form schema
const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const getRoleTitle = (role: string) => {
  switch (role) {
    case "patient":
      return "Patient";
    case "doctor":
      return "Doctor";
    case "admin":
      return "Administrator";
    default:
      return "User";
  }
};

const Login = () => {
  const { role } = useParams<{ role: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = async (values: LoginFormValues) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // In a real app, this would call an authentication API
      console.log("Logging in as", role, "with", values);
      
      setIsLoading(false);
      
      // Use the session management hook to login and redirect
      if (role === "patient" || role === "doctor" || role === "admin") {
        loginUser(role as "patient" | "doctor" | "admin", values.email);
        
        toast({
          title: "Login Successful",
          description: `Welcome back! You've been logged in as a ${getRoleTitle(role || "user")}.`,
        });
        
        // Navigate to the appropriate dashboard
        navigate(`/${role}`);
      }
    }, 1500);
  };

  const handleBackToRoleSelection = () => {
    navigate("/auth");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center mb-2">
            <Button 
              variant="ghost" 
              size="sm"
              className="absolute left-4"
              onClick={handleBackToRoleSelection}
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back
            </Button>
          </div>
          <CardTitle className="text-2xl font-bold">Login as {getRoleTitle(role || "")}</CardTitle>
          <CardDescription>Enter your credentials to access your account</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="name@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button 
                type="submit" 
                className="w-full mt-6" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Logging in...
                  </>
                ) : (
                  "Log in"
                )}
              </Button>

              <div className="text-center mt-2">
                <Link 
                  to="/auth/forgot-password" 
                  className="text-sm text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <div className="text-sm text-center w-full">
            Don't have an account?{" "}
            <Link 
              to={`/auth/signup/${role}`} 
              className="text-primary font-medium hover:underline"
            >
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
