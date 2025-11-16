import { Link } from "react-router-dom";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
  id: string;
  image: string;
  title: string;
  price: number;
  description: string;
  category: string;
  onAddToCart: (id: string) => void; 
}

const ProductCard = ({ id, image, title, price, description, category, onAddToCart }: ProductCardProps) => {
  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-elevated border-border cursor-pointer">

      {/* Click → Open Details */}
      <Link to={`/product/${id}`}>
        <div className="aspect-square overflow-hidden bg-muted">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </Link>
      
      <CardContent className="p-4 space-y-2">
        <p className="text-xs text-muted-foreground">{category}</p>

        <Link to={`/product/${id}`}>
          <h3 className="font-semibold text-lg line-clamp-1">{title}</h3>
        </Link>

        <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
        <p className="text-xl font-bold text-primary mb-3">₹{price.toLocaleString()}</p>

        {/* Add to cart button */}
        <Button 
          className="w-full flex items-center gap-2"
          onClick={(e) => {
            e.preventDefault(); // stops link navigation
            onAddToCart(id);
          }}
        >
          <ShoppingCart className="h-4 w-4" />
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
