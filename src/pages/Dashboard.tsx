
import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Clipboard,
  Users,
  Calendar,
  Clock,
} from "lucide-react";

import { StatCard } from "@/components/dashboard/StatCard";
import { AppointmentsTable } from "@/components/dashboard/AppointmentsTable";
import { AppointmentStatusChart } from "@/components/dashboard/AppointmentStatusChart";
import { ActivityOverview } from "@/components/dashboard/ActivityOverview";
import { PatientDistribution } from "@/components/dashboard/PatientDistribution";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";

const Dashboard = () => {
  // Mock data for the dashboard
  const statsData = [
    {
      id: "total-patients",
      title: "Total Patients",
      value: "1,250",
      icon: <Users className="h-5 w-5 text-primary" />,
      trend: { value: "12%", positive: true },
    },
    {
      id: "total-appointments",
      title: "Total Appointments",
      value: "520",
      icon: <Calendar className="h-5 w-5 text-primary" />,
      trend: { value: "5%", positive: true },
    },
    {
      id: "pending-appointments",
      title: "Pending Appointments",
      value: "48",
      icon: <Clock className="h-5 w-5 text-primary" />,
      trend: { value: "2%", positive: false },
    },
    {
      id: "daily-checkups",
      title: "Daily Checkups",
      value: "125",
      icon: <Clipboard className="h-5 w-5 text-primary" />,
      trend: { value: "8%", positive: true },
    },
  ];

  const appointmentStatusData = [
    { name: "Completed", value: 60, color: "#4CAF50" },
    { name: "Scheduled", value: 30, color: "#2196F3" },
    { name: "Canceled", value: 10, color: "#F44336" },
  ];

  const appointmentsData = [
    {
      id: "app-1",
      patient: {
        name: "John Smith",
        initials: "JS",
      },
      date: "May 11, 2025",
      time: "10:00 AM",
      status: "confirmed" as const,
      type: "Checkup",
    },
    {
      id: "app-2",
      patient: {
        name: "Maria Garcia",
        initials: "MG",
      },
      date: "May 11, 2025",
      time: "11:30 AM",
      status: "pending" as const,
      type: "Consultation",
    },
    {
      id: "app-3",
      patient: {
        name: "Robert Johnson",
        initials: "RJ",
      },
      date: "May 11, 2025",
      time: "2:15 PM",
      status: "confirmed" as const,
      type: "Follow-up",
    },
    {
      id: "app-4",
      patient: {
        name: "Lisa Chen",
        initials: "LC",
      },
      date: "May 11, 2025",
      time: "3:30 PM",
      status: "canceled" as const,
      type: "Checkup",
    },
  ];

  const activitiesData = [
    {
      id: "act-1",
      title: "New patient registration",
      time: "10:23 AM",
      type: "Registration",
    },
    {
      id: "act-2",
      title: "Dr. Miller completed appointment",
      time: "09:45 AM",
      type: "Appointment",
      highlight: true,
    },
    {
      id: "act-3",
      title: "Lab results uploaded",
      time: "08:30 AM",
      type: "Lab",
    },
  ];

  const distributionData = [
    {
      label: "Adults",
      value: 720,
      total: 1250,
      color: "#2196F3",
    },
    {
      label: "Children",
      value: 320,
      total: 1250,
      color: "#4CAF50",
    },
    {
      label: "Seniors",
      value: 210,
      total: 1250,
      color: "#FF9800",
    },
  ];

  // Simulated data loading using react-query
  const { isLoading, error } = useQuery({
    queryKey: ["dashboardData"],
    queryFn: () => Promise.resolve({ success: true }),
    staleTime: Infinity,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading dashboard data</div>;

  return (
    <DashboardLayout>
      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {statsData.map((stat) => (
          <StatCard
            key={stat.id}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            trend={stat.trend}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Appointments Table */}
          <AppointmentsTable appointments={appointmentsData} />
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          <AppointmentStatusChart data={appointmentStatusData} />
          <ActivityOverview activities={activitiesData} />
          <PatientDistribution items={distributionData} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
