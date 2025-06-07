
'use client';

import {
  CircleDollarSign,
  Wrench,
  ListChecks,
  FileClock,
  ShieldCheck,
  ShieldAlert,
  ArrowRight,
  Settings2,
  MoreHorizontal,
  Mail,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from 'recharts';
import { format } from 'date-fns'; // Added import

import type { Tenant } from './tenants/data';
import { initialTenants } from './tenants/data';
import type { MaintenanceRequest } from './maintenance/data';
import { initialMaintenanceRequests } from './maintenance/data';
import type { Task } from './tasks/data';
import { initialTasks } from './tasks/data';
import type { VendorPolicy } from './associations/data';
import { initialVendorPolicies } from './associations/data';
import { useState, useEffect } from 'react';


const isWithinNextNDays = (dateStr: string, days: number): boolean => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const targetDate = new Date(dateStr);
  const NDaysFromToday = new Date(today);
  NDaysFromToday.setDate(today.getDate() + days);
  return targetDate >= today && targetDate <= NDaysFromToday;
};

const isPastDate = (dateStr: string): boolean => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const targetDate = new Date(dateStr);
  return targetDate < today;
};

interface BalanceItem {
  id: string;
  name: string;
  propertyUnit: string;
  amount: number;
  currency: string;
}

interface DashboardTaskItem {
  id: string;
  title: string;
  age: string;
  details: string;
}

interface OverdueTaskItem {
  id: string;
  title: string;
  dueDate: string;
  propertyUnit: string;
}

interface ExpiringLeaseData {
  name: string;
  value: number;
}


