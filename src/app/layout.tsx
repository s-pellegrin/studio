
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
} from 'lucide-react';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import {
  SidebarProvider, // Corrected import
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


export const metadata: Metadata = {
  title: 'ManageMATE',
  description: 'Modern Property Management System',
};

// Changed icon to be a string name
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
  { href: '/reports', label: 'Reports', iconName: 'BarChart2' },
  { href: '/analytics', label: 'Analytics Hub', iconName: 'PieChart' },
  { href: '/tenants', label: 'Tenant Browser', iconName: 'Users' },
  { href: '/properties', label: 'Property Browser', iconName: 'Building' },
  { href: '/ai-agent', label: 'AI Agent', iconName: 'Brain' },
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
        <SidebarProvider>
          <Sidebar variant="sidebar" collapsible="icon" className="border-r">
            <SidebarHeader className="p-4">
              <Link href="/" className="flex items-center gap-2">
                <AppLogo className="w-8 h-8 text-primary" />
                <span className="font-semibold text-lg group-data-[collapsible=icon]:hidden">ManageMATE</span>
              </Link>
            </SidebarHeader>
            <SidebarContent className="p-2">
             <NavigationMenuClient navItems={navItems} />
            </SidebarContent>
            <SidebarFooter className="p-4">
              <Link href="/settings" passHref asChild>
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
              </div>
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" aria-label="Notifications">
                  <Bell className="h-5 w-5" />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src="https://placehold.co/100x100.png" alt="User Avatar" data-ai-hint="user avatar"/>
                        <AvatarFallback>MM</AvatarFallback>
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
