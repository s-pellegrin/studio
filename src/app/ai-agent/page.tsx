'use client';

import { useState, type FormEvent } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Loader2, Wand2 } from 'lucide-react';
import { respondToTenantInquiry } from '@/ai/flows/respond-to-tenant-inquiries';
import { summarizeSupportHistory } from '@/ai/flows/summarize-support-history';
import { suggestMaintenanceActions } from '@/ai/flows/suggest-maintenance-actions';
import { useToast } from '@/hooks/use-toast';

export default function AIAgentPage() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('inquiry');

  // State for Tenant Inquiry
  const [inquiry, setInquiry] = useState('');
  const [tenantIdForInquiry, setTenantIdForInquiry] = useState('');
  const [inquiryResponse, setInquiryResponse] = useState('');
  const [isInquiryLoading, setIsInquiryLoading] = useState(false);

  // State for Support History Summary
  const [supportHistory, setSupportHistory] = useState('');
  const [tenantIdForHistory, setTenantIdForHistory] = useState('');
  const [historySummary, setHistorySummary] = useState('');
  const [isHistoryLoading, setIsHistoryLoading] = useState(false);

  // State for Maintenance Suggestions
  const [maintenanceInquiry, setMaintenanceInquiry] = useState('');
  const [maintenanceSuggestions, setMaintenanceSuggestions] = useState<string[]>([]);
  const [isMaintenanceLoading, setIsMaintenanceLoading] = useState(false);

  const handleTenantInquirySubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!inquiry || !tenantIdForInquiry) {
      toast({ title: "Missing fields", description: "Please enter Tenant ID and Inquiry.", variant: "destructive" });
      return;
    }
    setIsInquiryLoading(true);
    setInquiryResponse('');
    try {
      const result = await respondToTenantInquiry({ inquiry, tenantId: tenantIdForInquiry });
      setInquiryResponse(result.response);
      toast({ title: "Response Generated", description: "AI has responded to the inquiry." });
    } catch (error) {
      console.error("Error responding to tenant inquiry:", error);
      setInquiryResponse('Error generating response.');
      toast({ title: "Error", description: "Could not generate response.", variant: "destructive" });
    } finally {
      setIsInquiryLoading(false);
    }
  };

  const handleSupportHistorySubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!supportHistory || !tenantIdForHistory) {
      toast({ title: "Missing fields", description: "Please enter Tenant ID and Support History.", variant: "destructive" });
      return;
    }
    setIsHistoryLoading(true);
    setHistorySummary('');
    try {
      const result = await summarizeSupportHistory({ supportHistory, tenantId: tenantIdForHistory });
      setHistorySummary(result.summary);
      toast({ title: "Summary Generated", description: "Support history summarized." });
    } catch (error) {
      console.error("Error summarizing support history:", error);
      setHistorySummary('Error generating summary.');
      toast({ title: "Error", description: "Could not generate summary.", variant: "destructive" });
    } finally {
      setIsHistoryLoading(false);
    }
  };

  const handleMaintenanceSuggestionsSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!maintenanceInquiry) {
      toast({ title: "Missing field", description: "Please enter the maintenance inquiry.", variant: "destructive" });
      return;
    }
    setIsMaintenanceLoading(true);
    setMaintenanceSuggestions([]);
    try {
      const result = await suggestMaintenanceActions({ tenantInquiry: maintenanceInquiry });
      setMaintenanceSuggestions(result.suggestedActions);
      toast({ title: "Suggestions Generated", description: "Maintenance actions suggested." });
    } catch (error) {
      console.error("Error suggesting maintenance actions:", error);
      setMaintenanceSuggestions(['Error generating suggestions.']);
      toast({ title: "Error", description: "Could not generate suggestions.", variant: "destructive" });
    } finally {
      setIsMaintenanceLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">AI Agent Hub</h1>
      </div>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="inquiry">Tenant Inquiry Responder</TabsTrigger>
          <TabsTrigger value="history">Support History Summarizer</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance Suggester</TabsTrigger>
        </TabsList>

        <TabsContent value="inquiry">
          <Card>
            <CardHeader>
              <CardTitle>Respond to Tenant Inquiries</CardTitle>
              <CardDescription>Let the AI handle common tenant questions and requests.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleTenantInquirySubmit} className="space-y-4">
                <div>
                  <Label htmlFor="tenantIdInquiry">Tenant ID</Label>
                  <Input
                    id="tenantIdInquiry"
                    value={tenantIdForInquiry}
                    onChange={(e) => setTenantIdForInquiry(e.target.value)}
                    placeholder="Enter Tenant ID (e.g., T12345)"
                  />
                </div>
                <div>
                  <Label htmlFor="inquiryText">Tenant Inquiry</Label>
                  <Textarea
                    id="inquiryText"
                    value={inquiry}
                    onChange={(e) => setInquiry(e.target.value)}
                    placeholder="Enter tenant's question or request here..."
                    rows={4}
                  />
                </div>
                <Button type="submit" disabled={isInquiryLoading}>
                  {isInquiryLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
                  Generate Response
                </Button>
              </form>
              {inquiryResponse && (
                <div className="mt-6 p-4 border rounded-md bg-muted">
                  <h4 className="font-semibold mb-2">AI Response:</h4>
                  <p className="text-sm whitespace-pre-wrap">{inquiryResponse}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Summarize Support History</CardTitle>
              <CardDescription>Get a quick summary of a tenant's past support interactions.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSupportHistorySubmit} className="space-y-4">
                <div>
                  <Label htmlFor="tenantIdHistory">Tenant ID</Label>
                  <Input
                    id="tenantIdHistory"
                    value={tenantIdForHistory}
                    onChange={(e) => setTenantIdForHistory(e.target.value)}
                    placeholder="Enter Tenant ID (e.g., T12345)"
                  />
                </div>
                <div>
                  <Label htmlFor="supportHistoryText">Support History</Label>
                  <Textarea
                    id="supportHistoryText"
                    value={supportHistory}
                    onChange={(e) => setSupportHistory(e.target.value)}
                    placeholder="Paste or type tenant's support history here..."
                    rows={6}
                  />
                </div>
                <Button type="submit" disabled={isHistoryLoading}>
                  {isHistoryLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
                  Generate Summary
                </Button>
              </form>
              {historySummary && (
                <div className="mt-6 p-4 border rounded-md bg-muted">
                  <h4 className="font-semibold mb-2">Support History Summary:</h4>
                  <p className="text-sm whitespace-pre-wrap">{historySummary}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="maintenance">
          <Card>
            <CardHeader>
              <CardTitle>Suggest Maintenance Actions</CardTitle>
              <CardDescription>Get AI-powered suggestions for maintenance based on tenant reports.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleMaintenanceSuggestionsSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="maintenanceInquiryText">Tenant's Maintenance Inquiry</Label>
                  <Textarea
                    id="maintenanceInquiryText"
                    value={maintenanceInquiry}
                    onChange={(e) => setMaintenanceInquiry(e.target.value)}
                    placeholder="Enter tenant's description of the maintenance issue..."
                    rows={4}
                  />
                </div>
                <Button type="submit" disabled={isMaintenanceLoading}>
                  {isMaintenanceLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
                  Get Suggestions
                </Button>
              </form>
              {maintenanceSuggestions.length > 0 && (
                <div className="mt-6 p-4 border rounded-md bg-muted">
                  <h4 className="font-semibold mb-2">Suggested Maintenance Actions:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    {maintenanceSuggestions.map((action, index) => (
                      <li key={index}>{action}</li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
