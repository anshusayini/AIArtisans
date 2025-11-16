import SellerNav from "@/components/SellerNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, TrendingUp } from "lucide-react";

const OrdersInsights = () => {
  const deliveredOrders = [
    { id: "ORD-001", product: "Handwoven Textile", buyer: "Priya Sharma", date: "2025-11-10", amount: 2499 },
    { id: "ORD-002", product: "Clay Vase", buyer: "Amit Patel", date: "2025-11-08", amount: 1299 },
    { id: "ORD-003", product: "Wooden Bowl", buyer: "Sarah Johnson", date: "2025-11-05", amount: 1899 },
  ];

  const categoryInsights = [
    { category: "Textiles", sales: 45, color: "bg-primary" },
    { category: "Pottery", sales: 30, color: "bg-accent" },
    { category: "Woodwork", sales: 25, color: "bg-secondary" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SellerNav />
      
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Orders & Insights</h1>
          <p className="text-muted-foreground text-lg">Track your sales and understand your performance</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Delivered Orders */}
          <Card className="shadow-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5 text-primary" />
                Delivered Orders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {deliveredOrders.map((order) => (
                  <div key={order.id} className="p-4 bg-muted rounded-lg border border-border">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-semibold">{order.product}</p>
                        <p className="text-sm text-muted-foreground">{order.buyer}</p>
                      </div>
                      <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20">
                        Delivered
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">{order.date}</span>
                      <span className="font-bold text-primary">₹{order.amount.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Category Insights */}
          <Card className="shadow-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Sales by Category
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {categoryInsights.map((item) => (
                  <div key={item.category}>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">{item.category}</span>
                      <span className="text-muted-foreground">{item.sales}%</span>
                    </div>
                    <div className="h-3 bg-muted rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${item.color} transition-all duration-300`}
                        style={{ width: `${item.sales}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-4 bg-gradient-subtle rounded-lg border border-border">
                <p className="text-sm text-muted-foreground mb-2">Top performing category</p>
                <p className="text-2xl font-bold">Textiles</p>
                <p className="text-sm text-accent font-medium mt-1">+15% from last month</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OrdersInsights;
