
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wrench, DollarSign, ListChecks, Users2, Filter, FileText, Printer } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function MaintenanceReportsPage() {
  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Wrench className="h-8 w-8 text-primary" /> Maintenance Reports
        </h1>
        <Button variant="outline">
          <Printer className="mr-2 h-4 w-4" /> Print Summary
        </Button>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Generate Maintenance Report</CardTitle>
          <CardDescription>Analyze maintenance activities, costs, and vendor performance.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="report-type-maintenance">Report Type</Label>
              <Select>
                <SelectTrigger id="report-type-maintenance">
                  <SelectValue placeholder="Select a report type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="history-cost">Maintenance History & Cost</SelectItem>
                  <SelectItem value="work-order-status">Work Order Status & Completion</SelectItem>
                  <SelectItem value="vendor-performance">Vendor Performance</SelectItem>
                  <SelectItem value="preventive-schedule">Preventive Maintenance Schedule</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="property-filter-maintenance">Property / Unit</Label>
              <Select>
                <SelectTrigger id="property-filter-maintenance">
                  <SelectValue placeholder="All Properties" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Properties</SelectItem>
                  <SelectItem value="prop1">Oakview Apartments</SelectItem>
                  <SelectItem value="prop1-unit101">Oakview Apartments - Unit 101</SelectItem>
                  {/* Add more properties/units */}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <Label htmlFor="date-from-maintenance">Date From</Label>
              <Input type="date" id="date-from-maintenance" />
            </div>
            <div>
              <Label htmlFor="date-to-maintenance">Date To</Label>
              <Input type="date" id="date-to-maintenance" />
            </div>
             <div>
              <Label htmlFor="vendor-filter-maintenance">Vendor</Label>
              <Select>
                <SelectTrigger id="vendor-filter-maintenance">
                  <SelectValue placeholder="All Vendors" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Vendors</SelectItem>
                  <SelectItem value="vendor1">HVAC Pro Inc.</SelectItem>
                  <SelectItem value="vendor2">Plumb Perfect</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
           <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-muted-foreground" />
              <Button variant="outline" size="sm">Filter by Category/Priority</Button>
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
          <CardTitle>Maintenance Overview</CardTitle>
          <CardDescription>Summary of current maintenance status.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
           <div className="p-4 border rounded-lg">
            <ListChecks className="h-6 w-6 text-primary mb-2"/>
            <p className="text-2xl font-bold">25</p>
            <p className="text-sm text-muted-foreground">Open Work Orders</p>
          </div>
          <div className="p-4 border rounded-lg">
            <DollarSign className="h-6 w-6 text-primary mb-2"/>
            <p className="text-2xl font-bold">$1,250</p>
            <p className="text-sm text-muted-foreground">Avg. Cost/Work Order</p>
          </div>
          <div className="p-4 border rounded-lg">
            <Wrench className="h-6 w-6 text-primary mb-2"/>
            <p className="text-2xl font-bold">3 days</p>
            <p className="text-sm text-muted-foreground">Avg. Completion Time</p>
          </div>
           <div className="p-4 border rounded-lg">
            <Users2 className="h-6 w-6 text-primary mb-2"/>
            <p className="text-2xl font-bold">5</p>
            <p className="text-sm text-muted-foreground">Active Vendors</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
