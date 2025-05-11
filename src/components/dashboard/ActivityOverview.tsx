
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ActivityItem {
  id: string;
  title: string;
  time: string;
  type: string;
  highlight?: boolean;
}

interface ActivityOverviewProps {
  activities: ActivityItem[];
}

export const ActivityOverview = ({ activities }: ActivityOverviewProps) => {
  return (
    <Card className="border-none shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle>Activity Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
            >
              <div>
                <p className={activity.highlight ? "font-semibold" : ""}>
                  {activity.title}
                </p>
                <p className="text-sm text-muted-foreground">{activity.time}</p>
              </div>
              <Badge variant="outline">{activity.type}</Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
