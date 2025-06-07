
export interface Tenant {
  id: string;
  name: string;
  property: string;
  unit: string;
  leaseEndDate: string;
  rentStatus: 'Paid' | 'Overdue' | 'Pending';
  contact: string;
  email: string;
  insuranceStatus: 'Active' | 'Lapsed' | 'None';
}

export const initialTenants: Tenant[] = [
  { id: '1', name: 'Alice Wonderland', property: 'Oakview Apartments', unit: '101', leaseEndDate: '2024-12-31', rentStatus: 'Paid', contact: '555-0101', email: 'alice@example.com', insuranceStatus: 'Active' },
  { id: '2', name: 'Bob The Builder', property: 'Willow Creek Homes', unit: 'Apt 3B', leaseEndDate: '2025-06-30', rentStatus: 'Overdue', contact: '555-0102', email: 'bob@example.com', insuranceStatus: 'Lapsed' },
  { id: '3', name: 'Carol Danvers', property: 'Oakview Apartments', unit: '204', leaseEndDate: '2024-08-15', rentStatus: 'Paid', contact: '555-0103', email: 'carol@example.com', insuranceStatus: 'Active' },
  { id: '4', name: 'David Copperfield', property: 'Riverside Complex', unit: 'C-12', leaseEndDate: '2025-01-31', rentStatus: 'Pending', contact: '555-0104', email: 'david@example.com', insuranceStatus: 'None' },
  { id: '5', name: 'Eve Harrington', property: 'Willow Creek Homes', unit: 'Unit 5', leaseEndDate: '2024-11-30', rentStatus: 'Paid', contact: '555-0105', email: 'eve@example.com', insuranceStatus: 'Active' },
  { id: '6', name: 'Frank N. Stein', property: 'Gothic Estates', unit: 'Tower Suite', leaseEndDate: '2024-07-20', rentStatus: 'Overdue', contact: '555-0106', email: 'frank@example.com', insuranceStatus: 'Lapsed' },
  { id: '7', name: 'Grace Hopper', property: 'Innovation Lofts', unit: 'GH-01', leaseEndDate: '2025-03-10', rentStatus: 'Paid', contact: '555-0107', email: 'grace@example.com', insuranceStatus: 'Active' },
  { id: '8', name: 'Henry Jekyll', property: 'Dual Manor', unit: 'East Wing', leaseEndDate: '2024-07-15', rentStatus: 'Pending', contact: '555-0108', email: 'henry@example.com', insuranceStatus: 'Active' },
];
