
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, DollarSign, TrendingUp, Users, Wrench, PieChart as PieChartIcon, Briefcase, CalendarDays, Construction, Zap } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

// Mock Data
const portfolioOccupancyData = [
  { name: 'Occupied', value: 850, fill: 'hsl(var(--chart-1))' },
  { name: 'Vacant', value: 150, fill: 'hsl(var(--chart-2))' },
];

const financialPerformanceData = [
  { month: 'Jan', revenue: 120000, expenses: 70000, noi: 50000 },
  { month: 'Feb', revenue: 125000, expenses: 72000, noi: 53000 },
  { month: 'Mar', revenue: 130000, expenses: 75000, noi: 55000 },
  { month: 'Apr', revenue: 128000, expenses: 73000, noi: 55000 },
  { month: 'May', revenue: 135000, expenses: 78000, noi: 57000 },
  { month: 'Jun', revenue: 140000, expenses: 80000, noi: 60000 },
];

const leasingActivityData = [
  { name: 'Leads', value: 120, fill: 'hsl(var(--chart-1))' },
  { name: 'Applications', value: 80, fill: 'hsl(var(--chart-2))' },
  { name: 'Leases Signed', value: 60, fill: 'hsl(var(--chart-3))' },
];

const maintenanceStatusData = [
  { name: 'Open', value: 25, fill: 'hsl(var(--chart-4))' },
  { name: 'In Progress', value: 15, fill: 'hsl(var(--chart-5))' },
  { name: 'Completed', value: 150, fill: 'hsl(var(--chart-1))' },
];

const maintenanceCostsData = [
  { property: 'Oakview Apts', cost: 1200 },
  { property: 'Willow Creek', cost: 950 },
  { property: 'Riverbend Plaza', cost: 2100 },
  { property: 'Downtown Lofts', cost: 750 },
];


export default function AnalyticsPage() {
  const totalPortfolioValue = portfolioOccupancyData[0].value + portfolioOccupancyData[1].value;
  const occupancyPercentage = totalPortfolioValue > 0 ? (portfolioOccupancyData[0].value / totalPortfolioValue * 100) : 0;

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Analytics Hub</h1>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-6">
          <TabsTrigger value="overview">Portfolio Overview</TabsTrigger>
          <TabsTrigger value="financial">Financial Trends</TabsTrigger>
          <TabsTrigger value="leasing">Leasing Analytics</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Briefcase className="h-5 w-5 text-primary" /> Occupancy Rate</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={portfolioOccupancyData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                      {portfolioOccupancyData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: number, name: string, props) => [`${value} units`, name]}/>
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><DollarSign className="h-5 w-5 text-primary" /> Revenue vs Expenses (Monthly)</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={financialPerformanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis tickFormatter={(value) => `$${value/1000}k`} />
                    <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
                    <Legend />
                    <Bar dataKey="revenue" fill="hsl(var(--chart-1))" name="Revenue" />
                    <Bar dataKey="expenses" fill="hsl(var(--chart-2))" name="Expenses" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Total Properties</CardTitle>
                <CardDescription>Number of managed properties</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold">42</p> {/* Placeholder */}
              </CardContent>
            </Card>
             <Card>
              <CardHeader>
                <CardTitle>Average Occupancy</CardTitle>
                <CardDescription>Across all properties</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold">{occupancyPercentage.toFixed(1)}%</p>
              </CardContent>
            </Card>
             <Card>
              <CardHeader>
                <CardTitle>Active Leases</CardTitle>
                <CardDescription>Currently active lease agreements</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold">{portfolioOccupancyData[0].value}</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="financial">
          <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><TrendingUp className="h-5 w-5 text-primary" /> Net Operating Income (NOI) Trend</CardTitle>
              </CardHeader>
              <CardContent className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={financialPerformanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis tickFormatter={(value) => `$${value/1000}k`}/>
                    <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`}/>
                    <Legend />
                    <Line type="monotone" dataKey="noi" stroke="hsl(var(--chart-1))" name="NOI" activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Total Revenue (YTD)</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold">${financialPerformanceData.reduce((sum, item) => sum + item.revenue, 0).toLocaleString()}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Total Expenses (YTD)</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold">${financialPerformanceData.reduce((sum, item) => sum + item.expenses, 0).toLocaleString()}</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="leasing">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Users className="h-5 w-5 text-primary" /> Leasing Funnel</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                 <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={leasingActivityData} layout="vertical" margin={{ left: 20, right: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={100} />
                    <Tooltip formatter={(value: number) => `${value} items`} />
                    <Legend />
                    <Bar dataKey="value" name="Count">
                       {leasingActivityData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><CalendarDays className="h-5 w-5 text-primary" /> Average Vacancy Period</CardTitle>
                 <CardDescription>Average time units remain vacant</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold">21 <span className="text-xl text-muted-foreground">days</span></p>
              </CardContent>
            </Card>
             <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Zap className="h-5 w-5 text-primary" /> Renewal Rate</CardTitle>
                <CardDescription>Percentage of leases renewed</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold">75%</p>
              </CardContent>
            </Card>
             <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><BarChart3 className="h-5 w-5 text-primary" /> Applications Processed</CardTitle>
                <CardDescription>Last 30 days</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold">80</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="maintenance">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Wrench className="h-5 w-5 text-primary" /> Maintenance Request Status</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={maintenanceStatusData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} label>
                       {maintenanceStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => `${value} requests`}/>
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Construction className="h-5 w-5 text-primary" /> Maintenance Costs by Property</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={maintenanceCostsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="property" />
                    <YAxis tickFormatter={(value) => `$${value}`}/>
                    <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`}/>
                    <Legend />
                    <Bar dataKey="cost" fill="hsl(var(--chart-3))" name="Total Cost" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
             <Card>
              <CardHeader>
                <CardTitle>Average Repair Time</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold">2.5 <span className="text-xl text-muted-foreground">days</span></p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Open Work Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold">{maintenanceStatusData.find(s => s.name === 'Open')?.value || 0}</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

    