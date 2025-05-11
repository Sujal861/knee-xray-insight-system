
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend?: {
    value: string;
    positive: boolean;
  };
  className?: string;
}

export const StatCard = ({ title, value, icon, trend, className }: StatCardProps) => {
  return (
    <Card className={cn("border-none shadow-sm", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">{title}</p>
            <h3 className="text-2xl font-semibold">{value}</h3>
            {trend && (
              <p className={cn("text-sm mt-1", trend.positive ? "text-green-500" : "text-red-500")}>
                {trend.positive ? "+" : "-"}{trend.value}
              </p>
            )}
          </div>
          <div className="bg-primary/10 p-3 rounded-full">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
