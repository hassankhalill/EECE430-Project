
import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { 
  BarChart3, 
  TrendingUp, 
  Calendar, 
  Users, 
  BarChart, 
  AreaChart, 
  PieChart
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Bar,
  BarChart as Recharts,
  Line,
  LineChart,
  Pie,
  PieChart as ReChartsPie,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Cell,
  Area,
  AreaChart as RechartsArea,
  Legend,
} from "recharts";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from "@/components/ui/chart";

// Mock data for analytics
const appointmentData = [
  { month: 'Jan', appointments: 30, completed: 25, cancelled: 5 },
  { month: 'Feb', appointments: 35, completed: 28, cancelled: 7 },
  { month: 'Mar', appointments: 45, completed: 40, cancelled: 5 },
  { month: 'Apr', appointments: 50, completed: 42, cancelled: 8 },
  { month: 'May', appointments: 65, completed: 55, cancelled: 10 },
  { month: 'Jun', appointments: 60, completed: 55, cancelled: 5 },
  { month: 'Jul', appointments: 70, completed: 60, cancelled: 10 },
  { month: 'Aug', appointments: 75, completed: 65, cancelled: 10 },
  { month: 'Sep', appointments: 80, completed: 72, cancelled: 8 },
  { month: 'Oct', appointments: 90, completed: 78, cancelled: 12 },
  { month: 'Nov', appointments: 85, completed: 75, cancelled: 10 },
  { month: 'Dec', appointments: 95, completed: 82, cancelled: 13 },
];

const specialtiesData = [
  { name: "Cardiology", value: 25 },
  { name: "Pediatrics", value: 18 },
  { name: "Dermatology", value: 15 },
  { name: "Neurology", value: 10 },
  { name: "Orthopedics", value: 12 },
  { name: "Others", value: 20 },
];

const weeklyWaitlistData = [
  { day: "Mon", count: 15 },
  { day: "Tue", count: 20 },
  { day: "Wed", count: 18 },
  { day: "Thu", count: 25 },
  { day: "Fri", count: 22 },
  { day: "Sat", count: 30 },
  { day: "Sun", count: 10 },
];

const monthlyActiveUsersData = [
  { month: 'Jan', users: 120 },
  { month: 'Feb', users: 145 },
  { month: 'Mar', users: 160 },
  { month: 'Apr', users: 185 },
  { month: 'May', users: 210 },
  { month: 'Jun', users: 235 },
  { month: 'Jul', users: 245 },
  { month: 'Aug', users: 260 },
  { month: 'Sep', users: 275 },
  { month: 'Oct', users: 290 },
  { month: 'Nov', users: 310 },
  { month: 'Dec', users: 320 },
];

const COLORS = ['#9b87f5', '#7E69AB', '#6E59A5', '#1A1F2C', '#D6BCFA', '#8884d8'];

