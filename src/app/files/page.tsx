import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Folder } from "lucide-react";

export default function FilesPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">File Repository</h1>
      </div>
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Folder className="h-6 w-6 text-primary" /> Document Management</CardTitle>
          <CardDescription>Securely store and organize all your property-related documents.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This section is under development. File management features will enable:</p>
          <ul className="list-disc list-inside mt-4 space-y-1 text-muted-foreground">
            <li>Cloud storage for leases, contracts, invoices, images, etc.</li>
            <li>Folder organization by property, tenant, or category.</li>
            <li>Version control and document sharing capabilities.</li>
            <li>Search functionality for easy document retrieval.</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
