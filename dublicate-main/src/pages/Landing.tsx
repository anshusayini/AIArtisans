import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Users, Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen text-foreground scroll-smooth"
      style={{
        backgroundImage: "url('/src/assets/muggu-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Navbar */}
      <nav className="border-b border-border bg-white/40 backdrop-blur-xl fixed top-0 w-full z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-extrabold tracking-wide bg-gradient-to-r from-orange-600 to-yellow-500 bg-clip-text text-transparent">
            AI Artisans
          </h1>

          <div className="hidden md:flex gap-8 font-medium">
            <a href="#home" className="text-[#6c4a3a] hover:text-orange-600 transition-colors">
              Home
            </a>

            <a href="#artisans" className="text-[#6c4a3a] hover:text-orange-600 transition-colors">
              Artisans
            </a>

            <a href="#about" className="text-[#6c4a3a] hover:text-orange-600 transition-colors">
              About Us
            </a>

            <a href="#contact" className="text-[#6c4a3a] hover:text-orange-600 transition-colors">
              Contact
            </a>
          </div>

          <Button
            variant="outline"
            className="md:hidden"
            onClick={() => navigate("/role-selection")}
          >
            Start
          </Button>
        </div>
      </nav>

      {/* Hero Section (Transparent) */}
      <section
        id="home"
        className="relative h-[650px] flex items-center justify-center bg-transparent"
      >
        <div className="relative text-center max-w-3xl px-4 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight text-[#5b3d2a]">
            Empowering India’s  
            <span className="block bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">
              Finest Artisans
            </span>
            with AI
          </h1>

          <p className="text-lg md:text-2xl text-[#7c5a43] mb-8 max-w-2xl mx-auto">
            A modern platform connecting rural craftsmanship to global buyers
            through the power of artificial intelligence.
          </p>

          <div className="flex gap-4 justify-center flex-wrap">
            <Button
              size="lg"
              onClick={() => navigate("/role-selection")}
              className="bg-gradient-to-r from-amber-400 to-orange-600 text-black font-semibold hover:opacity-90 shadow-lg"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>

            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate("/buyer/home")}
              className="border-[#5b3d2a] text-[#5b3d2a] hover:bg-[#5b3d2a] hover:text-white transition-all"
            >
              Explore Products
            </Button>
          </div>
        </div>
      </section>

      {/* ⭐ ARTISANS SECTION */}
      <section id="artisans" className="py-24 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-[#5b3d2a]">
              Why Choose <span className="text-orange-600">AI Artisans?</span>
            </h2>
            <p className="text-[#7e5e4b] text-lg max-w-3xl mx-auto">
              Where traditional craftsmanship meets cutting-edge innovation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                icon: <Users className="h-10 w-10 text-orange-600" />,
                title: "Empower Artisans",
                text: "Helping skilled artisans reach global markets with fair compensation.",
              },
              {
                icon: <Sparkles className="h-10 w-10 text-yellow-600" />,
                title: "AI-Powered Tools",
                text: "Smart AI tools to enhance product visuals and improve presentation.",
              },
              {
                icon: <Globe className="h-10 w-10 text-orange-600" />,
                title: "Global Marketplace",
                text: "Authentic handcrafted goods delivered worldwide with transparency.",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="p-10 text-center rounded-xl bg-white/60 border shadow-md hover:shadow-xl transition-all"
              >
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-[#5b3d2a]">
                  {feature.title}
                </h3>
                <p className="text-[#7e5e4b]">{feature.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ⭐ ABOUT SECTION */}
      <section id="about" className="py-24 bg-white/70 backdrop-blur-sm">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6 text-[#5b3d2a]">About Us</h2>
          <p className="text-[#7e5e4b] text-lg max-w-2xl mx-auto">
            AI Artisans is committed to preserving India's cultural heritage
            while providing artisans the tools and platform to grow globally.
          </p>
        </div>
      </section>

      {/* ⭐ CONTACT SECTION */}
      <section id="contact" className="py-24 text-center bg-white/70 backdrop-blur-sm">
        <h2 className="text-4xl font-bold mb-6 text-[#5b3d2a]">
          Start Your Journey Today
        </h2>
        <p className="text-[#7e5e4b] text-lg mb-8 max-w-xl mx-auto">
          Whether you're a creator or a buyer, AI Artisans brings handcrafted excellence closer to you.
        </p>

        <Button
          size="lg"
          onClick={() => navigate("/role-selection")}
          className="bg-gradient-to-r from-orange-500 via-amber-400 to-yellow-300 text-black font-semibold hover:opacity-90 shadow-md"
        >
          Join AI Artisans
        </Button>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 text-center text-[#7e5e4b]">
          © 2024 AI Artisans — Preserving India’s cultural heritage through innovation.
        </div>
      </footer>
    </div>
  );
};

export default Landing;
