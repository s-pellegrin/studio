
'use client';

import type { NextPage } from 'next';
import Link from 'next/link';
import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Label } from '@/components/ui/label';
import { PlusCircle, MoreHorizontal, Download, Landmark, Filter, Settings2, Search, ChevronDown } from 'lucide-react';

interface RentalProperty {
  id: string;
  propertyName: string;
  location: string;
  rentalOwners: string;
  manager: string;
  type: string;
  operatingAccount: string;
  depositTrustAccountStatus: 'Setup' | string;
}

const initialRentalProperties: RentalProperty[] = [
  { id: '1', propertyName: '3 Industrial Road', location: 'Boston, MA', rentalOwners: 'Patrick Moran', manager: 'Patrick Moran', type: 'Commercial, Industrial', operatingAccount: 'Trust account', depositTrustAccountStatus: 'Setup' },
  { id: '2', propertyName: '74 Grove Street (Single family home)', location: 'Boston, MA', rentalOwners: 'Ocean Properties LLC', manager: 'Sarah Miller', type: 'Residential, Single-Family', operatingAccount: 'Trust account', depositTrustAccountStatus: 'Setup' },
  { id: '3', propertyName: '100 Main Ave (duplex)', location: 'Boston, MA', rentalOwners: 'Patrick Moran', manager: 'Patrick Moran', type: 'Residential, Multi-Family', operatingAccount: 'Trust account', depositTrustAccountStatus: 'Setup' },
  { id: '4', propertyName: '150 Main Ave (fourplex)', location: 'Boston, MA', rentalOwners: 'Patrick Moran', manager: 'John Smith', type: 'Residential, Multi-Family', operatingAccount: 'Trust account', depositTrustAccountStatus: 'Setup' },
  { id: '5', propertyName: '160 East End Avenue (condo/townhouse)', location: 'New York, NY', rentalOwners: 'Joyce Stewart', manager: 'Joyce Stewart', type: 'Residential, Condo/Townhome', operatingAccount: 'Trust account', depositTrustAccountStatus: 'Setup' },
  { id: '6', propertyName: 'Garden Row (multi-building complex)', location: 'Boston, MA', rentalOwners: 'Susan Briggs', manager: 'Alpha Management', type: 'Residential, Multi-Family', operatingAccount: 'Trust account', depositTrustAccountStatus: 'Setup' },
];

const RentalsPage: NextPage = () => {
  const [rentalProperties, setRentalProperties] = useState<RentalProperty[]>(initialRentalProperties);
  const [showBankAccounts, setShowBankAccounts] = useState(false);
  const [filterRentals, setFilterRentals] = useState('all');
  const [searchTerm, setSearchTerm] = useState(''); // For a potential future search bar, not directly in the image's main content

  const filteredProperties = useMemo(() => {
    let properties = rentalProperties;
    if (filterRentals !== 'all') {
      // Example filter, can be expanded
      properties = properties.filter(p => p.type.toLowerCase().includes(filterRentals.toLowerCase()));
    }
    if (searchTerm) {
      properties = properties.filter(p => 
        p.propertyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.rentalOwners.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return properties;
  }, [rentalProperties, filterRentals, searchTerm]);
  
  const matchesCount = filteredProperties.length;

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold">Properties</h1>
        <div className="flex flex-wrap items-center gap-2">
          <Link href="/rentals/new" passHref>
            <Button>
              <PlusCircle className="mr-2 h-5 w-5" /> Add property
            </Button>
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Management fees <ChevronDown className="ml-2 h-4 w-4" /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Fee Structure A</DropdownMenuItem>
              <DropdownMenuItem>Fee Structure B</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Manage Fee Structures</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="outline">Manage bank accounts</Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Option 1</DropdownMenuItem>
              <DropdownMenuItem>Option 2</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="mb-6 p-4 border rounded-lg shadow bg-card">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-4 flex-wrap">
            <Select value={filterRentals} onValueChange={setFilterRentals}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="All rentals" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All rentals</SelectItem>
                <SelectItem value="residential">Residential</SelectItem>
                <SelectItem value="commercial">Commercial</SelectItem>
                <SelectItem value="single-family">Single-Family</SelectItem>
                <SelectItem value="multi-family">Multi-Family</SelectItem>
              </SelectContent>
            </Select>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" /> Add filter option <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem>Location</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Owner</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Manager</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Type</DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center space-x-2">
              <Switch id="show-bank-accounts" checked={showBankAccounts} onCheckedChange={setShowBankAccounts} />
              <Label htmlFor="show-bank-accounts" className="text-sm">Show bank accounts</Label>
            </div>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" /> Export
            </Button>
          </div>
        </div>
      </div>
      
      <div className="text-sm text-muted-foreground mb-2">{matchesCount} matches</div>

      <div className="overflow-x-auto bg-card rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Property</TableHead>
              <TableHead className="w-[150px]">Location</TableHead>
              <TableHead className="w-[180px]">Rental Owners</TableHead>
              <TableHead className="w-[150px]">Manager</TableHead>
              <TableHead className="w-[180px]">Type</TableHead>
              <TableHead className="w-[180px]">Operating Account</TableHead>
              <TableHead className="w-[150px]">Deposit Trust Account</TableHead>
              <TableHead className="w-[50px] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProperties.map((property) => (
              <TableRow key={property.id}>
                <TableCell className="font-medium">
                  <Link href={`/rentals/${property.id}`} className="hover:underline text-primary">
                    {property.propertyName}
                  </Link>
                </TableCell>
                <TableCell>{property.location}</TableCell>
                <TableCell>{property.rentalOwners}</TableCell>
                <TableCell>{property.manager}</TableCell>
                <TableCell>{property.type}</TableCell>
                <TableCell className="flex items-center gap-1">
                  <Landmark className="h-4 w-4 text-muted-foreground" /> 
                  {property.operatingAccount}
                </TableCell>
                <TableCell>
                  <Link href={`/rentals/${property.id}/setup-trust`} className="hover:underline text-primary">
                    {property.depositTrustAccountStatus}
                  </Link>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Edit Property</DropdownMenuItem>
                      <DropdownMenuItem>Manage Leases</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">Delete Property</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {filteredProperties.length === 0 && (
         <div className="text-center py-10 text-muted-foreground">
          No properties found matching your criteria.
        </div>
      )}
    </div>
  );
};

export default RentalsPage;

    