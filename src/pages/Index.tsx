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

      <section className="pt-20 sm:pt-24 md:pt-28 pb-10 sm:pb-14 grid-noise relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="pointer-events-none absolute -left-16 top-8 h-44 w-44 rounded-full bg-primary/20 blur-3xl" />
          <div className="pointer-events-none absolute -right-20 top-20 h-56 w-56 rounded-full bg-primary/15 blur-3xl float-slow" />
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/25 rounded-full px-3 py-1.5 sm:px-4 mb-5 sm:mb-6">
              <Zap className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs font-medium text-primary">AI-Powered Background Removal</span>
            </div>

            <h1 className="hero-title font-display font-bold mb-5 sm:mb-6">
              Remove Backgrounds
              <br />
              <span className="text-gradient">In Seconds</span>
            </h1>

            <p className="hero-subtitle text-muted-foreground max-w-2xl mx-auto mb-7 sm:mb-10 px-1">
              Upload your image and get a clean, transparent background instantly.
              No design skills needed. Powered by advanced AI.
            </p>
          </motion.div>

          <motion.div
            className="max-w-3xl mx-auto mb-8 sm:mb-10 pulse-ring rounded-3xl"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.65, ease: "easeOut" }}
          >
            <UploadZone onFileSelect={() => navigate("/workspace")} />
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 max-w-md sm:max-w-none mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Button variant="hero" size="lg" className="w-full sm:w-auto h-11 sm:h-12" asChild>
              <Link to="/register">Start Free — 5 images/day</Link>
            </Button>
            <Button variant="hero-outline" size="lg" className="w-full sm:w-auto h-11 sm:h-12" asChild>
              <Link to="/pricing">View Pricing</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <section className="border-y border-border bg-card/30">
        <div className="container mx-auto px-4">
          <StatsBar />
        </div>
      </section>

      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="font-display font-bold text-3xl md:text-4xl mb-3 sm:mb-4">
              Everything You Need
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Professional background removal with enterprise-grade features.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {features.map((f, i) => (
              <FeatureCard key={f.title} {...f} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding pt-0">
        <div className="container mx-auto px-4">
          <motion.div
            className="glass rounded-3xl p-6 sm:p-10 md:p-14 text-center glow-lg float-delay"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            <h2 className="font-display font-bold text-3xl md:text-4xl mb-3 sm:mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto mb-6 sm:mb-8 text-sm sm:text-base">
              Join thousands of creators removing backgrounds with AI. Start free today.
            </p>
            <Button variant="hero" size="lg" className="w-full sm:w-auto h-11 sm:h-12" asChild>
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
