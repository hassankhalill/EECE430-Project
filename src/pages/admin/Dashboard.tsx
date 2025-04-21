
import { Layout } from "@/components/layout/Layout";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { Button } from "@/components/ui/button";
import { 
  BarChart3, 
  Calendar, 
  Clock, 
  MessageSquare,
  PlusCircle, 
  User, 
  Users
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const AdminDashboard = () => {
  // Mock data for admin dashboard
  const systemStats = {
    totalUsers: 250,
    totalDoctors: 15,
    totalAppointments: 127,
    activeWaitlists: 18
  };

  const recentActivities = [
    {
      id: "1",
      type: "new_doctor",
      name: "Dr. Rachel Adams",
      specialty: "Neurologist",
      time: "1 hour ago"
    },
    {
      id: "2",
      type: "emergency_approved",
      patientName: "James Miller",
      doctorName: "Dr. Wilson",
      time: "3 hours ago"
    },
    {
      id: "3",
      type: "waitlist_update",
      count: 3,
      specialty: "Dermatology",
      time: "5 hours ago"
    }
  ];

  return (
    <Layout userRole="admin">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <p className="text-gray-500">System overview and management</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <MessageSquare className="h-4 w-4" />
              Broadcast Message
            </Button>
            <Button className="gap-2 bg-health-primary hover:bg-health-secondary">
              <PlusCircle className="h-4 w-4" />
              Add User
            </Button>
          </div>
        </div>

        {/* System Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard 
            title="Total Users" 
            value={systemStats.totalUsers} 
            icon={<Users className="h-4 w-4" />}
            trend={{ value: 12, isPositive: true }}
          />
          <StatsCard 
            title="Total Doctors" 
            value={systemStats.totalDoctors} 
            icon={<User className="h-4 w-4" />}
            trend={{ value: 5, isPositive: true }}
          />
          <StatsCard 
            title="Appointments" 
            value={systemStats.totalAppointments} 
            icon={<Calendar className="h-4 w-4" />}
            trend={{ value: 8, isPositive: true }}
          />
          <StatsCard 
            title="Active Waitlists" 
            value={systemStats.activeWaitlists} 
            icon={<Clock className="h-4 w-4" />}
            trend={{ value: 3, isPositive: false }}
          />
        </div>

        {/* Main Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* System Activity */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>System Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-4 pb-4 border-b last:border-0 last:pb-0">
                    <div className="rounded-full p-2 bg-health-light text-health-primary">
                      {activity.type === "new_doctor" && <User className="h-4 w-4" />}
                      {activity.type === "emergency_approved" && <Clock className="h-4 w-4" />}
                      {activity.type === "waitlist_update" && <Users className="h-4 w-4" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">
                          {activity.type === "new_doctor" && activity.name}
                          {activity.type === "emergency_approved" && `${activity.patientName} - ${activity.doctorName}`}
                          {activity.type === "waitlist_update" && `Waitlist Update: ${activity.specialty}`}
                        </span>
                        <Badge variant="outline" className="bg-health-light">
                          {activity.type === "new_doctor" && "New Doctor"}
                          {activity.type === "emergency_approved" && "Emergency"}
                          {activity.type === "waitlist_update" && "Waitlist"}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        {activity.type === "new_doctor" && `${activity.specialty} joined the platform`}
                        {activity.type === "emergency_approved" && "Emergency appointment was approved"}
                        {activity.type === "waitlist_update" && `${activity.count} patients moved up in the waitlist`}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Today's Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">New Appointments</span>
                    <span className="font-medium">24</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-health-primary h-2 rounded-full" style={{ width: '70%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Cancellations</span>
                    <span className="font-medium">7</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-health-error h-2 rounded-full" style={{ width: '20%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Emergency Bookings</span>
                    <span className="font-medium">5</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '15%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Waitlist Conversions</span>
                    <span className="font-medium">12</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '35%' }}></div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="font-medium mb-2">Specialty Distribution</h4>
                <div className="h-60 flex items-end justify-between gap-2">
                  {["Cardio", "Neuro", "Derm", "Ortho", "Pedia"].map((item, index) => (
                    <div key={item} className="flex flex-col items-center">
                      <div 
                        className="w-12 bg-health-primary rounded-t-sm" 
                        style={{ 
                          height: `${[70, 50, 90, 40, 60][index]}%`,
                          opacity: 0.6 + (index * 0.1)
                        }}
                      ></div>
                      <span className="text-xs mt-1">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Button variant="link" className="text-health-primary w-full mt-4">
                <BarChart3 className="h-4 w-4 mr-2" />
                View Full Analytics
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
