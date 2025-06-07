
'use client';

import { useState, useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Folder as FolderIcon,
  FileText as FileTextIcon,
  FileImage as FileImageIcon,
  FileArchive as FileZipIcon,
  FileAudio2 as FileAudioIcon,
  FileVideo2 as FileVideoIcon,
  FileQuestion as FileUnknownIcon,
  Search,
  Upload,
  FolderPlus,
  MoreHorizontal,
  ChevronRight,
  Download,
  Share2,
  Clock,
  Trash2,
  Edit3,
  Users,
  Link as LinkIcon,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";


interface FileSystemItem {
  id: string;
  type: 'folder' | 'file';
  name: string;
  lastModified: string;
  size?: string;
  version?: string;
  shared?: boolean;
  mimeType?: string;
}

const getFileIcon = (mimeType?: string, itemType?: 'folder' | 'file') => {
  if (itemType === 'folder') return FolderIcon;
  if (!mimeType) return FileUnknownIcon;
  if (mimeType.startsWith('image/')) return FileImageIcon;
  if (mimeType === 'application/pdf') return FileTextIcon;
  if (mimeType === 'application/msword' || mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') return FileTextIcon;
  if (mimeType.startsWith('audio/')) return FileAudioIcon;
  if (mimeType.startsWith('video/')) return FileVideoIcon;
  if (mimeType === 'application/zip' || mimeType === 'application/x-rar-compressed') return FileZipIcon;
  return FileTextIcon; // Default for other docs
};

const initialFileSystemItems: FileSystemItem[] = [
  { id: 'folder-1', type: 'folder', name: 'Property Leases', lastModified: '2024-07-15', size: '-', version: '-' },
  { id: 'folder-2', type: 'folder', name: 'Tenant Documents', lastModified: '2024-07-10', size: '-', version: '-' },
  { id: 'folder-3', type: 'folder', name: 'Invoices', lastModified: '2024-06-25', size: '-', version: '-' },
  { id: 'file-1', type: 'file', name: 'Oakview_Apt101_Lease_2024.pdf', lastModified: '2024-07-15', size: '1.2 MB', version: 'v2.1', shared: true, mimeType: 'application/pdf' },
  { id: 'file-2', type: 'file', name: 'Tenant_Alice_ID.jpg', lastModified: '2024-07-01', size: '800 KB', version: 'v1.0', mimeType: 'image/jpeg' },
  { id: 'file-3', type: 'file', name: 'Invoice_INV00123_July.pdf', lastModified: '2024-07-05', size: '300 KB', version: 'v1.0', shared: false, mimeType: 'application/pdf' },
  { id: 'file-4', type: 'file', name: 'Building_Exterior_MainSt.png', lastModified: '2024-05-20', size: '2.5 MB', version: 'v3.0', shared: true, mimeType: 'image/png' },
  { id: 'file-5', type: 'file', name: 'Financial_Report_Q2_2024.docx', lastModified: '2024-07-12', size: '550 KB', version: 'v1.2', mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' },
  { id: 'folder-4', type: 'folder', name: 'Archived Contracts', lastModified: '2023-12-01', size: '-', version: '-' },
  { id: 'file-6', type: 'file', name: 'Maintenance_Log_July.xlsx', lastModified: '2024-07-18', size: '150 KB', version: 'v1.0', mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' },

];

const BreadcrumbItem = ({ name, isLast }: { name: string; isLast?: boolean }) => (
  <div className="flex items-center">
    <Button variant="link" className={`p-0 h-auto text-sm ${isLast ? 'font-semibold text-foreground' : 'text-muted-foreground'}`}>
      {name}
    </Button>
    {!isLast && <ChevronRight className="h-4 w-4 text-muted-foreground mx-1" />}
  </div>
);

export default function FileStoragePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [items, setItems] = useState<FileSystemItem[]>(initialFileSystemItems);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [currentPath, setCurrentPath] = useState<string[]>(['Files']); // Mock path

  const filteredItems = useMemo(() => {
    return items.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [items, searchTerm]);

  const handleSelectAll = (checked: boolean | 'indeterminate') => {
    if (checked === true) {
      setSelectedItems(new Set(items.map(item => item.id)));
    } else {
      setSelectedItems(new Set());
    }
  };

  const handleSelectItem = (itemId: string, checked: boolean) => {
    const newSelectedItems = new Set(selectedItems);
    if (checked) {
      newSelectedItems.add(itemId);
    } else {
      newSelectedItems.delete(itemId);
    }
    setSelectedItems(newSelectedItems);
  };

  const isAllSelected = items.length > 0 && selectedItems.size === items.length;
  const isIndeterminate = selectedItems.size > 0 && selectedItems.size < items.length;


  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold">File Storage</h1>
        <div className="flex items-center gap-2 flex-wrap">
          <Button variant="outline"><Upload className="mr-2 h-4 w-4" /> Upload File</Button>
          <Button><FolderPlus className="mr-2 h-4 w-4" /> New Folder</Button>
        </div>
      </div>
      
      <Card className="shadow-lg">
        <CardHeader>
            <div className="relative flex-grow max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                type="search"
                placeholder="Search files and folders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
                />
            </div>
        </CardHeader>
        <CardContent>
            <div className="flex items-center mb-4 text-sm">
                {currentPath.map((segment, index) => (
                <BreadcrumbItem key={index} name={segment} isLast={index === currentPath.length - 1} />
                ))}
            </div>

            <div className="overflow-x-auto border rounded-lg">
                <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead className="w-[50px]">
                        <Checkbox
                        checked={isAllSelected || isIndeterminate}
                        onCheckedChange={handleSelectAll}
                        aria-label="Select all items"
                        className={isIndeterminate ? 'data-[state=checked]:bg-muted data-[state=checked]:border-primary data-[state=checked]:text-primary' : ''}
                        />
                    </TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead className="w-[150px]">Last Modified</TableHead>
                    <TableHead className="w-[100px]">Size</TableHead>
                    <TableHead className="w-[100px]">Version</TableHead>
                    <TableHead className="w-[120px]">Sharing</TableHead>
                    <TableHead className="w-[80px] text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredItems.length > 0 ? (
                    filteredItems.map((item) => {
                        const ItemIcon = getFileIcon(item.mimeType, item.type);
                        return (
                        <TableRow key={item.id} data-state={selectedItems.has(item.id) ? 'selected' : ''}>
                            <TableCell>
                            <Checkbox
                                checked={selectedItems.has(item.id)}
                                onCheckedChange={(checked) => handleSelectItem(item.id, !!checked)}
                                aria-label={`Select ${item.name}`}
                            />
                            </TableCell>
                            <TableCell className="font-medium">
                            <div className="flex items-center gap-2">
                                <ItemIcon className="h-5 w-5 text-muted-foreground" />
                                <span className="hover:underline cursor-pointer">{item.name}</span>
                            </div>
                            </TableCell>
                            <TableCell>{item.lastModified}</TableCell>
                            <TableCell>{item.size}</TableCell>
                            <TableCell>
                            {item.version !== '-' ? (
                                <Badge variant="outline">{item.version}</Badge>
                            ) : (
                                '-'
                            )}
                            </TableCell>
                            <TableCell>
                                {item.shared ? <Badge variant="secondary"><Users className="mr-1 h-3 w-3" />Shared</Badge> : <Badge variant="outline">Private</Badge> }
                            </TableCell>
                            <TableCell className="text-right">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                <DropdownMenuItem><Download className="mr-2 h-4 w-4" />Download</DropdownMenuItem>
                                <DropdownMenuItem><Share2 className="mr-2 h-4 w-4" />Share</DropdownMenuItem>
                                {item.type === 'file' && <DropdownMenuItem><Clock className="mr-2 h-4 w-4" />Version History</DropdownMenuItem>}
                                <DropdownMenuItem><Edit3 className="mr-2 h-4 w-4" />Rename</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10"><Trash2 className="mr-2 h-4 w-4" />Delete</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            </TableCell>
                        </TableRow>
                        );
                    })
                    ) : (
                    <TableRow>
                        <TableCell colSpan={7} className="h-24 text-center">
                        {searchTerm ? 'No items match your search.' : 'This folder is empty.'}
                        </TableCell>
                    </TableRow>
                    )}
                </TableBody>
                </Table>
            </div>
            {filteredItems.length > 0 && (
                 <div className="pt-4 text-sm text-muted-foreground">
                    {selectedItems.size > 0 ? `${selectedItems.size} item(s) selected` : `${filteredItems.length} item(s)`}
                </div>
            )}
        </CardContent>
      </Card>
    </div>
  );
}
