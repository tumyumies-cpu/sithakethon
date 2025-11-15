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
  Truck,
  Users,
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
import { AppContext, AppProvider, useAppContext } from '@/context/app-context';

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
    { href: '/dashboard/ngo/cart', label: 'Cart', icon: ShoppingCart },
    { href: '/dashboard/ngo/reservations', label: 'My Reservations', icon: BookMarked },
    { href: '/dashboard/ngo/drivers', label: 'Manage Drivers', icon: Users },
    { href: '/dashboard/ngo/history', label: 'History', icon: History },
  ],
  driver: [
    { href: '/dashboard/driver', label: 'Overview', icon: LayoutDashboard },
    { href: '/dashboard/driver/tasks', label: 'Available Tasks', icon: Search },
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

function DashboardHeader() {
  const router = useRouter();
  const { cart, currentRole, pageTitle, user, handleLogout } = useAppContext();
  
  const handleLogoutClick = () => {
    handleLogout();
    router.push('/login');
  };

  return (
     <header className="flex h-16 items-center justify-between border-b px-4 sm:px-6">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="md:hidden" />
        <h1 className="text-xl font-semibold font-headline">{pageTitle}</h1>
      </div>
      <div className="flex items-center gap-4">
        {currentRole === 'ngo' && (
          <Button variant="ghost" size="icon" className="relative" asChild>
            <Link href="/dashboard/ngo/cart">
              <ShoppingCart className="h-5 w-5" />
              {cart.length > 0 && (
                <Badge variant="destructive" className="absolute -top-1 -right-1 h-4 w-4 justify-center rounded-full p-0 text-xs">{cart.length}</Badge>
              )}
              <span className="sr-only">Cart</span>
            </Link>
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
            <DropdownMenuItem onClick={handleLogoutClick} className="cursor-pointer">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

function DashboardLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { currentRole, setCurrentRole, pageTitle, setPageTitle, cart } = useAppContext();

  useEffect(() => {
    const getRoleFromPath = (): keyof typeof roleConfig => {
      if (pathname.startsWith('/dashboard/provider')) return 'provider';
      if (pathname.startsWith('/dashboard/ngo')) return 'ngo';
      if (pathname.startsWith('/dashboard/driver')) return 'driver';

      const mockEmail = typeof window !== 'undefined' ? localStorage.getItem('mockUserEmail') : null;
      if (mockEmail?.includes('ngo')) return 'ngo';
      if (mockEmail?.includes('driver')) return 'driver';
      if (mockEmail?.includes('admin')) {
          router.push('/admin'); // Redirect if admin tries to access user dashboard
          return 'provider'; // return a default
      }
      
      return 'provider';
    };
    
    let role = getRoleFromPath();
    if(pathname.startsWith('/dashboard/ngo/assign-driver')) {
        role = 'ngo';
    }

    setCurrentRole(role);
    const activeRoute = roleConfig[role].nav.find(item => item.href === pathname);
    let currentTitle = activeRoute?.label || roleConfig[role].title;
    if (pathname === '/dashboard/ngo/assign-driver') {
      currentTitle = 'Assign Drivers';
    } else if (pathname === '/dashboard/provider') {
        currentTitle = 'Provider Dashboard';
    } else if (pathname === '/dashboard/ngo') {
        currentTitle = 'NGO Dashboard';
    } else if (pathname === '/dashboard/driver') {
        currentTitle = 'Driver Dashboard';
    }

    setPageTitle(currentTitle);

  }, [pathname, setCurrentRole, setPageTitle, router]);
  
  const currentNavConfig = roleConfig[currentRole] || roleConfig.provider;
  let currentNavItems = [...currentNavConfig.nav];

  if (currentRole === 'ngo') {
    const cartItemIndex = currentNavItems.findIndex(item => item.href === '/dashboard/ngo/cart');
    if (cartItemIndex !== -1) {
      currentNavItems[cartItemIndex] = { 
        ...currentNavItems[cartItemIndex], 
        label: `Cart (${cart.length})`
      };
    }
  }


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
        <DashboardHeader />
        <main className="flex-1 p-4 sm:p-6 bg-secondary/40">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}


export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppProvider>
      <DashboardLayoutContent>{children}</DashboardLayoutContent>
    </AppProvider>
  );
}
