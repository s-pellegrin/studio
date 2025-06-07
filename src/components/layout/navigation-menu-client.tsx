
'use client';

import type { LucideIcon } from 'lucide-react';
import {
  LayoutDashboard, Home, FileText, Users, DollarSign, Wrench,
  ListChecks, MessageSquare, Folder, BarChart2, PieChart, Building, Brain, ChevronDown
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  useSidebar,
} from '@/components/ui/sidebar';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

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
  ChevronDown,
};

interface NavSubItem {
  href: string;
  label: string;
}

interface NavItem {
  href?: string; // Optional: if it has subItems, href might be omitted
  label: string;
  iconName: string;
  subItems?: NavSubItem[];
}

interface NavigationMenuClientProps {
  navItems: NavItem[];
}

export default function NavigationMenuClient({ navItems }: NavigationMenuClientProps) {
  const pathname = usePathname();
  const { state: sidebarState, isMobile } = useSidebar();
  const [openSubMenus, setOpenSubMenus] = useState<Record<string, boolean>>({});

  const toggleSubMenu = (label: string) => {
    setOpenSubMenus(prev => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <SidebarMenu>
      {navItems.map((item) => {
        const IconComponent = iconMap[item.iconName];
        const isSubMenuOpen = openSubMenus[item.label] || false;

        if (item.subItems) {
          const isAnySubItemActive = item.subItems.some(sub => pathname.startsWith(sub.href));
          return (
            <SidebarMenuItem key={item.label}>
              <TooltipProvider delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    {/* For parent items with sub-menus, SidebarMenuButton acts as a trigger */}
                    <SidebarMenuButton
                      className="justify-between w-full"
                      isActive={isAnySubItemActive}
                      onClick={() => toggleSubMenu(item.label)}
                      aria-expanded={isSubMenuOpen}
                    >
                      <div className="flex items-center gap-2">
                        {IconComponent ? <IconComponent className="h-5 w-5" /> : <div className="h-5 w-5" />}
                        <span className="group-data-[collapsible=icon]:hidden">{item.label}</span>
                      </div>
                      <ChevronDown 
                        className={cn(
                          "h-4 w-4 transition-transform group-data-[collapsible=icon]:hidden",
                          isSubMenuOpen ? "rotate-180" : ""
                        )}
                      />
                    </SidebarMenuButton>
                  </TooltipTrigger>
                  <TooltipContent
                    side="right"
                    className="ml-1"
                    hidden={sidebarState === "expanded" || isMobile || sidebarState === undefined}
                  >
                    {item.label}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              {isSubMenuOpen && (
                <SidebarMenuSub className="group-data-[collapsible=icon]:hidden">
                  {item.subItems.map(subItem => (
                    <SidebarMenuSubItem key={subItem.label}>
                      <Link href={subItem.href} asChild>
                        <SidebarMenuSubButton isActive={pathname.startsWith(subItem.href)}>
                          <span>{subItem.label}</span>
                        </SidebarMenuSubButton>
                      </Link>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              )}
            </SidebarMenuItem>
          );
        } else {
          // Original rendering for items without sub-menus
          const isActive = item.href === '/' ? pathname === item.href : (item.href ? pathname.startsWith(item.href) : false);
          return (
            <SidebarMenuItem key={item.label}>
              <TooltipProvider delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link href={item.href || '#'} asChild>
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
                    hidden={sidebarState === "expanded" || isMobile || sidebarState === undefined}
                  >
                    {item.label}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </SidebarMenuItem>
          );
        }
      })}
    </SidebarMenu>
  );
}
