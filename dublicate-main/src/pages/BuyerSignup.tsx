import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const BuyerSignup = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5001/buyer/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: username,   // backend expects "name"
          email,
          password,
        }),
      });

      const data = await res.json();
      console.log("Signup Response:", data); // Debug

      if (!res.ok) {
        toast.error(data.message || "Signup failed");
        setLoading(false);
        return;
      }

      toast.success("Account created successfully!");

      // Redirect to login page
      navigate("/buyer/login");

    } catch (error) {
      console.error("Signup Error:", error);
      toast.error("Server error. Try again!");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-elevated">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">
            Create Buyer Account
          </CardTitle>
          <p className="text-muted-foreground">
            Join us to discover authentic handicrafts
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <Label htmlFor="username">Full Name</Label>
              <Input
                id="username"
                type="text"
                placeholder="John Doe"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

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
              disabled={loading}
              className="w-full bg-gradient-warm hover:opacity-90"
            >
              {loading ? "Creating..." : "Create Account"}
            </Button>
          </form>

          <div className="text-center mt-6">
            <p className="text-muted-foreground">
              Already have an account?{" "}
              <Button
                variant="link"
                className="p-0 text-primary"
                onClick={() => navigate("/buyer/login")}
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

export default BuyerSignup;
