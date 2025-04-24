'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useAuth } from '@/context/auth-context';
import { Plus, MoreVertical, Ticket } from 'lucide-react';
import Cookies from 'js-cookie';

interface TicketItem {
  id: string;
  name: string;
  type: string;
  status: 'Live' | 'Offline';
  created_by: string;
  created_at: string;
  query: string; // Added description field
}

export default function TicketsPage() {
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth();
  const [tickets, setTickets] = useState<TicketItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // State for the ticket popup
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<TicketItem | null>(null);

  useEffect(() => {
    if (authLoading) return;

    // Check if the user is authenticated
    const token = Cookies.get('authToken');
    if (!token) {
      router.push('/login');
      return;
    }

    // Only fetch tickets if the user is an admin
    if (user?.role === 'admin') {
      fetchTickets(token);
    } else {
      setIsLoading(false);
    }
  }, [user, authLoading, router]);

  const fetchTickets = async (token: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        'https://web-production-59b12.up.railway.app/api/v1/tickets',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) {
        if (response.status === 403) {
          // User doesn't have permission
          setTickets([]);
        } else {
          throw new Error('Failed to fetch tickets');
        }
      } else {
        const data = await response.json();
        setTickets(data);
      }
    } catch (err) {
      console.error('Error fetching tickets:', err);
      setError('Failed to load tickets. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  // Function to open the ticket details modal
  const handleOpenTicketDetails = (ticket: TicketItem) => {
    setSelectedTicket(ticket);
    setIsModalOpen(true);
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0D1117] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin mx-auto"></div>
          <p className="mt-4">Loading tickets...</p>
        </div>
      </div>
    );
  }

  // Show empty state for non-admin users
  if (user?.role !== 'admin') {
    return (
      <div className="h-[calc(100vh-64px)] text-white p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-xl font-semibold">Tickets</h1>
        </div>

        <div className="flex flex-col items-center justify-center text-center py-20">
          <div className="w-16 h-16 bg-[#161C2C] rounded-full flex items-center justify-center mb-4">
            <Ticket className="h-8 w-8 text-gray-400" />
          </div>
          <h2 className="text-xl font-medium text-white mb-2">
            No Access to Tickets
          </h2>
          <p className="text-gray-400 max-w-md">
            You don&apos;t have permission to view tickets. Please contact an
            administrator if you need access.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-64px)] text-white p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-xl font-semibold">Tickets</h1>
        <Button className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white flex items-center gap-2 rounded-md px-4">
          <Plus size={16} /> Create Ticket
        </Button>
      </div>

      {error && (
        <div className="bg-red-900/20 border border-red-800 text-red-400 p-4 rounded-md mb-6">
          {error}
        </div>
      )}

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
                Status
              </TableHead>
              <TableHead className="text-gray-400 font-medium">
                Create By
              </TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tickets.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center py-10 text-gray-500"
                >
                  No tickets found.
                </TableCell>
              </TableRow>
            ) : (
              tickets.map((ticket) => (
                <TableRow
                  key={ticket.id}
                  className="border-b border-[#1A1F35] hover:bg-[#131625] cursor-pointer"
                  onClick={() => handleOpenTicketDetails(ticket)}
                >
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <Checkbox />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-[#1A1F35] rounded-md flex items-center justify-center">
                        <Ticket size={16} className="text-gray-400" />
                      </div>
                      <div>
                        <div className="font-medium text-white">
                          {ticket.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {ticket.type}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        ticket.status === 'Live'
                          ? 'bg-green-900/20 text-green-500'
                          : 'bg-gray-800 text-gray-400'
                      }`}
                    >
                      {ticket.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium text-white">
                        {ticket.created_by}
                      </div>
                      <div className="text-xs text-gray-500">
                        {formatDate(ticket.created_at)}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell onClick={(e) => e.stopPropagation()}>
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
                        <DropdownMenuItem
                          className="cursor-pointer hover:bg-[#2D3148]"
                          onClick={() => handleOpenTicketDetails(ticket)}
                        >
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer hover:bg-[#2D3148]">
                          Edit
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

      {/* Ticket Details Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="bg-[#161C2C] border-[#2D3148] text-white max-w-md">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="text-lg font-semibold">
                {selectedTicket?.name}
              </DialogTitle>
            </div>
          </DialogHeader>

          {selectedTicket && (
            <div className="pt-2">
              <div className="flex items-center gap-2 mb-4">
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    selectedTicket.status === 'Live'
                      ? 'bg-green-900/20 text-green-500'
                      : 'bg-gray-800 text-gray-400'
                  }`}
                >
                  {selectedTicket.status}
                </span>
                <span className="text-xs text-gray-400">
                  {selectedTicket.type}
                </span>
              </div>

              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-400 mb-1">
                  Description
                </h3>
                <p className="text-sm text-white">
                  {selectedTicket.query ||
                    'No description available for this ticket.'}
                </p>
              </div>

              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-400 mb-1">
                  Created By
                </h3>
                <p className="text-sm text-white">
                  {selectedTicket.created_by}
                </p>
              </div>

              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-400 mb-1">
                  Created At
                </h3>
                <p className="text-sm text-white">
                  {formatDate(selectedTicket.created_at)}
                </p>
              </div>

              <div className="flex gap-2 justify-end mt-6">
                <Button
                  className="border-[#2D3148] text-white hover:bg-[#2D3148] hover:text-white"
                  onClick={() => setIsModalOpen(false)}
                >
                  Close
                </Button>
                <Button className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white">
                  Edit
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
