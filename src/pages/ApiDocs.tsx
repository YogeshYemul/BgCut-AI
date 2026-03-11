import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ApiDocs = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <section className="pt-28 pb-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="font-display font-bold text-4xl mb-4">
          API <span className="text-gradient">Documentation</span>
        </h1>
        <p className="text-muted-foreground mb-10">Integrate BgCut AI background removal into your applications.</p>

        <div className="space-y-8">
          {/* Auth */}
          <div className="glass rounded-2xl p-6">
            <h2 className="font-display font-semibold text-xl mb-3">Authentication</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Include your API key in the <code className="bg-muted px-2 py-0.5 rounded text-primary text-xs">Authorization</code> header.
            </p>
            <pre className="bg-muted rounded-xl p-4 text-sm overflow-x-auto">
{`curl -X POST https://api.bgcut.ai/v1/remove-bg \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -F "image=@photo.jpg"`}
            </pre>
          </div>

          {/* Endpoint */}
          <div className="glass rounded-2xl p-6">
            <h2 className="font-display font-semibold text-xl mb-3">Remove Background</h2>
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-primary/20 text-primary text-xs font-bold px-2 py-1 rounded">POST</span>
              <code className="text-sm text-muted-foreground">/v1/remove-bg</code>
            </div>
            <h3 className="font-semibold text-sm mb-2">Parameters</h3>
            <div className="bg-muted rounded-xl divide-y divide-border">
              {[
                { name: "image", type: "file", required: true, desc: "The image to process (JPG, PNG, WEBP)" },
                { name: "format", type: "string", required: false, desc: "Output format: png (default), webp" },
                { name: "size", type: "string", required: false, desc: "Output size: auto, full, preview" },
              ].map((p) => (
                <div key={p.name} className="flex items-start gap-4 p-3 text-sm">
                  <code className="text-primary font-medium min-w-[80px]">{p.name}</code>
                  <span className="text-muted-foreground">{p.type}</span>
                  {p.required && <span className="text-destructive text-xs">required</span>}
                  <span className="text-muted-foreground flex-1">{p.desc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Response */}
          <div className="glass rounded-2xl p-6">
            <h2 className="font-display font-semibold text-xl mb-3">Response</h2>
            <pre className="bg-muted rounded-xl p-4 text-sm overflow-x-auto">
{`{
  "success": true,
  "result": {
    "url": "https://cdn.bgcut.ai/results/abc123.png",
    "width": 1920,
    "height": 1080,
    "credits_used": 1,
    "credits_remaining": 49
  }
}`}
            </pre>
          </div>

          {/* Rate limits */}
          <div className="glass rounded-2xl p-6">
            <h2 className="font-display font-semibold text-xl mb-3">Rate Limits</h2>
            <div className="bg-muted rounded-xl divide-y divide-border text-sm">
              {[
                { plan: "Free", limit: "5 requests/day" },
                { plan: "Pro", limit: "100 requests/minute" },
                { plan: "Credit Pack", limit: "50 requests/minute" },
              ].map((r) => (
                <div key={r.plan} className="flex justify-between p-3">
                  <span className="font-medium">{r.plan}</span>
                  <span className="text-muted-foreground">{r.limit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
    <Footer />
  </div>
);

export default ApiDocs;
