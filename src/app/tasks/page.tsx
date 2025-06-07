
'use client';

import { useState, useMemo, useEffect } from 'react';
import type { NextPage } from 'next';
import Link from 'next/link';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import {
  PlusCircle,
  Search,
  MoreHorizontal,
  ListFilter,
  CalendarDays,
  User,
  Link2,
  ChevronDown,
  View,
  Edit3,
  Trash2,
  CheckCircle,
} from 'lucide-react';
import { format, isPast } from 'date-fns';
import type { Task } from './data';
import { initialTasks } from './data';

const getPriorityBadgeVariant = (priority: Task['priority']): 'default' | 'secondary' | 'destructive' | 'outline' => {
  switch (priority) {
    case 'High':
      return 'destructive';
    case 'Medium':
      return 'default'; // Or another distinct color if primary is overused
    case 'Low':
      return 'secondary';
    default:
      return 'outline';
  }
};

const getStatusBadgeVariant = (status: Task['status'], dueDate: string): 'default' | 'secondary' | 'destructive' | 'outline' => {
  if (status !== 'Completed' && isPast(new Date(dueDate)) && new Date(dueDate).setHours(0,0,0,0) !== new Date().setHours(0,0,0,0)) {
    return 'destructive'; // Overdue takes precedence if not completed
  }
  switch (status) {
    case 'Completed':
      return 'default'; // Use a success-like color, e.g., bg-green-500, but we'll stick to variants for now
    case 'In Progress':
      return 'secondary';
    case 'Pending':
      return 'outline';
    case 'Overdue':
        return 'destructive';
    default:
      return 'outline';
  }
};


