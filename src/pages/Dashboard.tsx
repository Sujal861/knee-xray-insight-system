
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  CalendarDays, 
  BarChart3, 
  Users, 
  Clock,
  ChevronUp,
  ChevronDown,
  ArrowRight
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';

const Dashboard = () => {
  // Sample data for charts
  const patientData = [
    { name: 'Jan', value: 35 },
    { name: 'Feb', value: 28 },
    { name: 'Mar', value: 42 },
    { name: 'Apr', value: 38 },
    { name: 'May', value: 55 },
    { name: 'Jun', value: 66 },
    { name: 'Jul', value: 75 },
  ];

  const diagnosesData = [
    { name: 'Osteoarthritis', value: 45 },
    { name: 'Rheumatoid', value: 25 },
    { name: 'Traumatic', value: 18 },
    { name: 'Others', value: 12 },
  ];

  const COLORS = ['#4C84FF', '#66CB9F', '#FDBF5E', '#FF7271'];

  const appointments = [
    { 
      id: 1, 
      patient: 'Jane Cooper', 
      date: '15 Apr 2023', 
      time: '09:15 AM', 
      status: 'Scheduled',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    { 
      id: 2, 
      patient: 'Cody Fisher', 
      date: '15 Apr 2023', 
      time: '10:30 AM', 
      status: 'Completed',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    { 
      id: 3, 
      patient: 'Esther Howard', 
      date: '15 Apr 2023', 
      time: '02:00 PM', 
      status: 'Cancelled',
      avatar: 'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    { 
      id: 4, 
      patient: 'Cameron Williamson', 
      date: '16 Apr 2023', 
      time: '11:45 AM', 
      status: 'Scheduled',
      avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Scheduled':
        return 'bg-blue-100 text-dashboard-primary';
      case 'Completed':
        return 'bg-green-100 text-dashboard-success';
      case 'Cancelled':
        return 'bg-red-100 text-dashboard-danger';
      default:
        return 'bg-gray-100 text-dashboard-secondary';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-dashboard-text">Dashboard</h1>
        <p className="text-dashboard-secondary">Welcome back, Dr. John!</p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-dashboard-border shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-dashboard-textLight text-sm">Total Patients</p>
                <h4 className="text-3xl font-bold text-dashboard-text mt-1">1,250</h4>
                <div className="flex items-center mt-2 text-dashboard-success">
                  <ChevronUp size={16} />
                  <span className="text-xs font-medium ml-1">16% more than last month</span>
                </div>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Users size={24} className="text-dashboard-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-dashboard-border shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-dashboard-textLight text-sm">Appointments</p>
                <h4 className="text-3xl font-bold text-dashboard-text mt-1">145</h4>
                <div className="flex items-center mt-2 text-dashboard-success">
                  <ChevronUp size={16} />
                  <span className="text-xs font-medium ml-1">12% more than last week</span>
                </div>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                <CalendarDays size={24} className="text-dashboard-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-dashboard-border shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-dashboard-textLight text-sm">Analyses</p>
                <h4 className="text-3xl font-bold text-dashboard-text mt-1">568</h4>
                <div className="flex items-center mt-2 text-dashboard-danger">
                  <ChevronDown size={16} />
                  <span className="text-xs font-medium ml-1">5% less than last month</span>
                </div>
              </div>
              <div className="h-12 w-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <BarChart3 size={24} className="text-dashboard-warning" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-dashboard-border shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-dashboard-textLight text-sm">Average Time</p>
                <h4 className="text-3xl font-bold text-dashboard-text mt-1">24m</h4>
                <div className="flex items-center mt-2 text-dashboard-success">
                  <ChevronUp size={16} />
                  <span className="text-xs font-medium ml-1">3% better than goal</span>
                </div>
              </div>
              <div className="h-12 w-12 bg-red-100 rounded-full flex items-center justify-center">
                <Clock size={24} className="text-dashboard-danger" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-dashboard-border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-dashboard-text text-lg">Patient Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={patientData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E9EDF7" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6E8192' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6E8192' }} />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#4C84FF" 
                    strokeWidth={3} 
                    dot={{ stroke: '#4C84FF', strokeWidth: 2, fill: '#FFFFFF', r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border-dashboard-border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-dashboard-text text-lg">Diagnosis Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex h-[300px]">
              <div className="w-1/2 h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={diagnosesData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {diagnosesData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="w-1/2 flex flex-col justify-center space-y-4">
                {diagnosesData.map((item, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="h-3 w-3 rounded-full mr-2" style={{ backgroundColor: COLORS[index] }}></div>
                        <span className="text-sm text-dashboard-text">{item.name}</span>
                      </div>
                      <span className="text-sm font-medium text-dashboard-text">{item.value}%</span>
                    </div>
                    <Progress value={item.value} className="h-1.5" indicatorClassName={`bg-[${COLORS[index]}]`} />
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Appointments */}
      <Card className="border-dashboard-border shadow-sm">
        <CardHeader className="pb-2 flex flex-row items-center justify-between">
          <CardTitle className="text-dashboard-text text-lg">Upcoming Appointments</CardTitle>
          <Button variant="ghost" className="text-dashboard-primary hover:text-dashboard-primary/80">
            <span>View All</span>
            <ArrowRight size={16} className="ml-1" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-dashboard-border">
                  <th className="text-left py-3 px-4 text-dashboard-textLight font-medium text-xs uppercase">Patient</th>
                  <th className="text-left py-3 px-4 text-dashboard-textLight font-medium text-xs uppercase">Date</th>
                  <th className="text-left py-3 px-4 text-dashboard-textLight font-medium text-xs uppercase">Time</th>
                  <th className="text-left py-3 px-4 text-dashboard-textLight font-medium text-xs uppercase">Status</th>
                  <th className="text-right py-3 px-4 text-dashboard-textLight font-medium text-xs uppercase">Action</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appointment) => (
                  <tr key={appointment.id} className="border-b border-dashboard-border hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full mr-3 overflow-hidden">
                          <img src={appointment.avatar} alt={appointment.patient} className="h-full w-full object-cover" />
                        </div>
                        <span className="font-medium text-dashboard-text">{appointment.patient}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-dashboard-secondary">{appointment.date}</td>
                    <td className="py-3 px-4 text-dashboard-secondary">{appointment.time}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                        {appointment.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button className="font-medium text-dashboard-primary hover:text-dashboard-primary/80">
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Add more Figma components as needed */}
    </div>
  );
};

export default Dashboard;
