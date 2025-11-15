'use client';

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  LayoutDashboard,
  Package,
  BookMarked,
  History,
  Settings,
  LifeBuoy,
  LogOut,
  User,
  Bell,
  Search,
  ShoppingCart,
} from 'lucide-react';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';

// Mock user data. In a real app, this would come from an auth context.
const user = {
  name: 'Jane Doe',
  email: 'jane.doe@example.com',
  role: 'Provider',
  avatar: 'https://picsum.photos/seed/user-avatar/100/100',
};

const navItems = {
  provider: [
    { href: '/dashboard/provider', label: 'Overview', icon: LayoutDashboard },
    { href: '/dashboard/provider/my-offers', label: 'My Offers', icon: Package },
    { href: '/dashboard/provider/reservations', label: 'Reservations', icon: BookMarked },
    { href: '/dashboard/provider/history', label: 'History', icon: History },
  ],
  ngo: [
    { href: '/dashboard/ngo', label: 'Overview', icon: LayoutDashboard },
    { href: '/dashboard/ngo/browse', label: 'Browse Offers', icon: Search },
    { href: '/dashboard/ngo/reservations', label: 'My Reservations', icon: BookMarked },
    { href: '/dashboard/ngo/history', label: 'History', icon: History },
  ],
  driver: [
    { href: '/dashboard/driver', label: 'Overview', icon: LayoutDashboard },
    { href: '/dashboard/driver/tasks', label: 'Available Tasks', icon: Package },
    { href: '/dashboard/driver/pickups', label: 'My Pickups', icon: BookMarked },
    { href: '/dashboard/driver/history', label: 'History', icon: History },
  ],
};

const roleConfig = {
  provider: {
    nav: navItems.provider,
    title: 'Provider Dashboard',
  },
  ngo: {
    nav: navItems.ngo,
    title: 'NGO Dashboard',
  },
  driver: {
    nav: navItems.driver,
    title: 'Driver Dashboard',
  },
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [currentRole, setCurrentRole] = useState<keyof typeof roleConfig>('provider');

  useEffect(() => {
    const getRoleFromPath = (): keyof typeof roleConfig => {
      if (pathname.startsWith('/dashboard/provider')) return 'provider';
      if (pathname.startsWith('/dashboard/ngo')) return 'ngo';
      if (pathname.startsWith('/dashboard/driver')) return 'driver';
      
      // Fallback based on mock login
      const mockEmail = typeof window !== 'undefined' ? localStorage.getItem('mockUserEmail') : null;
      if (mockEmail?.includes('ngo')) return 'ngo';
      if (mockEmail?.includes('driver')) return 'driver';
      
      return 'provider'; // Default role
    };
    setCurrentRole(getRoleFromPath());
  }, [pathname]);


  const { nav: currentNavItems, title: pageTitle } = roleConfig[currentRole] || roleConfig.provider;

  const handleLogout = () => {
    // In a real app, you'd clear auth state here
    if (typeof window !== 'undefined') {
      localStorage.removeItem('mockUserEmail');
    }
    router.push('/login');
  };

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <Logo />
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {currentNavItems.map((item) => (
              <SidebarMenuItem key={item.label}>
                <SidebarMenuButton asChild tooltip={item.label} isActive={pathname === item.href}>
                  <Link href={item.href}>
                    <item.icon />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Settings">
                <Link href="#">
                  <Settings />
                  <span>Settings</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Support">
                <Link href="#">
                  <LifeBuoy />
                  <span>Support</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-16 items-center justify-between border-b px-4 sm:px-6">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="md:hidden" />
            <h1 className="text-xl font-semibold font-headline">{pageTitle}</h1>
          </div>
          <div className="flex items-center gap-4">
            {currentRole === 'ngo' && (
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                <Badge variant="destructive" className="absolute -top-1 -right-1 h-4 w-4 justify-center rounded-full p-0 text-xs">3</Badge>
                <span className="sr-only">Cart</span>
              </Button>
            )}
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar>
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                  <div className="font-semibold">{user.name}</div>
                  <div className="text-xs text-muted-foreground">{user.email}</div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className="flex-1 p-4 sm:p-6 bg-secondary/40">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}

    