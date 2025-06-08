
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, MousePointerSquareDashed, Zap, Play, Settings2, Save, TestTube2, MessageSquare, Clock, Users, FileText, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { useSidebar } from '@/components/ui/sidebar';
import { useEffect, useState, type CSSProperties, useCallback, useRef } from 'react';
import { DndContext, DragOverlay, useDraggable, useDroppable, type DragEndEvent, type Active, PointerSensor, useSensor, useSensors, closestCenter } from '@dnd-kit/core';
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
  canvasId: string; // Unique ID for the item on the canvas
}

const DraggablePaletteItem = ({ item, isOverlay }: { item: PaletteItem; isOverlay?: boolean }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: item.id,
    data: { ...item, isPaletteItem: true }, 
  });

  const style: CSSProperties = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        zIndex: isDragging || isOverlay ? 1000 : undefined, 
        opacity: isDragging && !isOverlay ? 0.5 : 1,
        cursor: 'grabbing',
      }
    : { 
        zIndex: isOverlay ? 1000 : undefined,
        cursor: 'grab',
      };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`p-3 hover:shadow-md active:shadow-lg transition-shadow ${isOverlay ? 'ring-2 ring-primary shadow-2xl bg-card' : 'bg-card'}`}
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
    style={{ position: 'absolute', left: item.x, top: item.y, width: '250px' }}
    className="p-3 shadow-md cursor-default"
  >
    <div className="flex items-center gap-2 mb-1">
      <item.icon className="h-5 w-5 text-primary" />
      <span className="font-medium text-sm">{item.name}</span>
    </div>
    <p className="text-xs text-muted-foreground">{item.description}</p>
  </Card>
);


