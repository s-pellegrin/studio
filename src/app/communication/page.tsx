import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";

export default function CommunicationPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Communication Center</h1>
      </div>
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><MessageSquare className="h-6 w-6 text-primary" /> Messaging & Announcements</CardTitle>
          <CardDescription>Manage all communications with tenants, owners, and vendors.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This section is under development. Communication tools will offer:</p>
          <ul className="list-disc list-inside mt-4 space-y-1 text-muted-foreground">
            <li>Centralized inbox for emails and SMS (via integrations).</li>
            <li>Bulk announcements to tenants or owners.</li>
            <li>Automated notifications for rent reminders, maintenance updates, etc.</li>
            <li>Communication logs and history.</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
