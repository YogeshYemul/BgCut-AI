import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const navLinks = [
  { label: "Features", href: "/features" },
  { label: "Pricing", href: "/pricing" },
  { label: "API", href: "/api-docs" },
  { label: "About", href: "/about" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex items-center justify-between h-16 px-4 sm:h-[4.5rem]">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="BgCut AI" className="h-9 w-9 rounded-lg" />
          <span className="font-display font-bold text-lg">
            BgCut <span className="text-gradient">AI</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              to={l.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/login">Log in</Link>
          </Button>
          <Button variant="hero" size="sm" asChild>
            <Link to="/register">Get Started Free</Link>
          </Button>
        </div>

        <button
          className="md:hidden text-foreground rounded-lg p-1.5 transition-colors hover:bg-muted"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="md:hidden border-t border-border bg-background/95 backdrop-blur-xl px-4 pb-5 pt-2"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((l) => (
                <Link
                  key={l.href}
                  to={l.href}
                  className="block rounded-xl px-3 py-2.5 text-base text-muted-foreground hover:text-foreground hover:bg-muted/70 transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {l.label}
                </Link>
              ))}
            </div>
            <div className="grid grid-cols-1 gap-2 mt-4">
              <Button variant="ghost" className="h-11 text-base" asChild>
                <Link to="/login" onClick={() => setMobileOpen(false)}>Log in</Link>
              </Button>
              <Button variant="hero" className="h-11 text-base" asChild>
                <Link to="/register" onClick={() => setMobileOpen(false)}>Get Started Free</Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
