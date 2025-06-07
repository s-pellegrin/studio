
export interface Tenant {
  id: string;
  name: string;
  property: string;
  unit: string;
  leaseEndDate: string; // YYYY-MM-DD
  rentStatus: 'Paid' | 'Overdue' | 'Pending';
  contact: string;
  email: string;
  insuranceStatus: 'Active' | 'Lapsed' | 'None'; // Added this field
  // Potentially add rentAmount if we want to sum actual overdue balances
  rentAmount?: number; 
}

export const initialTenants: Tenant[] = [
  { id: '1', name: 'Alice Wonderland', property: 'Oakview Apartments', unit: '101', leaseEndDate: '2024-12-31', rentStatus: 'Paid', contact: '555-0101', email: 'alice@example.com', insuranceStatus: 'Active', rentAmount: 1200 },
  { id: '2', name: 'Bob The Builder', property: 'Willow Creek Homes', unit: 'Apt 3B', leaseEndDate: '2025-06-30', rentStatus: 'Overdue', contact: '555-0102', email: 'bob@example.com', insuranceStatus: 'Lapsed', rentAmount: 1350 },
  { id: '3', name: 'Carol Danvers', property: 'Oakview Apartments', unit: '204', leaseEndDate: '2024-08-15', rentStatus: 'Paid', contact: '555-0103', email: 'carol@example.com', insuranceStatus: 'Active', rentAmount: 1100 },
  { id: '4', name: 'David Copperfield', property: 'Riverside Complex', unit: 'C-12', leaseEndDate: '2025-01-31', rentStatus: 'Pending', contact: '555-0104', email: 'david@example.com', insuranceStatus: 'None', rentAmount: 950 },
  { id: '5', name: 'Eve Harrington', property: 'Willow Creek Homes', unit: 'Unit 5', leaseEndDate: '2024-07-28', rentStatus: 'Overdue', contact: '555-0105', email: 'eve@example.com', insuranceStatus: 'Active', rentAmount: 1500 }, // Expiring soon
  { id: '6', name: 'Frank N. Stein', property: 'Gothic Estates', unit: 'Tower Suite', leaseEndDate: '2024-07-20', rentStatus: 'Overdue', contact: '555-0106', email: 'frank@example.com', insuranceStatus: 'Lapsed', rentAmount: 1250 }, // Expired
  { id: '7', name: 'Grace Hopper', property: 'Innovation Lofts', unit: 'GH-01', leaseEndDate: '2025-03-10', rentStatus: 'Paid', contact: '555-0107', email: 'grace@example.com', insuranceStatus: 'Active', rentAmount: 1800 },
  { id: '8', name: 'Henry Jekyll', property: 'Dual Manor', unit: 'East Wing', leaseEndDate: '2024-07-15', rentStatus: 'Pending', contact: '555-0108', email: 'henry@example.com', insuranceStatus: 'Active', rentAmount: 1000 }, // Expired
  // Add more tenants to reach at least 24 for the insurance chart example if needed
  { id: '9', name: 'Ivy Gardener', property: 'Green Acres', unit: 'GA-1', leaseEndDate: '2025-05-01', rentStatus: 'Paid', contact: '555-0109', email: 'ivy@example.com', insuranceStatus: 'None', rentAmount: 1150 },
  { id: '10', name: 'Jack Sprat', property: 'Lean Living', unit: 'LL-2', leaseEndDate: '2025-04-15', rentStatus: 'Paid', contact: '555-0110', email: 'jack@example.com', insuranceStatus: 'None', rentAmount: 900 },
  { id: '11', name: 'Jill Hill', property: 'Water Well Apts', unit: 'WW-3', leaseEndDate: '2025-02-28', rentStatus: 'Paid', contact: '555-0111', email: 'jill@example.com', insuranceStatus: 'None', rentAmount: 1200 },
  { id: '12', name: 'Ken Carson', property: 'Dream House Estates', unit: 'DH-1', leaseEndDate: '2024-11-01', rentStatus: 'Paid', contact: '555-0112', email: 'ken@example.com', insuranceStatus: 'None', rentAmount: 2500 },
  { id: '13', name: 'Laura Craft', property: 'Adventure Villas', unit: 'AV-10', leaseEndDate: '2025-07-01', rentStatus: 'Paid', contact: '555-0113', email: 'laura@example.com', insuranceStatus: 'None', rentAmount: 1700 },
  { id: '14', name: 'Mike Rophone', property: 'Sound Studios', unit: 'SS-5', leaseEndDate: '2024-09-10', rentStatus: 'Paid', contact: '555-0114', email: 'mike@example.com', insuranceStatus: 'None', rentAmount: 1300 },
  { id: '15', name: 'Nancy Drew', property: 'Mystery Manor', unit: 'MM-1', leaseEndDate: '2025-08-01', rentStatus: 'Paid', contact: '555-0115', email: 'nancy@example.com', insuranceStatus: 'None', rentAmount: 1400 },
  { id: '16', name: 'Oliver Twist', property: 'Orphanage Place', unit: 'OP-2', leaseEndDate: '2024-10-15', rentStatus: 'Paid', contact: '555-0116', email: 'oliver@example.com', insuranceStatus: 'None', rentAmount: 800 },
  { id: '17', name: 'Peter Pan', property: 'Neverland Heights', unit: 'NH-7', leaseEndDate: '2025-06-01', rentStatus: 'Paid', contact: '555-0117', email: 'peter@example.com', insuranceStatus: 'None', rentAmount: 1600 },
  { id: '18', name: 'Quincy Adams', property: 'Presidential Suites', unit: 'PS-1', leaseEndDate: '2024-12-01', rentStatus: 'Paid', contact: '555-0118', email: 'quincy@example.com', insuranceStatus: 'None', rentAmount: 3000 },
  { id: '19', name: 'Robin Hood', property: 'Sherwood Forest Apts', unit: 'SF-3', leaseEndDate: '2025-03-20', rentStatus: 'Paid', contact: '555-0119', email: 'robin@example.com', insuranceStatus: 'None', rentAmount: 1250 },
  { id: '20', name: 'Sam Spade', property: 'Detective Den', unit: 'DD-1', leaseEndDate: '2025-01-10', rentStatus: 'Paid', contact: '555-0120', email: 'sam@example.com', insuranceStatus: 'None', rentAmount: 1550 },
  { id: '21', name: 'Tina Turner', property: 'River Deep Condos', unit: 'RD-100', leaseEndDate: '2024-08-30', rentStatus: 'Paid', contact: '555-0121', email: 'tina@example.com', insuranceStatus: 'None', rentAmount: 2200 }, // Expiring soon
  { id: '22', name: 'Ursula Undine', property: 'Sea View Villas', unit: 'SV-8', leaseEndDate: '2025-09-01', rentStatus: 'Paid', contact: '555-0122', email: 'ursula@example.com', insuranceStatus: 'None', rentAmount: 1900 },
  { id: '23', name: 'Victor Frankenstein', property: 'Creation Condos', unit: 'CC-1', leaseEndDate: '2024-11-15', rentStatus: 'Paid', contact: '555-0123', email: 'victor@example.com', insuranceStatus: 'None', rentAmount: 1750 },
  { id: '24', name: 'Wendy Darling', property: 'Neverland Heights', unit: 'NH-8', leaseEndDate: '2025-06-01', rentStatus: 'Paid', contact: '555-0124', email: 'wendy@example.com', insuranceStatus: 'None', rentAmount: 1600 },
];


    