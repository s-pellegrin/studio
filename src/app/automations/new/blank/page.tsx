
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, MousePointerSquareDashed, Zap, Play, Settings2, Save, TestTube2, MessageSquare, Clock, Users, FileText, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { useSidebar } from '@/components/ui/sidebar';
import { useEffect, useState, type CSSProperties, useCallback, useRef } from 'react';
import { DndContext, DragOverlay, useDraggable, useDroppable, type DragEndEvent, type Active, PointerSensor, useSensor, useSensors, rectIntersection } from '@dnd-kit/core';
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
  const [canvasRect, setCanvasRect] = useState<DOMRect | null>(null); // State for canvas rect
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
    if (node) {
        // Update canvasRect whenever the node is set or changes
        // This ensures canvasRect in state is kept in sync with the measured rect
        setCanvasRect(node.getBoundingClientRect());
    }
  }, [setDroppableNodeRef]);


  useEffect(() => {
    // Keep the canvasRect state updated if the droppableCanvasRect (from the hook) changes
    // This is a fallback in case direct ref update in combinedCanvasRef isn't enough or for resize
    if (droppableCanvasRect) {
      setCanvasRect(droppableCanvasRect);
    }
  }, [droppableCanvasRect]);


  const handleDragStart = (event: { active: Active }) => {
    console.log('[DragStart] Event:', event);
    if (event.active.data.current?.isPaletteItem) {
      const activeItem = event.active.data.current as PaletteItem;
      setActiveDragItem(activeItem);
      console.log('[DragStart] Active palette item:', activeItem);
    } else {
      console.log('[DragStart] Active item is not a palette item:', event.active.data.current);
    }
  };
  
  const handleDragEnd = useCallback((event: DragEndEvent) => {
    console.log('[DragEnd] Event:', event);
    setActiveDragItem(null);
    const { active, over } = event;

    console.log('[DragEnd] Active item:', active);
    console.log('[DragEnd] Over item:', over);
    console.log('[DragEnd] Current canvasRect (state):', canvasRect);
    console.log('[DragEnd] Current droppableCanvasRect (from useDroppable hook):', droppableCanvasRect);


    if (over?.id === 'workflow-canvas-droppable' && active.data.current?.isPaletteItem && canvasScrollContainerRef.current) {
      console.log('[DragEnd] Conditions met: Dropping onto canvas from palette.');
      const draggedItemData = active.data.current as PaletteItem;
      const itemRect = active.rect.current.translated; 

      // Prioritize droppableCanvasRect from the hook as it's directly from dnd-kit's measurement
      // Fallback to canvasRect (state) if droppableCanvasRect isn't available for some reason
      const currentCnvRect = droppableCanvasRect || canvasRect;

      if (itemRect && currentCnvRect) {
        console.log('[DragEnd] itemRect (dragged item viewport rect):', itemRect);
        console.log('[DragEnd] currentCnvRect (droppable canvas viewport rect):', currentCnvRect);

        const canvasScrollX = canvasScrollContainerRef.current.scrollLeft;
        const canvasScrollY = canvasScrollContainerRef.current.scrollTop;
        console.log('[DragEnd] Canvas ScrollX:', canvasScrollX, 'ScrollY:', canvasScrollY);
        
        const dropX = itemRect.left - currentCnvRect.left + canvasScrollX;
        const dropY = itemRect.top - currentCnvRect.top + canvasScrollY;
        
        console.log('[DragEnd] Calculated dropX:', dropX, 'dropY:', dropY);

        const newItem: WorkflowCanvasItem = {
          ...draggedItemData,
          canvasId: `canvas-${draggedItemData.id}-${Date.now()}-${Math.random().toString(36).substring(2,7)}`,
          x: dropX,
          y: dropY,
        };
        console.log('[DragEnd] New item to add:', newItem);
  
        const isFirstItem = workflowItems.length === 0;
        setWorkflowItems((prevItems) => {
          const updated = [...prevItems, newItem];
          console.log('[DragEnd] Updated workflowItems (inside setWorkflowItems):', updated);
          return updated;
        });
        console.log('[DragEnd] workflowItems length after set (outside setWorkflowItems):', workflowItems.length + 1); // +1 because state update is async

        if (isFirstItem && canvasScrollContainerRef.current) {
          console.log('[DragEnd] First item dropped. Attempting to center.');
          const itemWidth = 250; 
          const itemHeight = 100; 
          
          const viewportWidth = canvasScrollContainerRef.current.clientWidth;
          const viewportHeight = canvasScrollContainerRef.current.clientHeight;
          console.log('[DragEnd] Viewport W:', viewportWidth, 'H:', viewportHeight);
  
          const targetScrollLeft = newItem.x + (itemWidth / 2) - (viewportWidth / 2);
          const targetScrollTop = newItem.y + (itemHeight / 2) - (viewportHeight / 2);
          console.log('[DragEnd] Target ScrollL:', targetScrollLeft, 'ScrollT:', targetScrollTop);
          
          canvasScrollContainerRef.current.scrollTo({
            left: Math.max(0, targetScrollLeft),
            top: Math.max(0, targetScrollTop),
            behavior: 'smooth',
          });
          console.log('[DragEnd] ScrollTo called.');
        }
      } else {
        console.warn("[DragEnd] Could not get itemRect or currentCnvRect. Drop aborted.", {itemRect, currentCnvRect});
      }
    } else {
      console.log('[DragEnd] Drop conditions not met or not over canvas.');
      console.log('  Is over?.id === workflow-canvas-droppable?', over?.id === 'workflow-canvas-droppable', '(Actual over.id:', over?.id, ')');
      console.log('  Is active.data.current?.isPaletteItem?', !!active.data.current?.isPaletteItem);
      console.log('  Does canvasScrollContainerRef.current exist?', !!canvasScrollContainerRef.current);
    }
  }, [canvasRect, workflowItems, droppableCanvasRect]);

  return (
    <DndContext 
        onDragStart={handleDragStart} 
        onDragEnd={handleDragEnd} 
        sensors={sensors} 
        collisionDetection={rectIntersection} // Changed collision strategy
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
            ref={combinedCanvasRef} // This ref is used by useDroppable and canvasScrollContainerRef
            className="flex-1 p-6 bg-muted/30 overflow-auto relative" 
            style={{ minHeight: '600px' }} 
            id="workflow-canvas-droppable" // Ensure this ID matches useDroppable and over.id check
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

