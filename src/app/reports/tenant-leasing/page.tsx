
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, FileSignature, TrendingUp, Target, Filter, FileText, Printer } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function TenantLeasingReportsPage() {
  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Users className="h-8 w-8 text-primary" /> Tenant & Leasing Reports
        </h1>
         <Button variant="outline">
          <Printer className="mr-2 h-4 w-4" /> Print Summary
        </Button>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Generate Tenant & Leasing Report</CardTitle>
          <CardDescription>Understand your tenant base and analyze leasing activities.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="report-type-tl">Report Type</Label>
              <Select>
                <SelectTrigger id="report-type-tl">
                  <SelectValue placeholder="Select a report type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="demographics">Tenant Demographics</SelectItem>
                  <SelectItem value="leasing-funnel">Leasing Activity Funnel</SelectItem>
                  <SelectItem value="lead-sources">Sources of Leads</SelectItem>
                  <SelectItem value="retention-rates">Tenant Retention Rates</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="property-filter-tl">Property / Campaign</Label>
              <Select>
                <SelectTrigger id="property-filter-tl">
                  <SelectValue placeholder="All Properties" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Properties</SelectItem>
                  <SelectItem value="prop1">Oakview Apartments</SelectItem>
                  <SelectItem value="campaign_summer24">Summer 2024 Campaign</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="date-from-tl">Date From</Label>
              <Input type="date" id="date-from-tl" />
            </div>
            <div>
              <Label htmlFor="date-to-tl">Date To</Label>
              <Input type="date" id="date-to-tl" />
            </div>
          </div>
           <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-muted-foreground" />
              <Button variant="outline" size="sm">Advanced Filters (e.g., Unit Type)</Button>
            </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button>
            <FileText className="mr-2 h-4 w-4" /> Generate Report
          </Button>
        </CardFooter>
      </Card>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Leasing Performance At-a-Glance</CardTitle>
          <CardDescription>Key leasing metrics for the current period.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
           <div className="p-4 border rounded-lg">
            <TrendingUp className="h-6 w-6 text-primary mb-2"/>
            <p className="text-2xl font-bold">50</p>
            <p className="text-sm text-muted-foreground">New Leads (Month)</p>
          </div>
          <div className="p-4 border rounded-lg">
            <FileSignature className="h-6 w-6 text-primary mb-2"/>
            <p className="text-2xl font-bold">12</p>
            <p className="text-sm text-muted-foreground">Leases Signed (Month)</p>
          </div>
          <div className="p-4 border rounded-lg">
            <Target className="h-6 w-6 text-primary mb-2"/>
            <p className="text-2xl font-bold">24%</p>
            <p className="text-sm text-muted-foreground">Lead-to-Lease Conversion</p>
          </div>
           <div className="p-4 border rounded-lg">
            <Users className="h-6 w-6 text-primary mb-2"/>
            <p className="text-2xl font-bold">85%</p>
            <p className="text-sm text-muted-foreground">Tenant Retention (Annual)</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
