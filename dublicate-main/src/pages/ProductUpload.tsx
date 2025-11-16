import { useState } from "react";
import SellerNav from "@/components/SellerNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";

const ProductUpload = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const seller = JSON.parse(localStorage.getItem("seller") || "{}");

  // ------------------ IMAGE UPLOAD ------------------
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setSelectedImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  // ------------------ SUBMIT FORM ------------------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedImage) {
      toast.error("Please upload a product image!");
      return;
    }

    const title = (document.getElementById("title") as HTMLInputElement).value;
    const price = (document.getElementById("price") as HTMLInputElement).value;
    const description = (document.getElementById("description") as HTMLTextAreaElement).value;

    const productData = {
      sellerId: seller.id,
      title,
      price,
      category,
      description,
      image: selectedImage, // base64 image
    };

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5001/product/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Product upload failed");
        setLoading(false);
        return;
      }

      toast.success("Product uploaded successfully!");
      setSelectedImage(null);

    } catch (error) {
      toast.error("Server error, try again!");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <SellerNav />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Upload New Product</h1>
            <p className="text-muted-foreground text-lg">Share your craftsmanship with the world</p>
          </div>

          <Card className="shadow-card border border-border">
            <CardHeader>
              <CardTitle>Product Details</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">

                {/* IMAGE UPLOAD */}
                <div>
                  <Label>Product Image</Label>
                  <div className="mt-2">
                    {selectedImage ? (
                      <div className="relative aspect-square rounded-lg overflow-hidden bg-muted max-w-md mx-auto">
                        <img src={selectedImage} alt="Product preview" className="w-full h-full object-cover" />

                        <Button
                          type="button"
                          variant="secondary"
                          size="sm"
                          className="absolute top-2 right-2"
                          onClick={() => setSelectedImage(null)}
                        >
                          Change
                        </Button>
                      </div>
                    ) : (
                      <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-border rounded-lg cursor-pointer bg-muted/20 hover:bg-muted/40 transition-colors">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <ImageIcon className="w-12 h-12 mb-3 text-muted-foreground" />
                          <p className="mb-2 text-sm text-muted-foreground">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                          </p>
                        </div>
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={handleImageUpload}
                        />
                      </label>
                    )}
                  </div>
                </div>

                {/* TITLE */}
                <div>
                  <Label htmlFor="title">Product Title</Label>
                  <Input id="title" placeholder="e.g., Handwoven Cotton Saree" required />
                </div>

                {/* PRICE */}
                <div>
                  <Label htmlFor="price">Price (₹)</Label>
                  <Input id="price" type="number" placeholder="2999" required />
                </div>

                {/* CATEGORY */}
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select onValueChange={setCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="textile">Textiles & Fabrics</SelectItem>
                      <SelectItem value="pottery">Pottery & Ceramics</SelectItem>
                      <SelectItem value="woodwork">Woodwork</SelectItem>
                      <SelectItem value="jewelry">Jewelry & Accessories</SelectItem>
                      <SelectItem value="home-decor">Home Decor</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* DESCRIPTION */}
                <div>
                  <Label htmlFor="description">Product Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your product..."
                    rows={6}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-warm hover:opacity-90"
                  size="lg"
                  disabled={loading}
                >
                  <Upload className="mr-2 h-5 w-5" />
                  {loading ? "Uploading..." : "Upload Product"}
                </Button>

              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProductUpload;
