
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, BookOpen, DollarSign, ShieldAlert, MessageSquare, FileText, AlertOctagon, BarChart3, PlusCircle } from "lucide-react";
import Link from "next/link";

export default function AssociationsPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold">Association Management</h1>
        <Button>
          <PlusCircle className="mr-2 h-5 w-5" /> New Association
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
        {/* Member Management Card */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-6 w-6 text-primary" /> Member Hub
            </CardTitle>
            <CardDescription>Manage your community members and communication effectively.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="h-4 w-4" />
              <span>Comprehensive member directory.</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MessageSquare className="h-4 w-4" />
              <span>Integrated communication tools (email, announcements).</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <BookOpen className="h-4 w-4" />
              <span>Role and access management.</span>
            </div>
            <div className="mt-4">
              <Link href="/associations/members" passHref>
                <Button variant="outline" className="w-full sm:w-auto">Manage Members</Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Financials & Reporting Card */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-6 w-6 text-primary" /> Financials & Reporting
            </CardTitle>
            <CardDescription>Oversee association finances, fee collection, and reporting.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <DollarSign className="h-4 w-4" />
              <span>Automated fee collection and invoicing.</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <BarChart3 className="h-4 w-4" />
              <span>Detailed financial reporting and dashboards.</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <BookOpen className="h-4 w-4" />
              <span>Budgeting and expense tracking.</span>
            </div>
            <div className="mt-4">
              <Link href="/associations/financials" passHref>
                <Button variant="outline" className="w-full sm:w-auto">View Financials</Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Document Hub Card */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-6 w-6 text-primary" /> Document Hub
            </CardTitle>
            <CardDescription>Centralized storage for important association documents.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <FileText className="h-4 w-4" />
              <span>Secure storage for bylaws, CC&Rs, and policies.</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <BookOpen className="h-4 w-4" />
              <span>Management of meeting minutes and agendas.</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="h-4 w-4" />
              <span>Version control and member access controls.</span>
            </div>
            <div className="mt-4">
              <Link href="/associations/documents" passHref>
                <Button variant="outline" className="w-full sm:w-auto">Access Documents</Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Compliance & Violations Card */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldAlert className="h-6 w-6 text-primary" /> Compliance & Violations
            </CardTitle>
            <CardDescription>Track and manage community guidelines and violations.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <AlertOctagon className="h-4 w-4" />
              <span>Violation tracking and notification system.</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <BookOpen className="h-4 w-4" />
              <span>Enforcement workflow management.</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <FileText className="h-4 w-4" />
              <span>History and reporting on violations.</span>
            </div>
            <div className="mt-4">
               <Link href="/associations/violations" passHref>
                <Button variant="outline" className="w-full sm:w-auto">Manage Violations</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
       <Card className="mt-6 shadow-lg">
        <CardHeader>
          <CardTitle>Vendor Insurance Tracking - Quick View</CardTitle>
          <CardDescription>Monitor vendor insurance policy expiration dates. This is a placeholder for a more detailed view.</CardDescription>
        </CardHeader>
        <CardContent>
            <p className="text-sm text-muted-foreground">
                This section will display a summary or link to a dedicated vendor insurance tracking page.
                For now, you can refer to the main <Link href="/dashboard" className="text-primary hover:underline">Dashboard</Link> for an example of how this data might be presented.
            </p>
        </CardContent>
      </Card>
    </div>
  );
}
