import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BuyerNav from "@/components/BuyerNav";

const ArtisanProfile = () => {
  const { id } = useParams(); // sellerID
  const [artisan, setArtisan] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchArtisanData = async () => {
    try {
      const res = await fetch(`http://localhost:5001/seller/${id}`);
      const data = await res.json();
      if (res.ok) setArtisan(data);
    } catch (err) {
      console.log("Error fetching artisan:", err);
    }
  };

  const fetchArtisanProducts = async () => {
    try {
      const res = await fetch(`http://localhost:5001/seller/${id}/products`); // 🔥 FIXED HERE
      const data = await res.json();
      if (res.ok) setProducts(data);
    } catch (err) {
      console.log("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArtisanData();
    fetchArtisanProducts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center text-lg">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <BuyerNav />
      <div className="container mx-auto px-4 py-10">

        {artisan && (
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold">{artisan.name}</h1>
            <p className="text-gray-600 text-lg">{artisan.email}</p>
          </div>
        )}

        <h2 className="text-2xl font-semibold mb-5 text-center">
          Products by {artisan?.name}
        </h2>

        {products.length === 0 ? (
          <p className="text-center text-muted-foreground text-lg">No products yet</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div
                key={product._id}
                className="border rounded-lg p-4 shadow-md hover:shadow-lg transition"
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-48 object-cover rounded-md mb-3"
                />

                <h3 className="font-semibold text-lg">{product.title}</h3>
                <p className="text-gray-600 line-clamp-2">{product.description}</p>
                <p className="text-primary font-bold text-lg mt-2">₹{product.price}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ArtisanProfile;
