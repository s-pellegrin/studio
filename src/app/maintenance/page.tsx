
'use client';

import { useState, useMemo, useEffect } from 'react';
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
} from '@/components/ui/dropdown-menu';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  PlusCircle,
  Search,
  MoreHorizontal,
  Wrench,
  Users,
  CalendarClock,
  FileText,
  Filter,
  Settings2,
} from 'lucide-react';
import { format } from 'date-fns';
import type { MaintenanceRequest } from './data';
import { initialMaintenanceRequests } from './data';

const getPriorityBadgeVariant = (priority: MaintenanceRequest['priority']): 'default' | 'secondary' | 'destructive' | 'outline' => {
  switch (priority) {
    case 'Urgent':
      return 'destructive';
    case 'High':
      return 'default'; // Consider a more distinct 'warning' color if theme allows
    case 'Routine':
      return 'secondary';
    case 'Low':
      return 'outline';
    default:
      return 'outline';
  }
};

const getStatusBadgeVariant = (status: MaintenanceRequest['status']): 'default' | 'secondary' | 'destructive' | 'outline' => {
  switch (status) {
    case 'New':
      return 'secondary';
    case 'In Progress':
      return 'default'; // Primary color
    case 'Completed':
      return 'default'; // Visually distinct green if possible, or rely on text
    case 'Cancelled':
      return 'destructive'; // Muted destructive
    default:
      return 'outline';
  }
};


