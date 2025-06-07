
import {
  CircleDollarSign,
  Wrench,
  ListChecks,
  FileClock,
  ShieldCheck,
  ShieldAlert,
  ArrowRight,
} from 'lucide-react';
import Link from 'next/link';
import WidgetCard from '@/components/dashboard/widget-card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import { initialTenants } from './tenants/data';
import { initialMaintenanceRequests } from './maintenance/data';
import { initialTasks } from './tasks/data';
import { initialVendorPolicies } from './associations/data';

// Helper function to check if a date string (YYYY-MM-DD) is within the next N days
const isWithinNextNDays = (dateStr: string, days: number): boolean => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalize today to the start of the day
  const targetDate = new Date(dateStr);
  const NDaysFromToday = new Date(today);
  NDaysFromToday.setDate(today.getDate() + days);
  return targetDate >= today && targetDate <= NDaysFromToday;
};

// Helper function to check if a date string (YYYY-MM-DD) is in the past
const isPastDate = (dateStr: string): boolean => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const targetDate = new Date(dateStr);
  return targetDate < today;
};

// Calculate dynamic data
const outstandingBalancesCount = initialTenants.filter(t => t.rentStatus === 'Overdue').length;

const newMaintenanceRequests = initialMaintenanceRequests.filter(m => m.status === 'New');
const newMaintenanceRequestsCount = newMaintenanceRequests.length;
const urgentMaintenanceRequestsCount = newMaintenanceRequests.filter(m => m.priority === 'Urgent').length;
const routineMaintenanceRequestsCount = newMaintenanceRequests.filter(m => m.priority === 'Routine' || m.priority === 'High' || m.priority === 'Low').length; // Assuming High and Low also count as routine for this summary

const overdueTasks = initialTasks.filter(t => isPastDate(t.dueDate) && t.status !== 'Completed');
const overdueTasksCount = overdueTasks.length;
const highPriorityOverdueTasksCount = overdueTasks.filter(t => t.priority === 'High').length;

const expiringLeasesCount = initialTenants.filter(t => isWithinNextNDays(t.leaseEndDate, 30)).length;

const activeInsuranceCount = initialTenants.filter(t => t.insuranceStatus === 'Active').length;
const lapsedInsuranceCount = initialTenants.filter(t => t.insuranceStatus === 'Lapsed').length;
const totalTenantsForInsuranceCalc = initialTenants.length > 0 ? initialTenants.length : 1; // Avoid division by zero
const insuranceCoveragePercentage = Math.round((activeInsuranceCount / totalTenantsForInsuranceCalc) * 100);

const expiringVendorPoliciesCount = initialVendorPolicies.filter(p => isWithinNextNDays(p.expiryDate, 30)).length;


