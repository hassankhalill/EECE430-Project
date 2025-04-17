
import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { User, Mail, Phone, Bell, Shield, LogOut, Trash2, Check } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";

const Settings = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "555-123-4567",
    address: "123 Health Street, Medical City, MC 12345"
  });
  
  const [formData, setFormData] = useState({ ...profileData });
  const [notificationSettings, setNotificationSettings] = useState({
    emailReminders: true,
    smsReminders: true,
    emergencyAlerts: true,
    newsletterUpdates: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = () => {
    setProfileData({ ...formData });
    setIsEditing(false);
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated successfully.",
      duration: 3000
    });
  };

  const handleToggleNotification = (key: keyof typeof notificationSettings) => {
    setNotificationSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleLogout = () => {
    // In a real app, this would handle authentication logout
    console.log("User logged out");
  };

  const handleDeleteAccount = () => {
    // In a real app, this would call API to delete account
    console.log("Account deletion requested");
  };

  return (
    <Layout userRole="patient">
      <div className="space-y-6">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences.
          </p>
        </div>

        <div className="grid gap-6">
          {/* Profile Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-health-primary" />
                Profile Information
              </CardTitle>
              <CardDescription>
                Update your personal information and contact details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="name"
                      name="name"
                      value={isEditing ? formData.name : profileData.name}
                      onChange={handleInputChange}
                      className="pl-8"
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={isEditing ? formData.email : profileData.email}
                      onChange={handleInputChange}
                      className="pl-8"
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <div className="relative">
                    <Phone className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      name="phone"
                      value={isEditing ? formData.phone : profileData.phone}
                      onChange={handleInputChange}
                      className="pl-8"
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    name="address"
                    value={isEditing ? formData.address : profileData.address}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              {isEditing ? (
                <div className="flex gap-2">
                  <Button 
                    className="bg-health-primary hover:bg-health-secondary"
                    onClick={handleSaveProfile}
                  >
                    <Check className="mr-1 h-4 w-4" /> Save Changes
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setFormData({ ...profileData });
                      setIsEditing(false);
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              ) : (
                <Button 
                  variant="outline" 
                  onClick={() => setIsEditing(true)}
                >
                  Edit Profile
                </Button>
              )}
            </CardFooter>
          </Card>

          {/* Notification Preferences */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-health-primary" />
                Notification Preferences
              </CardTitle>
              <CardDescription>
                Control how you receive notifications and reminders
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-reminders">Email Reminders</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive appointment reminders via email
                    </p>
                  </div>
                  <Switch
                    id="email-reminders"
                    checked={notificationSettings.emailReminders}
                    onCheckedChange={() => handleToggleNotification('emailReminders')}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="sms-reminders">SMS Reminders</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive appointment reminders via text message
                    </p>
                  </div>
                  <Switch
                    id="sms-reminders"
                    checked={notificationSettings.smsReminders}
                    onCheckedChange={() => handleToggleNotification('smsReminders')}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="emergency-alerts">Emergency Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified about emergency slot availability
                    </p>
                  </div>
                  <Switch
                    id="emergency-alerts"
                    checked={notificationSettings.emergencyAlerts}
                    onCheckedChange={() => handleToggleNotification('emergencyAlerts')}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="newsletter-updates">Newsletter Updates</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive health tips and platform updates
                    </p>
                  </div>
                  <Switch
                    id="newsletter-updates"
                    checked={notificationSettings.newsletterUpdates}
                    onCheckedChange={() => handleToggleNotification('newsletterUpdates')}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Account Security */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-health-primary" />
                Account Security
              </CardTitle>
              <CardDescription>
                Manage your account security and privacy
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" placeholder="Enter your current password" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" placeholder="Enter a new password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input id="confirm-password" type="password" placeholder="Confirm your new password" />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-health-primary hover:bg-health-secondary">
                Change Password
              </Button>
            </CardFooter>
          </Card>

          {/* Account Actions */}
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
              Log Out
            </Button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button 
                  variant="outline" 
                  className="text-destructive border-destructive hover:bg-destructive/10 flex items-center gap-2"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete Account
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your
                    account and remove all your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction 
                    className="bg-destructive hover:bg-destructive/90"
                    onClick={handleDeleteAccount}
                  >
                    Delete Account
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
