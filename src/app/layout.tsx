
'use client';

import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Home,
  FileText,
  Users,
  DollarSign,
  Wrench,
  ListChecks,
  MessageSquare,
  Folder,
  BarChart2,
  PieChart,
  LayoutDashboard,
  Building,
  Brain,
  Settings,
  Bell,
  UserCircle,
  Languages,
  Zap,
  Search,
  Rocket,
  Sparkles,
  Star, // Added Star icon for Review button
  Sun, 
  Moon, 
} from 'lucide-react';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarInset,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from '@/components/ui/dropdown-menu';
import AppLogo from '@/components/layout/app-logo';
import NavigationMenuClient from '@/components/layout/navigation-menu-client';
import { Input } from '@/components/ui/input';
import { useState, useEffect } from 'react';


// export const metadata: Metadata = { // Metadata should be exported from server components or page.tsx
//   title: 'ManageMATE',
//   description: 'Modern Property Management System',
// };

const navItems = [
  { href: '/', label: 'Dashboard', iconName: 'LayoutDashboard' },
  { href: '/rentals', label: 'Rentals', iconName: 'Home' },
  { href: '/leasing', label: 'Leasing', iconName: 'FileText' },
  { href: '/associations', label: 'Associations', iconName: 'Users' },
  { href: '/accounting', label: 'Accounting', iconName: 'DollarSign' },
  { href: '/maintenance', label: 'Maintenance', iconName: 'Wrench' },
  { href: '/tasks', label: 'Tasks', iconName: 'ListChecks' },
  { href: '/communication', label: 'Communication', iconName: 'MessageSquare' },
  { href: '/files', label: 'Files', iconName: 'Folder' },
  {
    label: 'Reports',
    iconName: 'BarChart2',
    subItems: [
      { href: '/reports/financial', label: 'Financial Reports' },
      { href: '/reports/operational', label: 'Operational Reports' },
      { href: '/reports/maintenance', label: 'Maintenance Reports' },
      { href: '/reports/tenant-leasing', label: 'Tenant & Leasing' },
      { href: '/reports/association', label: 'Association Reports' },
      { href: '/reports/custom-builder', label: 'Custom Report Builder' },
    ]
  },
  { href: '/analytics', label: 'Analytics Hub', iconName: 'PieChart' },
  { href: '/tenants', label: 'Tenant Browser', iconName: 'Users' },
  { href: '/properties', label: 'Property Browser', iconName: 'Building' },
  {
    label: 'AI Agent',
    iconName: 'Brain',
    subItems: [
      { href: '/automations', label: 'Automations' },
      { href: '/ai-agent/my-agents', label: 'My Agents' },
      { href: '/ai-agent/knowledge-base', label: 'Knowledge Base' },
      { href: '/ai-agent/api-keys', label: 'API Keys' },
    ]
  },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isAssistantMode, setIsAssistantMode] = useState(false);
  const [theme, setTheme] = useState('light'); // 'light' or 'dark'

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (storedTheme) {
      setTheme(storedTheme);
      if (storedTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } else if (systemPrefersDark) {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    } else {
      setTheme('light');
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };


  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>ManageMATE</title>
        <meta name="description" content="Modern Property Management System" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className={cn('font-body antialiased min-h-screen bg-background')}>
        <SidebarProvider>
          <Sidebar variant="sidebar" collapsible="icon" className="border-r">
            <SidebarHeader className="p-4 flex items-center">
              <Link href="/" className="flex items-center gap-2">
                <AppLogo className="w-8 h-8 text-primary" />
                <span className="font-semibold text-lg group-data-[collapsible=icon]:hidden">ManageMATE</span>
              </Link>
            </SidebarHeader>
            <SidebarContent className="p-2">
             <NavigationMenuClient navItems={navItems} />
            </SidebarContent>
            <SidebarFooter className="p-4">
              <Link href="/upgrade" passHref legacyBehavior>
                <SidebarMenuButton
                  className="justify-start"
                >
                  <Rocket className="h-5 w-5" />
                  <span>Upgrade</span>
                </SidebarMenuButton>
              </Link>
            </SidebarFooter>
          </Sidebar>
          <SidebarInset>
            <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b bg-background/80 px-4 backdrop-blur-sm sm:px-6">
              <div className="flex items-center">
                <SidebarTrigger />
              </div>
              
              <div className="flex-1 flex justify-center px-2 sm:px-4">
                <div className="flex items-center w-full max-w-lg gap-2"> {/* Increased max-width slightly */}
                  <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                    <Input
                      type="search"
                      placeholder={isAssistantMode ? "Ask your AI Assistant..." : "Search anything..."}
                      className="w-full pl-10 h-10 text-sm"
                      // Add onKeyDown or other handlers for search/AI submission later
                    />
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => setIsAssistantMode(!isAssistantMode)}
                    aria-label={isAssistantMode ? "Switch to Search Mode" : "Switch to AI Assistant Mode"}
                  >
                    {isAssistantMode ? <Search className="h-5 w-5" /> : <Sparkles className="h-5 w-5 text-primary" />}
                  </Button>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-4">
                <Button variant="ghost" size="icon" aria-label="Notifications">
                  <Bell className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" aria-label="Leave a Review">
                  <Star className="h-5 w-5" />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src="https://placehold.co/100x100.png" alt="User Avatar" data-ai-hint="user avatar"/>
                        <AvatarFallback>MA</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <Link href="/settings/profile" passHref>
                      <DropdownMenuItem>
                        <UserCircle className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </DropdownMenuItem>
                    </Link>
                    <Link href="/settings" passHref>
                      <DropdownMenuItem>
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuSeparator />
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger>
                        <Languages className="mr-2 h-4 w-4" />
                        <span>Language</span>
                      </DropdownMenuSubTrigger>
                      <DropdownMenuSubContent>
                        <DropdownMenuItem>English</DropdownMenuItem>
                        <DropdownMenuItem>Chinese (Traditional)</DropdownMenuItem>
                        <DropdownMenuItem>Chinese (Simplified)</DropdownMenuItem>
                      </DropdownMenuSubContent>
                    </DropdownMenuSub>
                    <DropdownMenuItem onClick={toggleTheme}>
                      {theme === 'light' ? (
                        <Moon className="mr-2 h-4 w-4" />
                      ) : (
                        <Sun className="mr-2 h-4 w-4" />
                      )}
                      <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Logout</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </header>
            <main className="flex-1 p-4 sm:p-6">{children}</main>
          </SidebarInset>
        </SidebarProvider>
        <Toaster />
      </body>
    </html>
  );
}
