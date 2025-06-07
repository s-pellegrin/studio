
export interface VendorPolicy {
  id: string;
  vendorName: string;
  policyType: 'General Liability' | 'Workers Compensation' | 'Auto Insurance';
  policyNumber: string;
  expiryDate: string; // YYYY-MM-DD
  coverageAmount?: number;
}

function getRelativeDate(daysOffset: number): string {
  const date = new Date();
  date.setDate(date.getDate() + daysOffset);
  return date.toISOString().split('T')[0];
}

export const initialVendorPolicies: VendorPolicy[] = [
  { id: 'VP001', vendorName: 'HVAC Pro Inc.', policyType: 'General Liability', policyNumber: 'GL123456789', expiryDate: getRelativeDate(25), coverageAmount: 1000000 },
  { id: 'VP002', vendorName: 'Plumb Perfect', policyType: 'Workers Compensation', policyNumber: 'WC987654321', expiryDate: getRelativeDate(60) },
  { id: 'VP003', vendorName: 'GreenScape Landscaping', policyType: 'General Liability', policyNumber: 'GLABC123XYZ', expiryDate: getRelativeDate(15) , coverageAmount: 2000000 },
  { id: 'VP004', vendorName: 'SecureIT Solutions', policyType: 'General Liability', policyNumber: 'GLSEC9001', expiryDate: getRelativeDate(-5) }, // Already expired
  { id: 'VP005', vendorName: 'CleanSweep Janitorial', policyType: 'General Liability', policyNumber: 'GLCS007', expiryDate: getRelativeDate(45), coverageAmount: 500000 },
];
