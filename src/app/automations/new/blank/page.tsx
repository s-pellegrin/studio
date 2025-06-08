
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card'; // CardDescription, CardHeader, CardTitle removed as not used for DraggableItem
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, MousePointerSquareDashed, Zap, Play, Settings2, Save, TestTube2, MessageSquare, Clock, Users, FileText, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { useSidebar } from '@/components/ui/sidebar';
import { useEffect, useState, type CSSProperties } from 'react';
import { DndContext, DragOverlay, useDraggable, useDroppable, type DragEndEvent, type Active, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { restrictToWindowEdges } from '@dnd-kit/modifiers';

interface PaletteItem {
  id: string;
  type: 'trigger' | 'action';
  icon: React.ElementType;
  name: string;
  description: string;
}

interface WorkflowCanvasItem extends PaletteItem {
  x: number;
  y: number;
  canvasId: string;
}

const DraggablePaletteItem = ({ item, isOverlay }: { item: PaletteItem; isOverlay?: boolean }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: item.id,
    data: item, // Pass the whole item data
  });

  const style: CSSProperties = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        zIndex: isDragging || isOverlay ? 100 : undefined,
        opacity: isDragging && !isOverlay ? 0.5 : 1,
      }
    : { zIndex: isOverlay ? 100 : undefined };

  return (
    <Card 
      ref={setNodeRef} 
      style={style} 
      {...attributes} 
      {...listeners}
      className={`p-3 cursor-grab hover:shadow-md active:cursor-grabbing active:shadow-lg transition-shadow ${isOverlay ? 'ring-2 ring-primary shadow-2xl' : ''}`}
    >
      <div className="flex items-center gap-2 mb-1">
        <item.icon className="h-5 w-5 text-primary" />
        <span className="font-medium text-sm">{item.name}</span>
      </div>
      <p className="text-xs text-muted-foreground">{item.description}</p>
    </Card>
  );
};

const CanvasItem = ({ item }: { item: WorkflowCanvasItem }) => (
  <Card 
    style={{ position: 'absolute', left: item.x, top: item.y, width: '250px' }} // Example fixed width
    className="p-3 shadow-md cursor-default" // Not draggable on canvas for now
  >
    <div className="flex items-center gap-2 mb-1">
      <item.icon className="h-5 w-5 text-primary" />
      <span className="font-medium text-sm">{item.name}</span>
    </div>
    <p className="text-xs text-muted-foreground">{item.description}</p>
  </Card>
);


