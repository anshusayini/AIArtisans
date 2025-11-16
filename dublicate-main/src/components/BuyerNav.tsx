import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { ShoppingBag, ShoppingCart, User, LogOut } from "lucide-react";

const BuyerNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [cartCount, setCartCount] = useState<number>(0);

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
    setCartCount(cartItems.length);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("buyerId");
    localStorage.removeItem("buyerToken");
    navigate("/"); // 🔥 redirect to landing page
  };

  const handleCartClick = () => navigate("/buyer/cart");
  const handleProfileClick = () => navigate("/buyer/profile");

  return (
    <nav className="sticky top-0 z-50 bg-card border-b border-border shadow-soft">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <ShoppingBag className="h-6 w-6 text-primary" />
            <span className="text-2xl font-bold bg-gradient-warm bg-clip-text text-transparent">
              AI Artisans
            </span>
          </Link>

          {/* Navbar Menu */}
          <div className="hidden md:flex items-center gap-6">

            <Link
              to="/buyer/home"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/buyer/home") ? "text-primary" : "text-foreground"
              }`}
            >
              Home
            </Link>

            <Link
              to="/artisans"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/artisans") ? "text-primary" : "text-foreground"
              }`}
            >
              Artisans
            </Link>

            {/* Cart */}
            <button
              onClick={handleCartClick}
              className={`relative text-sm font-medium transition-colors hover:text-primary flex items-center gap-1 ${
                isActive("/buyer/cart") ? "text-primary" : "text-foreground"
              }`}
            >
              <ShoppingCart className="w-4 h-4" /> My Cart
              {cartCount > 0 && (
                <span className="absolute top-[-6px] right-[-10px] bg-primary text-white text-[10px] px-1.5 py-[1px] rounded-full">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Profile */}
            <button
              onClick={handleProfileClick}
              className={`text-sm font-medium transition-colors hover:text-primary flex items-center gap-1 ${
                isActive("/buyer/profile") ? "text-primary" : "text-foreground"
              }`}
            >
              <User className="w-4 h-4" /> Profile
            </button>
          </div>

          {/* Logout Only */}
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4" /> Logout
          </Button>

        </div>
      </div>
    </nav>
  );
};

export default BuyerNav;
