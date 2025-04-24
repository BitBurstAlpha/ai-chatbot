'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, MoreVertical, Bot } from 'lucide-react';
import Cookies from 'js-cookie';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Chatbot {
  id: string;
  name: string;
  description: string;
  status: 'Live' | 'Offline';
  trained: boolean;
  created_by: string;
  created_at: string;
}

export default function ChatbotPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [chatbots, setChatbots] = useState<Chatbot[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [newChatbotName, setNewChatbotName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    fetchChatbots();
  }, []);

  const fetchChatbots = async () => {
    setIsLoading(true);
    try {
      const token = Cookies.get('authToken');
      if (!token) {
        throw new Error('Not authenticated');
      }

      const response = await fetch(
        'https://web-production-59b12.up.railway.app/api/v1/chatbot',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error('Failed to fetch chatbots');
      }

      const data = await response.json();
      setChatbots(data);
    } catch (err) {
      console.error('Error fetching chatbots:', err);
      setError('Failed to load chatbots. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const createChatbot = async () => {
    if (!newChatbotName.trim()) return;

    setIsCreating(true);
    setError(null);

    try {
      const token = Cookies.get('authToken');
      if (!token) {
        throw new Error('Not authenticated');
      }

      const response = await fetch(
        'https://web-production-59b12.up.railway.app/api/v1/chatbot',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: newChatbotName,
          }),
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create chatbot');
      }

      // Refresh the chatbot list
      await fetchChatbots();

      // Reset form
      setNewChatbotName('');
      setDialogOpen(false);
    } catch (err: unknown) {
      console.error('Error creating chatbot:', err);
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to create chatbot. Please try again.',
      );
    } finally {
      setIsCreating(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  return (
    <div className="h-[calc(100vh-64px)]  text-white p-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-xl font-semibold">Chatbots</h1>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white flex items-center gap-2 rounded-md px-4">
              <Plus size={16} /> New Chatbot
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#1C2033] border-[#2D3148] text-white">
            <DialogHeader>
              <DialogTitle>Create New Chatbot</DialogTitle>
              <DialogDescription className="text-gray-400">
                Enter the details for your new AI assistant.
              </DialogDescription>
            </DialogHeader>
            {error && (
              <div className="bg-red-900/20 border border-red-800 text-red-400 p-3 rounded-md text-sm">
                {error}
              </div>
            )}
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Website Chatbot"
                  className="bg-[#131625] border-[#2D3148] text-white"
                  value={newChatbotName}
                  onChange={(e) => setNewChatbotName(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="submit"
                onClick={createChatbot}
                disabled={isCreating || !newChatbotName.trim()}
                className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white"
              >
                {isCreating ? 'Creating...' : 'Create'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border border-[#1A1F35]">
        <Table>
          <TableHeader className="bg-[#0F1424]">
            <TableRow className="border-b border-[#1A1F35] hover:bg-transparent">
              <TableHead className="w-[40px] text-gray-400 font-medium">
                <Checkbox />
              </TableHead>
              <TableHead className="text-gray-400 font-medium">
                Chatbot
              </TableHead>
              <TableHead className="text-gray-400 font-medium">
                TRAINED
              </TableHead>
              <TableHead className="text-gray-400 font-medium">
                Status
              </TableHead>
              <TableHead className="text-gray-400 font-medium">
                Create By
              </TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-10 text-gray-500"
                >
                  Loading chatbots...
                </TableCell>
              </TableRow>
            ) : chatbots.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-10 text-gray-500"
                >
                  No chatbots found. Create your first one!
                </TableCell>
              </TableRow>
            ) : (
              chatbots.map((chatbot) => (
                <TableRow
                  key={chatbot.id}
                  className="border-b border-[#1A1F35] hover:bg-[#131625]"
                >
                  <TableCell>
                    <Checkbox />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-[#1A1F35] rounded-md flex items-center justify-center">
                        <Bot size={16} className="text-gray-400" />
                      </div>
                      <div>
                        <div className="font-medium text-white">
                          {chatbot.name}
                        </div>
                        <div className="text-xs text-gray-500">Chatbot</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span
                      className={
                        chatbot.trained ? 'text-green-500' : 'text-yellow-500'
                      }
                    >
                      {chatbot.trained ? 'Trained' : 'Untrained'}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        chatbot.status === 'Live'
                          ? 'bg-green-900/20 text-green-500'
                          : 'bg-gray-800 text-gray-400'
                      }`}
                    >
                      {chatbot.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium text-white">
                        {chatbot.created_by || 'Unknown'}
                      </div>
                      <div className="text-xs text-gray-500">
                        {formatDate(chatbot.created_at)}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
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
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer hover:bg-[#2D3148]">
                          Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer text-red-500 hover:bg-red-900/20">
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
