
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, MousePointerSquare, Zap, Play, Settings2, Save, TestTube2, MessageSquare, Clock, Users, FileText, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

const DraggableItem = ({ icon: Icon, name, description }: { icon: React.ElementType; name: string; description: string }) => (
  <Card className="p-3 cursor-grab hover:shadow-md active:cursor-grabbing active:shadow-lg transition-shadow">
    <div className="flex items-center gap-2 mb-1">
      <Icon className="h-5 w-5 text-primary" />
      <span className="font-medium text-sm">{name}</span>
    </div>
    <p className="text-xs text-muted-foreground">{description}</p>
  </Card>
);

export default function AutomationCanvasPage() {
  const triggers = [
    { name: 'New Email Received', description: 'Starts when a new email matches criteria.', icon: MessageSquare },
    { name: 'Scheduled Time', description: 'Starts at a specific time or interval.', icon: Clock },
    { name: 'Tenant Action', description: 'e.g., Lease signed, payment made.', icon: Users },
    { name: 'Webhook Received', description: 'Starts when an external service sends data.', icon: Zap },
  ];

  const actions = [
    { name: 'Send Email', description: 'Compose and send an email.', icon: MessageSquare },
    { name: 'Create Task', description: 'Add a new task to the system.', icon: FileText },
    { name: 'Update Record', description: 'Modify data in a property, tenant, etc.', icon: Settings2 },
    { name: 'Wait', description: 'Pause the workflow for a set duration.', icon: Clock },
    { name: 'Condition (If/Else)', description: 'Branch workflow based on criteria.', icon: AlertTriangle },
    { name: 'Call API', description: 'Make a request to an external API.', icon: Play },
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]"> {/* Adjust for main header height */}
      {/* Workflow Builder Header */}
      <header className="sticky top-16 z-10 flex items-center justify-between p-3 border-b bg-background/95 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <Link href="/automations" passHref>
            <Button variant="ghost" size="icon" aria-label="Back to Automations Hub">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-lg font-semibold">Automation Workflow Builder</h1>
            <p className="text-xs text-muted-foreground">Unsaved Workflow</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm"><TestTube2 className="mr-2 h-4 w-4"/> Test Workflow</Button>
          <Button size="sm"><Save className="mr-2 h-4 w-4"/> Save Workflow</Button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Components Palette (Left Sidebar) */}
        <aside className="w-72 border-r bg-card p-0 flex flex-col">
          <ScrollArea className="flex-1">
            <div className="p-4">
              <h2 className="text-base font-semibold mb-3">Triggers</h2>
              <div className="space-y-2">
                {triggers.map(trigger => (
                  <DraggableItem key={trigger.name} icon={trigger.icon} name={trigger.name} description={trigger.description} />
                ))}
              </div>
            </div>
            <Separator className="my-3" />
            <div className="p-4">
              <h2 className="text-base font-semibold mb-3">Actions</h2>
              <div className="space-y-2">
                {actions.map(action => (
                  <DraggableItem key={action.name} icon={action.icon} name={action.name} description={action.description} />
                ))}
              </div>
            </div>
          </ScrollArea>
        </aside>

        {/* Workflow Canvas (Main Area) */}
        <main className="flex-1 p-6 bg-muted/30 overflow-auto">
          <div className="border-2 border-dashed border-muted-foreground/30 rounded-lg min-h-[600px] flex flex-col items-center justify-center text-muted-foreground">
            <MousePointerSquare className="h-16 w-16 mb-4 opacity-50" />
            <h2 className="text-xl font-medium mb-1">Workflow Canvas</h2>
            <p className="text-sm">Drag triggers and actions from the left panel to build your workflow.</p>
            <p className="text-xs mt-2">(Full drag-and-drop functionality to be implemented)</p>
          </div>
        </main>
      </div>
    </div>
  );
}
