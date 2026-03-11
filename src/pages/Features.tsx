import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FeatureCard from "@/components/FeatureCard";
import { Zap, Shield, Download, Layers, Cpu, Globe, Palette, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const features = [
  { icon: Zap, title: "Lightning Fast", description: "Advanced AI processes images in under 3 seconds. No waiting, no queues." },
  { icon: Shield, title: "Secure & Private", description: "Images auto-delete after 24 hours. Enterprise-grade encryption at rest and in transit." },
  { icon: Download, title: "High Resolution", description: "Download full-resolution transparent PNGs up to 5000×5000 pixels." },
  { icon: Layers, title: "Batch Processing", description: "Upload and process multiple images simultaneously on Pro plan." },
  { icon: Cpu, title: "AI Edge Detection", description: "State-of-the-art ML models for pixel-perfect edges, even on hair and fur." },
  { icon: Globe, title: "Developer API", description: "RESTful API with SDKs for Node.js, Python, and more. Full documentation included." },
  { icon: Palette, title: "Custom Backgrounds", description: "Replace backgrounds with solid colors, gradients, or custom images." },
  { icon: Smartphone, title: "Works Everywhere", description: "Fully responsive. Use on desktop, tablet, or mobile — no app install needed." },
];

const Features = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <section className="pt-28 pb-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h1 className="font-display font-bold text-4xl md:text-5xl mb-4">
            Powerful <span className="text-gradient">Features</span>
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Everything you need for professional background removal at scale.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {features.map((f, i) => (
            <FeatureCard key={f.title} {...f} delay={i * 0.05} />
          ))}
        </div>
        <div className="text-center mt-14">
          <Button variant="hero" size="lg" asChild>
            <Link to="/register">Get Started Free</Link>
          </Button>
        </div>
      </div>
    </section>
    <Footer />
  </div>
);

export default Features;
