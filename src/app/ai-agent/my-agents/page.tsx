
'use client';

import { useState, useMemo, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
  Search,
  FolderPlus,
  ArrowUpDown,
  Plus,
  ChevronRight,
  Bot,
  Linkedin,
  AlertTriangle,
  FileText,
  Signal,
  Pencil,
  Gift,
  Send,
  Globe,
  Settings2,
  MoreHorizontal,
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import Image from 'next/image';

interface AgentTool {
  id: string;
  name: string;
  icon: React.ElementType;
  color?: string;
}

interface Agent {
  id: string;
  agentIconUrl?: string; // URL for a specific agent icon image
  name: string;
  description: string;
  tools: AgentTool[];
  toolCount?: number;
  lastRun: Date;
  lastModified: Date;
  created: Date;
  tasksDone: number;
}

const initialAgents: Agent[] = [
  {
    id: '1',
    agentIconUrl: 'https://placehold.co/32x32.png', // Placeholder
    name: 'Apla, the Account Planning Agent',
    description: 'Completes in-depth research on an account, produces a report and updates to your CRM.',
    tools: [
      { id: 'linkedin', name: 'LinkedIn', icon: Linkedin },
      { id: 'alert', name: 'Alert', icon: AlertTriangle, color: 'text-red-500' },
      { id: 'file', name: 'File', icon: FileText },
      { id: 'signal', name: 'Signal', icon: Signal },
    ],
    toolCount: 6,
    lastRun: new Date(new Date().setMonth(new Date().getMonth() - 6)),
    lastModified: new Date(new Date().setMonth(new Date().getMonth() - 4)),
    created: new Date(new Date().setMonth(new Date().getMonth() - 4)),
    tasksDone: 0,
  },
  {
    id: '2',
    agentIconUrl: 'https://placehold.co/32x32.png', // Placeholder
    name: 'Lima, the Lifecycle Marketing Agent',
    description: 'Sends hyper-personalised onboarding email sequence to new users.',
    tools: [
      { id: 'pencil', name: 'Edit', icon: Pencil },
      { id: 'gift', name: 'Reward', icon: Gift },
      { id: 'send', name: 'Send', icon: Send },
    ],
    lastRun: new Date(new Date().setMonth(new Date().getMonth() - 6)),
    lastModified: new Date(new Date().setMonth(new Date().getMonth() - 4)),
    created: new Date(new Date().setMonth(new Date().getMonth() - 4)),
    tasksDone: 0,
  },
  {
    id: '3',
    agentIconUrl: 'https://placehold.co/32x32.png', // Placeholder
    name: "Lima's Researcher",
    description: 'Produces an in-depth research report on the customer.',
    tools: [
      { id: 'globe', name: 'Web', icon: Globe }, // Representing 'G' for Google
      { id: 'linkedin', name: 'LinkedIn', icon: Linkedin },
    ],
    toolCount: 2,
    lastRun: new Date(new Date().setMonth(new Date().getMonth() - 6)),
    lastModified: new Date(new Date().setMonth(new Date().getMonth() - 4)),
    created: new Date(new Date().setMonth(new Date().getMonth() - 4)),
    tasksDone: 0,
  },
];

// Helper to get a consistent "X time ago" string for client-side rendering
const useTimeAgo = (date: Date) => {
  const [timeAgo, setTimeAgo] = useState('');

  useEffect(() => {
    setTimeAgo(formatDistanceToNow(date, { addSuffix: true }));
  }, [date]);

  return timeAgo;
};

function AgentRow({ agent }: { agent: Agent }) {
  const lastRunTimeAgo = useTimeAgo(agent.lastRun);
  const lastModifiedTimeAgo = useTimeAgo(agent.lastModified);
  const createdTimeAgo = useTimeAgo(agent.created);

  return (
    <TableRow>
      <TableCell className="w-10">
        <ChevronRight className="h-5 w-5 text-muted-foreground" />
      </TableCell>
      <TableCell className="w-10">
        {agent.agentIconUrl ? (
          <Image src={agent.agentIconUrl} alt={agent.name} width={24} height={24} className="rounded-sm" data-ai-hint="agent logo" />
        ) : (
          <Bot className="h-6 w-6 text-muted-foreground" />
        )}
      </TableCell>
      <TableCell className="font-medium max-w-xs truncate">{agent.name}</TableCell>
      <TableCell className="text-muted-foreground max-w-sm truncate">{agent.description}</TableCell>
      <TableCell>
        <div className="flex items-center space-x-1">
          {agent.tools.slice(0, 4).map((tool) => (
            <tool.icon key={tool.id} className={`h-4 w-4 ${tool.color || 'text-muted-foreground'}`} title={tool.name} />
          ))}
          {agent.toolCount && agent.tools.length < agent.toolCount && (
            <span className="text-xs text-muted-foreground">+{agent.toolCount - agent.tools.length}</span>
          )}
        </div>
      </TableCell>
      <TableCell className="text-muted-foreground whitespace-nowrap">{lastRunTimeAgo}</TableCell>
      <TableCell className="text-muted-foreground whitespace-nowrap">{lastModifiedTimeAgo}</TableCell>
      <TableCell className="text-muted-foreground whitespace-nowrap">{createdTimeAgo}</TableCell>
      <TableCell className="text-muted-foreground text-right">{agent.tasksDone}</TableCell>
      <TableCell className="text-right">
        <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal className="h-4 w-4" />
        </Button>
      </TableCell>
    </TableRow>
  );
}

export default function MyAgentsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [agents, setAgents] = useState<Agent[]>([]);

  // Ensure initialAgents is only set once on the client after mount
  useEffect(() => {
    setAgents(initialAgents);
  }, []);


  const filteredAgents = useMemo(() => {
    if (!searchTerm) return agents;
    return agents.filter(
      (agent) =>
        agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agent.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, agents]);

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Bot className="h-8 w-8" /> Agents
        </h1>
        <Button size="lg">
          <Plus className="mr-2 h-5 w-5" /> New Agent
        </Button>
      </div>

      <div className="flex items-center justify-between mb-4 gap-2">
        <div className="relative flex-grow max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <FolderPlus className="mr-2 h-4 w-4" /> New Folder
          </Button>
          <Button variant="outline">
            <ArrowUpDown className="mr-2 h-4 w-4" /> Sort: Last modified
          </Button>
        </div>
      </div>

      <div className="bg-card rounded-lg shadow overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow><TableHead className="w-10"></TableHead><TableHead className="w-10"></TableHead><TableHead>Agent name</TableHead><TableHead>Description</TableHead><TableHead>Tools</TableHead><TableHead>Last run</TableHead><TableHead>Last modified <ArrowUpDown className="inline-block ml-1 h-3 w-3" /></TableHead><TableHead>Created</TableHead><TableHead className="text-right">Tasks done</TableHead><TableHead className="w-12"></TableHead></TableRow>
          </TableHeader>
          <TableBody>
            {filteredAgents.length > 0 ? (
              filteredAgents.map((agent) => <AgentRow key={agent.id} agent={agent} />)
            ) : (
              <TableRow>
                <TableCell colSpan={10} className="h-24 text-center text-muted-foreground">
                  No agents found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
