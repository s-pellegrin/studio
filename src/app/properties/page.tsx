
'use client';

import { useState, useMemo, useEffect } from 'react';
import type { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Search, MapPin, BedDouble, Bath, PlusCircle, DollarSign, FileUp, FileDown, ChevronDown } from 'lucide-react';

interface Property {
  id: string;
  address: string;
  city: string;
  type: 'Apartment' | 'House' | 'Condo';
  bedrooms: number;
  bathrooms: number;
  rent: number;
  status: 'Available' | 'Leased' | 'Pending';
  imageUrl: string;
  sqft: number;
  'data-ai-hint'?: string;
}

const initialProperties: Property[] = [
  { id: '1', address: '123 Main St, Apt 4B', city: 'Metropolis', type: 'Apartment', bedrooms: 2, bathrooms: 1, rent: 1500, status: 'Available', imageUrl: 'https://placehold.co/600x400.png', sqft: 950, "data-ai-hint": "apartment exterior" },
  { id: '2', address: '456 Oak Ave, Unit 12', city: 'Gotham', type: 'Condo', bedrooms: 3, bathrooms: 2.5, rent: 2200, status: 'Leased', imageUrl: 'https://placehold.co/600x400.png', sqft: 1400, "data-ai-hint": "condo building" },
  { id: '3', address: '789 Pine Ln', city: 'Star City', type: 'House', bedrooms: 4, bathrooms: 3, rent: 3000, status: 'Available', imageUrl: 'https://placehold.co/600x400.png', sqft: 2200, "data-ai-hint": "modern house" },
  { id: '4', address: '101 River Rd', city: 'Central City', type: 'Apartment', bedrooms: 1, bathrooms: 1, rent: 1100, status: 'Pending', imageUrl: 'https://placehold.co/600x400.png', sqft: 700, "data-ai-hint": "apartment complex" },
  { id: '5', address: '222 Maple Dr', city: 'Metropolis', type: 'House', bedrooms: 3, bathrooms: 2, rent: 2500, status: 'Available', imageUrl: 'https://placehold.co/600x400.png', sqft: 1800, "data-ai-hint": "suburban house" },
];


const PropertyBrowserPage: NextPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string | 'all'>('all');
  const [filterBedrooms, setFilterBedrooms] = useState<string | 'all'>('all');
  const [filterStatus, setFilterStatus] = useState<string | 'all'>('all');
  const [properties, setProperties] = useState<Property[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setProperties(initialProperties);
    setMounted(true);
  }, []);

  const propertyTypes: ('all' | Property['type'])[] = ['all', 'Apartment', 'House', 'Condo'];
  const bedroomOptions = ['all', '1', '2', '3', '4+'];
  const statusOptions: ('all' | Property['status'])[] = ['all', 'Available', 'Leased', 'Pending'];

  const filteredProperties = useMemo(() => {
    if(!mounted) return [];
    return properties.filter(property => {
      const matchesSearchTerm = property.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                property.city.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === 'all' || property.type === filterType;
      const matchesBedrooms = filterBedrooms === 'all' ||
                              (filterBedrooms === '4+' && property.bedrooms >= 4) ||
                              property.bedrooms === parseInt(filterBedrooms);
      const matchesStatus = filterStatus === 'all' || property.status === filterStatus;
      return matchesSearchTerm && matchesType && matchesBedrooms && matchesStatus;
    });
  }, [searchTerm, filterType, filterBedrooms, filterStatus, properties, mounted]);

  if (!mounted) {
    return <div>Loading properties...</div>; // Or a skeleton loader
  }
  
  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold">Property Listings</h1>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <FileUp className="mr-2 h-4 w-4" /> Import <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Import CSV file</DropdownMenuItem>
              <DropdownMenuItem>Import Google Sheet</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <FileDown className="mr-2 h-4 w-4" /> Export <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Export as CSV</DropdownMenuItem>
              <DropdownMenuItem>Export to Google Sheet</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Link href="/properties/new" passHref>
            <Button>
              <PlusCircle className="mr-2 h-5 w-5" /> Add New Property
            </Button>
          </Link>
        </div>
      </div>

      <div className="mb-6 p-4 border rounded-lg shadow bg-card">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search by address or city..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by Type" />
            </SelectTrigger>
            <SelectContent>
              {propertyTypes.map(type => (
                <SelectItem key={type} value={type}>{type === 'all' ? 'All Types' : type}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={filterBedrooms} onValueChange={setFilterBedrooms}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by Bedrooms" />
            </SelectTrigger>
            <SelectContent>
              {bedroomOptions.map(beds => (
                <SelectItem key={beds} value={beds}>{beds === 'all' ? 'All Bedrooms' : beds}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map(status => (
                <SelectItem key={status} value={status}>{status === 'all' ? 'All Statuses' : status}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredProperties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProperties.map((property) => (
            <Card key={property.id} className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="relative w-full h-48">
                <Image src={property.imageUrl} alt={`Image of ${property.address}`} layout="fill" objectFit="cover" data-ai-hint={property['data-ai-hint'] as string} />
                <Badge 
                  className="absolute top-2 right-2"
                  variant={property.status === 'Available' ? 'default' : property.status === 'Leased' ? 'secondary' : 'destructive'}
                >
                  {property.status}
                </Badge>
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{property.address}</CardTitle>
                <CardDescription className="flex items-center">
                  <MapPin className="mr-1 h-4 w-4" /> {property.city}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="flex justify-between text-sm text-muted-foreground mb-2">
                  <span className="flex items-center"><BedDouble className="mr-1 h-4 w-4" /> {property.bedrooms} Beds</span>
                  <span className="flex items-center"><Bath className="mr-1 h-4 w-4" /> {property.bathrooms} Baths</span>
                  <span className="flex items-center"><DollarSign className="mr-1 h-4 w-4" /> {property.rent}/mo</span>
                </div>
                <p className="text-sm text-muted-foreground">{property.sqft} sqft • {property.type}</p>
              </CardContent>
              <CardFooter>
                <Link href={`/properties/${property.id}`} passHref className="w-full">
                  <Button variant="outline" className="w-full">View Details</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-10 text-muted-foreground">
          No properties found matching your criteria.
        </div>
      )}
    </div>
  );
};

export default PropertyBrowserPage;

