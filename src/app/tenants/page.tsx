'use client';

import { useState, useMemo, useEffect } from 'react';
import type { NextPage } from 'next';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, PlusCircle, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';

interface Tenant {
  id: string;
  name: string;
  property: string;
  unit: string;
  leaseEndDate: string;
  rentStatus: 'Paid' | 'Overdue' | 'Pending';
  contact: string;
  email: string;
}

const initialTenants: Tenant[] = [
  { id: '1', name: 'Alice Wonderland', property: 'Oakview Apartments', unit: '101', leaseEndDate: '2024-12-31', rentStatus: 'Paid', contact: '555-0101', email: 'alice@example.com' },
  { id: '2', name: 'Bob The Builder', property: 'Willow Creek Homes', unit: 'Apt 3B', leaseEndDate: '2025-06-30', rentStatus: 'Overdue', contact: '555-0102', email: 'bob@example.com' },
  { id: '3', name: 'Carol Danvers', property: 'Oakview Apartments', unit: '204', leaseEndDate: '2024-08-15', rentStatus: 'Paid', contact: '555-0103', email: 'carol@example.com' },
  { id: '4', name: 'David Copperfield', property: 'Riverside Complex', unit: 'C-12', leaseEndDate: '2025-01-31', rentStatus: 'Pending', contact: '555-0104', email: 'david@example.com' },
  { id: '5', name: 'Eve Harrington', property: 'Willow Creek Homes', unit: 'Unit 5', leaseEndDate: '2024-11-30', rentStatus: 'Paid', contact: '555-0105', email: 'eve@example.com' },
];

const TenantBrowserPage: NextPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterProperty, setFilterProperty] = useState<string | 'all'>('all');
  const [filterRentStatus, setFilterRentStatus] = useState<string | 'all'>('all');
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTenants(initialTenants);
    setMounted(true);
  }, []);

  const uniqueProperties = useMemo(() => {
    if (!mounted) return [];
    const properties = new Set(tenants.map(t => t.property));
    return ['all', ...Array.from(properties)];
  }, [tenants, mounted]);

  const rentStatuses: ('all' | Tenant['rentStatus'])[] = ['all', 'Paid', 'Overdue', 'Pending'];

  const filteredTenants = useMemo(() => {
    if (!mounted) return [];
    return tenants.filter(tenant => {
      const matchesSearchTerm = tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                tenant.property.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                tenant.unit.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                tenant.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesProperty = filterProperty === 'all' || tenant.property === filterProperty;
      const matchesRentStatus = filterRentStatus === 'all' || tenant.rentStatus === filterRentStatus;
      return matchesSearchTerm && matchesProperty && matchesRentStatus;
    });
  }, [searchTerm, filterProperty, filterRentStatus, tenants, mounted]);

  if (!mounted) {
    return <div>Loading tenants...</div>; // Or a skeleton loader
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold">Tenant Browser</h1>
        <Link href="/tenants/new" passHref>
          <Button>
            <PlusCircle className="mr-2 h-5 w-5" /> Add New Tenant
          </Button>
        </Link>
      </div>

      <div className="mb-6 p-4 border rounded-lg shadow bg-card">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search tenants..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={filterProperty} onValueChange={setFilterProperty}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Filter by Property" />
            </SelectTrigger>
            <SelectContent>
              {uniqueProperties.map(prop => (
                <SelectItem key={prop} value={prop}>{prop === 'all' ? 'All Properties' : prop}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={filterRentStatus} onValueChange={setFilterRentStatus}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Filter by Rent Status" />
            </SelectTrigger>
            <SelectContent>
              {rentStatuses.map(status => (
                <SelectItem key={status} value={status}>{status === 'all' ? 'All Rent Statuses' : status}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full md:w-auto justify-start text-left font-normal">
                <Filter className="mr-2 h-4 w-4" />
                Columns
                <ChevronDown className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {/* Placeholder for column visibility toggles */}
              <DropdownMenuCheckboxItem checked>Name</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked>Property</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked>Unit</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Lease End Date</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked>Rent Status</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Contact</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Email</DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="overflow-x-auto bg-card rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                 <Checkbox aria-label="Select all rows" />
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Property</TableHead>
              <TableHead>Unit</TableHead>
              <TableHead>Lease End</TableHead>
              <TableHead>Rent Status</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTenants.map((tenant) => (
              <TableRow key={tenant.id}>
                <TableCell>
                  <Checkbox aria-label={`Select row for ${tenant.name}`} />
                </TableCell>
                <TableCell className="font-medium">{tenant.name}</TableCell>
                <TableCell>{tenant.property}</TableCell>
                <TableCell>{tenant.unit}</TableCell>
                <TableCell>{tenant.leaseEndDate}</TableCell>
                <TableCell>
                  <Badge 
                    variant={tenant.rentStatus === 'Paid' ? 'default' : tenant.rentStatus === 'Overdue' ? 'destructive' : 'secondary'}
                    className={tenant.rentStatus === 'Paid' ? 'bg-green-500 hover:bg-green-600' : ''}
                  >
                    {tenant.rentStatus}
                  </Badge>
                </TableCell>
                <TableCell>{tenant.contact}</TableCell>
                <TableCell>{tenant.email}</TableCell>
                <TableCell className="text-right">
                  <Link href={`/tenants/${tenant.id}`} passHref>
                    <Button variant="outline" size="sm">View</Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {filteredTenants.length === 0 && (
        <div className="text-center py-10 text-muted-foreground">
          No tenants found matching your criteria.
        </div>
      )}
    </div>
  );
};

export default TenantBrowserPage;
