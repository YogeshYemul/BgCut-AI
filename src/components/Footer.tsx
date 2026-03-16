import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

const Footer = () => (
  <footer className="border-t border-border bg-card/50">
    <div className="container mx-auto px-4 py-10 sm:py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="sm:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <img src={logo} alt="BgCut AI" className="h-8 w-8 rounded-lg" />
            <span className="font-display font-bold">BgCut <span className="text-gradient">AI</span></span>
          </div>
          <p className="text-sm text-muted-foreground max-w-xs">
            AI-powered background removal in seconds. Simple, fast, and professional.
          </p>
        </div>
        <div>
          <h4 className="font-display font-semibold text-sm mb-3">Product</h4>
          <div className="flex flex-col gap-2">
            <Link to="/features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</Link>
            <Link to="/pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Pricing</Link>
            <Link to="/api-docs" className="text-sm text-muted-foreground hover:text-foreground transition-colors">API</Link>
          </div>
        </div>
        <div>
          <h4 className="font-display font-semibold text-sm mb-3">Company</h4>
          <div className="flex flex-col gap-2">
            <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About</Link>
            <Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact</Link>
            <Link to="/blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Blog</Link>
          </div>
        </div>
        <div>
          <h4 className="font-display font-semibold text-sm mb-3">Legal</h4>
          <div className="flex flex-col gap-2">
            <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
      <div className="mt-8 sm:mt-10 pt-6 border-t border-border text-center text-xs sm:text-sm text-muted-foreground">
        © {new Date().getFullYear()} BgCut AI. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
