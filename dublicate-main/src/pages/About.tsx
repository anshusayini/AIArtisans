import BuyerNav from "@/components/BuyerNav";
import { Heart, Globe, Sparkles } from "lucide-react";

const About = () => {
  const features = [
    {
      icon: Heart,
      title: "Empowering Artisans",
      description: "We connect rural craftspeople directly with global buyers, ensuring fair compensation and sustainable livelihoods."
    },
    {
      icon: Globe,
      title: "Global Marketplace",
      description: "Bringing authentic Indian handicrafts to customers worldwide, preserving cultural heritage through commerce."
    },
    {
      icon: Sparkles,
      title: "AI-Powered Tools",
      description: "Advanced technology helps artisans showcase their work professionally and reach wider audiences."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <BuyerNav />
      
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6">Our Mission</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            AI Artisans is dedicated to uplifting rural Indian craftspeople by connecting them with global markets through technology. We preserve traditional arts while empowering artisans with modern tools.
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="text-center p-8 rounded-lg bg-card shadow-card border border-border">
                <div className="inline-flex p-4 bg-primary/10 rounded-full mb-4">
                  <Icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            );
          })}
        </div>

        {/* Story Section */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-gradient-subtle rounded-lg p-8 md:p-12 shadow-card border border-border">
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Traditional Indian handicrafts represent centuries of cultural heritage and craftsmanship. Yet many rural artisans struggle to reach markets beyond their local communities, limiting their income and putting ancient arts at risk.
              </p>
              <p>
                AI Artisans was born from a vision to bridge this gap. By combining cutting-edge AI technology with respect for traditional crafts, we create opportunities for artisans to showcase their work globally while maintaining the authenticity and cultural significance of their creations.
              </p>
              <p>
                Every purchase supports not just an individual artisan, but entire communities, helping preserve invaluable cultural traditions for future generations while providing sustainable livelihoods today.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
