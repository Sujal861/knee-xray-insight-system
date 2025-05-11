
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface DistributionItem {
  label: string;
  value: number;
  color: string;
  total: number;
}

interface PatientDistributionProps {
  items: DistributionItem[];
}

export const PatientDistribution = ({ items }: PatientDistributionProps) => {
  return (
    <Card className="border-none shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle>Patient Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.label} className="space-y-1">
              <div className="flex items-center justify-between">
                <span>{item.label}</span>
                <span className="font-medium">
                  {item.value}/{item.total}
                </span>
              </div>
              <Progress 
                value={Math.round((item.value / item.total) * 100)} 
                className="h-2"
                indicatorClassName={`bg-[${item.color}]`} 
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
