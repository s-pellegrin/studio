
'use client';

import {
  ArrowLeft,
  Bot,
  ChevronDown,
  Play,
  Hammer,
  History,
  Lightbulb,
  Wrench,
  BookOpen,
  Zap,
  TrendingUp,
  Tag,
  ListFilter,
  Settings2,
  HelpCircle,
  AlertTriangle,
  ChevronsRight,
  Plus,
  MoreHorizontal,
  FileText,
  Search as SearchIcon,
  Link2 as ExtractContentIcon,
  CheckCircle,
  PenLine,
  Share,
  RefreshCw,
  Menu as MenuIcon,
  Globe,
  Linkedin,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input'; // Added Input import
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { initialAgents, type Agent } from '../page'; // Assuming Agent type is exported
import { useEffect, useState, type ChangeEvent } from 'react';
import { useParams } from 'next/navigation';


const ToolPill = ({ icon: Icon, text, color }: { icon?: React.ElementType; text: string; color?: string }) => (
  <Badge variant="secondary" className={`inline-flex items-center gap-1.5 mr-1 mb-1 ${color || ''}`}>
    {Icon && <Icon className="h-3 w-3" />}
    {text}
  </Badge>
);

const AgentDetailToolItem = ({ icon: Icon, name, description }: { icon: React.ElementType; name: string; description: string }) => (
  <div className="p-2 hover:bg-muted/50 rounded-md">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Icon className="h-5 w-5 text-primary" />
        <span className="text-sm font-medium">{name}</span>
      </div>
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon" className="h-6 w-6">
          <Zap className="h-3 w-3" />
        </Button>
        <Button variant="ghost" size="icon" className="h-6 w-6">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>
    </div>
    <p className="text-xs text-muted-foreground ml-7">{description}</p>
  </div>
);


export default function AgentDetailPage() {
  const params = useParams();
  const agentId = params.agentId as string;
  const [agent, setAgent] = useState<Agent | null>(null);

  const [editableAgentName, setEditableAgentName] = useState('');
  const [editableAgentDescription, setEditableAgentDescription] = useState('');
  const [agentRole, setAgentRole] = useState("You are a world-class salesperson and account executive who specialises in researching companies and recording useful notes for sales.");
  const [agentCompany, setAgentCompany] = useState("You work for {{ company_name }}. Description: {{ company_description }}");
  const [agentInstructions, setAgentInstructions] = useState("Your task is to compile a detailed research report on a prospect company. You will start with no prior knowledge about the company and will use various research methods to gather information.");
  const [agentCoreFlow, setAgentCoreFlow] = useState(
    `1/ Use <ToolPill icon={Globe} text="Google Search" /> to find the prospect company's website; then use <ToolPill icon={ExtractContentIcon} text="Extract content from website" /> and <ToolPill text="Unknown reference" color="bg-red-200 text-red-800 border-red-400 hover:bg-red-300" /> to understand their products/services and key messaging.
2/ Use <ToolPill icon={Globe} text="Google Search" /> to find the prospect company's pricing page or other relevant queries and then use <ToolPill icon={ExtractContentIcon} text="Extract content from website" /> to find out how the company makes money.
3/ Use <ToolPill icon={Globe} text="Google Search" /> to find the prospect's annual revenue, usually getlatka.com has a good estimates.
4/ Use <ToolPill icon={Globe} text="Google Search" /> to find the company's Linkedin page and use <ToolPill icon={Linkedin} text="Get Linkedin Profile" /> to find the employee count, industry, and any recent positive posts specifically relevant to the company.
5/ Use <ToolPill icon={Globe} text="Google Search" /> to find recent positive news, announcements, and/or product releases from the prospect's company; these will be growth indicators of the company. Pick 2 websites from step 5 to dig deeper with <ToolPill icon={ExtractContentIcon} text="Extract content from website" />. If there is there any website url that ends with ".pdf" then use <ToolPill icon={FileText} text="Read PDF" />.
6/ Use <ToolPill icon={Globe} text="Google Search" /> to find recent funding rounds of the prospect if any.
7/ Use <ToolPill icon={AlertTriangle} text="Qualify account" /> to identify the account's fit score, which should be a score between 1 and 5 Chilli Peppers (to indicate how "hot" the account is).
8/ Use <ToolPill icon={PenLine} text="Write conversation levers" /> to generate conversation levers.
9/ Use <ToolPill icon={CheckCircle} text="Get validated & enriched prospects" /> to find relevant employees of the prospect's company to add as contacts. Then use <ToolPill icon={Share} text="Insert new contacts in HubSpot" /> to add these contacts to the CRM (never make up the contacts or fall back to famous contacts, only take contacts from the previous tool; if none, then skip)`
  );


  useEffect(() => {
    if (agentId) {
      const foundAgent = initialAgents.find(a => a.id === agentId);
      setAgent(foundAgent || null);
      if (foundAgent) {
        setEditableAgentName(foundAgent.name);
        setEditableAgentDescription(foundAgent.description);
        // Potentially set role, company, instructions, core flow if they exist on Agent type
      }
    }
  }, [agentId]);
  
  const agentIconUrl = agent?.agentIconUrl || "https://placehold.co/40x40.png";


  const leftSidebarItems = [
    { name: 'Prompt', icon: Lightbulb, active: true },
    { name: 'Tools', icon: Wrench },
    { name: 'Knowledge', icon: BookOpen },
    { name: 'Triggers', icon: Zap },
    { name: 'Escalations', icon: TrendingUp },
    { name: 'Metadata', icon: Tag },
    { name: 'Variables', icon: ListFilter, alert: true },
  ];

  const rightSidebarTools = [
    { name: 'Read PDF', icon: FileText, description: "Read's PDF via the url, do NOT make up urls." },
    { name: 'Google Search', icon: SearchIcon, description: "Search the internet for the latest information about a topic." },
    { name: 'Extract content from website', icon: ExtractContentIcon, description: "Use to extract text content from a URL." },
    { name: 'Insert new contacts in HubSpot', icon: Share, description: "Describe how agent should use tool..." },
    { name: 'Update custom variables in HubSpot', icon: Share, description: "Describe how agent should use tool..." },
    { name: 'Create company notes in HubSpot', icon: Share, description: "Describe how agent should use tool..." },
    { name: 'Get validated & enriched prospects', icon: CheckCircle, description: "Retrieves a list of sales prospects for a given company, an..." },
    { name: 'Qualify account', icon: AlertTriangle, description: "Qualifies the account based on the research done and co..." },
    { name: 'Write conversation levers', icon: PenLine, description: "Use this to generate conversation levers for a prospect's c..." },
    { name: 'Get Linkedin Profile', icon: Linkedin, description: "Retrieves Linkedin profile for a specific company." },
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]"> {/* Adjust height to account for global header */}
      {/* Top Bar specific to this page */}
      <div className="flex items-center justify-between p-3 border-b bg-background sticky top-16 z-20"> {/* sticky top-16 assumes global header is 4rem/16 h */}
        <div className="flex items-center gap-2">
          <Link href="/ai-agent/my-agents" passHref>
             <Button variant="ghost" size="icon"> <ArrowLeft className="h-5 w-5" /></Button>
          </Link>
          {agentIconUrl ? <Image src={agentIconUrl} alt="Agent Icon" width={24} height={24} className="rounded-sm" data-ai-hint="agent logo pixelated"/> : <Bot className="h-6 w-6" /> }
          <span className="font-semibold">{editableAgentName || "Agent"}</span>
          <Button variant="ghost" size="icon" className="h-6 w-6"><ChevronDown className="h-4 w-4" /></Button>
          <Badge variant="outline">Unsaved</Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline"><Play className="mr-2 h-4 w-4" /> Run</Button>
          <Button variant="outline"><Hammer className="mr-2 h-4 w-4" /> Build</Button>
          <div className="h-6 border-l mx-2"></div>
          <Button variant="ghost"><History className="mr-2 h-4 w-4" /> Versions</Button>
          <Button variant="default">Publish changes <ChevronDown className="ml-2 h-4 w-4" /></Button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <aside className="w-64 border-r p-4 space-y-2 flex flex-col bg-card">
          <ScrollArea className="flex-grow">
            {leftSidebarItems.map(item => (
              <Button
                key={item.name}
                variant={item.active ? 'secondary' : 'ghost'}
                className="w-full justify-start gap-2 mb-1"
              >
                <item.icon className="h-4 w-4" />
                {item.name}
                {item.alert && <AlertTriangle className="h-4 w-4 text-yellow-500 ml-auto" />}
              </Button>
            ))}
          </ScrollArea>
          <Separator />
          <Button variant="ghost" className="w-full justify-start gap-2 mt-auto"><Settings2 className="h-4 w-4" /> Advanced</Button>
          <Button variant="ghost" className="w-full justify-start gap-2"><HelpCircle className="h-4 w-4" /> Need help?</Button>
        </aside>

        {/* Center Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="flex items-center gap-3 mb-4">
              {agentIconUrl ? <Image src={agentIconUrl} alt="Agent Icon" width={40} height={40} className="rounded-md" data-ai-hint="agent logo pixelated" /> : <Bot className="h-10 w-10" /> }
              <div className="w-full">
                 <Input
                    value={editableAgentName}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setEditableAgentName(e.target.value)}
                    placeholder="Agent Name"
                    className="text-xl font-semibold border-muted-foreground/30 focus:border-primary p-2 h-auto"
                  />
                  <Textarea
                    value={editableAgentDescription}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setEditableAgentDescription(e.target.value)}
                    placeholder="Agent Description"
                    className="text-sm text-muted-foreground border-muted-foreground/30 focus:border-primary mt-1 p-2"
                    rows={2}
                  />
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-1">Your role</h2>
              <Textarea
                placeholder="You are a world-class salesperson and account executive..."
                value={agentRole}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setAgentRole(e.target.value)}
                rows={3}
                className="border-muted-foreground/30 focus:border-primary"
              />
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-1">Your company</h2>
              <Textarea
                placeholder="You work for {{ company_name }}. Description: {{ company_description }}"
                value={agentCompany}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setAgentCompany(e.target.value)}
                rows={2}
                className="border-muted-foreground/30 focus:border-primary"
              />
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-1">Instructions</h2>
              <Textarea
                placeholder="Your task is to compile a detailed research report..."
                value={agentInstructions}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setAgentInstructions(e.target.value)}
                rows={4}
                className="border-muted-foreground/30 focus:border-primary"
              />
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-2">Core flow to always follow step by step</h2>
               <Textarea
                placeholder="Describe the core flow steps here..."
                value={agentCoreFlow}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setAgentCoreFlow(e.target.value)}
                rows={15} // Adjust rows as needed for better editing experience
                className="border-muted-foreground/30 focus:border-primary p-4 bg-muted/30"
              />
            </div>
             <div className="flex items-center justify-between text-sm mt-4">
                <Button variant="outline" size="sm"><RefreshCw className="h-4 w-4 mr-2"/>Run task</Button>
                <span className="text-muted-foreground flex items-center gap-1"><MenuIcon className="h-4 w-4"/> Use / menu to reference tools</span>
            </div>
          </div>
        </main>

        {/* Right Sidebar */}
        <aside className="w-80 border-l bg-card">
          <ScrollArea className="h-full">
            <div className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                 <Select defaultValue="claude-v3.5-haiku">
                    <SelectTrigger className="w-full text-xs">
                      <SelectValue placeholder="Select model" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="claude-v3.5-haiku">Claude v3.5 Haiku (Latest) - anthropic</SelectItem>
                      <SelectItem value="gpt-4">GPT-4 - OpenAI</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="ghost" size="icon" className="ml-2"><ChevronsRight className="h-5 w-5" /></Button>
              </div>

              <Card>
                <CardHeader className="p-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base flex items-center gap-1">Tools <ChevronDown className="h-4 w-4" /></CardTitle>
                    <Button variant="default" size="sm"><Plus className="h-4 w-4 mr-1" />Add tool</Button>
                  </div>
                </CardHeader>
                <CardContent className="p-3 pt-0 space-y-1">
                  {rightSidebarTools.map(tool => (
                    <AgentDetailToolItem key={tool.name} icon={tool.icon} name={tool.name} description={tool.description} />
                  ))}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="p-3">
                   <div className="flex items-center justify-between">
                    <CardTitle className="text-base flex items-center gap-1">Variables <ChevronDown className="h-4 w-4" /></CardTitle>
                    <Button variant="ghost" size="icon" className="h-7 w-7"><Plus className="h-4 w-4" /></Button>
                  </div>
                </CardHeader>
                <CardContent className="p-3 pt-0 space-y-2">
                    <div className="text-sm">
                        <label htmlFor="hubspot-oauth" className="font-medium block mb-1">Hubspot oAuth account <span className="text-red-500">*</span></label>
                        <Select>
                            <SelectTrigger id="hubspot-oauth" className="w-full">
                                <SelectValue placeholder="Select connected account..." />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="account1">Connected Account 1</SelectItem>
                                <SelectItem value="add-new">Add new account...</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
              </Card>
            </div>
          </ScrollArea>
        </aside>
      </div>
    </div>
  );
}
    
