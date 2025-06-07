
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart2, FileText, DollarSign, Wrench, Settings, Users, TrendingUp, PieChart as PieChartIcon } from "lucide-react";
import Link from "next/link";

export default function ReportsPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Reporting Suite</h1>
        <Button variant="outline">
          <Settings className="mr-2 h-4 w-4" /> Report Settings
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Financial Reports Card */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-6 w-6 text-primary" />
              Financial Reports
            </CardTitle>
            <CardDescription>Gain insights into your financial performance and health.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
              <li>Rent Roll Report (detailed tenant lease and payment status)</li>
              <li>Delinquency Report (track overdue payments)</li>
              <li>Income & Expense Statements (per property or portfolio)</li>
              <li>Balance Sheet & Cash Flow Statements</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Link href="/reports/financial" passHref className="w-full">
              <Button className="w-full">View Financial Reports</Button>
            </Link>
          </CardFooter>
        </Card>

        {/* Operational Reports Card */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-primary" />
              Operational Reports
            </CardTitle>
            <CardDescription>Monitor key operational metrics for your properties.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
              <li>Vacancy & Occupancy Rate Reports</li>
              <li>Lease Expiration & Renewal Tracking</li>
              <li>Average Turnaround Time for Units</li>
              <li>Tenant Move-In/Move-Out Summaries</li>
            </ul>
          </CardContent>
          <CardFooter>
             <Link href="/reports/operational" passHref className="w-full">
              <Button className="w-full">View Operational Reports</Button>
            </Link>
          </CardFooter>
        </Card>

        {/* Maintenance Reports Card */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wrench className="h-6 w-6 text-primary" />
              Maintenance Reports
            </CardTitle>
            <CardDescription>Analyze maintenance activities and costs.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
              <li>Maintenance History & Cost Analysis (per property/unit)</li>
              <li>Work Order Status & Completion Times</li>
              <li>Vendor Performance Reports</li>
              <li>Preventive Maintenance Schedules</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Link href="/reports/maintenance" passHref className="w-full">
              <Button className="w-full">View Maintenance Reports</Button>
            </Link>
          </CardFooter>
        </Card>
        
        {/* Tenant & Leasing Reports Card */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-6 w-6 text-primary" />
              Tenant & Leasing Reports
            </CardTitle>
            <CardDescription>Understand your tenant base and leasing activities.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
              <li>Tenant Demographics & Profiles</li>
              <li>Leasing Activity Funnel (leads, showings, applications)</li>
              <li>Sources of Leads & Marketing Effectiveness</li>
              <li>Tenant Retention Rates</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Link href="/reports/leasing" passHref className="w-full">
              <Button className="w-full">View Leasing Reports</Button>
            </Link>
          </CardFooter>
        </Card>

        {/* Association Reports Card (if applicable) */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChartIcon className="h-6 w-6 text-primary" />
              Association Reports
            </CardTitle>
            <CardDescription>Reports for Homeowner Associations (HOA) or Condo Associations.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
              <li>Member Lists & Dues Status</li>
              <li>Association Budget vs. Actuals</li>
              <li>Violation Summaries</li>
              <li>Meeting Minutes & Resolutions</li>
            </ul>
          </CardContent>
          <CardFooter>
             <Link href="/reports/association" passHref className="w-full">
              <Button className="w-full">View Association Reports</Button>
            </Link>
          </CardFooter>
        </Card>

        {/* Custom Reports Card */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-6 w-6 text-primary" />
              Custom Report Builder
            </CardTitle>
            <CardDescription>Create and save your own report templates tailored to your needs.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              This section will allow you to select data points, filters, and formatting options to build reports from scratch or modify existing templates.
            </p>
          </CardContent>
          <CardFooter>
            <Link href="/reports/custom-builder" passHref className="w-full">
              <Button className="w-full" variant="secondary">Launch Report Builder</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
