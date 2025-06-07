
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DollarSign, FileText, Filter, CalendarDays, Printer } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function FinancialReportsPage() {
  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <DollarSign className="h-8 w-8 text-primary" /> Financial Reports
        </h1>
        <Button variant="outline">
          <Printer className="mr-2 h-4 w-4" /> Print Summary
        </Button>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Generate Financial Report</CardTitle>
          <CardDescription>Select report type and apply filters to generate detailed financial statements.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="report-type">Report Type</Label>
              <Select>
                <SelectTrigger id="report-type">
                  <SelectValue placeholder="Select a report type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rent-roll">Rent Roll</SelectItem>
                  <SelectItem value="delinquency">Delinquency Report</SelectItem>
                  <SelectItem value="income-expense">Income & Expense Statement</SelectItem>
                  <SelectItem value="balance-sheet">Balance Sheet</SelectItem>
                  <SelectItem value="cash-flow">Cash Flow Statement</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="property-filter">Property</Label>
              <Select>
                <SelectTrigger id="property-filter">
                  <SelectValue placeholder="All Properties" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Properties</SelectItem>
                  <SelectItem value="prop1">Oakview Apartments</SelectItem>
                  <SelectItem value="prop2">Willow Creek Homes</SelectItem>
                  {/* Add more properties as needed */}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="date-from">Date From</Label>
              <Input type="date" id="date-from" />
            </div>
            <div>
              <Label htmlFor="date-to">Date To</Label>
              <Input type="date" id="date-to" />
            </div>
          </div>
           <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-muted-foreground" />
              <Button variant="outline" size="sm">More Filters</Button>
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
          <CardTitle>Recent Reports</CardTitle>
          <CardDescription>View or download recently generated financial reports.</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Placeholder for a list of recent reports */}
          <p className="text-muted-foreground">No recent reports generated. Generate a new report above.</p>
        </CardContent>
      </Card>
    </div>
  );
}
