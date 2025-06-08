
'use client';

import type { LucideIcon } from 'lucide-react';
import {
  LayoutDashboard, Home, FileText, Users, DollarSign, Wrench,
  ListChecks, MessageSquare, Folder, BarChart2, PieChart, Building, Brain, ChevronDown, Zap, Rocket
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Slot } from "@radix-ui/react-slot"


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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
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
  Zap,
  Rocket,
};

interface NavSubItem {
  href: string;
  label: string;
}

interface NavItem {
  href?: string;
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
  const [openSubMenus, setOpenSubMenus] = useState<Record<string, boolean>>(() => {
    const initialOpen: Record<string, boolean> = {};
    navItems.forEach(item => {
      if (item.subItems && item.subItems.some(sub => pathname.startsWith(sub.href))) {
        if (typeof window !== 'undefined' && window.innerWidth > 768) { // Only auto-open on desktop
          initialOpen[item.label] = true;
        }
      }
    });
    return initialOpen;
  });

  const toggleSubMenu = (label: string) => {
    setOpenSubMenus(prev => ({ ...prev, [label]: !prev[label] }));
  };
  
  useEffect(() => {
    if (sidebarState === 'expanded' && !isMobile) {
      const newOpenSubMenusState = { ...openSubMenus };
      let changed = false;
      for (const key in newOpenSubMenusState) {
        const item = navItems.find(navItem => navItem.label === key);
        if (item && item.subItems) {
           const shouldBeOpenInline = item.subItems.some(sub => pathname.startsWith(sub.href));
           if(newOpenSubMenusState[key] && !shouldBeOpenInline) {
           } else if (!newOpenSubMenusState[key] && shouldBeOpenInline) {
             newOpenSubMenusState[key] = true; 
             changed = true;
           }
        }
      }
      if (changed) {
        // setOpenSubMenus(newOpenSubMenusState); 
      }
    }
  }, [sidebarState, isMobile, pathname, navItems, openSubMenus]);


  return (
    <SidebarMenu>
      {navItems.map((item) => {
        const IconComponent = iconMap[item.iconName];
        const isAnySubItemActive = item.subItems ? item.subItems.some(sub => pathname.startsWith(sub.href)) : false;
        
        if (item.subItems) {
          const isSubMenuOpen = openSubMenus[item.label] || false;

          if (sidebarState === "expanded" || isMobile) {
            return (
              <SidebarMenuItem key={item.label}>
                <TooltipProvider delayDuration={0}>
                  <Tooltip>
                    <TooltipTrigger asChild>
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
                    <TooltipContent side="right" className="ml-1" hidden={sidebarState === "expanded" || isMobile}>
                      {item.label}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                {isSubMenuOpen && (
                  <SidebarMenuSub>
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
          } 
          else {
            return (
              <SidebarMenuItem key={item.label}>
                <Popover open={isSubMenuOpen} onOpenChange={(openValue) => setOpenSubMenus(prev => ({ ...prev, [item.label]: openValue }))}>
                  <TooltipProvider delayDuration={0}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <PopoverTrigger asChild>
                          <SidebarMenuButton
                            className="justify-start w-full"
                            isActive={isAnySubItemActive}
                          >
                            {IconComponent ? <IconComponent className="h-5 w-5" /> : <div className="h-5 w-5" />}
                            <span className="group-data-[collapsible=icon]:hidden">{item.label}</span>
                          </SidebarMenuButton>
                        </PopoverTrigger>
                      </TooltipTrigger>
                      <TooltipContent side="right" className="ml-1" hidden={sidebarState === "expanded" || isMobile}>
                        {item.label}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <PopoverContent
                    side="right"
                    align="start"
                    className="ml-1 p-1 w-auto bg-sidebar text-sidebar-foreground border-sidebar-border shadow-md"
                    onOpenAutoFocus={(e) => e.preventDefault()} 
                    sideOffset={5}
                  >
                    <SidebarMenuSub className={cn("!mx-0 !border-l-0 !p-0", "flex flex-col gap-1")}>
                       {item.subItems.map(subItem => (
                        <SidebarMenuSubItem key={subItem.label}>
                          <Link href={subItem.href} asChild>
                            <SidebarMenuSubButton 
                              isActive={pathname.startsWith(subItem.href)}
                              onClick={() => {
                                setOpenSubMenus(prev => ({ ...prev, [item.label]: false }));
                              }}
                            >
                              <span>{subItem.label}</span>
                            </SidebarMenuSubButton>
                          </Link>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </PopoverContent>
                </Popover>
              </SidebarMenuItem>
            );
          }
        } 
        else {
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
                          <span className="group-data-[collapsible=icon]:hidden">{item.label}</span>
                        </SidebarMenuButton>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right" className="ml-1" hidden={sidebarState === "expanded" || isMobile}>
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

