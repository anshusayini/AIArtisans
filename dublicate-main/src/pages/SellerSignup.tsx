import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const SellerSignup = () => {
  const navigate = useNavigate();
  const [brandTypes, setBrandTypes] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // IMPORTANT: Add email field (your backend needs email)
  const craftTypes = ["Pottery", "Handloom", "Woodwork", "Metalwork", "Textile", "Jewelry"];

  const toggleBrandType = (type: string) => {
    setBrandTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  // ------------------ HANDLE SELLER SIGNUP ------------------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const name = (document.getElementById("name") as HTMLInputElement).value;
    const password = (document.getElementById("password") as HTMLInputElement).value;
    const brandName = (document.getElementById("brand") as HTMLInputElement).value;
    const address = (document.getElementById("address") as HTMLTextAreaElement).value;
    const description = (document.getElementById("description") as HTMLTextAreaElement).value;
    const email = (document.getElementById("email") as HTMLInputElement).value;

    const sellerData = {
      name,
      email,
      password,
      brandName,
      address,
      craftTypes: brandTypes,
      description,
    };

    try {
      const res = await fetch("http://localhost:5001/seller/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sellerData),
      });

      const data = await res.json();
      console.log("Seller Signup Response:", data);

      if (!res.ok) {
        toast.error(data.message || "Signup failed");
        setLoading(false);
        return;
      }

      toast.success("Seller registered successfully!");
      navigate("/seller/login");

    } catch (error) {
      toast.error("Server error. Please try again!");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-elevated border-border">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold bg-gradient-warm bg-clip-text text-transparent">
            Join AI Artisans
          </CardTitle>
          <CardDescription className="text-base">
            Start selling your handcrafted products to a global audience
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* FULL NAME + PASSWORD */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="Enter your name" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="Create a password" required />
              </div>
            </div>

            {/* EMAIL FIELD */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@example.com" required />
            </div>

            {/* BRAND NAME */}
            <div className="space-y-2">
              <Label htmlFor="brand">Brand Name</Label>
              <Input id="brand" placeholder="Your brand or business name" required />
            </div>

            {/* ADDRESS */}
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Textarea id="address" placeholder="Your complete address" rows={3} required />
            </div>

            {/* CRAFT TYPES */}
            <div className="space-y-3">
              <Label>Brand Type (Select all that apply)</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {craftTypes.map((type) => (
                  <div key={type} className="flex items-center space-x-2">
                    <Checkbox
                      id={type}
                      checked={brandTypes.includes(type)}
                      onCheckedChange={() => toggleBrandType(type)}
                    />
                    <label htmlFor={type} className="text-sm cursor-pointer">
                      {type}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* DESCRIPTION */}
            <div className="space-y-2">
              <Label htmlFor="description">Brand Description</Label>
              <Textarea
                id="description"
                placeholder="Tell us about your craft and story..."
                rows={4}
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-warm hover:opacity-90"
              size="lg"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Seller Account"}
            </Button>
          </form>

          <div className="text-center mt-6">
            <p className="text-muted-foreground">
              Already have an account?{" "}
              <Button
                variant="link"
                className="p-0 text-accent"
                onClick={() => navigate("/seller/login")}
              >
                Sign in
              </Button>
            </p>

            <Button
              variant="ghost"
              onClick={() => navigate("/role-selection")}
              className="mt-4 text-muted-foreground"
            >
              ← Back to role selection
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SellerSignup;
