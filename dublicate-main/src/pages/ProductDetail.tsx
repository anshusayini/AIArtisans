import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import BuyerNav from "@/components/BuyerNav";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart } from "lucide-react";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);

  // Fetch product data from DB
  const fetchProduct = async () => {
    try {
      const res = await fetch(`http://localhost:5001/product/single/${id}`);
      const data = await res.json();
      setProduct(data);
    } catch (err) {
      console.log("Error fetching product:", err);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  // Add to cart handler
  const handleAddToCart = async () => {
    const buyerId = localStorage.getItem("buyerId");

    if (!buyerId) return alert("Please login first!");

    try {
      const res = await fetch("http://localhost:5001/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ buyerId, productId: id }),
      });

      const data = await res.json();
      alert(res.ok ? "Added to cart!" : data.message);

    } catch (error) {
      alert("Failed to add to cart");
    }
  };

  if (!product) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-background">
      <BuyerNav />

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Product Image */}
          <div className="aspect-square rounded-lg overflow-hidden shadow-elevated">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Details */}
          <div className="flex flex-col justify-center">
            <p className="text-sm text-muted-foreground mb-2">{product.category}</p>
            <h1 className="text-4xl font-bold mb-4">{product.title}</h1>
            <p className="text-3xl font-bold text-primary mb-6">₹{product.price.toLocaleString()}</p>

            <p className="text-muted-foreground mb-8 leading-relaxed">
              {product.description}
            </p>

            {/* Optional extra details if you want static bullet points */}
            {product.details && product.details.length > 0 && (
              <div className="mb-8">
                <h3 className="font-semibold mb-4">Product Details</h3>
                <ul className="space-y-2">
                  {product.details.map((detail: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span className="text-muted-foreground">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex gap-4">
              <Button
                size="lg"
                className="flex-1 bg-gradient-warm hover:opacity-90"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>

              <Button size="lg" variant="outline">
                <Heart className="h-5 w-5" />
              </Button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
