import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Privacy = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <section className="pt-28 pb-20">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="font-display font-bold text-4xl mb-8">Privacy Policy</h1>
        <div className="glass rounded-2xl p-8 space-y-6 text-muted-foreground leading-relaxed text-sm">
          <p><strong className="text-foreground">Last updated:</strong> March 2026</p>
          <h2 className="font-display font-semibold text-lg text-foreground">1. Information We Collect</h2>
          <p>We collect your email address and usage data when you create an account. Images uploaded for processing are temporarily stored and automatically deleted after 24 hours.</p>
          <h2 className="font-display font-semibold text-lg text-foreground">2. How We Use Your Data</h2>
          <p>Your data is used solely to provide background removal services, manage your account, and process payments. We do not sell your personal information.</p>
          <h2 className="font-display font-semibold text-lg text-foreground">3. Data Security</h2>
          <p>All data is encrypted in transit and at rest. We follow industry best practices and OWASP security guidelines.</p>
          <h2 className="font-display font-semibold text-lg text-foreground">4. Contact</h2>
          <p>For privacy inquiries, contact us at privacy@bgcut.ai.</p>
        </div>
      </div>
    </section>
    <Footer />
  </div>
);

export default Privacy;