export default function DashboardPage() {
  const [greeting, setGreeting] = useState('Good day');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting('Good morning');
    } else if (hour < 18) {
      setGreeting('Good afternoon');
    } else {
      setGreeting('Good evening');
    }
  }, []);

  // Outstanding Balances
  const outstandingBalancesData: BalanceItem[] = initialTenants
    .filter(t => t.rentStatus === 'Overdue')
    .slice(0, 5) // Show top 5
    .map(t => ({
      id: t.id,
      name: t.name,
      propertyUnit: `${t.property} - ${t.unit}`,
      amount: t.rentAmount || 275, // Using rentAmount if available, otherwise placeholder
      currency: 'HK$'
    }));
  const totalOutstandingBalance = initialTenants
    .filter(t => t.rentStatus === 'Overdue')
    .reduce((sum, item) => sum + (item.rentAmount || 0), 0);
  const totalOverdueTenants = initialTenants.filter(t => t.rentStatus === 'Overdue').length;

  // Tasks (Incoming Maintenance Requests)
  const incomingRequestsData: DashboardTaskItem[] = initialMaintenanceRequests
    .filter(m => m.status === 'New' || m.status === 'In Progress')
    .slice(0, 3) // Show top 3
    .map(m => {
      const reported = new Date(m.reportedDate);
      const today = new Date();
      const diffTime = Math.abs(today.getTime() - reported.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return {
        id: m.id,
        title: m.description,
        age: `${diffDays} day${diffDays === 1 ? '' : 's'} ago`,
        details: `Resident request | ${m.propertyId}${m.unitId ? ` - ${m.unitId}` : ''}`
      };
    });

  // Renters Insurance
  const totalTenants = initialTenants.length;
  const insuredTenants = initialTenants.filter(t => t.insuranceStatus === 'Active').length;
  const uninsuredTenants = totalTenants - insuredTenants;
  const rentersInsuranceChartData = [
    { name: 'Insured', value: insuredTenants, fill: 'hsl(var(--primary))' },
    { name: 'Uninsured', value: uninsuredTenants, fill: 'hsl(var(--destructive))' },
  ];
  // Mock for MSI/Third party breakdown for legend
  const msiPolicyCount = initialTenants.filter(t => t.insuranceStatus === 'Active').length; // Simplified for now
  const thirdPartyPolicyCount = 0;


  // Overdue Tasks
  const overdueTasksData: OverdueTaskItem[] = initialTasks
    .filter(t => isPastDate(t.dueDate) && t.status !== 'Completed')
    .slice(0, 2) // Show top 2
    .map(t => ({
      id: t.id,
      title: t.description,
      dueDate: format(new Date(t.dueDate), 'MM/dd/yyyy'), // Consistent date formatting
      propertyUnit: t.relatedTo || 'N/A'
    }));
  const totalOverdueTasks = initialTasks.filter(t => isPastDate(t.dueDate) && t.status !== 'Completed').length;


  // Expiring Leases
  const expiringLeases30Days = initialTenants.filter(t => isWithinNextNDays(t.leaseEndDate, 30)).length;
  const expiringLeases60Days = initialTenants.filter(t => isWithinNextNDays(t.leaseEndDate, 60) && !isWithinNextNDays(t.leaseEndDate, 30)).length;
  const expiringLeases90Days = initialTenants.filter(t => isWithinNextNDays(t.leaseEndDate, 90) && !isWithinNextNDays(t.leaseEndDate, 60)).length;
  
  const expiringLeasesChartData: ExpiringLeaseData[] = [
    { name: 'Not started', value: expiringLeases30Days > 0 ? Math.max(1, Math.floor(expiringLeases30Days * 0.6)) : 0 }, 
    { name: 'Offers', value: expiringLeases30Days > 0 ? Math.max(0, Math.floor(expiringLeases30Days * 0.2)) : 0 }, // Mock distribution
    { name: 'Renewals', value: expiringLeases30Days > 0 ? Math.max(0, Math.floor(expiringLeases30Days * 0.1)) : 0 },
    { name: 'Move-outs', value: expiringLeases30Days > 0 ? Math.max(0, Math.floor(expiringLeases30Days * 0.1)) : 0 },
  ];
  const totalExpiringLeases = expiringLeases30Days + expiringLeases60Days + expiringLeases90Days;


  // Expiring Renters Insurance
  const lapsedInsuranceCount = initialTenants.filter(t => t.insuranceStatus === 'Lapsed').length;
  // Placeholder counts for date ranges as we don't have insurance expiry dates
  const expiringInsurance30Days = initialTenants.filter(t => t.insuranceStatus === 'Active' && isWithinNextNDays(t.leaseEndDate, 30)).length; // Mock: using lease end date for now
  const expiringInsurance60Days = initialTenants.filter(t => t.insuranceStatus === 'Active' && isWithinNextNDays(t.leaseEndDate, 60) && !isWithinNextNDays(t.leaseEndDate, 30)).length;
  const expiringInsurance90Days = initialTenants.filter(t => t.insuranceStatus === 'Active' && isWithinNextNDays(t.leaseEndDate, 90) && !isWithinNextNDays(t.leaseEndDate, 60)).length;


  const COLORS = ['hsl(var(--primary))', 'hsl(var(--muted))', 'hsl(var(--destructive))', 'hsl(var(--accent))'];


  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">{greeting}, user!</h1>
        <Button variant="outline" size="sm">
          <Settings2 className="mr-2 h-4 w-4" /> Customize dashboard
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Outstanding Balances Card */}
        <Card className="lg:col-span-1 shadow-lg">
          <CardHeader>
            <CardTitle>Outstanding Balances - Rentals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-1">HK${totalOutstandingBalance.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
            <p className="text-sm text-muted-foreground mb-4">Outstanding balances</p>
            <div className="space-y-3">
              {outstandingBalancesData.map((item) => (
                <div key={item.id} className="flex justify-between items-center text-sm py-2 border-b last:border-b-0">
                  <div>
                    <p className="font-medium text-primary hover:underline cursor-pointer">{item.propertyUnit}</p>
                  </div>
                  <p>{item.currency}{item.amount.toFixed(2)}</p>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="text-xs text-muted-foreground justify-between">
            <span>Showing {Math.min(outstandingBalancesData.length, 5)} of {totalOverdueTenants}</span>
            <Link href="/accounting?filter=outstanding" className="text-primary hover:underline font-medium">
              View all +
            </Link>
          </CardFooter>
        </Card>

        {/* Tasks Card */}
        <Card className="lg:col-span-1 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle>Tasks</CardTitle>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>View All Tasks</DropdownMenuItem>
                <DropdownMenuItem>Create New Task</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="incoming" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="incoming">Incoming requests</TabsTrigger>
                <TabsTrigger value="assigned">Assigned to me</TabsTrigger>
              </TabsList>
              <TabsContent value="incoming">
                {incomingRequestsData.length > 0 ? (
                  <div className="space-y-3">
                    {incomingRequestsData.map(task => (
                      <div key={task.id} className="py-2 border-b last:border-b-0">
                        <p className="font-medium text-sm text-primary hover:underline cursor-pointer">{task.title}</p>
                        <p className="text-xs text-muted-foreground">{task.age} | {task.details}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-4">No incoming requests.</p>
                )}
              </TabsContent>
              <TabsContent value="assigned">
                 <p className="text-sm text-muted-foreground text-center py-4">No tasks assigned to you.</p>
              </TabsContent>
            </Tabs>
          </CardContent>
           <CardFooter className="text-xs text-muted-foreground justify-between">
            <span>Showing {incomingRequestsData.length} of {initialMaintenanceRequests.filter(m => m.status === 'New' || m.status === 'In Progress').length} in last month</span>
            <Link href="/maintenance" className="text-primary hover:underline font-medium">
              View all +
            </Link>
          </CardFooter>
        </Card>

        {/* Renters Insurance Card */}
        <Card className="lg:col-span-1 shadow-lg">
          <CardHeader>
            <CardTitle>Renters Insurance</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="w-full h-48 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={rentersInsuranceChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    innerRadius={60}
                    fill="#8884d8"
                    dataKey="value"
                    paddingAngle={2}
                  >
                    {rentersInsuranceChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} stroke={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-2xl font-bold">{totalTenants}</span>
                <span className="text-xs text-muted-foreground">Total</span>
              </div>
            </div>
            <div className="mt-4 w-full text-sm">
              <div className="font-medium mb-1">Insured</div>
              <div className="flex items-center justify-between text-muted-foreground text-xs ml-2">
                <span>MSI policy</span>
                <span>{msiPolicyCount}</span>
              </div>
              <div className="flex items-center justify-between text-muted-foreground text-xs ml-2">
                <span>Third Party</span>
                <span>{thirdPartyPolicyCount}</span>
              </div>
               <div className="font-medium mt-2 mb-1">Uninsured</div>
                <div className="flex items-center justify-between text-muted-foreground text-xs ml-2">
                  <span>Not insured</span>
                  <span>{uninsuredTenants}</span>
                </div>
            </div>
          </CardContent>
          <CardFooter className="text-xs text-muted-foreground justify-end">
            <Link href="/tenants?filter=insurance" className="text-primary hover:underline font-medium">
              View all +
            </Link>
          </CardFooter>
        </Card>

        {/* Overdue Tasks Card */}
         <Card className="lg:col-span-1 shadow-lg">
          <CardHeader>
            <CardTitle>Overdue Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="my-overdue" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="my-overdue">My overdue tasks</TabsTrigger>
                <TabsTrigger value="all-overdue">All overdue tasks</TabsTrigger>
              </TabsList>
              <TabsContent value="my-overdue">
                {overdueTasksData.length > 0 ? (
                  <div className="space-y-3">
                    {overdueTasksData.map(task => (
                       <div key={task.id} className="py-2 border-b last:border-b-0">
                        <p className="font-medium text-sm text-primary hover:underline cursor-pointer">{task.title}</p>
                        <p className="text-xs text-muted-foreground">{task.dueDate} | {task.propertyUnit}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-4">No overdue tasks for you.</p>
                )}
              </TabsContent>
              <TabsContent value="all-overdue">
                 {initialTasks.filter(t => isPastDate(t.dueDate) && t.status !== 'Completed').length > 0 ? (
                  <div className="space-y-3">
                    {initialTasks
                      .filter(t => isPastDate(t.dueDate) && t.status !== 'Completed')
                      .map(task => (
                       <div key={task.id} className="py-2 border-b last:border-b-0">
                        <p className="font-medium text-sm text-primary hover:underline cursor-pointer">{task.description}</p>
                        <p className="text-xs text-muted-foreground">{format(new Date(task.dueDate), 'MM/dd/yyyy')} | {task.relatedTo || 'N/A'}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-4">No overdue tasks.</p>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
           <CardFooter className="text-xs text-muted-foreground justify-between">
            <span>Showing {Math.min(overdueTasksData.length, 2)} of {totalOverdueTasks}</span>
             <Link href="/tasks?filter=overdue" className="text-primary hover:underline font-medium">
              View all +
            </Link>
          </CardFooter>
        </Card>

        {/* Expiring Leases Card */}
        <Card className="lg:col-span-1 shadow-lg">
          <CardHeader>
            <CardTitle>Expiring Leases</CardTitle>
          </CardHeader>
          <CardContent>
             <Tabs defaultValue="0-30" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-4 text-xs">
                <TabsTrigger value="0-30" className="px-1">0 - 30 days ({expiringLeases30Days})</TabsTrigger>
                <TabsTrigger value="31-60" className="px-1">31 - 60 days ({expiringLeases60Days})</TabsTrigger>
                <TabsTrigger value="61-90" className="px-1">61 - 90 days ({expiringLeases90Days})</TabsTrigger>
                <TabsTrigger value="all" className="px-1">All ({totalExpiringLeases})</TabsTrigger>
              </TabsList>
              <TabsContent value="0-30">
                <div className="w-full h-40"> 
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={expiringLeasesChartData} layout="vertical" margin={{ top: 5, right: 20, left: 50, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                      <XAxis type="number" hide />
                      <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} style={{ fontSize: '12px' }} width={80} />
                      <Tooltip />
                      <Bar dataKey="value" fill="hsl(var(--accent))" barSize={20}>
                        {expiringLeasesChartData.map((entry, index) => (
                           <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                 {expiringLeases30Days === 0 && <p className="text-center text-sm text-muted-foreground py-4">No leases expiring in 0-30 days.</p>}
              </TabsContent>
               <TabsContent value="31-60">
                {expiringLeases60Days > 0 ? 
                  (<p className="text-center text-sm text-muted-foreground py-4">{expiringLeases60Days} leases expiring in 31-60 days. (Chart placeholder)</p>) :
                  (<p className="text-center text-sm text-muted-foreground py-4">No leases expiring in 31-60 days.</p>)
                }
               </TabsContent>
               <TabsContent value="61-90">
                {expiringLeases90Days > 0 ?
                  (<p className="text-center text-sm text-muted-foreground py-4">{expiringLeases90Days} leases expiring in 61-90 days. (Chart placeholder)</p>) :
                  (<p className="text-center text-sm text-muted-foreground py-4">No leases expiring in 61-90 days.</p>)
                }
                </TabsContent>
               <TabsContent value="all">
                {totalExpiringLeases > 0 ?
                  (<p className="text-center text-sm text-muted-foreground py-4">{totalExpiringLeases} total leases expiring. (Chart placeholder)</p>) :
                  (<p className="text-center text-sm text-muted-foreground py-4">No leases expiring.</p>)
                }
                </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="text-xs text-muted-foreground justify-between">
            <span>{totalExpiringLeases} leases</span>
            <Link href="/leasing?filter=expiring" className="text-primary hover:underline font-medium">
              Go to Leasing +
            </Link>
          </CardFooter>
        </Card>

        {/* Expiring Renters Insurance Card */}
        <Card className="lg:col-span-1 shadow-lg">
          <CardHeader>
            <CardTitle>Expiring Renters Insurance</CardTitle>
          </CardHeader>
          <CardContent>
             <Tabs defaultValue="expired" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-4 text-xs">
                <TabsTrigger value="expired" className="px-1">Expired ({lapsedInsuranceCount})</TabsTrigger>
                <TabsTrigger value="0-30" className="px-1">0 - 30 days ({expiringInsurance30Days})</TabsTrigger>
                <TabsTrigger value="31-60" className="px-1">31 - 60 days ({expiringInsurance60Days})</TabsTrigger>
                <TabsTrigger value="61-90" className="px-1">61 - 90 days ({expiringInsurance90Days})</TabsTrigger>
              </TabsList>
              <TabsContent value="expired">
                {lapsedInsuranceCount > 0 ? (
                  <p className="text-sm text-muted-foreground">{lapsedInsuranceCount} policies expired.</p>
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-4">There are no expired policies</p>
                )}
              </TabsContent>
              <TabsContent value="0-30">
                {expiringInsurance30Days > 0 ?
                  (<p className="text-center text-sm text-muted-foreground py-4">{expiringInsurance30Days} policies expiring in 0-30 days.</p>) :
                  (<p className="text-center text-sm text-muted-foreground py-4">No policies expiring in 0-30 days.</p>)
                }
              </TabsContent>
              <TabsContent value="31-60">
                 {expiringInsurance60Days > 0 ?
                  (<p className="text-center text-sm text-muted-foreground py-4">{expiringInsurance60Days} policies expiring in 31-60 days.</p>) :
                  (<p className="text-center text-sm text-muted-foreground py-4">No policies expiring in 31-60 days.</p>)
                }
              </TabsContent>
              <TabsContent value="61-90">
                {expiringInsurance90Days > 0 ?
                  (<p className="text-center text-sm text-muted-foreground py-4">{expiringInsurance90Days} policies expiring in 61-90 days.</p>) :
                  (<p className="text-center text-sm text-muted-foreground py-4">No policies expiring in 61-90 days.</p>)
                }
              </TabsContent>
            </Tabs>
          </CardContent>
           <CardFooter className="text-xs text-muted-foreground justify-end">
             <Link href="/tenants?filter=insurance_expired" className="text-primary hover:underline font-medium">
              View all +
            </Link>
          </CardFooter>
        </Card>
      </div>
       {/* Floating Compose Email Button - Approximation */}
      <div className="fixed bottom-6 right-6">
        <Button className="rounded-full shadow-lg" size="lg">
          <Mail className="mr-2 h-5 w-5" /> + Compose email
        </Button>
      </div>
    </div>
  );
}
