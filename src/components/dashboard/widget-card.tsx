import type { LucideIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface WidgetCardProps {
  title: string;
  value: string;
  description?: string;
  icon: LucideIcon;
  className?: string;
  children?: React.ReactNode;
  action?: React.ReactNode;
}

export default function WidgetCard({ title, value, description, icon: Icon, className, children, action }: WidgetCardProps) {
  return (
    <Card className={cn("shadow-lg hover:shadow-xl transition-shadow duration-300", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && <p className="text-xs text-muted-foreground pt-1">{description}</p>}
        {children}
        {action && <div className="mt-4">{action}</div>}
      </CardContent>
    </Card>
  );
}
