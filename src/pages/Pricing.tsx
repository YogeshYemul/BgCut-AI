import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const plans = [
  {
    name: "Free",
    price: "₹0",
    period: "forever",
    description: "Get started with basic background removal.",
    features: ["30 images per day", "Standard processing", "JPG & PNG support", "Web access"],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    price: "₹499",
    period: "/month",
    description: "Unlimited power for professionals.",
    features: [
      "Unlimited images",
      "Priority processing",
      "No watermark",
      "All formats supported",
      "Batch processing",
      "API access",
      "Priority support",
    ],
    cta: "Go Pro",
    popular: true,
  },
  {
    name: "Credit Pack",
    price: "₹199",
    period: "/ 50 credits",
    description: "Pay as you go. No subscription.",
    features: ["50 image credits", "No expiry", "Standard processing", "All formats supported", "API access"],
    cta: "Buy Credits",
    popular: false,
  },
];

const Pricing = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <section className="pt-28 pb-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h1 className="font-display font-bold text-4xl md:text-5xl mb-4">
            Simple, Transparent <span className="text-gradient">Pricing</span>
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Start free. Upgrade when you need more power.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              className={`glass rounded-2xl p-8 relative flex flex-col ${
                plan.popular ? "border-primary glow" : ""
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-primary text-primary-foreground text-xs font-semibold px-4 py-1 rounded-full">
                  Most Popular
                </div>
              )}
              <h3 className="font-display font-bold text-xl mb-1">{plan.name}</h3>
              <div className="mb-2">
                <span className="font-display font-bold text-3xl">{plan.price}</span>
                <span className="text-sm text-muted-foreground">{plan.period}</span>
              </div>
              <p className="text-sm text-muted-foreground mb-6">{plan.description}</p>
              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button variant={plan.popular ? "hero" : "hero-outline"} className="w-full" asChild>
                <Link to="/register">{plan.cta}</Link>
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
    <Footer />
  </div>
);

export default Pricing;
