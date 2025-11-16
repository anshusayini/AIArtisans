import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BuyerNav from "@/components/BuyerNav";
import ProductCard from "@/components/ProductCard";
import { Input } from "@/components/ui/input";

const BuyerHome = () => {
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Textile", "Pottery", "Wood", "Metal", "Jewelry", "Paintings"];

  // Guest ID generator
  const getGuestCartId = () => {
    let id = localStorage.getItem("guestCartId");
    if (!id) {
      id = "guest_" + Date.now();
      localStorage.setItem("guestCartId", id);
    }
    return id;
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:5001/product/all");
      const data = await response.json();
      setAllProducts(data);
      setFilteredProducts(data);
    } catch (error) {
      console.log("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Add To Cart (NO PAGE REDIRECT)
  const handleAddToCart = async (product: any) => {
    const guestId = getGuestCartId();

    const res = await fetch("http://localhost:5001/cart/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        buyerId: guestId,
        product: {
          productId: product._id,
          title: product.title,
          price: product.price,
          image: product.image
        }
      })
    });

    if (res.ok) {
      alert("Item added to cart!");
      // ❌ No redirect
      // navigate("/mycart");
    }
  };

  // Filtering
  useEffect(() => {
    let result = [...allProducts];

    if (selectedCategory !== "All") {
      result = result.filter(p => p.category.toLowerCase() === selectedCategory.toLowerCase());
    }

    if (search.trim()) {
      result = result.filter(p =>
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredProducts(result);
  }, [search, selectedCategory, allProducts]);

  return (
    <div className="min-h-screen bg-background">
      <BuyerNav />

      <section className="container mx-auto px-4 py-8">
        <Input
          placeholder="Search products..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full md:w-1/2 mx-auto"
        />
      </section>

      <section className="container mx-auto px-4">
        <div className="flex gap-3 justify-center mb-8">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full border ${
                selectedCategory === cat ? "bg-primary text-white" : "border-gray-400"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 pb-16">
        <h2 className="text-3xl font-bold text-center mb-6">All Products</h2>

        {filteredProducts.length === 0 ? (
          <p className="text-center">No products found</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map(product => (
              <ProductCard
                key={product._id}
                id={product._id}
                image={product.image}
                title={product.title}
                price={product.price}
                description={product.description}
                category={product.category}
                onAddToCart={() => handleAddToCart(product)}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default BuyerHome;