const TasksPage: NextPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string | 'all'>('all');
  const [filterPriority, setFilterPriority] = useState<string | 'all'>('all');
  const [filterAssignedTo, setFilterAssignedTo] = useState<string | 'all'>('all');
  const [selectedTasks, setSelectedTasks] = useState<Set<string>>(new Set());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Update task status to 'Overdue' if applicable
    const updatedTasks = initialTasks.map(task => {
      if (task.status !== 'Completed' && isPast(new Date(task.dueDate)) && new Date(task.dueDate).setHours(0,0,0,0) !== new Date().setHours(0,0,0,0) ) {
        return { ...task, status: 'Overdue' as Task['status'] };
      }
      return task;
    });
    setTasks(updatedTasks);
    setMounted(true);
  }, []);


  const uniqueAssignees = useMemo(() => {
    if (!mounted) return [];
    const assignees = new Set(tasks.map(t => t.assignedTo).filter(Boolean) as string[]);
    return ['all', ...Array.from(assignees)];
  }, [tasks, mounted]);

  const statusOptions: ('all' | Task['status'])[] = ['all', 'Pending', 'In Progress', 'Completed', 'Overdue'];
  const priorityOptions: ('all' | Task['priority'])[] = ['all', 'High', 'Medium', 'Low'];

  const filteredTasks = useMemo(() => {
    if (!mounted) return [];
    return tasks.filter(task => {
      const matchesSearchTerm = task.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === 'all' || task.status === filterStatus;
      const matchesPriority = filterPriority === 'all' || task.priority === filterPriority;
      const matchesAssignedTo = filterAssignedTo === 'all' || task.assignedTo === filterAssignedTo;
      return matchesSearchTerm && matchesStatus && matchesPriority && matchesAssignedTo;
    });
  }, [searchTerm, filterStatus, filterPriority, filterAssignedTo, tasks, mounted]);

  const handleSelectAll = (checked: boolean | 'indeterminate') => {
    if (checked === true) {
      setSelectedTasks(new Set(filteredTasks.map(task => task.id)));
    } else {
      setSelectedTasks(new Set());
    }
  };

  const handleSelectItem = (taskId: string, checked: boolean) => {
    const newSelectedItems = new Set(selectedTasks);
    if (checked) {
      newSelectedItems.add(taskId);
    } else {
      newSelectedItems.delete(taskId);
    }
    setSelectedTasks(newSelectedItems);
  };

  const isAllSelected = filteredTasks.length > 0 && selectedTasks.size === filteredTasks.length;
  const isIndeterminate = selectedTasks.size > 0 && selectedTasks.size < filteredTasks.length;
  
  if (!mounted) {
    return <div className="container mx-auto py-8">Loading tasks...</div>;
  }

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl font-bold">Task Management</h1>
        <Button>
          <PlusCircle className="mr-2 h-5 w-5" /> Add New Task
        </Button>
      </div>

      <div className="p-4 border rounded-lg shadow bg-card space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="relative lg:col-span-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search tasks by description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger><SelectValue placeholder="Filter by Status" /></SelectTrigger>
            <SelectContent>
              {statusOptions.map(status => (
                <SelectItem key={status} value={status}>{status === 'all' ? 'All Statuses' : status}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={filterPriority} onValueChange={setFilterPriority}>
            <SelectTrigger><SelectValue placeholder="Filter by Priority" /></SelectTrigger>
            <SelectContent>
              {priorityOptions.map(priority => (
                <SelectItem key={priority} value={priority}>{priority === 'all' ? 'All Priorities' : priority}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-4">
           <Select value={filterAssignedTo} onValueChange={setFilterAssignedTo}>
            <SelectTrigger className="w-full md:w-[200px]"><SelectValue placeholder="Filter by Assignee" /></SelectTrigger>
            <SelectContent>
              {uniqueAssignees.map(assignee => (
                <SelectItem key={assignee} value={assignee}>{assignee === 'all' ? 'All Assignees' : assignee || 'Unassigned'}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline"><ListFilter className="mr-2 h-4 w-4" /> More Filters</Button>
        </div>
      </div>
      
      <div className="text-sm text-muted-foreground">
        {selectedTasks.size > 0
          ? `${selectedTasks.size} of ${filteredTasks.length} task(s) selected`
          : `${filteredTasks.length} task(s) found`}
      </div>

      <div className="overflow-x-auto bg-card rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox
                  checked={isAllSelected || (isIndeterminate ? 'indeterminate' : false)}
                  onCheckedChange={handleSelectAll}
                  aria-label="Select all tasks"
                />
              </TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="w-[120px]">Due Date</TableHead>
              <TableHead className="w-[100px]">Priority</TableHead>
              <TableHead className="w-[120px]">Status</TableHead>
              <TableHead className="w-[150px]">Assigned To</TableHead>
              <TableHead className="w-[180px]">Related To</TableHead>
              <TableHead className="w-[80px] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task) => (
                <TableRow key={task.id} data-state={selectedTasks.has(task.id) ? 'selected' : ''}>
                  <TableCell>
                    <Checkbox
                      checked={selectedTasks.has(task.id)}
                      onCheckedChange={(checked) => handleSelectItem(task.id, !!checked)}
                      aria-label={`Select task ${task.description}`}
                    />
                  </TableCell>
                  <TableCell className="font-medium">
                    <Link href={`/tasks/${task.id}`} className="hover:underline text-primary">
                      {task.description}
                    </Link>
                  </TableCell>
                  <TableCell>{format(new Date(task.dueDate), 'MM/dd/yyyy')}</TableCell>
                  <TableCell>
                    <Badge variant={getPriorityBadgeVariant(task.priority)}>
                      {task.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(task.status, task.dueDate)}
                           className={task.status === 'Completed' ? 'bg-green-500 hover:bg-green-600 text-white' : 
                                      getStatusBadgeVariant(task.status, task.dueDate) === 'destructive' ? 'bg-red-500 hover:bg-red-600 text-white' : ''}
                    >
                      {task.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{task.assignedTo || <span className="text-muted-foreground italic">Unassigned</span>}</TableCell>
                  <TableCell>{task.relatedTo || <span className="text-muted-foreground italic">None</span>}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <View className="mr-2 h-4 w-4" /> View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit3 className="mr-2 h-4 w-4" /> Edit Task
                        </DropdownMenuItem>
                         {task.status !== 'Completed' && (
                          <DropdownMenuItem>
                            <CheckCircle className="mr-2 h-4 w-4" /> Mark as Completed
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10">
                          <Trash2 className="mr-2 h-4 w-4" /> Delete Task
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center text-muted-foreground">
                  No tasks found matching your criteria.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TasksPage;

    