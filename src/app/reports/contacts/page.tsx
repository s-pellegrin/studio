
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PieChart as PieChartIcon, Users, ShieldAlert, FileText as FileTextIcon, DollarSign, Filter, Printer, Users2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ContactReportsPage() {
  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Users2 className="h-8 w-8 text-primary" /> Contact Reports
        </h1>
        <Button variant="outline">
          <Printer className="mr-2 h-4 w-4" /> Print Summary
        </Button>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Generate Contact Report</CardTitle>
          <CardDescription>Access reports for tenants, vendors, owners, and other contacts.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="report-type-contact">Report Type</Label>
              <Select>
                <SelectTrigger id="report-type-contact">
                  <SelectValue placeholder="Select a report type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="contact-list">Contact List & Details</SelectItem>
                  <SelectItem value="vendor-summary">Vendor Summary & Insurance</SelectItem>
                  <SelectItem value="communication-log">Communication Log</SelectItem>
                  <SelectItem value="tenant-directory">Tenant Directory</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="contact-group-filter">Contact Group/Type</Label>
              <Select>
                <SelectTrigger id="contact-group-filter">
                  <SelectValue placeholder="Select Contact Group/Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Contacts</SelectItem>
                  <SelectItem value="tenants">Tenants</SelectItem>
                  <SelectItem value="vendors">Vendors</SelectItem>
                  <SelectItem value="owners">Owners</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="date-from-contact">Date From</Label>
              <Input type="date" id="date-from-contact" />
            </div>
            <div>
              <Label htmlFor="date-to-contact">Date To</Label>
              <Input type="date" id="date-to-contact" />
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
          <CardTitle>Contacts Overview</CardTitle>
          <CardDescription>Key metrics for your contacts.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
           <div className="p-4 border rounded-lg">
            <Users className="h-6 w-6 text-primary mb-2"/>
            <p className="text-2xl font-bold">500+</p>
            <p className="text-sm text-muted-foreground">Total Contacts</p>
          </div>
          <div className="p-4 border rounded-lg">
            <Users2 className="h-6 w-6 text-primary mb-2"/>
            <p className="text-2xl font-bold">250</p>
            <p className="text-sm text-muted-foreground">Active Tenants</p>
          </div>
          <div className="p-4 border rounded-lg">
            <ShieldAlert className="h-6 w-6 text-primary mb-2"/>
            <p className="text-2xl font-bold">15</p>
            <p className="text-sm text-muted-foreground">Active Vendors</p>
          </div>
           <div className="p-4 border rounded-lg">
            <PieChartIcon className="h-6 w-6 text-primary mb-2"/>
            <p className="text-2xl font-bold">75%</p>
            <p className="text-sm text-muted-foreground">Contacts with Email</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
