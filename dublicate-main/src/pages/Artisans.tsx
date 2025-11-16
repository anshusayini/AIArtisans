import { useEffect, useState } from "react";
import BuyerNav from "@/components/BuyerNav";
import ArtisanCard from "@/components/ArtisanCard";

const Artisans = () => {
  const [artisans, setArtisans] = useState<any[]>([]);

  const fetchArtisans = async () => {
    try {
      const res = await fetch("http://localhost:5001/seller/all");
      const data = await res.json();
      setArtisans(data);
    } catch (error) {
      console.log("Error fetching sellers:", error);
    }
  };

  useEffect(() => {
    fetchArtisans();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <BuyerNav />

      <div className="container mx-auto px-4 py-12">
        <h1 className="text-5xl font-bold text-center mb-10">Meet Our Artisans</h1>

        {artisans.length === 0 ? (
          <p className="text-center text-muted-foreground">No artisans found</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {artisans.map((artisan) => (
              <ArtisanCard key={artisan._id} artisan={artisan} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Artisans;
