import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PieChart } from "lucide-react";

export default function AnalyticsPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Analytics Hub</h1>
      </div>
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><PieChart className="h-6 w-6 text-primary" /> Data Insights & Analytics</CardTitle>
          <CardDescription>Visualize key performance indicators and trends for your portfolio.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This section is under development. The Analytics Hub will provide:</p>
          <ul className="list-disc list-inside mt-4 space-y-1 text-muted-foreground">
            <li>Interactive dashboards with charts and graphs.</li>
            <li>Portfolio performance overview.</li>
            <li>Financial trends and forecasting.</li>
            <li>Occupancy and leasing analytics.</li>
            <li>Maintenance efficiency metrics.</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
