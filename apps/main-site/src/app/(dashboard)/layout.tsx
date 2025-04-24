'use client';

import { useState, ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  Search,
  MessageSquare,
  FileText,
  Mail,
  Webhook,
  Layers,
  Home,
  Activity,
  BookOpen,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Bell,
  Zap,
  MessageCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarImage } from '@/components/ui/avatar';

import { useAuth } from '@/context/auth-context';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface NavItemProps {
  icon: ReactNode;
  label: string;
  collapsed: boolean;
  active?: boolean;
  href: string;
}

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const pathname = usePathname();

  const { logout } = useAuth();

  return (
    <div className="flex h-screen bg-[#0D1117] text-white">
      {/* Sidebar */}
      <div
        className={`${collapsed ? 'w-16' : 'w-56'} bg-[#0F1624] flex flex-col transition-all duration-300 border-r border-[#1E2A42]`}
      >
        {/* Logo area */}
        <div className="flex items-center p-4 h-16 border-b border-[#1E2A42]">
          {collapsed ? (
            <div className="w-full flex justify-center">
              <span className="text-blue-400 font-bold">L</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-blue-400 font-bold">Lexi.ai</span>
            </div>
          )}
        </div>

        {/* Menu Items */}
        <div className="flex-grow py-2">
          <NavItem
            icon={<Home size={18} />}
            label="HOME"
            collapsed={collapsed}
            active={pathname === '/dashboard/home'}
            href="/dashboard/home"
          />
          <NavItem
            icon={<Activity size={18} />}
            label="ACTIVITY"
            collapsed={collapsed}
            active={pathname === '/dashboard/activity'}
            href="/dashboard/activity"
          />
          <NavItem
            icon={<BookOpen size={18} />}
            label="KNOWLEDGE"
            collapsed={collapsed}
            active={pathname === '/dashboard/knowledge'}
            href="/dashboard/knowledge"
          />
          <NavItem
            icon={<MessageCircle size={18} />}
            label="CHATBOT"
            collapsed={collapsed}
            active={pathname === '/dashboard/chatbot'}
            href="/dashboard/chatbot"
          />
          <NavItem
            icon={<FileText size={18} />}
            label="TICKETS"
            collapsed={collapsed}
            active={pathname === '/dashboard/tickets'}
            href="/dashboard/tickets"
          />
          <NavItem
            icon={<Mail size={18} />}
            label="MAILS"
            collapsed={collapsed}
            active={pathname === '/dashboard/mails'}
            href="/dashboard/mails"
          />
          <NavItem
            icon={<Webhook size={18} />}
            label="WEBHOOKS"
            collapsed={collapsed}
            active={pathname === '/dashboard/webhooks'}
            href="/dashboard/webhooks"
          />
          <NavItem
            icon={<Layers size={18} />}
            label="INTEGRATIONS"
            collapsed={collapsed}
            active={pathname === '/dashboard/integrations'}
            href="/dashboard/integrations"
          />
        </div>

        {/* Help Button */}
        <div className="p-4 flex justify-center border-t border-[#1E2A42]">
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-white hover:bg-[#1E2A42] rounded-full h-8 w-8 p-0 flex items-center justify-center"
            onClick={() => (window.location.href = '/help')}
          >
            <HelpCircle size={20} />
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <div className="h-16 border-b border-[#1E2A42] flex items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Button
              size="sm"
              onClick={() => setCollapsed(!collapsed)}
              variant="ghost"
              className="bg-[#1E293B] text-white hover:bg-[#2A3A51] h-8 w-8 p-0 rounded-md mr-2"
            >
              {collapsed ? (
                <ChevronRight size={14} />
              ) : (
                <ChevronLeft size={14} />
              )}
            </Button>
            <h1 className="text-lg font-bold">
              {pathname.substring(1).toUpperCase() || 'HOME'}
            </h1>
          </div>

          {/* Search and actions */}
          <div className="flex items-center gap-4">
            <div className="relative max-w-md">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search Knowledge"
                className="pl-8 bg-[#1E2A42] border-[#2A3A51] text-gray-300 w-64 h-9 rounded-md"
              />
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-white hover:bg-[#1E2A42] h-9 w-9 p-0 rounded-full"
            >
              <MessageSquare size={18} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-white hover:bg-[#1E2A42] h-9 w-9 p-0 rounded-full"
            >
              <Zap size={18} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-white hover:bg-[#1E2A42] h-9 w-9 p-0 rounded-full"
            >
              <FileText size={18} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-white hover:bg-[#1E2A42] h-9 w-9 p-0 rounded-full"
            >
              <Bell size={18} />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar className="h-8 w-8 border border-[#2A3A51]">
                  <AvatarImage src="https://avatar.iran.liara.run/public/1" />
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  onClick={() => {
                    logout();
                  }}
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Main content area */}
        {children}
      </div>
    </div>
  );
}

// Navigation Item Component
function NavItem({
  icon,
  label,
  collapsed,
  active = false,
  href,
}: NavItemProps) {
  return (
    <Link href={href} className="block">
      <div
        className={`flex items-center px-4 py-2 my-1 mx-2 cursor-pointer rounded-md ${
          active
            ? 'bg-[#4A39C9] text-white'
            : 'text-gray-400 hover:bg-[#1E2A42] hover:text-white'
        }`}
      >
        <div className="flex items-center justify-center w-5">{icon}</div>
        {!collapsed && (
          <span className="ml-3 text-xs font-medium">{label}</span>
        )}
      </div>
    </Link>
  );
}
