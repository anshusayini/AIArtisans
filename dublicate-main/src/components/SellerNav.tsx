import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Sparkles, Package } from "lucide-react";

const SellerNav = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  const navItems = [
    { path: "/seller/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { path: "/seller/products/upload", label: "Upload Product", icon: Package },
    { path: "/seller/ai-tools", label: "AI Tools", icon: Sparkles },
    { path: "/seller/orders", label: "Orders & Insights", icon: Package },
  ];
  
  return (
    <nav className="sticky top-0 z-50 bg-card border-b border-border shadow-soft">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/seller/dashboard" className="flex items-center gap-2">
            <span className="text-2xl font-bold bg-gradient-warm bg-clip-text text-transparent">
              AI Artisans
            </span>
            <span className="text-sm text-muted-foreground">Seller Portal</span>
          </Link>
          
          <div className="flex items-center gap-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary ${
                    isActive(item.path) ? 'text-primary' : 'text-foreground'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden md:inline">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default SellerNav;
