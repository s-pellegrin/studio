
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PieChart as PieChartIcon, Users, ShieldAlert, FileText as FileTextIcon, DollarSign, Filter, Printer } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function AssociationReportsPage() {
  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <PieChartIcon className="h-8 w-8 text-primary" /> Association Reports
        </h1>
        <Button variant="outline">
          <Printer className="mr-2 h-4 w-4" /> Print Summary
        </Button>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Generate Association Report</CardTitle>
          <CardDescription>Access reports for Homeowner or Condo Associations.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="report-type-assoc">Report Type</Label>
              <Select>
                <SelectTrigger id="report-type-assoc">
                  <SelectValue placeholder="Select a report type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="member-list">Member List & Dues Status</SelectItem>
                  <SelectItem value="budget-actuals">Budget vs. Actuals</SelectItem>
                  <SelectItem value="violation-summary">Violation Summary</SelectItem>
                  <SelectItem value="meeting-minutes">Meeting Minutes Log</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="association-filter">Association</Label>
              <Select>
                <SelectTrigger id="association-filter">
                  <SelectValue placeholder="Select Association" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="assoc1">Oakwood HOA</SelectItem>
                  <SelectItem value="assoc2">Willow Creek Condo Association</SelectItem>
                  {/* Add more associations */}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="date-from-assoc">Date From</Label>
              <Input type="date" id="date-from-assoc" />
            </div>
            <div>
              <Label htmlFor="date-to-assoc">Date To</Label>
              <Input type="date" id="date-to-assoc" />
            </div>
          </div>
           <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-muted-foreground" />
              <Button variant="outline" size="sm">Additional Filters</Button>
            </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button>
            <FileTextIcon className="mr-2 h-4 w-4" /> Generate Report
          </Button>
        </CardFooter>
      </Card>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Association Health Check</CardTitle>
          <CardDescription>Key metrics for selected association.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
           <div className="p-4 border rounded-lg">
            <Users className="h-6 w-6 text-primary mb-2"/>
            <p className="text-2xl font-bold">150</p>
            <p className="text-sm text-muted-foreground">Active Members</p>
          </div>
          <div className="p-4 border rounded-lg">
            <DollarSign className="h-6 w-6 text-primary mb-2"/>
            <p className="text-2xl font-bold">95%</p>
            <p className="text-sm text-muted-foreground">Dues Collected</p>
          </div>
          <div className="p-4 border rounded-lg">
            <ShieldAlert className="h-6 w-6 text-primary mb-2"/>
            <p className="text-2xl font-bold">5</p>
            <p className="text-sm text-muted-foreground">Open Violations</p>
          </div>
           <div className="p-4 border rounded-lg">
            <PieChartIcon className="h-6 w-6 text-primary mb-2"/>
            <p className="text-2xl font-bold">102%</p>
            <p className="text-sm text-muted-foreground">Budget Utilization</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
