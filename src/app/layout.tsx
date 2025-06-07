

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
} from 'lucide-react';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import {
  SidebarProvider, // Will now import the re-exported ClientSidebarProvider as SidebarProvider
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
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
} from '@/components/ui/dropdown-menu';
import AppLogo from '@/components/layout/app-logo';

export const metadata: Metadata = {
  title: 'ManageMATE',
  description: 'Modern Property Management System',
};

const navItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/rentals', label: 'Rentals', icon: Home },
  { href: '/leasing', label: 'Leasing', icon: FileText },
  { href: '/associations', label: 'Associations', icon: Users },
  { href: '/accounting', label: 'Accounting', icon: DollarSign },
  { href: '/maintenance', label: 'Maintenance', icon: Wrench },
  { href: '/tasks', label: 'Tasks', icon: ListChecks },
  { href: '/communication', label: 'Communication', icon: MessageSquare },
  { href: '/files', label: 'Files', icon: Folder },
  { href: '/reports', label: 'Reports', icon: BarChart2 },
  { href: '/analytics', label: 'Analytics Hub', icon: PieChart },
  { href: '/tenants', label: 'Tenant Browser', icon: Users },
  { href: '/properties', label: 'Property Browser', icon: Building },
  { href: '/ai-agent', label: 'AI Agent', icon: Brain },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className={cn('font-body antialiased min-h-screen bg-background')}>
        <SidebarProvider> {/* Using the re-exported ClientSidebarProvider as SidebarProvider */}
          <Sidebar variant="sidebar" collapsible="icon" className="border-r">
            <SidebarHeader className="p-4">
              <Link href="/" className="flex items-center gap-2">
                <AppLogo className="w-8 h-8 text-primary" />
                <span className="font-semibold text-lg group-data-[collapsible=icon]:hidden">ManageMATE</span>
              </Link>
            </SidebarHeader>
            <SidebarContent className="p-2">
              <SidebarMenu>
                {navItems.map((item) => (
                  <SidebarMenuItem key={item.label}>
                    <Link href={item.href} asChild>
                      <SidebarMenuButton
                        tooltip={{ children: item.label, side: 'right', className: 'ml-1' }}
                        className="justify-start"
                      >
                        <item.icon className="h-5 w-5" />
                        <span>{item.label}</span>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarContent>
            <SidebarFooter className="p-4">
              <Link href="/settings" asChild>
                <SidebarMenuButton
                  tooltip={{ children: 'Settings', side: 'right', className: 'ml-1' }}
                  className="justify-start"
                >
                  <Settings className="h-5 w-5" />
                  <span>Settings</span>
                </SidebarMenuButton>
              </Link>
            </SidebarFooter>
          </Sidebar>
          <SidebarInset>
            <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b bg-background/80 px-4 backdrop-blur-sm sm:px-6">
              <div className="flex items-center gap-2">
                <SidebarTrigger className="md:hidden" />
                {/* Page title can be dynamic here */}
              </div>
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" aria-label="Notifications">
                  <Bell className="h-5 w-5" />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src="https://placehold.co/100x100.png" alt="User Avatar" data-ai-hint="user avatar" />
                        <AvatarFallback>MM</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Settings</DropdownMenuItem>
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

    