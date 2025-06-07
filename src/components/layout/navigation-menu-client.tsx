
'use client';

import type { LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

interface NavigationMenuClientProps {
  navItems: NavItem[];
}

export default function NavigationMenuClient({ navItems }: NavigationMenuClientProps) {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {navItems.map((item) => {
        const Icon = item.icon;
        // Ensure active state is correctly determined, especially for the root path.
        const isActive = item.href === '/' ? pathname === item.href : pathname.startsWith(item.href);
        
        return (
          <SidebarMenuItem key={item.label}>
            <Link href={item.href} passHref asChild>
              <SidebarMenuButton
                tooltip={{ children: item.label, side: 'right', className: 'ml-1' }}
                className="justify-start"
                isActive={isActive}
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
}
