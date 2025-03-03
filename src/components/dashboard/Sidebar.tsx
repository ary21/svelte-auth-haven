
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import {
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  Users,
  Settings,
  HelpCircle,
  LogOut,
} from 'lucide-react';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };
  
  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-50 flex flex-col bg-sidebar border-r transition-all duration-300 ease-in-out",
        collapsed ? "w-16" : "w-64 sm:w-72",
        "lg:relative"
      )}
    >
      <div className="flex h-14 items-center border-b px-2 sm:px-4">
        <div className={cn("flex items-center gap-2", collapsed && "justify-center w-full")}>
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
            <span className="text-primary-foreground font-semibold">S</span>
          </div>
          {!collapsed && (
            <span className="font-semibold text-lg">SvelteKit Admin</span>
          )}
        </div>
        <Button
          variant="ghost"
          size="icon"
          className={cn("ml-auto", collapsed && "absolute right-[-9px] top-3 bg-background rounded-full shadow-sm p-1 h-5 w-5")}
          onClick={toggleSidebar}
        >
          {collapsed ? (
            <ChevronRight className="h-3 w-3" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>
      
      <div className={cn("flex flex-col gap-1 p-2 sm:p-4", collapsed && "items-center")}>
        <SidebarItem
          icon={<LayoutDashboard className="h-5 w-5" />}
          title="Dashboard"
          href="/dashboard"
          active={location.pathname === '/dashboard'}
          collapsed={collapsed}
        />
        <SidebarItem
          icon={<Users className="h-5 w-5" />}
          title="Users"
          href="/dashboard/users"
          active={location.pathname.startsWith('/dashboard/users')}
          collapsed={collapsed}
        />
        <SidebarItem
          icon={<Settings className="h-5 w-5" />}
          title="Settings"
          href="/dashboard/settings"
          active={location.pathname === '/dashboard/settings'}
          collapsed={collapsed}
        />
        <SidebarItem
          icon={<HelpCircle className="h-5 w-5" />}
          title="Help"
          href="/dashboard/help"
          active={location.pathname === '/dashboard/help'}
          collapsed={collapsed}
        />
      </div>
      
      <div className="mt-auto">
        <Separator />
        <div className={cn(
          "p-2 sm:p-4",
          collapsed ? "flex flex-col items-center" : "flex items-center justify-between"
        )}>
          <div className={cn("flex items-center gap-2", collapsed && "flex-col")}>
            <Avatar className={cn("h-8 w-8", collapsed && "h-10 w-10")}>
              <AvatarImage src={user?.avatar} alt={user?.name} />
              <AvatarFallback>{user?.name ? getInitials(user.name) : 'U'}</AvatarFallback>
            </Avatar>
            {!collapsed && (
              <div className="flex flex-col">
                <span className="text-sm font-medium">{user?.name}</span>
                <span className="text-xs text-muted-foreground">{user?.role}</span>
              </div>
            )}
          </div>
          
          {!collapsed && (
            <Button
              variant="ghost"
              size="icon"
              onClick={logout}
              className="ml-auto text-muted-foreground hover:text-foreground"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          )}
          
          {collapsed && (
            <Button
              variant="ghost"
              size="icon"
              onClick={logout}
              className="mt-4 text-muted-foreground hover:text-foreground"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>
    </aside>
  );
};

interface SidebarItemProps {
  icon: React.ReactNode;
  title: string;
  href: string;
  active?: boolean;
  collapsed?: boolean;
}

const SidebarItem = ({
  icon,
  title,
  href,
  active,
  collapsed,
}: SidebarItemProps) => {
  return (
    <Link 
      to={href}
      className={cn(
        "sidebar-item",
        active && "active",
        collapsed && "justify-center px-2"
      )}
    >
      {icon}
      {!collapsed && <span>{title}</span>}
    </Link>
  );
};

export default Sidebar;
