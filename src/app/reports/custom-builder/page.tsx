
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Settings, PlusCircle, ListFilter, Columns, Save, Play } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


export default function CustomReportBuilderPage() {
  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <FileText className="h-8 w-8 text-primary" /> Custom Report Builder
        </h1>
        <div className="flex items-center gap-2">
            <Button variant="outline"><Save className="mr-2 h-4 w-4"/> Save Template</Button>
            <Button><Play className="mr-2 h-4 w-4"/> Run Report</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Data Source & Fields Selection */}
        <Card className="lg:col-span-1 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Columns className="h-5 w-5"/>Data & Fields</CardTitle>
            <CardDescription>Select data sources and fields for your report.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="data-source">Data Source</Label>
              <Select>
                <SelectTrigger id="data-source">
                  <SelectValue placeholder="Select data source (e.g., Tenants, Properties)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tenants">Tenants</SelectItem>
                  <SelectItem value="properties">Properties</SelectItem>
                  <SelectItem value="leases">Leases</SelectItem>
                  <SelectItem value="payments">Payments</SelectItem>
                  <SelectItem value="maintenance">Maintenance Requests</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Available Fields</Label>
              <div className="max-h-60 overflow-y-auto space-y-2 border p-3 rounded-md bg-muted/50">
                {/* Placeholder fields - these would be dynamic */}
                <div className="flex items-center space-x-2">
                  <Checkbox id="field-name" />
                  <Label htmlFor="field-name" className="font-normal">Tenant Name</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="field-property" />
                  <Label htmlFor="field-property" className="font-normal">Property Address</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="field-rent" />
                  <Label htmlFor="field-rent" className="font-normal">Rent Amount</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="field-lease-end" />
                  <Label htmlFor="field-lease-end" className="font-normal">Lease End Date</Label>
                </div>
                 <div className="flex items-center space-x-2">
                  <Checkbox id="field-status" />
                  <Label htmlFor="field-status" className="font-normal">Status</Label>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Filters & Sorting */}
        <Card className="lg:col-span-1 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><ListFilter className="h-5 w-5"/>Filters & Sorting</CardTitle>
            <CardDescription>Define criteria to refine your report data.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2 p-3 border rounded-md">
                <h4 className="font-medium text-sm">Add Filter</h4>
                <div className="flex gap-2 items-end">
                    <div className="flex-1">
                        <Label htmlFor="filter-field">Field</Label>
                        <Select>
                            <SelectTrigger id="filter-field"><SelectValue placeholder="Select field"/></SelectTrigger>
                            <SelectContent><SelectItem value="rent_status">Rent Status</SelectItem></SelectContent>
                        </Select>
                    </div>
                    <div className="flex-1">
                        <Label htmlFor="filter-condition">Condition</Label>
                         <Select>
                            <SelectTrigger id="filter-condition"><SelectValue placeholder="Is equal to"/></SelectTrigger>
                            <SelectContent><SelectItem value="equals">Is equal to</SelectItem></SelectContent>
                        </Select>
                    </div>
                </div>
                <div>
                    <Label htmlFor="filter-value">Value</Label>
                    <Input id="filter-value" placeholder="e.g., Overdue"/>
                </div>
                <Button variant="secondary" size="sm"><PlusCircle className="mr-2 h-4 w-4"/>Add Filter Rule</Button>
            </div>
             <div className="space-y-2 p-3 border rounded-md">
                <h4 className="font-medium text-sm">Sort By</h4>
                 <div className="flex gap-2 items-end">
                    <div className="flex-1">
                        <Label htmlFor="sort-field">Field</Label>
                        <Select>
                            <SelectTrigger id="sort-field"><SelectValue placeholder="Tenant Name"/></SelectTrigger>
                            <SelectContent><SelectItem value="name">Tenant Name</SelectItem></SelectContent>
                        </Select>
                    </div>
                    <div className="flex-1">
                        <Label htmlFor="sort-order">Order</Label>
                         <Select>
                            <SelectTrigger id="sort-order"><SelectValue placeholder="Ascending"/></SelectTrigger>
                            <SelectContent><SelectItem value="asc">Ascending</SelectItem></SelectContent>
                        </Select>
                    </div>
                </div>
             </div>
          </CardContent>
        </Card>

        {/* Formatting & Preview */}
        <Card className="lg:col-span-1 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Settings className="h-5 w-5"/>Layout & Preview</CardTitle>
            <CardDescription>Customize report appearance and preview.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
                <Label htmlFor="report-name">Report Name</Label>
                <Input id="report-name" placeholder="e.g., Q3 Delinquency Report"/>
            </div>
            <div>
                <Label htmlFor="report-description">Description (Optional)</Label>
                <Textarea id="report-description" placeholder="A brief description of this report."/>
            </div>
            <div>
                <Label htmlFor="report-format">Output Format</Label>
                <Select defaultValue="pdf">
                    <SelectTrigger id="report-format"><SelectValue/></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="pdf">PDF</SelectItem>
                        <SelectItem value="csv">CSV</SelectItem>
                        <SelectItem value="excel">Excel (XLSX)</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="h-40 bg-muted rounded-md flex items-center justify-center">
                <p className="text-muted-foreground text-sm">Report preview area</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