const dashboardData = {
  outstandingBalances: {
    value: `$${(outstandingBalancesCount * 1250).toLocaleString()}`, // Placeholder average rent
    description: `${outstandingBalancesCount} tenants with overdue rent`,
    count: outstandingBalancesCount,
  },
  maintenanceRequests: {
    value: `${newMaintenanceRequestsCount} New`,
    description: `${urgentMaintenanceRequestsCount} Urgent, ${routineMaintenanceRequestsCount} Routine`,
    count: newMaintenanceRequestsCount,
  },
  overdueTasks: {
    value: `${overdueTasksCount} Tasks`,
    description: `${highPriorityOverdueTasksCount} High Priority`,
    count: overdueTasksCount,
  },
  expiringLeases: {
    value: `${expiringLeasesCount} Leases`,
    description: 'Expiring in next 30 days',
    count: expiringLeasesCount,
  },
  rentersInsurance: {
    active: activeInsuranceCount,
    lapsed: lapsedInsuranceCount,
    total: initialTenants.length, // Total tenants for context
    coveragePercentage: insuranceCoveragePercentage,
  },
  expiringPolicies: {
    value: `${expiringVendorPoliciesCount} Policies`,
    description: 'Vendor insurance expiring soon',
    count: expiringVendorPoliciesCount,
  },
};

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <WidgetCard
          title="Outstanding Balances"
          value={dashboardData.outstandingBalances.value}
          description={dashboardData.outstandingBalances.description}
          icon={CircleDollarSign}
          action={
            <Link href="/accounting?filter=outstanding" passHref>
              <Button variant="outline" size="sm" className="w-full">
                View Details <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          }
        />
        <WidgetCard
          title="Incoming Maintenance"
          value={dashboardData.maintenanceRequests.value}
          description={dashboardData.maintenanceRequests.description}
          icon={Wrench}
           action={
            <Link href="/maintenance?filter=new" passHref>
              <Button variant="outline" size="sm" className="w-full">
                Manage Requests <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          }
        />
        <WidgetCard
          title="Overdue Tasks"
          value={dashboardData.overdueTasks.value}
          description={dashboardData.overdueTasks.description}
          icon={ListChecks}
          action={
            <Link href="/tasks?filter=overdue" passHref>
              <Button variant="destructive" size="sm" className="w-full">
                Address Tasks <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          }
        />
        <WidgetCard
          title="Expiring Leases"
          value={dashboardData.expiringLeases.value}
          description={dashboardData.expiringLeases.description}
          icon={FileClock}
          action={
            <Link href="/tenants?filter=expiring-leases" passHref>
              <Button variant="outline" size="sm" className="w-full">
                Review Leases <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          }
        />
        <WidgetCard
          title="Renters Insurance Status"
          value={`${dashboardData.rentersInsurance.coveragePercentage}% Coverage`}
          icon={ShieldCheck}
          description={`${dashboardData.rentersInsurance.lapsed} policies lapsed of ${dashboardData.rentersInsurance.total} tenants`}
        >
          <Progress value={dashboardData.rentersInsurance.coveragePercentage} className="mt-2 h-2" />
           <Link href="/tenants?filter=insurance" passHref className="mt-4 block">
              <Button variant="outline" size="sm" className="w-full">
                View Insurance <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
        </WidgetCard>
         <WidgetCard
          title="Expiring Vendor Policies"
          value={dashboardData.expiringPolicies.value}
          description={dashboardData.expiringPolicies.description}
          icon={ShieldAlert}
          action={
            <Link href="/associations?filter=expiring-policies" passHref>
              <Button variant="outline" size="sm" className="w-full">
                Check Policies <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          }
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates across your properties.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-center justify-between text-sm">
                <div>
                  <p className="font-medium">New lease signed: Apt 4B, 123 Main St</p>
                  <p className="text-xs text-muted-foreground">Tenant: John Doe</p>
                </div>
                <Badge variant="secondary">Leasing</Badge>
              </li>
              <li className="flex items-center justify-between text-sm">
                <div>
                  <p className="font-medium">Maintenance request: #00124 - Leaky Faucet</p>
                  <p className="text-xs text-muted-foreground">Property: 789 Oak Ave, Unit 12</p>
                </div>
                <Badge variant="default" className="bg-amber-500 text-white">Maintenance</Badge>
              </li>
              <li className="flex items-center justify-between text-sm">
                <div>
                  <p className="font-medium">Rent payment received: Unit 2C, 456 Pine Ln</p>
                  <p className="text-xs text-muted-foreground">Amount: $1,200.00</p>
                </div>
                <Badge variant="default">Accounting</Badge>
              </li>
            </ul>
          </CardContent>
        </Card>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Quick Links</CardTitle>
            <CardDescription>Access common actions quickly.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <Link href="/tenants/new" passHref><Button className="w-full">Add New Tenant</Button></Link>
            <Link href="/properties/new" passHref><Button className="w-full">Add New Property</Button></Link>
            <Link href="/maintenance/new" passHref><Button className="w-full">Log Maintenance</Button></Link>
            <Link href="/communication/compose" passHref><Button className="w-full">Send Announcement</Button></Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