export default function AutomationCanvasPage() {
  const { setOpen: setAppSidebarOpen, isMobile, open: appSidebarOpen } = useSidebar();
  const [activeDragItem, setActiveDragItem] = useState<PaletteItem | null>(null);
  const [workflowItems, setWorkflowItems] = useState<WorkflowCanvasItem[]>([]);
  const [canvasRect, setCanvasRect] = useState<DOMRect | null>(null);
  const canvasScrollContainerRef = useRef<HTMLDivElement | null>(null);


  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  useEffect(() => {
    if (isMobile === false && appSidebarOpen) {
      setAppSidebarOpen(false);
    }
  }, [isMobile, appSidebarOpen, setAppSidebarOpen]);

  const triggers: PaletteItem[] = [
    { id: 'trigger-form-filled', type: 'trigger', name: 'Form Submitted', description: 'Starts when a specific form is filled.', icon: FileText },
    { id: 'trigger-email', type: 'trigger', name: 'New Email Received', description: 'Starts when a new email matches criteria.', icon: MessageSquare },
    { id: 'trigger-schedule', type: 'trigger', name: 'Scheduled Time', description: 'Starts at a specific time or interval.', icon: Clock },
    { id: 'trigger-tenant', type: 'trigger', name: 'Tenant Action', description: 'e.g., Lease signed, payment made.', icon: Users },
    { id: 'trigger-webhook', type: 'trigger', name: 'Webhook Received', description: 'Starts when an external service sends data.', icon: Zap },
  ];

  const actions: PaletteItem[] = [
    { id: 'action-send-to-ai', type: 'action', name: 'Send to AI Agent', description: 'Process data with an AI agent.', icon: Zap },
    { id: 'action-send-email', type: 'action', name: 'Send Email', description: 'Compose and send an email.', icon: MessageSquare },
    { id: 'action-create-task', type: 'action', name: 'Create Task', description: 'Add a new task to the system.', icon: FileText },
    { id: 'action-update-record', type: 'action', name: 'Update Record', description: 'Modify data in a property, tenant, etc.', icon: Settings2 },
    { id: 'action-wait', type: 'action', name: 'Wait', description: 'Pause the workflow for a set duration.', icon: Clock },
    { id: 'action-condition', type: 'action', name: 'Condition (If/Else)', description: 'Branch workflow based on criteria.', icon: AlertTriangle },
    { id: 'action-call-api', type: 'action', name: 'Call API', description: 'Make a request to an external API.', icon: Play },
  ];

  const { setNodeRef: setDroppableNodeRef, rect: droppableCanvasRect } = useDroppable({
    id: 'workflow-canvas-droppable',
  });

  const combinedCanvasRef = useCallback((node: HTMLDivElement | null) => {
    setDroppableNodeRef(node); 
    canvasScrollContainerRef.current = node; 
  }, [setDroppableNodeRef]);


  useEffect(() => {
    if (droppableCanvasRect) {
      setCanvasRect(droppableCanvasRect);
    }
  }, [droppableCanvasRect]);


  const handleDragStart = (event: { active: Active }) => {
    if (event.active.data.current?.isPaletteItem) {
      const activeItem = event.active.data.current as PaletteItem;
      setActiveDragItem(activeItem);
    }
  };
  
  const handleDragEnd = useCallback((event: DragEndEvent) => {
    setActiveDragItem(null);
    const { active, over } = event;
  
    if (over?.id === 'workflow-canvas-droppable' && active.data.current?.isPaletteItem && canvasRect && canvasScrollContainerRef.current) {
      const draggedItemData = active.data.current as PaletteItem;
      const itemRect = active.rect.current.translated;
      const scrollContainer = canvasScrollContainerRef.current;

      if (itemRect) {
        const canvasScrollX = scrollContainer.scrollLeft;
        const canvasScrollY = scrollContainer.scrollTop;

        const dropX = itemRect.left - canvasRect.left + canvasScrollX;
        const dropY = itemRect.top - canvasRect.top + canvasScrollY;
        
        const newItem: WorkflowCanvasItem = {
          ...draggedItemData,
          canvasId: `canvas-${draggedItemData.id}-${Date.now()}-${Math.random().toString(36).substring(2,7)}`,
          x: dropX,
          y: dropY,
        };
  
        const isFirstItem = workflowItems.length === 0;
        setWorkflowItems((prevItems) => [...prevItems, newItem]);
  
        if (isFirstItem) {
          // Estimate item dimensions for centering
          const itemWidth = 250; // Based on CanvasItem style
          // Estimate height: Icon(20) + Name(20) + Desc_lines * 14 + Padding(24)
          // A simple fixed estimate for now, can be improved
          const itemHeight = 100; 
          
          const viewportWidth = scrollContainer.clientWidth;
          const viewportHeight = scrollContainer.clientHeight;
  
          const targetScrollLeft = newItem.x + (itemWidth / 2) - (viewportWidth / 2);
          const targetScrollTop = newItem.y + (itemHeight / 2) - (viewportHeight / 2);
          
          scrollContainer.scrollTo({
            left: Math.max(0, targetScrollLeft),
            top: Math.max(0, targetScrollTop),
            behavior: 'smooth',
          });
        }
      } else {
        console.warn("DragEnd: Could not get translated rect for dragged item. Drop aborted.");
      }
    }
  }, [canvasRect, workflowItems]);

  return (
    <DndContext 
        onDragStart={handleDragStart} 
        onDragEnd={handleDragEnd} 
        sensors={sensors} 
        collisionDetection={closestCenter}
        modifiers={[restrictToWindowEdges]}
    >
      <div className="flex flex-col h-[calc(100vh-4rem)]">
        <header className="sticky top-16 z-30 flex items-center justify-between p-3 border-b bg-background/95 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <Link href="/automations" passHref>
              <Button variant="ghost" size="icon" aria-label="Back to Automations Hub">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-lg font-semibold">New Automation Workflow</h1>
              <p className="text-xs text-muted-foreground">Unsaved</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm"><TestTube2 className="mr-2 h-4 w-4"/> Test Workflow</Button>
            <Button size="sm"><Save className="mr-2 h-4 w-4"/> Save Workflow</Button>
          </div>
        </header>

        <div className="flex flex-1 overflow-hidden">
          <aside className="w-72 border-r bg-card p-0 flex flex-col">
            <ScrollArea className="flex-1">
              <div className="p-4">
                <h2 className="text-base font-semibold mb-3">Triggers</h2>
                <div className="space-y-3">
                  {triggers.map(trigger => (
                    <DraggablePaletteItem key={trigger.id} item={trigger} />
                  ))}
                </div>
              </div>
              <Separator className="my-3" />
              <div className="p-4">
                <h2 className="text-base font-semibold mb-3">Actions</h2>
                <div className="space-y-3">
                  {actions.map(action => (
                    <DraggablePaletteItem key={action.id} item={action} />
                  ))}
                </div>
              </div>
            </ScrollArea>
          </aside>

          <main
            ref={combinedCanvasRef}
            className="flex-1 p-6 bg-muted/30 overflow-auto relative" 
            style={{ minHeight: '600px' }} 
          >
            {workflowItems.length === 0 ? (
              <div className="border-2 border-dashed border-muted-foreground/30 rounded-lg h-full flex flex-col items-center justify-center text-muted-foreground">
                <MousePointerSquareDashed className="h-16 w-16 mb-4 opacity-50" />
                <h2 className="text-xl font-medium mb-1">Workflow Canvas</h2>
                <p className="text-sm">Drag triggers and actions from the left panel to build your workflow.</p>
              </div>
            ) : (
              <div className="w-full h-full relative"> 
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

    