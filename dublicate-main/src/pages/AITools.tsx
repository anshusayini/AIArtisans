import { useState } from "react";
import SellerNav from "@/components/SellerNav";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, Wand2, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";

const AITools = () => {
  // COMMON STATES
  const [selectedFile, setSelectedFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // BG REMOVAL
  const [removedBgUrl, setRemovedBgUrl] = useState(null);

  // MOCKUP RESULTS
  const [mockupResults, setMockupResults] = useState(null);

  // MARKETING OUTPUTS
  const [material, setMaterial] = useState("");
  const [description, setDescription] = useState("");
  const [hashtags, setHashtags] = useState([]);
  const [predictedPrice, setPredictedPrice] = useState(0);

  // -------- FILE UPLOAD HANDLER --------
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      toast.success("Image uploaded successfully!");
    }
  };

  // -------- BACKGROUND REMOVAL --------
  const removeBackground = async () => {
    if (!selectedFile) return toast.error("Please upload an image!");

    try {
      setIsProcessing(true);

      const form = new FormData();
      form.append("image", selectedFile);

      const res = await fetch("http://localhost:5001/remove-bg", {
        method: "POST",
        body: form,
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        toast.error("Background removal failed");
        return;
      }

      setRemovedBgUrl("http://localhost:5001/" + data.filePath);
      toast.success("Background removed successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setIsProcessing(false);
    }
  };

  // -------- MOCKUP GENERATOR --------
  const handleVisualize = async () => {
    if (!selectedFile) return toast.error("Please upload a cloth image!");

    try {
      setIsProcessing(true);

      const formData = new FormData();
      formData.append("image", selectedFile);

      const res = await fetch("http://localhost:5001/fabric-mockup", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.error) {
        toast.error("Mockup generation failed");
        return;
      }

      setMockupResults(data);
      toast.success("Mockups generated successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setIsProcessing(false);
    }
  };

  // -------- CAPTION + PRICE MODEL CALL --------
  const generateCaptionAndPrice = async () => {
    if (!removedBgUrl)
      return toast.error("Please remove background first!");
    if (!material)
      return toast.error("Please enter material & quality!");

    try {
      const res = await fetch("http://localhost:5001/caption_price", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imagePath: removedBgUrl,
          material: material,
        }),
      });

      const data = await res.json();

      if (data.error) {
        toast.error("Failed to generate marketing details");
        return;
      }

      setDescription(data.description);
      setHashtags(data.hashtags);
      setPredictedPrice(data.predicted_price);

      toast.success("Marketing details generated!");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SellerNav />

      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">AI Tools</h1>
          <p className="text-muted-foreground text-lg">
            Transform your products with intelligent automation
          </p>
        </div>

        <Tabs defaultValue="visualizer" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="visualizer">Cloth Visualizer</TabsTrigger>
            <TabsTrigger value="marketing">Marketing Generator</TabsTrigger>
          </TabsList>

          {/** ====================== CLOTH VISUALIZER ===================== */}
          <TabsContent value="visualizer" className="mt-6">
            <Card className="shadow-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wand2 className="h-5 w-5 text-primary" />
                  Cloth Visualizer
                </CardTitle>
                <CardDescription>
                  Upload a cloth image and see it visualized as products
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">

                {/* Upload Cloth */}
                <div className="space-y-2">
                  <Label>Upload Cloth Image</Label>
                  <Input type="file" accept="image/*" onChange={handleFileUpload} />
                </div>

                <Button
                  onClick={handleVisualize}
                  className="w-full bg-gradient-warm"
                  disabled={!selectedFile || isProcessing}
                >
                  {isProcessing ? "Processing..." : "Generate Visualizations"}
                </Button>

                {/* Mockup Results */}
                {mockupResults && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                    {mockupResults.pillow && (
                      <div className="border rounded p-2">
                        <p className="font-semibold mb-2">Pillow</p>
                        <img src={mockupResults.pillow} className="rounded" />
                      </div>
                    )}
                    {mockupResults.dress && (
                      <div className="border rounded p-2">
                        <p className="font-semibold mb-2">Dress</p>
                        <img src={mockupResults.dress} className="rounded" />
                      </div>
                    )}
                    {mockupResults.tote && (
                      <div className="border rounded p-2">
                        <p className="font-semibold mb-2">Tote Bag</p>
                        <img src={mockupResults.tote} className="rounded" />
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/** ====================== MARKETING GENERATOR ===================== */}
          <TabsContent value="marketing" className="mt-6">
            <Card className="shadow-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ImageIcon className="h-5 w-5 text-primary" />
                  Marketing Generator
                </CardTitle>
                <CardDescription>
                  Upload product → Remove background → Generate description,
                  hashtags and price.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">

                {/* Upload Product */}
                <div className="space-y-2">
                  <Label>Upload Product Image</Label>
                  <Input type="file" accept="image/*" onChange={handleFileUpload} />
                </div>

                {/* BG Removal */}
                <Button
                  onClick={removeBackground}
                  className="w-full bg-gradient-warm"
                  disabled={!selectedFile || isProcessing}
                >
                  {isProcessing ? "Processing..." : "Remove Background"}
                </Button>

                {/* Show removed background image */}
                {removedBgUrl && (
                  <div className="p-4 bg-muted rounded border">
                    <Label className="font-semibold">Background Removed</Label>
                    <img src={removedBgUrl} className="max-w-xs rounded mt-2" />
                  </div>
                )}

                {/* Material Input */}
                {removedBgUrl && (
                  <div className="space-y-2">
                    <Label className="font-semibold">Material & Quality</Label>
                    <Input
                      placeholder="e.g. ceramic 90%, terracotta 80%, teak wood 85%"
                      value={material}
                      onChange={(e) => setMaterial(e.target.value)}
                    />
                  </div>
                )}

                {/* Generate Marketing Details */}
                {removedBgUrl && (
                  <Button
                    onClick={generateCaptionAndPrice}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Generate Description, Hashtags & Price
                  </Button>
                )}

                {/* RESULTS */}
                <div className="space-y-4 pt-4">

                  <div className="p-4 bg-muted rounded border">
                    <Label className="font-semibold">AI-Generated Description</Label>
                    <p className="text-sm mt-2">
                      {description || "Your product description will appear here..."}
                    </p>
                  </div>

                  <div className="p-4 bg-muted rounded border">
                    <Label className="font-semibold">Suggested Hashtags</Label>
                    <p className="text-sm mt-2">
                      {hashtags.length > 0 ? hashtags.join(", ") : "Hashtags will be generated here..."}
                    </p>
                  </div>

                  <div className="p-4 bg-muted rounded border">
                    <Label className="font-semibold">Predicted Price</Label>
                    <p className="text-2xl font-bold text-primary mt-2">
                      ₹{predictedPrice}
                    </p>
                  </div>

                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AITools;
