
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, Users, Building, CalendarClock, Filter, FileText, Printer } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


export default function OperationalReportsPage() {
  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <TrendingUp className="h-8 w-8 text-primary" /> Operational Reports
        </h1>
         <Button variant="outline">
          <Printer className="mr-2 h-4 w-4" /> Print Overview
        </Button>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Generate Operational Report</CardTitle>
          <CardDescription>Analyze key operational metrics for your properties and portfolio.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="report-type-operational">Report Type</Label>
              <Select>
                <SelectTrigger id="report-type-operational">
                  <SelectValue placeholder="Select a report type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vacancy-occupancy">Vacancy & Occupancy Rate</SelectItem>
                  <SelectItem value="lease-expiration">Lease Expiration & Renewal</SelectItem>
                  <SelectItem value="turnaround-time">Average Unit Turnaround Time</SelectItem>
                  <SelectItem value="move-in-out">Tenant Move-In/Move-Out Summary</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="property-filter-operational">Property / Portfolio</Label>
              <Select>
                <SelectTrigger id="property-filter-operational">
                  <SelectValue placeholder="All Properties" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Properties (Portfolio)</SelectItem>
                  <SelectItem value="prop1">Oakview Apartments</SelectItem>
                  <SelectItem value="prop2">Willow Creek Homes</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="date-from-operational">Period Start</Label>
              <Input type="date" id="date-from-operational" />
            </div>
            <div>
              <Label htmlFor="date-to-operational">Period End</Label>
              <Input type="date" id="date-to-operational" />
            </div>
          </div>
           <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-muted-foreground" />
              <Button variant="outline" size="sm">Advanced Filters</Button>
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
          <CardTitle>Key Metrics Snapshot</CardTitle>
          <CardDescription>Quick overview of current operational performance.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 border rounded-lg">
            <Users className="h-6 w-6 text-primary mb-2"/>
            <p className="text-2xl font-bold">92%</p>
            <p className="text-sm text-muted-foreground">Occupancy Rate</p>
          </div>
          <div className="p-4 border rounded-lg">
            <Building className="h-6 w-6 text-primary mb-2"/>
            <p className="text-2xl font-bold">8</p>
            <p className="text-sm text-muted-foreground">Vacant Units</p>
          </div>
          <div className="p-4 border rounded-lg">
            <CalendarClock className="h-6 w-6 text-primary mb-2"/>
            <p className="text-2xl font-bold">15</p>
            <p className="text-sm text-muted-foreground">Leases Expiring (Next 90 days)</p>
          </div>
          <div className="p-4 border rounded-lg">
            <TrendingUp className="h-6 w-6 text-primary mb-2"/>
            <p className="text-2xl font-bold">7 days</p>
            <p className="text-sm text-muted-foreground">Avg. Turnaround Time</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