export default function AutomationCanvasPage() {
  const { setOpen, isMobile, open: sidebarOpen } = useSidebar();
  const [activeDragItem, setActiveDragItem] = useState<PaletteItem | null>(null);
  const [workflowItems, setWorkflowItems] = useState<WorkflowCanvasItem[]>([]);
  const [canvasRect, setCanvasRect] = useState<DOMRect | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );
  
  useEffect(() => {
    if (isMobile === false && sidebarOpen) { // Explicitly check for false to avoid undefined case
      setOpen(false);
    }
  }, [isMobile, sidebarOpen, setOpen]);

  const triggers: PaletteItem[] = [
    { id: 'trigger-email', type: 'trigger', name: 'New Email Received', description: 'Starts when a new email matches criteria.', icon: MessageSquare },
    { id: 'trigger-schedule', type: 'trigger', name: 'Scheduled Time', description: 'Starts at a specific time or interval.', icon: Clock },
    { id: 'trigger-tenant', type: 'trigger', name: 'Tenant Action', description: 'e.g., Lease signed, payment made.', icon: Users },
    { id: 'trigger-webhook', type: 'trigger', name: 'Webhook Received', description: 'Starts when an external service sends data.', icon: Zap },
  ];

  const actions: PaletteItem[] = [
    { id: 'action-send-email', type: 'action', name: 'Send Email', description: 'Compose and send an email.', icon: MessageSquare },
    { id: 'action-create-task', type: 'action', name: 'Create Task', description: 'Add a new task to the system.', icon: FileText },
    { id: 'action-update-record', type: 'action', name: 'Update Record', description: 'Modify data in a property, tenant, etc.', icon: Settings2 },
    { id: 'action-wait', type: 'action', name: 'Wait', description: 'Pause the workflow for a set duration.', icon: Clock },
    { id: 'action-condition', type: 'action', name: 'Condition (If/Else)', description: 'Branch workflow based on criteria.', icon: AlertTriangle },
    { id: 'action-call-api', type: 'action', name: 'Call API', description: 'Make a request to an external API.', icon: Play },
  ];

  const { setNodeRef: canvasDroppableRef, rect: droppableCanvasRect } = useDroppable({
    id: 'workflow-canvas-droppable',
  });

  useEffect(() => {
    if(droppableCanvasRect) {
      // This rect is relative to the viewport, which is what we need for clientX/Y calculations
      setCanvasRect(droppableCanvasRect);
    }
  }, [droppableCanvasRect]);


  const handleDragStart = (event: { active: Active }) => {
    const activeItem = triggers.find(t => t.id === event.active.id) || actions.find(a => a.id === event.active.id);
    if (activeItem) {
      setActiveDragItem(activeItem);
    }
  };
  
  const handleDragEnd = (event: DragEndEvent) => {
    setActiveDragItem(null);
    const { active, over, delta } = event;
  
    if (over && over.id === 'workflow-canvas-droppable' && active.data.current && canvasRect) {
      const draggedItemData = active.data.current as PaletteItem;
      
      // Get the drop position relative to the canvasRect origin
      // clientX/Y could be used here if sensors provide it, or use transform/delta
      // Assuming we use the initial position of the drag overlay, adjusted by delta, and then relative to canvas
      // This needs refinement based on how PointerSensor provides coordinates.
      // For simplicity, let's assume delta gives us the position on drop relative to start.
      // A more robust way: use event.activatorEvent which can be PointerEvent
      
      let dropX = 0;
      let dropY = 0;

      if (event.activatorEvent instanceof PointerEvent) {
          dropX = event.activatorEvent.clientX - canvasRect.left;
          dropY = event.activatorEvent.clientY - canvasRect.top;
      } else {
         // Fallback or different logic if not a pointer event
         // This might be an approximation
         // The exact position depends on where the DragOverlay was rendered and how transform is applied
         // For now, let's use a simpler delta approach.
         // This will place the item based on its drag movement relative to its start, which might not be ideal.
         // A better way is to capture pointer position on drop.
         // Let's assume activatorEvent provides coordinates
      }


      // Get the position where the item was dropped within the canvas element
      // Need current pointer position from the event if possible.
      // `event.activatorEvent` might be a PointerEvent
      let finalX = 0;
      let finalY = 0;
      if (event.activatorEvent && 'clientX' in event.activatorEvent && 'clientY' in event.activatorEvent) {
        finalX = event.activatorEvent.clientX - canvasRect.left;
        finalY = event.activatorEvent.clientY - canvasRect.top;
      } else {
        // Fallback if PointerEvent is not available (e.g. keyboard) - won't happen with PointerSensor
        // Or, calculate based on where the drag started and the delta.
        // For simplicity, if pointer not available, place at a default spot or ignore.
        console.warn("Could not determine drop position accurately, using delta.");
        finalX = delta.x; // This isn't relative to canvas, needs adjustment
        finalY = delta.y;
      }


      setWorkflowItems((prevItems) => [
        ...prevItems,
        { 
          ...draggedItemData, 
          canvasId: `canvas-${draggedItemData.id}-${new Date().getTime()}`,
          x: finalX - (activeDragItem ? 125 : 0), // Approximate center of a 250px wide card
          y: finalY - (activeDragItem ? 50 : 0),  // Approximate center of a 100px tall card
        },
      ]);
    }
  };

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd} sensors={sensors} modifiers={[restrictToWindowEdges]}>
      <div className="flex flex-col h-[calc(100vh-4rem)]"> {/* Adjust for main header height */}
        {/* Workflow Builder Header */}
        <header className="sticky top-16 z-30 flex items-center justify-between p-3 border-b bg-background/95 backdrop-blur-sm">
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
                    <DraggablePaletteItem key={trigger.id} item={trigger} />
                  ))}
                </div>
              </div>
              <Separator className="my-3" />
              <div className="p-4">
                <h2 className="text-base font-semibold mb-3">Actions</h2>
                <div className="space-y-2">
                  {actions.map(action => (
                    <DraggablePaletteItem key={action.id} item={action} />
                  ))}
                </div>
              </div>
            </ScrollArea>
          </aside>

          {/* Workflow Canvas (Main Area) */}
          <main 
            ref={canvasDroppableRef} 
            className="flex-1 p-6 bg-muted/30 overflow-auto relative" // Added relative for positioning canvas items
          >
            {workflowItems.length === 0 ? (
              <div className="border-2 border-dashed border-muted-foreground/30 rounded-lg min-h-[600px] flex flex-col items-center justify-center text-muted-foreground">
                <MousePointerSquareDashed className="h-16 w-16 mb-4 opacity-50" />
                <h2 className="text-xl font-medium mb-1">Workflow Canvas</h2>
                <p className="text-sm">Drag triggers and actions from the left panel to build your workflow.</p>
              </div>
            ) : (
              <div className="min-h-[600px] w-full h-full relative"> {/* Ensure canvas area takes space */}
                {workflowItems.map(item => (
                  <CanvasItem key={item.canvasId} item={item} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
      <DragOverlay dropAnimation={null}>
        {activeDragItem ? <DraggablePaletteItem item={activeDragItem} isOverlay /> : null}
      </DragOverlay>
    </DndContext>
  );
}
