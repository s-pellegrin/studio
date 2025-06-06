'use client';

import type { NextPage } from 'next';
import Link from 'next/link';
import { useState, useMemo, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings, Upload, MoreHorizontal, ArrowUpDown, ChevronDown } from 'lucide-react';

interface ListingItem {
  id: string;
  listedDate: string;
  availableDate: string;
  unit: string;
  beds: string;
  baths: string;
  size: number | null;
  listingRent: string;
  status: 'Listed' | 'Unlisted';
}

const initialListings: ListingItem[] = [
  { id: '1', listedDate: '2025-01-02', availableDate: '2025-01-02', unit: 'Garden Row (multi-building complex) - 2B', beds: '1 Bed', baths: '2 Bath', size: 700, listingRent: 'HK$750.00', status: 'Listed' },
  { id: '2', listedDate: '2025-01-02', availableDate: '2025-01-02', unit: 'Garden Row (multi-building complex) - 2C', beds: '2 Bed', baths: '2 Bath', size: 825, listingRent: 'HK$800.00', status: 'Listed' },
  { id: '3', listedDate: '2025-01-02', availableDate: '2025-01-02', unit: 'Garden Row (multi-building complex) - 2D', beds: '2 Bed', baths: '2 Bath', size: 900, listingRent: 'HK$850.00', status: 'Listed' },
  { id: '4', listedDate: '2025-01-02', availableDate: '2025-01-02', unit: '3 Industrial Road - B', beds: '', baths: '', size: 2000, listingRent: 'HK$900.00', status: 'Listed' },
  { id: '5', listedDate: '2025-01-02', availableDate: '2025-01-02', unit: '3 Industrial Road - C', beds: '', baths: '', size: 2000, listingRent: 'HK$900.00', status: 'Listed' },
  { id: '6', listedDate: '2024-12-15', availableDate: '2025-02-01', unit: 'Downtown Condo - Unit 505', beds: 'Studio', baths: '1 Bath', size: 550, listingRent: 'HK$650.00', status: 'Unlisted' },
  { id: '7', listedDate: '2025-02-10', availableDate: '2025-03-01', unit: 'Suburbia House - Main', beds: '3 Bed', baths: '2.5 Bath', size: 1800, listingRent: 'HK$1200.00', status: 'Listed' },
];

const LeasingPage: NextPage = () => {
  const [activeTab, setActiveTab] = useState<'listed' | 'unlisted'>('listed');
  const [selectedRentalFilter, setSelectedRentalFilter] = useState<string>('all');
  const [allListings, setAllListings] = useState<ListingItem[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setAllListings(initialListings);
    setMounted(true);
  }, []);

  const rentalFilterOptions = [
    { value: 'all', label: 'All rentals' },
    { value: 'singleFamily', label: 'Single family' },
    { value: 'multiFamily', label: 'Multi-family' },
    { value: 'commercial', label: 'Commercial' },
  ];

  const filteredListings = useMemo(() => {
    if (!mounted) return [];
    let listings = allListings.filter(listing => 
      activeTab === 'listed' ? listing.status === 'Listed' : listing.status === 'Unlisted'
    );

    if (selectedRentalFilter !== 'all') {
      // This is a placeholder for actual filtering logic based on selectedRentalFilter
      // For example, if listings had a 'type' property:
      // listings = listings.filter(l => l.type.toLowerCase().includes(selectedRentalFilter.toLowerCase()));
    }
    return listings;
  }, [mounted, allListings, activeTab, selectedRentalFilter]);

  if (!mounted) {
    return <div className="container mx-auto py-8">Loading...</div>;
  }

  const renderTableContent = () => (
    <>
      <div className="flex justify-between items-center mb-4 mt-4">
        <div className="flex items-center gap-2">
          <Select value={selectedRentalFilter} onValueChange={setSelectedRentalFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All rentals" />
            </SelectTrigger>
            <SelectContent>
              {rentalFilterOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Add filter option <ChevronDown className="ml-2 h-4 w-4" /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuLabel>Filter by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem>Property</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Unit status</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Availability date</DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Button variant="outline">
          <Upload className="mr-2 h-4 w-4" /> Export
        </Button>
      </div>

      <div className="text-sm text-muted-foreground mb-2">
        {filteredListings.length} {filteredListings.length === 1 ? 'match' : 'matches'}
      </div>

      <div className="overflow-x-auto bg-card rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[120px]">
                <Button variant="ghost" size="sm" className="p-0 hover:bg-transparent">
                  LISTED <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="w-[120px]">AVAILABLE</TableHead>
              <TableHead>UNIT</TableHead>
              <TableHead className="w-[100px]">BEDS</TableHead>
              <TableHead className="w-[100px]">BATHS</TableHead>
              <TableHead className="w-[100px]">SIZE</TableHead>
              <TableHead className="w-[150px] text-right">LISTING RENT</TableHead>
              <TableHead className="w-[50px] text-right"> </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredListings.length > 0 ? (
              filteredListings.map((listing) => (
                <TableRow key={listing.id}>
                  <TableCell>
                    <Link href={`/leasing/${listing.id}/listed`} className="text-primary hover:underline">
                      {new Date(listing.listedDate).toLocaleDateString()}
                    </Link>
                  </TableCell>
                  <TableCell>{new Date(listing.availableDate).toLocaleDateString()}</TableCell>
                  <TableCell className="font-medium">{listing.unit}</TableCell>
                  <TableCell>{listing.beds}</TableCell>
                  <TableCell>{listing.baths}</TableCell>
                  <TableCell>{listing.size ? listing.size.toLocaleString() : '-'}</TableCell>
                  <TableCell className="text-right">{listing.listingRent}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Listing</DropdownMenuItem>
                        <DropdownMenuItem>Edit Listing</DropdownMenuItem>
                        <DropdownMenuItem>Manage Applicants</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem disabled={activeTab === 'listed'}>List Unit</DropdownMenuItem>
                        <DropdownMenuItem disabled={activeTab === 'unlisted'} className="text-destructive">Unlist Unit</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  No {activeTab} units found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Listings</h1>
        <Button variant="outline">
          <Settings className="mr-2 h-4 w-4" /> Listing settings
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'listed' | 'unlisted')} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="listed">Listed units</TabsTrigger>
          <TabsTrigger value="unlisted">Unlisted units</TabsTrigger>
        </TabsList>
        <TabsContent value="listed">
          {renderTableContent()}
        </TabsContent>
        <TabsContent value="unlisted">
          {renderTableContent()}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LeasingPage;

      