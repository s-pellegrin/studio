
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
} from '@/components/ui/sidebar';

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
  iconName: string; // Changed from icon: LucideIcon
}

interface NavigationMenuClientProps {
  navItems: NavItem[];
}

export default function NavigationMenuClient({ navItems }: NavigationMenuClientProps) {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {navItems.map((item) => {
        const IconComponent = iconMap[item.iconName];
        const isActive = item.href === '/' ? pathname === item.href : pathname.startsWith(item.href);
        
        return (
          <SidebarMenuItem key={item.label}>
            <Link href={item.href} passHref asChild>
              <SidebarMenuButton
                tooltip={{ children: item.label, side: 'right', className: 'ml-1' }}
                className="justify-start"
                isActive={isActive}
              >
                {IconComponent ? <IconComponent className="h-5 w-5" /> : <div className="h-5 w-5" />} {/* Render icon or placeholder */}
                <span>{item.label}</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
}
