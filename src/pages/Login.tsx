import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";
import { motion } from "framer-motion";

const Login = () => (
  <div className="min-h-screen bg-background flex flex-col">
    <Navbar />
    <div className="flex-1 flex items-center justify-center pt-16 pb-8 px-4">
      <motion.div
        className="glass rounded-2xl p-8 w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-center gap-2 mb-6">
          <img src={logo} alt="BgCut AI" className="h-10 w-10 rounded-lg" />
          <span className="font-display font-bold text-xl">
            BgCut <span className="text-gradient">AI</span>
          </span>
        </div>
        <h1 className="font-display font-bold text-2xl text-center mb-1">Welcome back</h1>
        <p className="text-sm text-muted-foreground text-center mb-6">Log in to your account</p>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@example.com" className="mt-1" />
          </div>
          <div>
            <div className="flex justify-between items-center">
              <Label htmlFor="password">Password</Label>
              <Link to="/forgot-password" className="text-xs text-primary hover:underline">
                Forgot password?
              </Link>
            </div>
            <Input id="password" type="password" placeholder="••••••••" className="mt-1" />
          </div>
          <Button variant="hero" className="w-full" type="submit">
            Log In
          </Button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs text-muted-foreground">
            <span className="bg-card px-2">or</span>
          </div>
        </div>

        <Button variant="outline" className="w-full" type="button">
          Continue with Google
        </Button>

        <p className="text-sm text-center text-muted-foreground mt-6">
          Don't have an account?{" "}
          <Link to="/register" className="text-primary hover:underline font-medium">
            Sign up
          </Link>
        </p>
      </motion.div>
    </div>
  </div>
);

export default Login;
