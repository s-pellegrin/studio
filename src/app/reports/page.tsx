import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BarChart2 } from "lucide-react";

export default function ReportsPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Reporting Suite</h1>
      </div>
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><BarChart2 className="h-6 w-6 text-primary" /> Financial & Operational Reports</CardTitle>
          <CardDescription>Generate detailed reports to gain insights into your property management business.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This section is under development. You will be able to generate reports such as:</p>
          <ul className="list-disc list-inside mt-4 space-y-1 text-muted-foreground">
            <li>Rent roll and delinquency reports.</li>
            <li>Income and expense statements per property.</li>
            <li>Vacancy and occupancy rate reports.</li>
            <li>Maintenance history and cost analysis.</li>
            <li>Customizable report templates.</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
