import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FileText } from "lucide-react";

export default function LeasingPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Leasing Dashboard</h1>
      </div>
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><FileText className="h-6 w-6 text-primary" /> Leasing Operations</CardTitle>
          <CardDescription>Streamline your leasing process from application to signing.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This section is under development. Features will include:</p>
          <ul className="list-disc list-inside mt-4 space-y-1 text-muted-foreground">
            <li>Online rental applications and tenant screening.</li>
            <li>Digital lease agreement generation and e-signatures.</li>
            <li>Vacancy tracking and marketing tools.</li>
            <li>Management of lease renewals and expirations.</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
