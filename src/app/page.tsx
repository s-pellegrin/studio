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

// Placeholder data
const dashboardData = {
  outstandingBalances: {
    value: '$12,560',
    description: '+5.2% from last month',
    count: 15,
  },
  maintenanceRequests: {
    value: '8 New',
    description: '3 Urgent, 5 Routine',
    count: 8,
  },
  overdueTasks: {
    value: '5 Tasks',
    description: '2 High Priority',
    count: 5,
  },
  expiringLeases: {
    value: '12 Leases',
    description: 'Within next 30 days',
    count: 12,
  },
  rentersInsurance: {
    active: 125,
    lapsed: 10,
    total: 135,
  },
  expiringPolicies: {
    value: '3 Policies',
    description: 'Vendor insurance expiring soon',
    count: 3,
  },
};

export default function DashboardPage() {
  const insuranceCoverage = Math.round(
    (dashboardData.rentersInsurance.active / dashboardData.rentersInsurance.total) * 100
  );

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <WidgetCard
          title="Outstanding Balances"
          value={dashboardData.outstandingBalances.value}
          description={`${dashboardData.outstandingBalances.count} tenants`}
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
            <Link href="/leasing?filter=expiring" passHref>
              <Button variant="outline" size="sm" className="w-full">
                Review Leases <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          }
        />
        <WidgetCard
          title="Renters Insurance Status"
          value={`${insuranceCoverage}% Coverage`}
          icon={ShieldCheck}
          description={`${dashboardData.rentersInsurance.lapsed} policies lapsed`}
        >
          <Progress value={insuranceCoverage} className="mt-2 h-2" />
           <Link href="/tenants?filter=insurance" passHref className="mt-4 block">
              <Button variant="outline" size="sm" className="w-full">
                View Insurance <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
        </WidgetCard>
         <WidgetCard
          title="Expiring Policies"
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
