import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Home } from "lucide-react";

export default function RentalsPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Rentals Management</h1>
      </div>
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Home className="h-6 w-6 text-primary" /> Rentals Overview</CardTitle>
          <CardDescription>Manage all your rental units, leases, and tenant information from here.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This section is under development. Soon you'll be able to:</p>
          <ul className="list-disc list-inside mt-4 space-y-1 text-muted-foreground">
            <li>View all rental properties and units.</li>
            <li>Track lease agreements and renewals.</li>
            <li>Manage tenant occupancy and move-ins/move-outs.</li>
            <li>Oversee rent collection and financial records per unit.</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