export default function MaintenancePage() {
  const [activeTab, setActiveTab] = useState('work-orders');
  const [requests, setRequests] = useState<MaintenanceRequest[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string | 'all'>('all');
  const [filterPriority, setFilterPriority] = useState<string | 'all'>('all');
  const [filterProperty, setFilterProperty] = useState<string | 'all'>('all');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setRequests(initialMaintenanceRequests);
    setMounted(true);
  }, []);

  const uniqueProperties = useMemo(() => {
    if (!mounted) return [];
    const properties = new Set(requests.map(r => r.propertyId));
    return ['all', ...Array.from(properties)];
  }, [requests, mounted]);

  const statusOptions: ('all' | MaintenanceRequest['status'])[] = ['all', 'New', 'In Progress', 'Completed', 'Cancelled'];
  const priorityOptions: ('all' | MaintenanceRequest['priority'])[] = ['all', 'Urgent', 'High', 'Routine', 'Low'];

  const filteredRequests = useMemo(() => {
    if (!mounted) return [];
    return requests.filter(req => {
      const matchesSearchTerm = req.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                req.propertyId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                (req.unitId && req.unitId.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesStatus = filterStatus === 'all' || req.status === filterStatus;
      const matchesPriority = filterPriority === 'all' || req.priority === filterPriority;
      const matchesProperty = filterProperty === 'all' || req.propertyId === filterProperty;
      return matchesSearchTerm && matchesStatus && matchesPriority && matchesProperty;
    });
  }, [searchTerm, filterStatus, filterPriority, filterProperty, requests, mounted]);

  if (!mounted) {
    return <div className="container mx-auto py-8">Loading maintenance data...</div>;
  }

  const renderWorkOrdersTable = () => (
    <CardContent className="pt-6">
      <div className="mb-6 p-4 border rounded-lg shadow-sm bg-muted/30">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
          <div className="relative lg:col-span-2">
             <label htmlFor="search-work-orders" className="sr-only">Search work orders</label>
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="search-work-orders"
              type="text"
              placeholder="Search by description, property, unit..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div>
            <label htmlFor="filter-status-wo" className="text-sm font-medium">Status</label>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger id="filter-status-wo"><SelectValue /></SelectTrigger>
              <SelectContent>
                {statusOptions.map(status => (
                  <SelectItem key={status} value={status}>{status === 'all' ? 'All Statuses' : status}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label htmlFor="filter-priority-wo" className="text-sm font-medium">Priority</label>
            <Select value={filterPriority} onValueChange={setFilterPriority}>
              <SelectTrigger id="filter-priority-wo"><SelectValue /></SelectTrigger>
              <SelectContent>
                {priorityOptions.map(priority => (
                  <SelectItem key={priority} value={priority}>{priority === 'all' ? 'All Priorities' : priority}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="lg:col-span-2">
            <label htmlFor="filter-property-wo" className="text-sm font-medium">Property</label>
            <Select value={filterProperty} onValueChange={setFilterProperty}>
              <SelectTrigger id="filter-property-wo"><SelectValue /></SelectTrigger>
              <SelectContent>
                {uniqueProperties.map(prop => (
                  <SelectItem key={prop} value={prop}>{prop === 'all' ? 'All Properties' : prop}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="lg:col-span-2 flex items-end">
            <Button variant="outline" className="w-full lg:w-auto"><Filter className="mr-2 h-4 w-4" /> Advanced Filters</Button>
          </div>
        </div>
      </div>

      <div className="text-sm text-muted-foreground mb-2">
        {filteredRequests.length} work order(s) found.
      </div>

      <div className="overflow-x-auto border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Request ID</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Property / Unit</TableHead>
              <TableHead>Reported</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Assigned To</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRequests.length > 0 ? (
              filteredRequests.map((req) => (
                <TableRow key={req.id}>
                  <TableCell className="font-medium text-primary hover:underline cursor-pointer">{req.id}</TableCell>
                  <TableCell>{req.description}</TableCell>
                  <TableCell>{req.propertyId}{req.unitId ? ` - ${req.unitId}` : ''}</TableCell>
                  <TableCell>{format(new Date(req.reportedDate), 'MM/dd/yyyy')}</TableCell>
                  <TableCell>
                    <Badge
                      variant={getStatusBadgeVariant(req.status)}
                      className={`whitespace-nowrap ${req.status === 'Completed' ? 'bg-green-500 hover:bg-green-600 text-white' : ''}`}
                    >
                      {req.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getPriorityBadgeVariant(req.priority)} className="whitespace-nowrap">
                      {req.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>{req.assignedTo || <span className="text-xs text-muted-foreground italic">Unassigned</span>}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Edit Work Order</DropdownMenuItem>
                        <DropdownMenuItem>Assign Vendor/Team</DropdownMenuItem>
                        {req.status !== 'Completed' && req.status !== 'Cancelled' && <DropdownMenuItem>Mark as Completed</DropdownMenuItem>}
                        {req.status !== 'Cancelled' && <DropdownMenuItem>Cancel Work Order</DropdownMenuItem>}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Log Communication</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center text-muted-foreground">
                  No work orders found matching your criteria.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </CardContent>
  );

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold flex items-center gap-2"><Wrench className="h-8 w-8 text-primary"/>Maintenance Hub</h1>
        <div className="flex items-center gap-2 flex-wrap">
          <Button>
            <PlusCircle className="mr-2 h-5 w-5" /> New Work Order
          </Button>
           <Button variant="outline">
            <Settings2 className="mr-2 h-4 w-4" /> Maintenance Settings
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-6">
          <TabsTrigger value="work-orders">Work Orders</TabsTrigger>
          <TabsTrigger value="tenant-requests">Tenant Requests</TabsTrigger>
          <TabsTrigger value="vendors">Vendors</TabsTrigger>
          <TabsTrigger value="preventive-maintenance">Preventive Maintenance</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="work-orders">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Manage Work Orders</CardTitle>
              <CardDescription>Track and manage all ongoing and completed maintenance tasks.</CardDescription>
            </CardHeader>
            {renderWorkOrdersTable()}
          </Card>
        </TabsContent>

        <TabsContent value="tenant-requests">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Users className="h-5 w-5 text-primary" /> Tenant Maintenance Requests</CardTitle>
              <CardDescription>View and process maintenance requests submitted by tenants.</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              {/* Can reuse renderWorkOrdersTable or create a specific one for requests */}
              <p className="text-muted-foreground">Tenant request portal and listing will be displayed here. Currently showing all work orders as placeholder.</p>
              {renderWorkOrdersTable()}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vendors">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Users className="h-5 w-5 text-primary" /> Vendor Management</CardTitle>
              <CardDescription>Manage your list of approved vendors, track their performance and insurance.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mt-4">Vendor directory, contract management, and communication logs will be available here. This section is under development.</p>
              {/* Placeholder for vendor list or management tools */}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preventive-maintenance">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><CalendarClock className="h-5 w-5 text-primary" /> Preventive Maintenance</CardTitle>
              <CardDescription>Schedule and track routine maintenance tasks to keep properties in top condition.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mt-4">Preventive maintenance schedules, task assignments, and completion tracking will be available here. This section is under development.</p>
              {/* Placeholder for PM scheduling tools */}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><FileText className="h-5 w-5 text-primary" /> Maintenance Reports</CardTitle>
              <CardDescription>Access detailed reports on maintenance costs, history, and efficiency.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mt-4">
                Generate and view various maintenance-related reports. For detailed reporting options, please visit the main
                <Link href="/reports/maintenance" className="text-primary hover:underline"> Maintenance Reports page</Link>.
              </p>
              {/* Placeholder for quick reports or links */}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

