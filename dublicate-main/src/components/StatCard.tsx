import { Card, CardContent } from "./ui/card";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
}

const StatCard = ({ title, value, icon: Icon, trend }: StatCardProps) => {
  return (
    <Card className="border-border shadow-card hover:shadow-elevated transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 bg-primary/10 rounded-lg">
            <Icon className="h-6 w-6 text-primary" />
          </div>
          {trend && (
            <span className="text-sm text-accent font-medium">{trend}</span>
          )}
        </div>
        <h3 className="text-sm font-medium text-muted-foreground mb-1">{title}</h3>
        <p className="text-3xl font-bold">{value}</p>
      </CardContent>
    </Card>
  );
};

export default StatCard;
