
export interface MaintenanceRequest {
  id: string;
  description: string;
  status: 'New' | 'In Progress' | 'Completed' | 'Cancelled';
  priority: 'Urgent' | 'High' | 'Routine' | 'Low';
  propertyId: string;
  unitId?: string;
  reportedDate: string; // YYYY-MM-DD
  assignedTo?: string;
}

export const initialMaintenanceRequests: MaintenanceRequest[] = [
  { id: 'MR001', description: 'Leaky faucet in kitchen', status: 'New', priority: 'Urgent', propertyId: 'Oakview Apartments', unitId: '101', reportedDate: '2024-07-15' },
  { id: 'MR002', description: 'Broken window in living room', status: 'New', priority: 'High', propertyId: 'Willow Creek Homes', unitId: 'Apt 3B', reportedDate: '2024-07-14' },
  { id: 'MR003', description: 'AC not cooling', status: 'In Progress', priority: 'Urgent', propertyId: 'Riverside Complex', unitId: 'C-12', reportedDate: '2024-07-13', assignedTo: 'HVAC Pro Inc.' },
  { id: 'MR004', description: 'Paint touch-up needed in hallway', status: 'New', priority: 'Routine', propertyId: 'Oakview Apartments', reportedDate: '2024-07-12' },
  { id: 'MR005', description: 'Clogged toilet', status: 'Completed', priority: 'High', propertyId: 'Gothic Estates', unitId: 'Tower Suite', reportedDate: '2024-07-10', assignedTo: 'Plumb Perfect' },
  { id: 'MR006', description: 'Garden pest control', status: 'New', priority: 'Low', propertyId: 'Willow Creek Homes', reportedDate: '2024-07-16' },
  { id: 'MR007', description: 'Front door lock sticking', status: 'New', priority: 'Routine', propertyId: 'Innovation Lofts', unitId: 'GH-01', reportedDate: '2024-07-17'},
];
