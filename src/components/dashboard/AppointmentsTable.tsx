
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Appointment {
  id: string;
  patient: {
    name: string;
    avatar?: string;
    initials: string;
  };
  date: string;
  time: string;
  status: "confirmed" | "pending" | "canceled";
  type: string;
}

interface AppointmentsTableProps {
  appointments: Appointment[];
}

const getStatusStyle = (status: Appointment["status"]) => {
  switch (status) {
    case "confirmed":
      return { variant: "default" as const, label: "Confirmed" };
    case "pending":
      return { variant: "secondary" as const, label: "Pending" };
    case "canceled":
      return { variant: "destructive" as const, label: "Canceled" };
  }
};

export const AppointmentsTable = ({ appointments }: AppointmentsTableProps) => {
  return (
    <Card className="border-none shadow-sm">
      <CardHeader className="pb-0">
        <CardTitle>Today's Appointments</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Patient</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Type</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {appointments.map((appointment) => {
              const status = getStatusStyle(appointment.status);
              
              return (
                <TableRow key={appointment.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        {appointment.patient.avatar && (
                          <AvatarImage src={appointment.patient.avatar} />
                        )}
                        <AvatarFallback>
                          {appointment.patient.initials}
                        </AvatarFallback>
                      </Avatar>
                      <span>{appointment.patient.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{appointment.date}</TableCell>
                  <TableCell>{appointment.time}</TableCell>
                  <TableCell>
                    <Badge variant={status.variant}>{status.label}</Badge>
                  </TableCell>
                  <TableCell>{appointment.type}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
