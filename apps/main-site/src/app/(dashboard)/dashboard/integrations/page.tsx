'use client';

// ChatbotIntegrationPage.tsx
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function ChatbotIntegrationPage() {
  const [copied, setCopied] = useState<string | null>(null);

  const quickStartCode = `<!-- Add this before the closing </body> tag -->
<script src="https://cdn.jsdelivr.net/gh/BitBurstAlpha/ai-chat-bot-sdk/chatbot-sdk.js "
  data-chatbot-auto-init="true"
  data-chatbot-bot-name="Your Chatbot Name"
  data-chatbot-primary-color="#2563EB"
  data-chatbot-logo-url="https://your-domain.com/logo.png"
  data-chatbot-chatbot-id="YOUR_CHATBOT_ID_HERE">
</script>`;

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="container h-[calc(100vh-64px)] mx-auto py-6 max-w-5xl">
      <h1 className="text-2xl font-bold mb-6 text-white">
        Chatbot SDK Implementation Guide
      </h1>
      <p className="text-slate-300 mb-8">
        This guide will help you implement the Chatbot SDK with API integration
        on your website.
      </p>

      <div className="space-y-8">
        {/* Quick Start Section */}
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white">Quick Start</CardTitle>
            <CardDescription className="text-slate-400">
              Add the following code to your HTML page:
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <pre className="bg-slate-950 p-4 rounded-md overflow-x-auto text-sm font-mono text-slate-300">
                {quickStartCode}
              </pre>
              <Button
                size="sm"
                variant="ghost"
                className="absolute top-2 right-2 text-slate-400 hover:text-white hover:bg-slate-800"
                onClick={() => copyToClipboard(quickStartCode, 'quick')}
              >
                {copied === 'quick' ? 'Copied!' : <Copy size={16} />}
              </Button>
            </div>
            <p className="mt-4 text-slate-400">
              Replace{' '}
              <code className="bg-slate-800 px-1 py-0.5 rounded text-xs">
                YOUR_CHATBOT_ID_HERE
              </code>{' '}
              with your actual chatbot ID.
            </p>
          </CardContent>
        </Card>

        {/* Configuration Options */}
        <Tabs defaultValue="required" className="w-full">
          <TabsList className="bg-slate-800 text-slate-400">
            <TabsTrigger
              value="required"
              className="data-[state=active]:bg-slate-700 data-[state=active]:text-white"
            >
              Required Configuration
            </TabsTrigger>
            <TabsTrigger
              value="additional"
              className="data-[state=active]:bg-slate-700 data-[state=active]:text-white"
            >
              Additional Configuration Options
            </TabsTrigger>
          </TabsList>

          <TabsContent value="required" className="mt-4">
            <Card className="bg-slate-900 border-slate-800">
              <CardContent className="pt-6">
                <Table>
                  <TableHeader className="bg-slate-800">
                    <TableRow>
                      <TableHead className="text-slate-300">Option</TableHead>
                      <TableHead className="text-slate-300">
                        Description
                      </TableHead>
                      <TableHead className="text-slate-300">Required</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="text-slate-300 font-mono">
                        chatbotId
                      </TableCell>
                      <TableCell className="text-slate-400">
                        Your unique chatbot ID
                      </TableCell>
                      <TableCell className="text-emerald-400">Yes</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="additional" className="mt-4">
            <Card className="bg-slate-900 border-slate-800">
              <CardContent className="pt-6">
                <Table>
                  <TableHeader className="bg-slate-800">
                    <TableRow>
                      <TableHead className="text-slate-300">Option</TableHead>
                      <TableHead className="text-slate-300">
                        Description
                      </TableHead>
                      <TableHead className="text-slate-300">Default</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="text-slate-300 font-mono">
                        botName
                      </TableCell>
                      <TableCell className="text-slate-400">
                        Name of your chatbot
                      </TableCell>
                      <TableCell className="text-slate-400 font-mono">
                        &apos;My Chatbot&apos;
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="text-slate-300 font-mono">
                        primaryColor
                      </TableCell>
                      <TableCell className="text-slate-400">
                        Main color used for buttons and header
                      </TableCell>
                      <TableCell className="text-slate-400 font-mono">
                        &apos;#2563EB&apos;
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="text-slate-300 font-mono">
                        darkMode
                      </TableCell>
                      <TableCell className="text-slate-400">
                        Enable dark mode UI
                      </TableCell>
                      <TableCell className="text-slate-400 font-mono">
                        true
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="text-slate-300 font-mono">
                        position
                      </TableCell>
                      <TableCell className="text-slate-400">
                        Position of the chatbot (&apos;right&apos; or
                        &apos;left&apos;)
                      </TableCell>
                      <TableCell className="text-slate-400 font-mono">
                        &apos;right&apos;
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="text-slate-300 font-mono">
                        logoUrl
                      </TableCell>
                      <TableCell className="text-slate-400">
                        URL to your logo image
                      </TableCell>
                      <TableCell className="text-slate-400 font-mono">
                        &apos;https://example.com/logo.png&apos;
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="text-slate-300 font-mono">
                        baseUrl
                      </TableCell>
                      <TableCell className="text-slate-400">
                        Base URL for the API
                      </TableCell>
                      <TableCell className="text-slate-400 font-mono">
                        &apos;https://web-production-59b12.up.railway.app&apos;
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="text-slate-300 font-mono">
                        welcomeMessage
                      </TableCell>
                      <TableCell className="text-slate-400">
                        Message shown when chat is first opened
                      </TableCell>
                      <TableCell className="text-slate-400 font-mono">
                        &apos;Hi there 👋\nI&apos;m the AI Assistant...&apos;
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
