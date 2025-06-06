import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { DollarSign } from "lucide-react";

export default function AccountingPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Accounting Center</h1>
      </div>
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><DollarSign className="h-6 w-6 text-primary" /> Financial Management</CardTitle>
          <CardDescription>Comprehensive accounting tools for your property portfolio.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This section is under development. Key accounting features will be:</p>
          <ul className="list-disc list-inside mt-4 space-y-1 text-muted-foreground">
            <li>Rent tracking, invoicing, and payment processing.</li>
            <li>Expense management and vendor payments.</li>
            <li>Financial reporting (P&L, balance sheet, cash flow).</li>
            <li>Bank reconciliation and general ledger.</li>
            <li>Integration with QuickBooks.</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
