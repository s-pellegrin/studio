
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Zap } from "lucide-react";

export default function AutomationsPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Automations</h1>
      </div>
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Zap className="h-6 w-6 text-primary" /> Workflow Automations</CardTitle>
          <CardDescription>Streamline your property management tasks with powerful automations.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This section is under development. Automation features will enable:</p>
          <ul className="list-disc list-inside mt-4 space-y-1 text-muted-foreground">
            <li>Automated rent reminders and late fee processing.</li>
            <li>Workflow triggers based on tenant actions or dates.</li>
            <li>Automated lease renewal notifications.</li>
            <li>Integration with external services via webhooks or APIs.</li>
            <li>Customizable automation rules and templates.</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
