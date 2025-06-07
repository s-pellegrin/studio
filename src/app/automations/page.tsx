
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, PlusCircle, Play, Settings2, ListFilter, Clock, ShieldCheck, Bell } from "lucide-react";

export default function AutomationsPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Zap className="h-8 w-8 text-primary" /> Automations Hub
        </h1>
        <div className="flex items-center gap-2">
          <Button variant="outline"><Settings2 className="mr-2 h-4 w-4" /> Automation Settings</Button>
          <Button><PlusCircle className="mr-2 h-5 w-5" /> New Automation Rule</Button>
        </div>
      </div>

      <Card className="shadow-lg mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ListFilter className="h-6 w-6 text-primary" /> Workflow Automation Rules
          </CardTitle>
          <CardDescription>
            Define, manage, and monitor automated workflows to streamline your property management tasks.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-muted-foreground">
            This section is under development. Key automation features will enable:
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm">
            <li className="flex items-start">
              <Clock className="h-4 w-4 mr-2 mt-0.5 shrink-0 text-primary" />
              <div>
                <strong>Automated Rent Reminders & Late Fee Processing:</strong>
                <span className="block text-muted-foreground">Set up automatic notifications for upcoming rent and apply late fees based on your policies.</span>
              </div>
            </li>
            <li className="flex items-start">
              <Play className="h-4 w-4 mr-2 mt-0.5 shrink-0 text-primary" />
              <div>
                <strong>Workflow Triggers:</strong>
                <span className="block text-muted-foreground">Initiate actions based on specific tenant activities (e.g., lease signing, move-out notice) or important dates (e.g., lease expiration, inspection due).</span>
              </div>
            </li>
            <li className="flex items-start">
              <Bell className="h-4 w-4 mr-2 mt-0.5 shrink-0 text-primary" />
              <div>
                <strong>Automated Lease Renewal Notifications:</strong>
                <span className="block text-muted-foreground">Send timely reminders and offers to tenants whose leases are approaching renewal.</span>
              </div>
            </li>
            <li className="flex items-start">
              <Zap className="h-4 w-4 mr-2 mt-0.5 shrink-0 text-primary" />
              <div>
                <strong>External Service Integrations:</strong>
                <span className="block text-muted-foreground">Connect with other services via webhooks or APIs to extend automation capabilities (e.g., syncing with accounting software, triggering external notifications).</span>
              </div>
            </li>
            <li className="flex items-start">
              <Settings2 className="h-4 w-4 mr-2 mt-0.5 shrink-0 text-primary" />
              <div>
                <strong>Customizable Automation Rules & Templates:</strong>
                <span className="block text-muted-foreground">Create tailored automation rules from scratch or use pre-built templates for common property management scenarios.</span>
              </div>
            </li>
          </ul>
          <div className="mt-6 flex justify-end">
            <Button variant="outline">Explore Rule Templates</Button>
          </div>
        </CardContent>
      </Card>

      {/* Placeholder for a list or board of existing automations */}
      <Card className="shadow-lg">
        <CardHeader>
            <CardTitle>Your Automation Rules</CardTitle>
            <CardDescription>Overview of currently active and paused automation rules.</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="text-center py-10 text-muted-foreground">
                <Zap className="mx-auto h-12 w-12 mb-4 opacity-50" />
                <p>No automation rules configured yet.</p>
                <Button className="mt-4" size="sm">Create your first automation</Button>
            </div>
            {/* Future: Table or Kanban board of automations */}
        </CardContent>
      </Card>
    </div>
  );
}
