import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const Contact = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <section className="pt-28 pb-20">
      <div className="container mx-auto px-4 max-w-xl">
        <div className="text-center mb-10">
          <h1 className="font-display font-bold text-4xl mb-4">
            Contact <span className="text-gradient">Us</span>
          </h1>
          <p className="text-muted-foreground">Have a question? We'd love to hear from you.</p>
        </div>
        <form className="glass rounded-2xl p-8 space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Your name" className="mt-1" />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@example.com" className="mt-1" />
          </div>
          <div>
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" placeholder="Your message..." className="mt-1" rows={5} />
          </div>
          <Button variant="hero" className="w-full" type="submit">
            Send Message
          </Button>
        </form>
      </div>
    </section>
    <Footer />
  </div>
);

export default Contact;
