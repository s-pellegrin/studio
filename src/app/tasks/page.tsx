import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ListChecks } from "lucide-react";

export default function TasksPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Task Management</h1>
      </div>
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><ListChecks className="h-6 w-6 text-primary" /> Your Tasks</CardTitle>
          <CardDescription>Organize and track all property management related tasks.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This section is under development. Task management features will include:</p>
          <ul className="list-disc list-inside mt-4 space-y-1 text-muted-foreground">
            <li>Creating and assigning tasks to team members.</li>
            <li>Setting due dates, priorities, and reminders.</li>
            <li>Tracking task progress and completion.</li>
            <li>Linking tasks to properties, tenants, or work orders.</li>
            <li>Collaborative task lists and boards.</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
