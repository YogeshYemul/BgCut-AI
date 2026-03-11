import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Upload, Image, CreditCard, BarChart3, Settings, Key } from "lucide-react";

const cards = [
  { icon: Upload, label: "Upload Workspace", href: "/workspace", description: "Remove background from images" },
  { icon: Image, label: "My Images", href: "/dashboard/images", description: "View upload & download history" },
  { icon: CreditCard, label: "Credits", href: "/dashboard/credits", description: "5 credits remaining today" },
  { icon: BarChart3, label: "Usage", href: "/dashboard/usage", description: "View API usage statistics" },
  { icon: Key, label: "API Keys", href: "/dashboard/api-keys", description: "Manage developer API access" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings", description: "Account & billing settings" },
];

const Dashboard = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="mb-10">
          <h1 className="font-display font-bold text-3xl mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Start processing images or manage your account.</p>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: "Credits Today", value: "5/5" },
            { label: "Images Processed", value: "0" },
            { label: "Plan", value: "Free" },
            { label: "API Calls", value: "0" },
          ].map((s) => (
            <div key={s.label} className="glass rounded-xl p-4">
              <div className="text-sm text-muted-foreground mb-1">{s.label}</div>
              <div className="font-display font-bold text-xl">{s.value}</div>
            </div>
          ))}
        </div>

        {/* Action cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cards.map((c) => (
            <Link
              key={c.label}
              to={c.href}
              className="glass rounded-xl p-6 hover:glow transition-all duration-300 group"
            >
              <div className="bg-primary/10 rounded-xl w-10 h-10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                <c.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display font-semibold mb-1">{c.label}</h3>
              <p className="text-sm text-muted-foreground">{c.description}</p>
            </Link>
          ))}
        </div>

        {/* Quick upload */}
        <div className="mt-10">
          <Button variant="hero" size="lg" asChild>
            <Link to="/workspace">
              <Upload className="w-4 h-4 mr-2" />
              Remove Background Now
            </Link>
          </Button>
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

export default Dashboard;
