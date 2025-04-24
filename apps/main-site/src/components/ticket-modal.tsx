// components/TicketModal.jsx
'use client';

import { FormEvent, useState } from 'react';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';

const TicketModal = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    query: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.query.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        'https://web-production-59b12.up.railway.app/api/v1/ticket',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to create ticket');
      }

      toast.success('Ticket created successfully', {
        description: `Ticket ID: ${data.ticket_id}`,
      });

      // Reset form and close modal
      setFormData({ name: '', query: '' });
      setOpen(false);
    } catch (error) {
      toast.error('Failed to create ticket', {
        description:
          error instanceof Error ? error.message : 'An unknown error occurred',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="text-white border-blue-500 bg-blue-500/10 hover:bg-blue-500/20"
        >
          Create a Ticket
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-gray-900 text-white border-gray-800">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Create an issue ticket
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Please let us know if something isn&apos;t working as expected.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-gray-300">
              What is your name? <span className="text-red-500">*</span>
            </label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="bg-gray-800 border-gray-700 text-white"
              required
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="query"
              className="text-sm font-medium text-gray-300"
            >
              Describe your issue <span className="text-red-500">*</span>
            </label>
            <Textarea
              id="query"
              name="query"
              value={formData.query}
              onChange={handleChange}
              className="bg-gray-800 border-gray-700 text-white min-h-[120px]"
              required
            />
          </div>
          <div className="flex justify-end pt-4">
            <Button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                'Create ticket'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TicketModal;
