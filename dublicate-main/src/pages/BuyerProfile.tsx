import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BuyerNav from "@/components/BuyerNav";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const BuyerProfile = () => {
  const navigate = useNavigate();
  const buyerId = localStorage.getItem("buyerId");

  const [buyer, setBuyer] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fetchBuyerData = async () => {
    // 1️⃣ User not logged in
    if (!buyerId) {
      setErrorMsg("NO_LOGIN");
      setLoading(false);
      return;
    }

    try {
      console.log("BuyerProfile → buyerId:", buyerId);

      const res = await fetch(`http://localhost:5001/buyer/${buyerId}`);
      const data = await res.json();
      console.log("BuyerProfile → API response:", data);

      if (!res.ok || !data || !data._id) {
        setErrorMsg("NOT_FOUND");
      } else {
        setBuyer(data);
      }
    } catch (err) {
      console.log("Fetch buyer error:", err);
      setErrorMsg("SERVER_ERROR");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBuyerData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <p className="text-center mt-10 text-lg">Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-background">
      <BuyerNav />

      <div className="container mx-auto px-4 py-10 max-w-xl">
        {errorMsg === "NO_LOGIN" && (
          <Card className="shadow-lg p-6 text-center">
            <h2 className="text-2xl font-semibold mb-3">Please login</h2>
            <p className="text-gray-500 mb-4">
              You need to login to view your profile.
            </p>
            <Button onClick={() => navigate("/buyer/login")}>
              Go to Login
            </Button>
          </Card>
        )}

        {errorMsg === "NOT_FOUND" && (
          <Card className="shadow-lg p-6 text-center">
            <h2 className="text-2xl font-semibold mb-3">
              Profile not found in database
            </h2>
            <p className="text-gray-500">
              We couldn’t find your profile. Make sure your account is created correctly.
            </p>
          </Card>
        )}

        {errorMsg === "SERVER_ERROR" && (
          <Card className="shadow-lg p-6 text-center">
            <h2 className="text-2xl font-semibold mb-3">Something went wrong</h2>
            <p className="text-gray-500">
              There was an error loading your profile. Please try again later.
            </p>
          </Card>
        )}

        {!errorMsg && buyer && (
          <Card className="shadow-lg">
            <CardContent className="p-6 space-y-5">
              <h2 className="text-3xl font-bold text-center mb-4">My Profile</h2>

              <div className="space-y-3">
                <label className="font-medium">Full Name</label>
                <p className="border p-2 rounded-md bg-gray-100">
                  {buyer.name}
                </p>
              </div>

              <div className="space-y-3">
                <label className="font-medium">Email</label>
                <p className="border p-2 rounded-md bg-gray-100">
                  {buyer.email}
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default BuyerProfile;
