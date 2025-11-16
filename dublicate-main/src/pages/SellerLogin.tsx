import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const SellerLogin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // ------------------ HANDLE LOGIN ------------------
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5001/seller/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      console.log("Seller Login Response:", data);

      if (!res.ok) {
        toast.error(data.message || "Invalid credentials");
        setLoading(false);
        return;
      }

      toast.success("Login successful!");

      // Save seller to localStorage
      localStorage.setItem("seller", JSON.stringify(data.seller));

      // Redirect to dashboard
      navigate("/seller/dashboard");

    } catch (error) {
      console.error("Login Error:", error);
      toast.error("Server error! Try again.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-elevated">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">Seller Login</CardTitle>
          <p className="text-muted-foreground">
            Welcome back! Sign in to manage your products
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-accent hover:bg-accent/90"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="text-center mt-6">
            <p className="text-muted-foreground">
              Don't have an account?{" "}
              <Button
                variant="link"
                className="p-0 text-accent"
                onClick={() => navigate("/seller/signup")}
              >
                Sign up
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

export default SellerLogin;
