import { useEffect, useState } from "react";

const MyCart = () => {
  const [cart, setCart] = useState<any>(null);
  const guestId = localStorage.getItem("guestCartId");

  // Fetch Cart Items
  const fetchCart = async () => {
    const res = await fetch(`http://localhost:5001/cart/${guestId}`);
    const data = await res.json();
    setCart(data);
  };

  // Delete a specific item
  const deleteItem = async (productId: string) => {
    const res = await fetch(`http://localhost:5001/cart/${guestId}/${productId}`, {
      method: "DELETE",
    });

    if (res.ok) fetchCart();
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">My Cart</h1>

      {!cart || cart.items?.length === 0 ? (
        <p className="text-lg text-gray-500">Your cart is empty</p>
      ) : (
        <div className="space-y-4">
          {cart.items.map((item: any) => (
            <div
              key={item.productId}
              className="border rounded-lg p-4 flex items-center gap-6 bg-white shadow-sm"
            >
              {/* Product Image */}
              <img
                src={item.image}      // BASE64 IMAGE DIRECTLY WORKS HERE
                alt={item.title}
                className="w-24 h-24 object-cover rounded-md border"
              />

              {/* Product Info */}
              <div className="flex-1">
                <h3 className="font-semibold text-xl">{item.title}</h3>
                <p className="text-primary text-lg font-medium">₹{item.price}</p>
                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
              </div>

              {/* Remove Button */}
              <button
                onClick={() => deleteItem(item.productId)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyCart;
