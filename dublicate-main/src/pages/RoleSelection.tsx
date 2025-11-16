import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Palette } from "lucide-react";
import { useNavigate } from "react-router-dom";

const RoleSelection = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">Choose Your Path</h1>
          <p className="text-muted-foreground text-lg">
            Select your role to get started with AI Artisans
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Buyer Card */}
          <Card className="group hover:shadow-elevated transition-all duration-300 border-2 hover:border-primary cursor-pointer">
            <CardContent className="p-8 text-center">
              <div className="inline-flex p-6 bg-primary/10 rounded-full mb-6 group-hover:scale-110 transition-transform">
                <ShoppingBag className="h-16 w-16 text-primary" />
              </div>
              <h2 className="text-3xl font-bold mb-4">Buyer / Customer</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Discover authentic handcrafted products from talented rural artisans across India
              </p>
              <Button 
                size="lg" 
                onClick={() => navigate('/buyer/login')}
                className="w-full bg-gradient-warm hover:opacity-90"
              >
                Continue as Buyer
              </Button>
            </CardContent>
          </Card>

          {/* Seller Card */}
          <Card className="group hover:shadow-elevated transition-all duration-300 border-2 hover:border-accent cursor-pointer">
            <CardContent className="p-8 text-center">
              <div className="inline-flex p-6 bg-accent/10 rounded-full mb-6 group-hover:scale-110 transition-transform">
                <Palette className="h-16 w-16 text-accent" />
              </div>
              <h2 className="text-3xl font-bold mb-4">Seller / Artisan</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Showcase your craftsmanship to global buyers with AI-powered tools and reach new markets
              </p>
              <Button 
                size="lg" 
                onClick={() => navigate('/seller/login')}
                className="w-full bg-accent hover:bg-accent/90"
              >
                Continue as Seller
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="text-muted-foreground"
          >
            ← Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;
