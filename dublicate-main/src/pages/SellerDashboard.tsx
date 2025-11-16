import SellerNav from "@/components/SellerNav";
import StatCard from "@/components/StatCard";
import { Package, ShoppingBag, Truck } from "lucide-react";

const SellerDashboard = () => {
  const stats = [
    {
      title: "Total Products",
      value: 24,
      icon: Package,
      trend: "+3 this month"
    },
    {
      title: "Products Sold",
      value: 156,
      icon: ShoppingBag,
      trend: "+12 this week"
    },
    {
      title: "Pending Delivery",
      value: 8,
      icon: Truck,
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SellerNav />
      
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Welcome back!</h1>
          <p className="text-muted-foreground text-lg">Here's an overview of your business</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        <div className="mt-12 p-8 rounded-lg bg-gradient-subtle border border-border text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to grow your business?</h2>
          <p className="text-muted-foreground mb-6">
            Use our AI-powered tools to create stunning product listings and reach more customers
          </p>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;
