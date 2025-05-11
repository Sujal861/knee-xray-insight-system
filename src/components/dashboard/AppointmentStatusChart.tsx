
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent
} from "@/components/ui/chart";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface AppointmentStatusData {
  name: string;
  value: number;
  color: string;
}

interface AppointmentStatusChartProps {
  data: AppointmentStatusData[];
}

export const AppointmentStatusChart = ({ data }: AppointmentStatusChartProps) => {
  return (
    <Card className="border-none shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle>Appointment Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-52">
          <ChartContainer 
            config={{
              ...Object.fromEntries(
                data.map((item) => [
                  item.name.toLowerCase(),
                  { label: item.name, color: item.color },
                ])
              ),
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
        <ChartLegend
          className="justify-center mt-4"
          payload={data.map((item) => ({
            value: item.name,
            color: item.color,
            dataKey: item.name.toLowerCase(),
          }))}
        >
          <ChartLegendContent />
        </ChartLegend>
      </CardContent>
    </Card>
  );
};
