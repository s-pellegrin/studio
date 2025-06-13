
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, BookOpen, DollarSign, ShieldAlert, MessageSquare, FileText, AlertOctagon, BarChart3, PlusCircle, UserPlus } from "lucide-react";
import Link from "next/link";

export default function ContactsPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold">Contacts Management</h1>
        <Button>
          <UserPlus className="mr-2 h-5 w-5" /> New Contact
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
        {/* Contact Directory Card */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-6 w-6 text-primary" /> Contact Directory
            </CardTitle>
            <CardDescription>Manage all your contacts: tenants, vendors, owners, etc.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="h-4 w-4" />
              <span>Comprehensive contact profiles.</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MessageSquare className="h-4 w-4" />
              <span>Communication history and notes.</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <BookOpen className="h-4 w-4" />
              <span>Categorization and group management.</span>
            </div>
            <div className="mt-4">
              <Link href="/contacts/all" passHref>
                <Button variant="outline" className="w-full sm:w-auto">Manage Contacts</Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Vendor Management Card (related to contacts) */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldAlert className="h-6 w-6 text-primary" /> Vendor Management
            </CardTitle>
            <CardDescription>Oversee vendor details, insurance, and performance.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <FileText className="h-4 w-4" />
              <span>Track vendor insurance policies and expiry dates.</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <BarChart3 className="h-4 w-4" />
              <span>Performance reviews and ratings.</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <DollarSign className="h-4 w-4" />
              <span>Service agreements and pricing.</span>
            </div>
            <div className="mt-4">
              <Link href="/contacts/vendors" passHref>
                <Button variant="outline" className="w-full sm:w-auto">Manage Vendors</Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Document Hub Card - could be relevant for contact-related documents */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-6 w-6 text-primary" /> Document Hub
            </CardTitle>
            <CardDescription>Centralized storage for contact-related documents.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <FileText className="h-4 w-4" />
              <span>Store contracts, agreements, and identification.</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <BookOpen className="h-4 w-4" />
              <span>Link documents to specific contact profiles.</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="h-4 w-4" />
              <span>Version control and access controls.</span>
            </div>
            <div className="mt-4">
              <Link href="/contacts/documents" passHref>
                <Button variant="outline" className="w-full sm:w-auto">Access Documents</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
        
        {/* Communication Card */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-6 w-6 text-primary" /> Communication
            </CardTitle>
            <CardDescription>Log and manage communications with contacts.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MessageSquare className="h-4 w-4" />
              <span>Email and SMS integration.</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <BookOpen className="h-4 w-4" />
              <span>Communication templates and history.</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="h-4 w-4" />
              <span>Segmented communication lists.</span>
            </div>
            <div className="mt-4">
               <Link href="/communication" passHref>
                <Button variant="outline" className="w-full sm:w-auto">Go to Communication Hub</Button>
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
                A dedicated page might be found at <Link href="/contacts/vendor-insurance" className="text-primary hover:underline">Vendor Insurance</Link>.
            </p>
        </CardContent>
      </Card>
    </div>
  );
}

