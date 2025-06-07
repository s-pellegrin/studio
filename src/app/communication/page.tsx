
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, MessageSquareText, Send, BellRing, History, Users, Search, PlusCircle } from "lucide-react";
import { useState } from "react";

// Mock data - in a real app, this would come from an API
const mockEmails = [
  { id: 'email1', sender: 'tenant@example.com', subject: 'Leaky Faucet Report', snippet: 'Hi, my kitchen faucet is dripping...', type: 'inbox', date: '2024-07-20', read: false },
  { id: 'email2', sender: 'owner@example.com', subject: 'Monthly Statement Question', snippet: 'Could you clarify a charge on my statement?', type: 'inbox', date: '2024-07-19', read: true },
  { id: 'email3', recipient: 'all_tenants@domain.com', subject: 'Pool Maintenance Tomorrow', snippet: 'The pool will be closed for maintenance...', type: 'sent', date: '2024-07-18' },
];

const mockAnnouncements = [
  { id: 'ann1', title: 'Upcoming Holiday Office Closure', content: 'Our offices will be closed on July 4th...', audience: 'All Tenants', date: '2024-06-28' },
  { id: 'ann2', title: 'Reminder: Quarterly HOA Meeting', content: 'Join us for the Q3 HOA meeting next Tuesday...', audience: 'Oakwood HOA', date: '2024-07-15' },
];

const mockLogs = [
  { id: 'log1', type: 'Automated Notification', description: 'Rent reminder sent to Tenant X (Unit 101)', date: '2024-07-01T10:00:00Z', channel: 'Email' },
  { id: 'log2', type: 'Bulk Announcement', description: 'Sent "Pool Maintenance" to All Tenants', date: '2024-07-18T14:30:00Z', channel: 'Email, SMS' },
  { id: 'log3', type: 'Direct Message', description: 'Replied to tenant@example.com re: Leaky Faucet', date: '2024-07-20T11:15:00Z', channel: 'Email' },
];


export default function CommunicationPage() {
  const [activeTab, setActiveTab] = useState("inbox");

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <MessageSquareText className="h-8 w-8 text-primary" /> Communication Hub
        </h1>
        <Button>
          <PlusCircle className="mr-2 h-5 w-5" /> New Message / Announcement
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-6">
          <TabsTrigger value="inbox">
            <Mail className="mr-2 h-4 w-4 sm:hidden md:inline-block" />Inbox
          </TabsTrigger>
          <TabsTrigger value="announcements">
            <Send className="mr-2 h-4 w-4 sm:hidden md:inline-block" />Announcements
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <BellRing className="mr-2 h-4 w-4 sm:hidden md:inline-block" />Automated Notifications
          </TabsTrigger>
          <TabsTrigger value="logs">
            <History className="mr-2 h-4 w-4 sm:hidden md:inline-block" />Logs
          </TabsTrigger>
        </TabsList>

        <TabsContent value="inbox">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-6 w-6 text-primary" /> Centralized Inbox
              </CardTitle>
              <CardDescription>Manage emails and SMS messages from tenants, owners, and vendors in one place.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div className="relative w-full max-w-sm">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search inbox..." className="pl-10" />
                </div>
                <Button variant="outline">Filters</Button>
              </div>
              <div className="border rounded-lg overflow-hidden">
                {mockEmails.map(email => (
                  <div key={email.id} className={`p-4 border-b last:border-b-0 hover:bg-muted/50 cursor-pointer ${!email.read && email.type === 'inbox' ? 'bg-primary/10 font-semibold' : ''}`}>
                    <div className="flex justify-between items-center text-sm mb-1">
                      <span>{email.type === 'inbox' ? email.sender : `To: ${email.recipient}`}</span>
                      <span className="text-xs text-muted-foreground">{new Date(email.date).toLocaleDateString()}</span>
                    </div>
                    <p className="text-sm">{email.subject}</p>
                    <p className="text-xs text-muted-foreground truncate">{email.snippet}</p>
                  </div>
                ))}
                {mockEmails.length === 0 && <p className="p-4 text-center text-muted-foreground">No messages in inbox.</p>}
              </div>
               <Button variant="outline" className="mt-4 w-full sm:w-auto">Load More Messages</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="announcements">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Send className="h-6 w-6 text-primary" /> Bulk Announcements
              </CardTitle>
              <CardDescription>Send out important updates to tenants, owners, or specific groups.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4 p-4 border rounded-lg bg-muted/30">
                <h3 className="font-semibold mb-2">Create New Announcement</h3>
                <Input placeholder="Announcement Title" className="mb-2" />
                <Textarea placeholder="Announcement Content..." rows={3} className="mb-2" />
                <div className="flex flex-col sm:flex-row gap-2 justify-between">
                  <Input placeholder="Target Audience (e.g., All Tenants, Oakwood HOA)" className="flex-grow"/>
                  <Button><Send className="mr-2 h-4 w-4"/> Send Announcement</Button>
                </div>
              </div>
              <h3 className="font-semibold mb-2 text-lg">Sent Announcements</h3>
               <div className="border rounded-lg overflow-hidden">
                {mockAnnouncements.map(ann => (
                  <div key={ann.id} className="p-4 border-b last:border-b-0">
                    <div className="flex justify-between items-start text-sm mb-1">
                      <h4 className="font-medium">{ann.title}</h4>
                      <span className="text-xs text-muted-foreground">{new Date(ann.date).toLocaleDateString()}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-1">Audience: {ann.audience}</p>
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">{ann.content}</p>
                  </div>
                ))}
                {mockAnnouncements.length === 0 && <p className="p-4 text-center text-muted-foreground">No announcements sent yet.</p>}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BellRing className="h-6 w-6 text-primary" /> Automated Notifications
              </CardTitle>
              <CardDescription>Set up and manage automated messages for rent reminders, maintenance updates, lease renewals, etc.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                This section is under development. Features will include:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-sm text-muted-foreground">
                <li>Configuring templates for various automated notifications.</li>
                <li>Setting triggers (date-based, event-based).</li>
                <li>Viewing logs of automated messages sent.</li>
                <li>Customizing delivery channels (Email, SMS).</li>
              </ul>
              <Button variant="outline" className="mt-4">Manage Notification Templates</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="h-6 w-6 text-primary" /> Communication Logs
              </CardTitle>
              <CardDescription>A comprehensive history of all sent and received communications.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-between mb-4">
                    <div className="relative w-full max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search logs..." className="pl-10" />
                    </div>
                    <Button variant="outline">Filter Logs</Button>
              </div>
              <div className="border rounded-lg overflow-hidden">
                {mockLogs.map(log => (
                   <div key={log.id} className="p-3 border-b last:border-b-0">
                    <div className="flex justify-between items-center text-sm mb-1">
                        <span className="font-medium">{log.type}</span>
                        <span className="text-xs text-muted-foreground">{new Date(log.date).toLocaleString()}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{log.description}</p>
                    <p className="text-xs text-muted-foreground">Channel: {log.channel}</p>
                   </div>
                ))}
                {mockLogs.length === 0 && <p className="p-4 text-center text-muted-foreground">No communication logs available.</p>}
              </div>
              <Button variant="outline" className="mt-4 w-full sm:w-auto">Load More Logs</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
