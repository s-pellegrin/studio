
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Rocket } from "lucide-react";

export default function UpgradePage() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Upgrade Your Plan</h1>
      </div>
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Rocket className="h-6 w-6 text-primary" /> Unlock More Features</CardTitle>
          <CardDescription>Choose a plan that best fits your needs and take your property management to the next level.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-muted-foreground">This section is under development. Here you will find details about different subscription plans and features.</p>
          
          <div className="grid md:grid-cols-3 gap-6">
            {/* Placeholder for plan cards */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Plan</CardTitle>
                <CardDescription>$XX/month</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Feature 1</li>
                  <li>Feature 2</li>
                  <li>Feature 3</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant="outline">Choose Basic</Button>
              </CardFooter>
            </Card>
            <Card className="border-primary ring-2 ring-primary">
              <CardHeader>
                <CardTitle>Pro Plan</CardTitle>
                <CardDescription>$YY/month</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>All Basic Features</li>
                  <li>Advanced Feature A</li>
                  <li>Advanced Feature B</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Choose Pro</Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Enterprise Plan</CardTitle>
                <CardDescription>Contact Us</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>All Pro Features</li>
                  <li>Custom Solutions</li>
                  <li>Dedicated Support</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant="outline">Contact Sales</Button>
              </CardFooter>
            </Card>
          </div>

        </CardContent>
      </Card>
    </div>
  );
}
