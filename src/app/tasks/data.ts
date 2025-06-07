
export interface Task {
  id: string;
  description: string;
  dueDate: string; // YYYY-MM-DD
  priority: 'High' | 'Medium' | 'Low';
  status: 'Pending' | 'In Progress' | 'Completed' | 'Overdue';
  assignedTo?: string;
  relatedTo?: string; // e.g., Property ID, Tenant ID, Lease ID
}

function getRelativeDate(daysOffset: number): string {
  const date = new Date();
  date.setDate(date.getDate() + daysOffset);
  return date.toISOString().split('T')[0];
}

export const initialTasks: Task[] = [
  { id: 'TSK001', description: 'Follow up on tenant Alice Wonderland re: lease renewal', dueDate: getRelativeDate(-2) , priority: 'High', status: 'Pending', relatedTo: 'Tenant ID 1' },
  { id: 'TSK002', description: 'Schedule quarterly pest control for Oakview Apartments', dueDate: getRelativeDate(5), priority: 'Medium', status: 'Pending', relatedTo: 'Property Oakview Apartments' },
  { id: 'TSK003', description: 'Finalize Q2 financial reports', dueDate: getRelativeDate(-5), priority: 'High', status: 'Pending', assignedTo: 'Accounting Dept' },
  { id: 'TSK004', description: 'Inspect vacant unit Apt 3B at Willow Creek Homes', dueDate: getRelativeDate(1), priority: 'Medium', status: 'In Progress' },
  { id: 'TSK005', description: 'Pay property tax bill for Riverside Complex', dueDate: getRelativeDate(10), priority: 'High', status: 'Pending' },
  { id: 'TSK006', description: 'Review vendor contract for HVAC Pro Inc.', dueDate: getRelativeDate(-1), priority: 'Low', status: 'Completed' },
  { id: 'TSK007', description: 'Send welcome packet to new tenant in GH-01', dueDate: getRelativeDate(3), priority: 'Medium', status: 'Pending'},
];
