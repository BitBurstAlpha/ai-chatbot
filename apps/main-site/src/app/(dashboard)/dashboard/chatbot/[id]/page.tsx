'use client';

import { useState, useEffect, useRef } from 'react';
import { notFound, useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
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
import {
  Plus,
  Bot,
  FileText,
  File,
  Globe,
  MessageSquare,
  MoreVertical,
  Send,
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Cookies from 'js-cookie';

interface Chatbot {
  id: string;
  name: string;
  description?: string;
  status: 'Live' | 'Offline';
  trained: boolean;
  created_by: string;
  created_at: string;
}

interface KnowledgeItem {
  id: string;
  title: string;
  description?: string;
  original_filename?: string;
  file_type?: string;
  file_size?: number;
  created_at?: string;
  user_id?: string;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function ChatbotDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { isLoading: authLoading } = useAuth();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [chatbot, setChatbot] = useState<Chatbot | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [availableKnowledge, setAvailableKnowledge] = useState<KnowledgeItem[]>(
    [],
  );
  const [selectedKnowledgeId, setSelectedKnowledgeId] = useState<string>('');
  const [isAdding, setIsAdding] = useState(false);
  const [chatbotKnowledge, setChatbotKnowledge] = useState<KnowledgeItem[]>([]);
  const [knowledgeIds, setKnowledgeIds] = useState<string[]>([]);
  const [hasKnowledge, setHasKnowledge] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [activeTab, setActiveTab] = useState<
    | 'interface'
    | 'knowledge'
    | 'behavior'
    | 'connections'
    | 'settings'
    | 'install'
  >('knowledge');

  // Chat state
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content:
        "Hi there 👋\nI'm the AI Assistant!\nIs there anything I can help you with?",
      timestamp: new Date(),
    },
  ]);
  const [userInput, setUserInput] = useState('');
  const [isProcessingMessage, setIsProcessingMessage] = useState(false);

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (authLoading) return;

    const token = Cookies.get('authToken');
    if (!token) {
      router.push('/login');
      return;
    }

    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch chatbot details
        const chatbotResponse = await fetch(
          `https://web-production-59b12.up.railway.app/api/v1/chatbot/${params.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (!chatbotResponse.ok) {
          return notFound();
        }

        const chatbotData = await chatbotResponse.json();
        setChatbot(chatbotData);

        // Fetch all available knowledge
        const knowledgeResponse = await fetch(
          `https://web-production-59b12.up.railway.app/api/v1/knowledge`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (knowledgeResponse.ok) {
          const knowledgeData = await knowledgeResponse.json();
          setAvailableKnowledge(knowledgeData);
        }

        // Fetch knowledge already linked to this chatbot
        const chatbotKnowledgeResponse = await fetch(
          `https://web-production-59b12.up.railway.app/api/v1/chatbot/${params.id}/knowledge`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (chatbotKnowledgeResponse.ok) {
          const chatbotKnowledgeData = await chatbotKnowledgeResponse.json();
          setChatbotKnowledge(chatbotKnowledgeData);

          // Extract knowledge IDs for querying
          const ids = chatbotKnowledgeData.map(
            (item: KnowledgeItem) => item.id,
          );
          setKnowledgeIds(ids);

          setHasKnowledge(chatbotKnowledgeData.length > 0);
          setShowTable(chatbotKnowledgeData.length > 0);
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [params.id, router, authLoading]);

  const fetchChatbotKnowledge = async () => {
    const token = Cookies.get('authToken');
    if (!token) {
      router.push('/login');
      return;
    }

    try {
      const chatbotKnowledgeResponse = await fetch(
        `https://web-production-59b12.up.railway.app/api/v1/chatbot/${params.id}/knowledge`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (chatbotKnowledgeResponse.ok) {
        const chatbotKnowledgeData = await chatbotKnowledgeResponse.json();
        setChatbotKnowledge(chatbotKnowledgeData);

        // Update knowledge IDs
        const ids = chatbotKnowledgeData.map((item: KnowledgeItem) => item.id);
        setKnowledgeIds(ids);

        setHasKnowledge(chatbotKnowledgeData.length > 0);
        setShowTable(chatbotKnowledgeData.length > 0);
      }
    } catch (err) {
      console.error('Error fetching chatbot knowledge:', err);
    }
  };

  const handleAddKnowledge = async () => {
    if (!selectedKnowledgeId) {
      setError('Please select a knowledge item');
      return;
    }

    setIsAdding(true);
    setError(null);

    try {
      const token = Cookies.get('authToken');
      if (!token) {
        throw new Error('Not authenticated');
      }

      const response = await fetch(
        `https://web-production-59b12.up.railway.app/api/v1/chatbot/${params.id}/knowledge`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            knowledge_id: selectedKnowledgeId,
          }),
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add knowledge');
      }

      // Refresh knowledge data
      await fetchChatbotKnowledge();
      setDialogOpen(false);
    } catch (err: unknown) {
      console.error('Error adding knowledge:', err);
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to add knowledge. Please try again.',
      );
    } finally {
      setIsAdding(false);
    }
  };

  const handleSendMessage = async () => {
    if (!userInput.trim() || isProcessingMessage) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: userInput,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setUserInput('');
    setIsProcessingMessage(true);

    try {
      const token = Cookies.get('authToken');
      if (!token) {
        throw new Error('Not authenticated');
      }

      // Only proceed with the API call if we have knowledge IDs
      if (knowledgeIds.length === 0) {
        // If no knowledge is associated, show a message about it
        const noKnowledgeMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content:
            "I don't have any knowledge yet. Please add some knowledge to help me answer your questions better.",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, noKnowledgeMessage]);
        setIsProcessingMessage(false);
        return;
      }

      // Make API call to query endpoint
      const response = await fetch(
        'https://web-production-59b12.up.railway.app/api/v1/query',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: userInput,
            knowledge_ids: knowledgeIds,
          }),
        },
      );

      if (!response.ok) {
        throw new Error('Failed to get a response');
      }

      const responseData = await response.json();

      // Add assistant response
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content:
          responseData.answer ||
          "I couldn't find a relevant answer to your question.",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);

      // Add error message from assistant
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content:
          "I'm sorry, I encountered an error while processing your request. Please try again later.",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsProcessingMessage(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleTabClick = (
    tab:
      | 'interface'
      | 'knowledge'
      | 'behavior'
      | 'connections'
      | 'settings'
      | 'install',
  ) => {
    setActiveTab(tab);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const getIconForType = (item: KnowledgeItem) => {
    if (!item.file_type) return <File size={18} className="text-gray-400" />;

    if (item.file_type.includes('pdf')) {
      return <FileText size={18} className="text-blue-400" />;
    } else if (
      item.original_filename?.includes('.doc') ||
      item.file_type.includes('word')
    ) {
      return <FileText size={18} className="text-blue-400" />;
    } else if (
      item.description?.includes('FAQ') ||
      item.title?.includes('FAQ')
    ) {
      return <MessageSquare size={18} className="text-purple-400" />;
    } else if (
      item.file_type.includes('html') ||
      item.original_filename?.includes('.html') ||
      item.title?.toLowerCase().includes('website') ||
      item.description?.toLowerCase().includes('website')
    ) {
      return <Globe size={18} className="text-green-400" />;
    }

    return <File size={18} className="text-gray-400" />;
  };

  const getKnowledgeType = (item: KnowledgeItem) => {
    if (!item.file_type && !item.original_filename) return 'Document';

    if (
      item.file_type?.includes('pdf') ||
      item.original_filename?.includes('.pdf')
    ) {
      return 'Document';
    } else if (
      item.original_filename?.includes('.doc') ||
      item.file_type?.includes('word')
    ) {
      return 'Document';
    } else if (
      item.description?.includes('FAQ') ||
      item.title?.includes('FAQ')
    ) {
      return 'FAQs';
    } else if (
      item.file_type?.includes('html') ||
      item.original_filename?.includes('.html') ||
      item.title?.toLowerCase().includes('website') ||
      item.description?.toLowerCase().includes('website')
    ) {
      return 'Website';
    }

    return 'Document';
  };

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

  return (
    <div className="h-[calc(100vh-64px)] text-white flex">
      {/* Left panel - chatbot configuration */}
      <div className="flex-1 p-6 flex flex-col">
        <div className="w-full">
          {/* Navigation tabs */}
          <div className="flex mb-8 border-b border-[#1A1F35]">
            <button
              className={`px-4 py-2 ${activeTab === 'interface' ? 'text-white border-b-2 border-[#7C3AED]' : 'text-gray-400'}`}
              onClick={() => handleTabClick('interface')}
            >
              Interface
            </button>
            <button
              className={`px-4 py-2 ${activeTab === 'knowledge' ? 'text-white border-b-2 border-[#7C3AED]' : 'text-gray-400'}`}
              onClick={() => handleTabClick('knowledge')}
            >
              KNOWLEDGE
            </button>
            <button
              className={`px-4 py-2 ${activeTab === 'behavior' ? 'text-white border-b-2 border-[#7C3AED]' : 'text-gray-400'}`}
              onClick={() => handleTabClick('behavior')}
            >
              Behavior
            </button>
            <button
              className={`px-4 py-2 ${activeTab === 'connections' ? 'text-white border-b-2 border-[#7C3AED]' : 'text-gray-400'}`}
              onClick={() => handleTabClick('connections')}
            >
              Connections
            </button>
            <button
              className={`px-4 py-2 ${activeTab === 'settings' ? 'text-white border-b-2 border-[#7C3AED]' : 'text-gray-400'}`}
              onClick={() => handleTabClick('settings')}
            >
              Settings
            </button>
            <button
              className={`px-4 py-2 ${activeTab === 'install' ? 'text-white border-b-2 border-[#7C3AED]' : 'text-gray-400'}`}
              onClick={() => handleTabClick('install')}
            >
              Install
            </button>
          </div>

          {showTable ? (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-medium">Knowledge</h2>
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white">
                      <Plus className="mr-2 h-4 w-4" />
                      Add knowledge
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-[#1C2033] border-[#2D3148] text-white max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Add Knowledge to Chatbot</DialogTitle>
                      <DialogDescription className="text-gray-400">
                        Select knowledge to help train your chatbot.
                      </DialogDescription>
                    </DialogHeader>
                    {error && (
                      <div className="bg-red-900/20 border border-red-800 text-red-400 p-3 rounded-md text-sm">
                        {error}
                      </div>
                    )}
                    <div className="space-y-4 mt-4">
                      <div className="space-y-2">
                        <p className="font-medium">Knowledge Items</p>
                        {availableKnowledge.length === 0 ? (
                          <div className="text-center p-6 bg-[#131625] rounded-md">
                            <p className="text-gray-400">
                              No knowledge items available
                            </p>
                          </div>
                        ) : (
                          <div className="grid gap-2 max-h-[300px] overflow-y-auto pr-2">
                            {availableKnowledge.map((item) => (
                              <div
                                key={item.id}
                                className={`p-3 rounded-md flex items-center space-x-3 cursor-pointer ${
                                  selectedKnowledgeId === item.id
                                    ? 'bg-[#7C3AED]/20 border border-[#7C3AED]'
                                    : 'bg-[#131625] border border-[#1E293B] hover:border-[#7C3AED]/50'
                                }`}
                                onClick={() => setSelectedKnowledgeId(item.id)}
                              >
                                <div className="w-8 h-8 bg-[#1A1F35] rounded-md flex items-center justify-center">
                                  <FileText
                                    size={16}
                                    className="text-gray-400"
                                  />
                                </div>
                                <div className="flex-1">
                                  <p className="font-medium">
                                    {item.title || item.original_filename}
                                  </p>
                                  <p className="text-xs text-gray-400">
                                    {item.description ||
                                      (item.file_type && item.file_size
                                        ? `${item.file_type.toUpperCase()} - ${Math.round((item.file_size || 0) / 1024)} KB`
                                        : '')}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        type="button"
                        onClick={handleAddKnowledge}
                        disabled={isAdding || !selectedKnowledgeId}
                        className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white"
                      >
                        {isAdding ? 'Adding...' : 'Add Selected Knowledge'}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

              {/* Knowledge table */}
              <div className="rounded-md border border-[#1A1F35]">
                <Table>
                  <TableHeader className="bg-[#0F1424]">
                    <TableRow className="border-b border-[#1A1F35] hover:bg-transparent">
                      <TableHead className="w-[40px] text-gray-400 font-medium">
                        <Checkbox />
                      </TableHead>
                      <TableHead className="text-gray-400 font-medium">
                        Knowledge
                      </TableHead>
                      <TableHead className="text-gray-400 font-medium">
                        Last Update
                      </TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {chatbotKnowledge.length === 0 ? (
                      <TableRow>
                        <TableCell
                          colSpan={4}
                          className="text-center py-10 text-gray-500"
                        >
                          No knowledge added yet. Add some knowledge to train
                          your chatbot!
                        </TableCell>
                      </TableRow>
                    ) : (
                      chatbotKnowledge.map((item) => (
                        <TableRow
                          key={item.id}
                          className="border-b border-[#1A1F35] hover:bg-[#131625]"
                        >
                          <TableCell>
                            <Checkbox />
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-[#1A1F35] rounded-md flex items-center justify-center">
                                {getIconForType(item)}
                              </div>
                              <div>
                                <div className="font-medium text-white">
                                  {item.title || 'Untitled'}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {getKnowledgeType(item)}
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium text-white">
                                Poorna Kawishla
                              </div>
                              <div className="text-xs text-gray-500">
                                {formatDate(item.created_at)}
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
                                  View
                                </DropdownMenuItem>
                                <DropdownMenuItem className="cursor-pointer hover:bg-[#2D3148]">
                                  Update
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
          ) : (
            /* No knowledge state */
            <div className="flex flex-col items-center justify-center text-center">
              <div className="w-24 h-24 mb-4">
                <Bot className="w-full h-full text-white" />
              </div>

              <h2 className="text-xl mb-4">
                {hasKnowledge
                  ? 'Chatbot Knowledge'
                  : 'This chatbot has no knowledge'}
              </h2>

              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white">
                    <Plus className="mr-2 h-4 w-4" />
                    Add knowledge
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-[#1C2033] border-[#2D3148] text-white max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Add Knowledge to Chatbot</DialogTitle>
                    <DialogDescription className="text-gray-400">
                      Select knowledge to help train your chatbot.
                    </DialogDescription>
                  </DialogHeader>
                  {error && (
                    <div className="bg-red-900/20 border border-red-800 text-red-400 p-3 rounded-md text-sm">
                      {error}
                    </div>
                  )}
                  <div className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <p className="font-medium">Knowledge Items</p>
                      {availableKnowledge.length === 0 ? (
                        <div className="text-center p-6 bg-[#131625] rounded-md">
                          <p className="text-gray-400">
                            No knowledge items available
                          </p>
                        </div>
                      ) : (
                        <div className="grid gap-2 max-h-[300px] overflow-y-auto pr-2">
                          {availableKnowledge.map((item) => (
                            <div
                              key={item.id}
                              className={`p-3 rounded-md flex items-center space-x-3 cursor-pointer ${
                                selectedKnowledgeId === item.id
                                  ? 'bg-[#7C3AED]/20 border border-[#7C3AED]'
                                  : 'bg-[#131625] border border-[#1E293B] hover:border-[#7C3AED]/50'
                              }`}
                              onClick={() => setSelectedKnowledgeId(item.id)}
                            >
                              <div className="w-8 h-8 bg-[#1A1F35] rounded-md flex items-center justify-center">
                                <FileText size={16} className="text-gray-400" />
                              </div>
                              <div className="flex-1">
                                <p className="font-medium">
                                  {item.title || item.original_filename}
                                </p>
                                <p className="text-xs text-gray-400">
                                  {item.description ||
                                    (item.file_type && item.file_size
                                      ? `${item.file_type.toUpperCase()} - ${Math.round((item.file_size || 0) / 1024)} KB`
                                      : '')}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      type="button"
                      onClick={handleAddKnowledge}
                      disabled={isAdding || !selectedKnowledgeId}
                      className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white"
                    >
                      {isAdding ? 'Adding...' : 'Add Selected Knowledge'}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          )}
        </div>
      </div>

      {/* Right panel - chat preview */}
      <div className="w-80 lg:w-96 bg-[#121927] border-l border-[#1A1F35] flex flex-col">
        <div className="p-4 bg-[#7C3AED] text-white flex items-center">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-3">
            <Bot size={18} className="text-[#7C3AED]" />
          </div>
          <div>
            <h3 className="font-medium">{chatbot?.name || 'AI Assistant'}</h3>
            <p className="text-xs opacity-75">Online</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <div className="mb-6">
            <h2 className="text-xl mb-4 font-medium">
              Chat with {chatbot?.name || 'AI Assistant'}
            </h2>

            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex mb-4 ${
                  message.role === 'user' ? 'justify-end' : ''
                }`}
              >
                {message.role === 'assistant' && (
                  <div className="w-8 h-8 bg-[#7C3AED] rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    <Bot size={16} className="text-white" />
                  </div>
                )}
                <div
                  className={`p-3 rounded-lg max-w-[80%] ${
                    message.role === 'user'
                      ? 'bg-[#7C3AED]/20 text-white'
                      : 'bg-[#1A1F35] text-white'
                  }`}
                >
                  <p className="text-sm whitespace-pre-line">
                    {message.content}
                  </p>
                </div>
                {message.role === 'user' && (
                  <div className="w-8 h-8 bg-[#3730A3] rounded-full flex items-center justify-center ml-3 flex-shrink-0">
                    <div className="text-white text-xs">You</div>
                  </div>
                )}
              </div>
            ))}

            {isProcessingMessage && (
              <div className="flex mb-4">
                <div className="w-8 h-8 bg-[#7C3AED] rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  <Bot size={16} className="text-white" />
                </div>
                <div className="bg-[#1A1F35] p-3 rounded-lg">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-[#7C3AED] rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-[#7C3AED] rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-[#7C3AED] rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef}></div>
          </div>
        </div>

        <div className="p-3 border-t border-[#1A1F35]">
          <div className="relative">
            <Input
              placeholder="Type Your message here"
              className="bg-[#1A1F35] border-[#2D3148] text-white pr-10 py-6"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isProcessingMessage}
            />
            <Button
              className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-[#7C3AED] h-8 w-8 p-0 rounded-md"
              onClick={handleSendMessage}
              disabled={isProcessingMessage || !userInput.trim()}
            >
              <Send size={16} className="text-white" />
            </Button>
          </div>
        </div>

        <div className="p-3 flex justify-center">
          <Button variant="ghost" className="text-[#7C3AED]">
            <Bot size={20} />
          </Button>
        </div>
      </div>

      {/* Help button */}
      <button className="fixed bottom-4 right-4 w-10 h-10 bg-[#1A1F35] rounded-full flex items-center justify-center text-gray-400 hover:bg-[#2D3148] hover:text-white transition-colors">
        <span className="text-xl">?</span>
      </button>
    </div>
  );
}