const Analytics = () => {
  const [period, setPeriod] = useState("year");
  const [chartType, setChartType] = useState("appointments");
  
  // Helper function to get data based on period
  const getPeriodData = (data: any[], periodType: string) => {
    if (periodType === "quarter") {
      return data.slice(data.length - 3);
    } else if (periodType === "month") {
      return data.slice(data.length - 1);
    } else {
      return data;
    }
  };
  
  // Get filtered data based on selected period
  const filteredAppointmentData = getPeriodData(appointmentData, period);
  const filteredUsersData = getPeriodData(monthlyActiveUsersData, period);
  
  // Function to export analytics data
  const handleExportData = () => {
    console.log("Exporting analytics data...");
    // In a real app, this would generate a CSV or PDF report
  };

  return (
    <Layout userRole="admin">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Analytics Dashboard</h1>
            <p className="text-muted-foreground">
              Monitor system performance and user engagement
            </p>
          </div>
          
          <div className="flex gap-2">
            <Select defaultValue="year" onValueChange={setPeriod}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="month">Last Month</SelectItem>
                <SelectItem value="quarter">Last Quarter</SelectItem>
                <SelectItem value="year">Last Year</SelectItem>
              </SelectContent>
            </Select>
            
            <Button
              variant="outline"
              className="gap-2"
              onClick={handleExportData}
            >
              <BarChart3 className="h-4 w-4" />
              Export Data
            </Button>
          </div>
        </div>
        
        {/* Summary Statistics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Total Appointments
              </CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {appointmentData.reduce((sum, item) => sum + item.appointments, 0)}
              </div>
              <p className="text-xs text-muted-foreground">
                +{appointmentData[appointmentData.length - 1].appointments - appointmentData[appointmentData.length - 2].appointments} from last month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Completion Rate
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round((appointmentData.reduce((sum, item) => sum + item.completed, 0) / 
                appointmentData.reduce((sum, item) => sum + item.appointments, 0)) * 100)}%
              </div>
              <p className="text-xs text-muted-foreground">
                +2% from last month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Active Doctors
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">15</div>
              <p className="text-xs text-muted-foreground">
                +3 from last quarter
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Current Waitlist
              </CardTitle>
              <BarChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18</div>
              <p className="text-xs text-muted-foreground">
                -5 from last week
              </p>
            </CardContent>
          </Card>
        </div>
        
        {/* Charts Tabs */}
        <Tabs defaultValue="appointments" onValueChange={setChartType} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="specialties">Specialties</TabsTrigger>
            <TabsTrigger value="waitlist">Waitlist</TabsTrigger>
            <TabsTrigger value="users">User Growth</TabsTrigger>
          </TabsList>
          
          {/* Appointments Chart */}
          <TabsContent value="appointments" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Appointment Trends</CardTitle>
                <CardDescription>
                  View total, completed, and cancelled appointments over time
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <Recharts data={filteredAppointmentData}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip 
                      contentStyle={{ background: '#fff', border: '1px solid #ccc', borderRadius: '4px' }} 
                      formatter={(value, name) => [value, typeof name === 'string' ? (name === 'appointments' ? 'Total' : name.charAt(0).toUpperCase() + name.slice(1)) : name]}
                    />
                    <Legend />
                    <Bar dataKey="completed" stackId="a" fill="#9b87f5" name="Completed" />
                    <Bar dataKey="cancelled" stackId="a" fill="#ff8a65" name="Cancelled" />
                  </Recharts>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Specialties Chart */}
          <TabsContent value="specialties" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Appointment Distribution by Specialty</CardTitle>
                <CardDescription>
                  View which specialties are most in demand
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[400px] flex justify-center">
                <ResponsiveContainer width="70%" height="100%">
                  <ReChartsPie>
                    <Pie
                      data={specialtiesData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={120}
                      fill="#9b87f5"
                      label={(entry) => `${entry.name}: ${entry.value}%`}
                    >
                      {specialtiesData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ background: '#fff', border: '1px solid #ccc', borderRadius: '4px' }}
                      formatter={(value) => [`${value}%`, 'Percentage']}
                    />
                    <Legend />
                  </ReChartsPie>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Waitlist Chart */}
          <TabsContent value="waitlist" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Waitlist Trends</CardTitle>
                <CardDescription>
                  Weekly waitlist activity
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={weeklyWaitlistData}>
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip
                      contentStyle={{ background: '#fff', border: '1px solid #ccc', borderRadius: '4px' }}
                      formatter={(value) => [value, 'Patients']}
                    />
                    <Line type="monotone" dataKey="count" stroke="#9b87f5" strokeWidth={2} dot={{ fill: '#9b87f5', r: 5 }} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Users Chart */}
          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>User Growth</CardTitle>
                <CardDescription>
                  Monthly active users
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsArea>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip 
                      contentStyle={{ background: '#fff', border: '1px solid #ccc', borderRadius: '4px' }}
                      formatter={(value) => [value, 'Active Users']}
                    />
                    <Area type="monotone" dataKey="users" stroke="#9b87f5" fill="#9b87f5" fillOpacity={0.3} />
                  </RechartsArea>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Analytics;
