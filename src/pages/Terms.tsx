import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Terms = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <section className="pt-28 pb-20">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="font-display font-bold text-4xl mb-8">Terms of Service</h1>
        <div className="glass rounded-2xl p-8 space-y-6 text-muted-foreground leading-relaxed text-sm">
          <p><strong className="text-foreground">Last updated:</strong> March 2026</p>
          <h2 className="font-display font-semibold text-lg text-foreground">1. Acceptance of Terms</h2>
          <p>By using BgCut AI, you agree to these Terms of Service. If you do not agree, please do not use the platform.</p>
          <h2 className="font-display font-semibold text-lg text-foreground">2. Service Description</h2>
          <p>BgCut AI provides AI-powered background removal. Images are processed temporarily and deleted within 24 hours.</p>
          <h2 className="font-display font-semibold text-lg text-foreground">3. Usage Limits</h2>
          <p>Free users receive 5 images per day. Pro and credit-based plans have their own limits as described on the pricing page.</p>
          <h2 className="font-display font-semibold text-lg text-foreground">4. Prohibited Use</h2>
          <p>You may not use BgCut AI for illegal content, abuse our API, or attempt to reverse-engineer our services.</p>
          <h2 className="font-display font-semibold text-lg text-foreground">5. Contact</h2>
          <p>For questions about these terms, contact legal@bgcut.ai.</p>
        </div>
      </div>
    </section>
    <Footer />
  </div>
);

export default Terms;
