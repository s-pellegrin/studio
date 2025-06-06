import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Wrench } from "lucide-react";

export default function MaintenancePage() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Maintenance Hub</h1>
      </div>
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Wrench className="h-6 w-6 text-primary" /> Property Maintenance</CardTitle>
          <CardDescription>Track and manage all maintenance requests and work orders.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This section is under development. Core maintenance functionalities:</p>
          <ul className="list-disc list-inside mt-4 space-y-1 text-muted-foreground">
            <li>Tenant maintenance request portal.</li>
            <li>Work order creation, assignment, and tracking.</li>
            <li>Vendor management and communication.</li>
            <li>Preventive maintenance scheduling.</li>
            <li>Reporting on maintenance costs and history.</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
