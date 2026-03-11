import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import UploadZone from "@/components/UploadZone";
import FeatureCard from "@/components/FeatureCard";
import StatsBar from "@/components/StatsBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Zap, Shield, Download, Layers, Cpu, Globe } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const features = [
  { icon: Zap, title: "Lightning Fast", description: "Remove backgrounds in under 3 seconds with our advanced AI pipeline." },
  { icon: Shield, title: "Secure & Private", description: "Your images are auto-deleted after 24 hours. We never store your data permanently." },
  { icon: Download, title: "High Quality PNG", description: "Download transparent PNGs at full resolution. No watermarks on Pro." },
  { icon: Layers, title: "Batch Processing", description: "Process multiple images at once with our Pro plan for maximum productivity." },
  { icon: Cpu, title: "AI-Powered", description: "State-of-the-art machine learning models for pixel-perfect edge detection." },
  { icon: Globe, title: "Developer API", description: "Integrate background removal into your apps with our RESTful API." },
];

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-16 md:pt-36 md:pb-24">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 mb-6">
              <Zap className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs font-medium text-primary">AI-Powered Background Removal</span>
            </div>

            <h1 className="font-display font-bold text-4xl md:text-6xl lg:text-7xl mb-6 leading-tight">
              Remove Backgrounds
              <br />
              <span className="text-gradient">In Seconds</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              Upload your image and get a clean, transparent background instantly.
              No design skills needed. Powered by advanced AI.
            </p>
          </motion.div>

          <motion.div
            className="max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <UploadZone onFileSelect={() => navigate("/workspace")} />
          </motion.div>

          <motion.div
            className="flex items-center justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Button variant="hero" size="lg" asChild>
              <Link to="/register">Start Free — 5 images/day</Link>
            </Button>
            <Button variant="hero-outline" size="lg" asChild>
              <Link to="/pricing">View Pricing</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border bg-card/30">
        <div className="container mx-auto px-4">
          <StatsBar />
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="font-display font-bold text-3xl md:text-4xl mb-4">
              Everything You Need
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Professional background removal with enterprise-grade features.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <FeatureCard key={f.title} {...f} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="glass rounded-3xl p-10 md:p-16 text-center glow"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display font-bold text-3xl md:text-4xl mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto mb-8">
              Join thousands of creators removing backgrounds with AI. Start free today.
            </p>
            <Button variant="hero" size="lg" asChild>
              <Link to="/register">Create Free Account</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
