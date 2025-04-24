'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  FileText,
  Bot,
  MessageSquare,
  Ticket,
  Clock,
  Globe,
  MoreVertical,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/context/auth-context';
import Cookies from 'js-cookie';

// Mock data based on the screenshot
const recentlyUsed = [
  {
    id: 1,
    title: 'Knowledge',
    icon: <FileText className="text-white" size={18} />,
    time: '12h ago',
    type: 'Knowledge',
    path: '/dashboard/knowledge',
  },
  {
    id: 2,
    title: 'Chatbot 02',
    icon: <Bot className="text-white" size={18} />,
    time: '12h ago',
    type: 'Chatbot',
    createdBy: 'Poorna Kawishla',
    path: '/dashboard/chatbot/2',
  },
  {
    id: 3,
    title: 'Pricing FAQ',
    icon: <MessageSquare className="text-white" size={18} />,
    time: '12h ago',
    type: 'FAQ',
    createdBy: 'Poorna Kawishla',
    path: '/dashboard/knowledge',
  },
  {
    id: 4,
    title: 'bento.com',
    icon: <Globe className="text-white" size={18} />,
    time: '12h ago',
    type: 'Knowledge | Website',
    path: '/dashboard/knowledge',
  },
];

const unreadChats = [
  {
    id: 1,
    sender: 'Anonymous member',
    message: "Sorry, I don't have any knowledge...",
    time: '12:34 pm',
    count: 3,
  },
  {
    id: 2,
    sender: 'Anonymous member',
    message: "Hi there 👋 I'm the AI Assistant....",
    time: '12:34 pm',
    count: 1,
  },
  {
    id: 3,
    sender: 'Anonymous member',
    message: "Hi there 👋 I'm the AI Assistant....",
    time: '12:34 pm',
    count: 1,
  },
];

const activeUsers = [
  {
    id: 1,
    name: 'Olivia Rhye',
    username: '@olivia',
    role: 'admin',
    isYou: true,
    avatar: '/avatars/olivia.jpg',
  },
  {
    id: 2,
    name: 'Poorna Kawishla',
    username: '@poorna',
    role: 'admin',
    isYou: false,
    avatar: '/avatars/poorna.jpg',
  },
];

const unreadEmails = [
  {
    id: 1,
    sender: 'johndoe.outlook.com',
    message: "Pricing plan is didn't send from chatbot",
    time: '12:34 pm',
    count: 1,
  },
  {
    id: 2,
    sender: 'avejay.gmail.com',
    message: "Pricing plan is didn't send from chatbot",
    time: '12:34 pm',
    count: 1,
  },
];

export default function DashboardHomePage() {
  const router = useRouter();
  const { isLoading, isAuthenticated } = useAuth();
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Check if the user is authenticated
  useEffect(() => {
    // Wait until auth state is loaded
    if (!isLoading) {
      // If not authenticated, redirect to login
      if (!isAuthenticated) {
        router.push('/login');
      }
    }
  }, [isLoading, isAuthenticated, router]);

  // Also check for token directly (fallback method)
  useEffect(() => {
    const token = Cookies.get('authToken');
    if (!token && !isLoading) {
      router.push('/login');
    }
  }, [isLoading, router]);

  // Show loading while checking auth
  if (isLoading) {
    return (
      <div className="h-[calc(100vh-64px)] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin mx-auto"></div>
          <p className="mt-4">Loading...</p>
        </div>
      </div>
    );
  }

  // If not authenticated and not loading, don't render the content
  if (!isAuthenticated && !isLoading) {
    return null; // Will redirect in the useEffect
  }

  return (
    <div className="h-[calc(100vh-64px)] text-white p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-gray-400">{formattedDate}</p>
      </div>

      {/* Recently Used Section */}
      <div className="mb-8">
        <h2 className="text-lg font-medium mb-4">Recently used</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {recentlyUsed.map((item) => (
            <Link href={item.path} key={item.id}>
              <div className="bg-[#161C2C] p-4 rounded-lg border border-[#1E293B] hover:border-[#3730A3] transition-all cursor-pointer">
                <div className="flex items-start justify-between mb-2">
                  <div className="w-8 h-8 bg-[#1E293B] rounded-md flex items-center justify-center">
                    {item.icon}
                  </div>
                  <span className="text-xs text-gray-400 flex items-center">
                    <Clock size={12} className="mr-1" />
                    {item.time}
                  </span>
                </div>
                <h3 className="font-medium text-white mb-1">{item.title}</h3>
                <p className="text-xs text-gray-400">
                  {item.type}
                  {item.createdBy && (
                    <>
                      <br />
                      Create by: {item.createdBy}
                    </>
                  )}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Unread Chats Section */}
        <div className="bg-[#161C2C] rounded-lg border border-[#1E293B] p-4">
          <h2 className="text-lg font-medium mb-4">Unread Chats</h2>
          <div className="space-y-4">
            {unreadChats.map((chat) => (
              <div
                key={chat.id}
                className="flex items-center justify-between hover:bg-[#1A1F35]/50 p-2 rounded-md transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8 bg-[#1E293B]">
                    <AvatarFallback className="bg-[#3730A3] text-white text-xs">
                      {chat.sender.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-sm">{chat.sender}</p>
                    <p className="text-xs text-gray-400 truncate max-w-[200px]">
                      {chat.message}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">{chat.time}</span>
                  <span className="bg-[#3730A3] text-white text-xs h-5 w-5 rounded-full flex items-center justify-center">
                    {chat.count}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active Users Section */}
        <div className="bg-[#161C2C] rounded-lg border border-[#1E293B] p-4">
          <h2 className="text-lg font-medium mb-4">Active Users</h2>
          <div className="space-y-4">
            {activeUsers.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between hover:bg-[#1A1F35]/50 p-2 rounded-md transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8 bg-[#1E293B]">
                    <AvatarFallback className="bg-[#3730A3] text-white text-xs">
                      {user.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-sm">{user.name}</p>
                      <span className="text-xs text-gray-400">
                        {user.username}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400">
                      {user.role} {user.isYou && '(You)'}
                    </p>
                  </div>
                </div>
                {!user.isYou && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="h-8 w-8 p-0 text-gray-400"
                      >
                        <MoreVertical size={16} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-[#1C2033] border-[#2D3148] text-white">
                      <DropdownMenuItem className="cursor-pointer hover:bg-[#2D3148]">
                        View Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer hover:bg-[#2D3148]">
                        Message
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Unread Email Section */}
        <div className="bg-[#161C2C] rounded-lg border border-[#1E293B] p-4">
          <h2 className="text-lg font-medium mb-4">Unread Email</h2>
          <div className="space-y-4">
            {unreadEmails.map((email) => (
              <div
                key={email.id}
                className="flex items-center justify-between hover:bg-[#1A1F35]/50 p-2 rounded-md transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8 bg-[#1E293B]">
                    <AvatarFallback className="bg-[#3730A3] text-white text-xs">
                      {email.sender.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-sm">{email.sender}</p>
                    <p className="text-xs text-gray-400 truncate max-w-[200px]">
                      {email.message}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">{email.time}</span>
                  <span className="bg-[#3730A3] text-white text-xs h-5 w-5 rounded-full flex items-center justify-center">
                    {email.count}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Unread Tickets Section */}
        <div className="bg-[#161C2C] rounded-lg border border-[#1E293B] p-4">
          <h2 className="text-lg font-medium mb-4">Unread Tickets</h2>
          <div className="flex items-center justify-center p-8 text-gray-400">
            <div className="text-center">
              <Ticket className="mx-auto h-10 w-10 mb-2" />
              <p>No Unread Ticket Yet</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
