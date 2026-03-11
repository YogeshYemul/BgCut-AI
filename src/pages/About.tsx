import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import logo from "@/assets/logo.png";

const About = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <section className="pt-28 pb-20">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-12">
          <img src={logo} alt="BgCut AI" className="h-16 w-16 rounded-2xl mx-auto mb-4" />
          <h1 className="font-display font-bold text-4xl mb-4">
            About <span className="text-gradient">BgCut AI</span>
          </h1>
        </div>
        <div className="glass rounded-2xl p-8 space-y-6 text-muted-foreground leading-relaxed">
          <p>
            BgCut AI is an AI-powered background removal platform built for speed and simplicity.
            We help e-commerce sellers, designers, marketers, and creators produce professional
            transparent-background images in seconds.
          </p>
          <p>
            Our mission is to make professional image editing accessible to everyone — no design
            skills required. Upload your image, and our AI handles the rest.
          </p>
          <p>
            Built with state-of-the-art machine learning models, BgCut AI delivers pixel-perfect
            edge detection even on complex subjects like hair, fur, and semi-transparent objects.
          </p>
        </div>
      </div>
    </section>
    <Footer />
  </div>
);

export default About;
