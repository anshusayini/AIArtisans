import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import RoleSelection from "./pages/RoleSelection";

import BuyerLogin from "./pages/BuyerLogin";
import BuyerSignup from "./pages/BuyerSignup";
import BuyerHome from "./pages/BuyerHome";
import ProductDetail from "./pages/ProductDetail";
import Artisans from "./pages/Artisans";
import ArtisanProfile from "./pages/ArtisanProfile";
import MyCart from "./pages/MyCart";         // <-- Updated correct import
import About from "./pages/About";
import BuyerProfile from "./pages/BuyerProfile";

import SellerLogin from "./pages/SellerLogin";
import SellerSignup from "./pages/SellerSignup";
import SellerDashboard from "./pages/SellerDashboard";
import ProductUpload from "./pages/ProductUpload";
import AITools from "./pages/AITools";
import OrdersInsights from "./pages/OrdersInsights";

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>

          {/* Landing & Role Selection */}
          <Route path="/" element={<Landing />} />
          <Route path="/role-selection" element={<RoleSelection />} />

          {/* Buyer */}
          <Route path="/buyer/login" element={<BuyerLogin />} />
          <Route path="/buyer/signup" element={<BuyerSignup />} />
          <Route path="/buyer/home" element={<BuyerHome />} />
          <Route path="/buyer/cart" element={<MyCart />} />   {/* <-- Fixed */}
          <Route path="/buyer/profile" element={<BuyerProfile />} />
          <Route path="/product/:id" element={<ProductDetail />} />

          {/* Artisan Browsing */}
          <Route path="/artisans" element={<Artisans />} />
          <Route path="/artisan/:id" element={<ArtisanProfile />} />

          {/* About */}
          <Route path="/about" element={<About />} />

          {/* Seller */}
          <Route path="/seller/login" element={<SellerLogin />} />
          <Route path="/seller/signup" element={<SellerSignup />} />
          <Route path="/seller/dashboard" element={<SellerDashboard />} />
          <Route path="/seller/products/upload" element={<ProductUpload />} />
          <Route path="/seller/ai-tools" element={<AITools />} />
          <Route path="/seller/orders" element={<OrdersInsights />} />

          {/* Not Found */}
          <Route path="*" element={<NotFound />} />

        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
