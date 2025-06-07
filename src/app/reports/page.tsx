
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart2, FileText, DollarSign, Wrench, Settings, Users, TrendingUp, PieChart as PieChartIcon, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ReportsPage() {
  const reportCategories = [
    { title: "Financial Reports", description: "Rent roll, delinquency, income/expense statements.", href: "/reports/financial", icon: DollarSign },
    { title: "Operational Reports", description: "Vacancy, occupancy, lease expirations.", href: "/reports/operational", icon: TrendingUp },
    { title: "Maintenance Reports", description: "History, costs, work order status.", href: "/reports/maintenance", icon: Wrench },
    { title: "Tenant & Leasing Reports", description: "Demographics, leasing funnel, retention.", href: "/reports/tenant-leasing", icon: Users },
    { title: "Association Reports", description: "Member lists, dues, budgets, violations.", href: "/reports/association", icon: PieChartIcon },
    { title: "Custom Report Builder", description: "Create and save tailored reports.", href: "/reports/custom-builder", icon: FileText },
  ];

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-2"><BarChart2 className="h-8 w-8 text-primary" /> Reporting Suite</h1>
        <Button variant="outline">
          <Settings className="mr-2 h-4 w-4" /> Global Report Settings
        </Button>
      </div>
      <CardDescription className="mb-6 text-lg">
        Access a comprehensive suite of reports to gain insights into every aspect of your property management operations. 
        Select a category below or use the sidebar to navigate to specific reports.
      </CardDescription>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reportCategories.map((category) => (
          <Card key={category.title} className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <category.icon className="h-6 w-6 text-primary" />
                {category.title}
              </CardTitle>
              <CardDescription>{category.description}</CardDescription>
            </CardHeader>
            <CardFooter>
              <Link href={category.href} passHref className="w-full">
                <Button className="w-full">
                  View {category.title.replace(' Reports', '').replace(' Report Builder', '')} <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
