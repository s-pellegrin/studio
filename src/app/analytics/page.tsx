
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PieChart, BarChart3, TrendingUp, Users, Wrench } from "lucide-react"; // Added more icons

export default function AnalyticsPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Analytics Hub</h1>
      </div>
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PieChart className="h-6 w-6 text-primary" /> Data Insights & Analytics
          </CardTitle>
          <CardDescription>Visualize key performance indicators and trends for your portfolio.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-muted-foreground">
            This section is under active development. The Analytics Hub will empower you with comprehensive data visualization and insights, including:
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-accent" />
                  Interactive Dashboards
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Customizable dashboards with a variety of charts and graphs to monitor key metrics at a glance.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-accent" />
                  Portfolio Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Holistic overview of your entire property portfolio's financial health, occupancy rates, and overall performance.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-accent" /> {/* Re-using icon, could be different */}
                  Financial Trends & Forecasting
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Analyze income, expenses, and profitability over time. Leverage data for more accurate financial forecasting.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Users className="h-5 w-5 text-accent" />
                  Occupancy & Leasing Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Track vacancy rates, lease expirations, renewal rates, and marketing effectiveness for your listings.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Wrench className="h-5 w-5 text-accent" />
                  Maintenance Efficiency Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Monitor maintenance costs, request turnaround times, vendor performance, and identify areas for improvement.
                </p>
              </CardContent>
            </Card>
          </div>
          
        </CardContent>
      </Card>
    </div>
  );
}
