import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { SettingsIcon } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Settings</h1>
      </div>
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><SettingsIcon className="h-6 w-6 text-primary" /> Application Settings</CardTitle>
          <CardDescription>Configure your ManageMATE application preferences and integrations.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This section is under development. Here you will be able to manage:</p>
          <ul className="list-disc list-inside mt-4 space-y-1 text-muted-foreground">
            <li>User accounts and roles.</li>
            <li>Company profile and branding.</li>
            <li>Notification preferences.</li>
            <li>Integrations with third-party services (QuickBooks, Zapier, etc.).</li>
            <li>Subscription and billing information.</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
