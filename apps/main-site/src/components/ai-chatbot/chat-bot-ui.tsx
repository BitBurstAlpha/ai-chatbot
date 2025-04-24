'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { SendIcon, X, BotMessageSquare } from 'lucide-react';
import TicketModal from '../ticket-modal';

export default function ChatbotUI() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "Hi there 👋\nI'm the AI Assistant created by Lexi.ai\nIs there anything I can help you with?",
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputValue.trim() || isTyping) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      sender: 'user',
      text: inputValue,
    };

    const userQuery = inputValue;
    setMessages([...messages, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      // Call your API endpoint with the required format
      const response = await fetch(
        'https://web-production-59b12.up.railway.app/api/v1/query',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            knowledge_ids: ['e100438f-7ad2-4241-bade-59f88a80f7f6'],
            query: userQuery,
          }),
        },
      );

      const data = await response.json();

      // Add a small delay to make the typing animation visible
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Add the bot's response
      const botResponse = {
        id: messages.length + 2,
        sender: 'bot',
        text:
          data.response ||
          data.answer ||
          "I'm sorry, I couldn't process that request.",
      };

      setMessages((prevMessages) => [...prevMessages, botResponse]);
    } catch (error) {
      console.error('Error getting response:', error);

      // Add error message to chat
      const errorResponse = {
        id: messages.length + 2,
        sender: 'bot',
        text: 'Sorry, I encountered an error processing your request. Please try again later.',
      };

      setMessages((prevMessages) => [...prevMessages, errorResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  // Auto-scroll to the bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <Card className="w-80 sm:w-96 h-[34rem] flex flex-col bg-gray-900 text-white shadow-xl rounded-lg overflow-hidden">
          {/* Header */}
          <div className="flex justify-between items-center p-4 bg-[#1E4BAF]">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8 rounded-full bg-blue-600">
                <AvatarImage src="https://res.cloudinary.com/wiz-images/image/upload/v1745348277/ai-chat-avatar_c6bwfs.jpg" />
              </Avatar>
              <div>
                <h3 className="text-blue-400 font-bold">Lexi.AI</h3>
                <p className="text-xs text-gray-400">Online</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-white"
              >
                FAQs
              </Button>
              <TicketModal />
            </div>
          </div>

          {/* Chat title */}
          <div className="text-center py-3 border-b border-gray-700">
            <h4 className="text-blue-400 font-medium">Chat with Lexi</h4>
          </div>

          {/* Messages container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-900">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {message.sender === 'bot' && (
                  <Avatar className="h-8 w-8 mr-2 mt-1 bg-blue-600 rounded-full">
                    <AvatarImage src="https://res.cloudinary.com/wiz-images/image/upload/v1745348277/ai-chat-avatar_c6bwfs.jpg" />
                  </Avatar>
                )}
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.sender === 'user' ? 'bg-gray-700' : 'bg-gray-800'
                  }`}
                >
                  <p className="whitespace-pre-line">{message.text}</p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <Avatar className="h-8 w-8 mr-2 mt-1 bg-blue-600 rounded-full">
                  <AvatarImage src="https://res.cloudinary.com/wiz-images/image/upload/v1745348277/ai-chat-avatar_c6bwfs.jpg" />
                </Avatar>
                <div className="max-w-[80%] p-3 rounded-lg bg-gray-800 flex items-center">
                  <div className="flex space-x-1">
                    <div
                      className="h-2 w-2 bg-blue-400 rounded-full animate-bounce"
                      style={{ animationDelay: '0ms' }}
                    ></div>
                    <div
                      className="h-2 w-2 bg-blue-400 rounded-full animate-bounce"
                      style={{ animationDelay: '300ms' }}
                    ></div>
                    <div
                      className="h-2 w-2 bg-blue-400 rounded-full animate-bounce"
                      style={{ animationDelay: '600ms' }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <form
            onSubmit={handleSendMessage}
            className="bg-surface rounded-md flex gap-2 m-3 p-2"
          >
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={
                isTyping ? 'Lexi is typing...' : 'Type your message here'
              }
              className="flex-1 bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
              disabled={isTyping}
            />
            <Button
              type="submit"
              size="icon"
              className={`bg-gray-700 ${!isTyping ? 'hover:bg-gray-600' : 'opacity-50 cursor-not-allowed'} text-white rounded-full`}
              disabled={isTyping}
            >
              <SendIcon size={18} />
            </Button>
          </form>

          {/* Close button */}
          <Button
            onClick={toggleChat}
            size="icon"
            variant="ghost"
            className="absolute top-2 right-2 text-gray-400 hover:text-white hover:bg-transparent"
          >
            <X size={18} />
          </Button>
        </Card>
      ) : (
        <Button
          onClick={toggleChat}
          className="h-14 w-14 rounded-full shadow-lg bg-blue-600 hover:bg-blue-700 text-white [&_svg]:size-8"
        >
          <BotMessageSquare className="rounded-full" />
        </Button>
      )}
    </div>
  );
}
