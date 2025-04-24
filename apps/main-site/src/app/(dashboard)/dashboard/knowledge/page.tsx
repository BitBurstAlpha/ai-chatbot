'use client';

import { useState, useRef, useEffect, ChangeEvent, DragEvent } from 'react';
import {
  FileText,
  Upload,
  Search,
  Filter,
  ChevronDown,
  Plus,
  X,
  File,
  Image as ImageIcon,
  Clock,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Cookies from 'js-cookie';
import { useAuth } from '@/context/auth-context';

interface KnowledgeItem {
  id: string;
  title: string;
  description: string;
  original_filename: string;
  file_type: string;
  file_size: number;
  created_at: string;
  user_id: string;
}

export default function KnowledgePage() {
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadDialogOpen, setUploadDialogOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [knowledgeItems, setKnowledgeItems] = useState<KnowledgeItem[]>([]);
  const [isUploaded, setIsUploaded] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { user } = useAuth();

  // Fetch knowledge items based on user role
  useEffect(() => {
    const fetchKnowledgeItems = async () => {
      setIsLoading(true);
      try {
        const token = Cookies.get('authToken');

        if (!token) {
          console.error('No authentication token found');
          setIsLoading(false);
          return;
        }

        const response = await fetch(
          'https://web-production-59b12.up.railway.app/api/v1/knowledge',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (response.ok) {
          const data = await response.json();
          setKnowledgeItems(data);
        } else {
          console.error('Failed to fetch knowledge items');
        }
      } catch (error) {
        console.error('Error fetching knowledge items:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchKnowledgeItems();
    }
  }, [user]);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !title.trim()) {
      return;
    }

    setIsUploading(true);

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('title', title);
    formData.append('description', description);

    try {
      const token = Cookies.get('authToken');
      if (!token) {
        console.error('No authentication token found');
        setIsUploading(false);
        return;
      }

      const response = await fetch(
        'https://web-production-59b12.up.railway.app/api/v1/knowledge/upload',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        },
      );

      if (response.ok) {
        // Fetch updated knowledge list
        const updatedResponse = await fetch(
          'https://web-production-59b12.up.railway.app/api/v1/knowledge',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (updatedResponse.ok) {
          const updatedData = await updatedResponse.json();
          setKnowledgeItems(updatedData);
        }

        setIsUploaded(true);

        // Reset form after 2 seconds
        setTimeout(() => {
          setSelectedFile(null);
          setTitle('');
          setDescription('');
          setIsUploaded(false);
          setUploadDialogOpen(false);
        }, 2000);
      } else {
        console.error('Upload failed');
      }
    } catch (error) {
      console.error('Error uploading:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith('image/')) {
      return <ImageIcon size={18} />;
    }
    return <FileText size={18} />;
  };

  const resetUploadForm = () => {
    setSelectedFile(null);
    setTitle('');
    setDescription('');
  };

  const filteredItems = searchQuery
    ? knowledgeItems.filter(
        (item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (item.description &&
            item.description.toLowerCase().includes(searchQuery.toLowerCase())),
      )
    : knowledgeItems;

  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)] text-center">
      <div className="bg-[#161C2C] p-8 rounded-xl mb-6">
        <FileText size={80} className="text-blue-400 mx-auto" />
      </div>
      <h2 className="text-2xl font-bold text-white mb-2">
        No knowledge base yet
      </h2>
      <p className="text-gray-400 mb-8 max-w-md">
        Upload documents to create your knowledge base and train your AI
        assistant
      </p>
      <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
        <DialogTrigger asChild>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-md px-4 py-2">
            <Plus size={16} className="mr-2" />
            Add knowledge
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md bg-[#0F1624] border border-[#1E2A42] text-white">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              Upload Knowledge Document
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {selectedFile ? (
              <div className="bg-[#161C2C] p-4 rounded-md border border-[#1E2A42] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <File className="text-blue-400" />
                  <div>
                    <p className="text-sm font-medium">{selectedFile.name}</p>
                    <p className="text-xs text-gray-400">
                      {(selectedFile.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-white p-1 h-6 w-6"
                  onClick={() => setSelectedFile(null)}
                >
                  <X size={14} />
                </Button>
              </div>
            ) : (
              <div
                className="border-2 border-dashed border-[#1E2A42] rounded-md p-8 text-center hover:border-blue-500 transition-colors cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-sm text-gray-300 mb-2">
                  Click or drag to upload
                </p>
                <p className="text-xs text-gray-500">
                  PDF, DOC, TXT, CSV files supported
                </p>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleFileSelect}
                  accept=".pdf,.doc,.docx,.txt,.csv"
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="title" className="text-gray-300">
                Document Title
              </Label>
              <Input
                id="title"
                placeholder="Enter document title"
                className="bg-[#161C2C] border-[#1E2A42] text-white"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-gray-300">
                Description (Optional)
              </Label>
              <Textarea
                id="description"
                placeholder="Enter document description"
                className="bg-[#161C2C] border-[#1E2A42] text-white min-h-[100px]"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <DialogClose asChild>
              <Button
                variant="ghost"
                className="text-gray-300 hover:text-white"
                onClick={resetUploadForm}
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              className="bg-blue-600 hover:bg-blue-700"
              onClick={handleUpload}
              disabled={isUploading || !selectedFile || !title.trim()}
            >
              {isUploading
                ? 'Uploading...'
                : isUploaded
                  ? 'Uploaded!'
                  : 'Upload'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );

  const KnowledgeList = ({
    pdfs,
    docs,
    other,
  }: { pdfs?: boolean; docs?: boolean; other?: boolean } = {}) => {
    let displayItems = filteredItems;

    if (pdfs) {
      displayItems = filteredItems.filter(
        (item) => item.file_type === 'application/pdf',
      );
    } else if (docs) {
      displayItems = filteredItems.filter(
        (item) =>
          item.file_type === 'application/msword' ||
          item.file_type ===
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      );
    } else if (other) {
      displayItems = filteredItems.filter(
        (item) =>
          item.file_type !== 'application/pdf' &&
          item.file_type !== 'application/msword' &&
          item.file_type !==
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      );
    }

    if (displayItems.length === 0) {
      return <EmptyState />;
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {displayItems.map((item) => (
          <div
            key={item.id}
            className="bg-[#161C2C] rounded-lg p-4 border border-[#1E2A42] hover:border-blue-500 transition-all"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="bg-[#1E2A42] p-2 rounded">
                {getFileIcon(item.file_type)}
              </div>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <ChevronDown size={16} />
              </Button>
            </div>
            <h3 className="font-medium text-white mb-1">{item.title}</h3>
            {item.description && (
              <p className="text-sm text-gray-400 mb-3 line-clamp-2">
                {item.description}
              </p>
            )}
            <div className="flex flex-col text-xs text-gray-500">
              <div className="flex items-center mb-1">
                <Clock size={12} className="mr-1" />
                <span>{new Date(item.created_at).toLocaleDateString()}</span>
              </div>
              {user?.role === 'admin' && (
                <div className="text-blue-400 text-xs">
                  {item.user_id === user.id
                    ? 'Uploaded by you'
                    : 'Uploaded by another user'}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex-1 overflow-auto bg-[#0D1117] text-white p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          <p className="mt-4">Loading knowledge base...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-auto bg-[#0D1117] text-white p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">Knowledge Base</h1>
          <p className="text-gray-400">
            {user?.role === 'admin'
              ? 'Manage all knowledge and training data'
              : "Manage your AI assistant's knowledge and training data"}
          </p>
        </div>
        <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-md px-4 py-2">
              <Plus size={16} className="mr-2" />
              Add knowledge
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md bg-[#0F1624] border border-[#1E2A42] text-white">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">
                Upload Knowledge Document
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              {selectedFile ? (
                <div className="bg-[#161C2C] p-4 rounded-md border border-[#1E2A42] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <File className="text-blue-400" />
                    <div>
                      <p className="text-sm font-medium">{selectedFile.name}</p>
                      <p className="text-xs text-gray-400">
                        {(selectedFile.size / 1024).toFixed(2)} KB
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-400 hover:text-white p-1 h-6 w-6"
                    onClick={() => setSelectedFile(null)}
                  >
                    <X size={14} />
                  </Button>
                </div>
              ) : (
                <div
                  className="border-2 border-dashed border-[#1E2A42] rounded-md p-8 text-center hover:border-blue-500 transition-colors cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-sm text-gray-300 mb-2">
                    Click or drag to upload
                  </p>
                  <p className="text-xs text-gray-500">
                    PDF, DOC, TXT, CSV files supported
                  </p>
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleFileSelect}
                    accept=".pdf,.doc,.docx,.txt,.csv"
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="title" className="text-gray-300">
                  Document Title
                </Label>
                <Input
                  id="title"
                  placeholder="Enter document title"
                  className="bg-[#161C2C] border-[#1E2A42] text-white"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-gray-300">
                  Description (Optional)
                </Label>
                <Textarea
                  id="description"
                  placeholder="Enter document description"
                  className="bg-[#161C2C] border-[#1E2A42] text-white min-h-[100px]"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <DialogClose asChild>
                <Button
                  variant="ghost"
                  className="text-gray-300 hover:text-white"
                  onClick={resetUploadForm}
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button
                className="bg-blue-600 hover:bg-blue-700"
                onClick={handleUpload}
                disabled={isUploading || !selectedFile || !title.trim()}
              >
                {isUploading
                  ? 'Uploading...'
                  : isUploaded
                    ? 'Uploaded!'
                    : 'Upload'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex justify-between mb-6">
        <div className="relative max-w-md w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Search documents..."
            className="pl-10 bg-[#161C2C] border-[#1E2A42] text-gray-300 w-full h-10 rounded-md"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button className="border-[#1E2A42] text-gray-300 hover:text-white">
          <Filter size={16} className="mr-2" />
          Filter
        </Button>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-6 bg-[#161C2C]">
          <TabsTrigger value="all" className="data-[state=active]:bg-[#1E2A42]">
            All Documents
          </TabsTrigger>
          <TabsTrigger
            value="pdfs"
            className="data-[state=active]:bg-[#1E2A42]"
          >
            PDFs
          </TabsTrigger>
          <TabsTrigger
            value="docs"
            className="data-[state=active]:bg-[#1E2A42]"
          >
            Documents
          </TabsTrigger>
          <TabsTrigger
            value="other"
            className="data-[state=active]:bg-[#1E2A42]"
          >
            Other
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-0">
          {filteredItems.length > 0 ? <KnowledgeList /> : <EmptyState />}
        </TabsContent>
        <TabsContent value="pdfs" className="mt-0">
          <KnowledgeList pdfs />
        </TabsContent>
        <TabsContent value="docs" className="mt-0">
          <KnowledgeList docs />
        </TabsContent>
        <TabsContent value="other" className="mt-0">
          <KnowledgeList other />
        </TabsContent>
      </Tabs>
    </div>
  );
}
