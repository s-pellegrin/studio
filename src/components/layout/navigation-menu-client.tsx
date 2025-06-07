
'use client';

import type { LucideIcon } from 'lucide-react';
import {
  LayoutDashboard, Home, FileText, Users, DollarSign, Wrench,
  ListChecks, MessageSquare, Folder, BarChart2, PieChart, Building, Brain
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar, // Import useSidebar
} from '@/components/ui/sidebar';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

// Define a map for icon names to components
const iconMap: Record<string, LucideIcon> = {
  LayoutDashboard,
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
  Building,
  Brain,
};

interface NavItem {
  href: string;
  label: string;
  iconName: string; 
}

interface NavigationMenuClientProps {
  navItems: NavItem[];
}

export default function NavigationMenuClient({ navItems }: NavigationMenuClientProps) {
  const pathname = usePathname();
  const { state: sidebarState, isMobile } = useSidebar(); // Get sidebar state for tooltip visibility

  return (
    <SidebarMenu>
      {navItems.map((item) => {
        const IconComponent = iconMap[item.iconName];
        const isActive = item.href === '/' ? pathname === item.href : pathname.startsWith(item.href);
        
        return (
          <SidebarMenuItem key={item.label}>
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href={item.href} asChild> {/* Removed passHref */}
                    <SidebarMenuButton
                      className="justify-start"
                      isActive={isActive}
                    >
                      {IconComponent ? <IconComponent className="h-5 w-5" /> : <div className="h-5 w-5" />}
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </Link>
                </TooltipTrigger>
                <TooltipContent 
                  side="right" 
                  className="ml-1"
                  // Show tooltip only when sidebar is collapsed AND not on mobile
                  hidden={sidebarState === "expanded" || isMobile || sidebarState === undefined } 
                >
                  {item.label}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
}
