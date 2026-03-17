import Navbar from "@/components/Navbar";
import UploadZone from "@/components/UploadZone";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Download, RotateCcw, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { toast } from "sonner";

type WorkspaceState = "idle" | "processing" | "done";

const Workspace = () => {
  const [state, setState] = useState<WorkspaceState>("idle");
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);

  const handleFile = async (file: File) => {
    const url = URL.createObjectURL(file);
    setPreview(url);
    setState("processing");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("https://yogesh2208.app.n8n.cloud/webhook/remove-background", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to process image");

      const data = await response.json();
      if (!data.url) throw new Error("Invalid response format");
      
      setResult(data.url);
      setState("done");
      toast.success("Background removed successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to remove background. Please try again.");
      setState("idle");
    }
  };

  const reset = () => {
    setState("idle");
    setPreview(null);
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-8">
            <h1 className="font-display font-bold text-3xl mb-2">Upload Workspace</h1>
            <p className="text-muted-foreground">Upload an image to remove its background instantly.</p>
          </div>

          <AnimatePresence mode="wait">
            {state === "idle" && (
              <motion.div key="upload" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <UploadZone onFileSelect={handleFile} />
              </motion.div>
            )}

            {state === "processing" && (
              <motion.div
                key="processing"
                className="glass rounded-2xl p-12 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="animate-pulse-glow inline-flex bg-primary/10 rounded-full p-6 mb-6">
                  <Loader2 className="w-10 h-10 text-primary animate-spin" />
                </div>
                <h2 className="font-display font-semibold text-xl mb-2">Processing your image...</h2>
                <p className="text-sm text-muted-foreground">Our AI is removing the background. This takes a few seconds.</p>
                <div className="mt-6 w-full max-w-xs mx-auto bg-muted rounded-full h-2 overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-primary rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 3, ease: "easeInOut" }}
                  />
                </div>
              </motion.div>
            )}

            {state === "done" && preview && (
              <motion.div
                key="result"
                className="glass rounded-2xl p-8"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2 font-medium">Original</p>
                    <div className="rounded-xl overflow-hidden border border-border">
                      <img src={preview} alt="Original" className="w-full h-auto" />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2 font-medium">Background Removed</p>
                    <div
                      className="rounded-xl overflow-hidden border border-border"
                      style={{
                        backgroundImage:
                          "linear-gradient(45deg, hsl(0 0% 15%) 25%, transparent 25%), linear-gradient(-45deg, hsl(0 0% 15%) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, hsl(0 0% 15%) 75%), linear-gradient(-45deg, transparent 75%, hsl(0 0% 15%) 75%)",
                        backgroundSize: "20px 20px",
                        backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0",
                      }}
                    >
                      <img src={result || ""} alt="Result" className="w-full h-auto" />
                    </div>
                  </div>
                </div>
                <div className="flex gap-3 justify-center">
                  <a href={result || "#"} target="_blank" rel="noopener noreferrer">
                    <Button variant="hero" size="lg">
                      <Download className="w-4 h-4 mr-2" />
                      Download PNG
                    </Button>
                  </a>
                  <Button variant="hero-outline" size="lg" onClick={reset}>
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Process Another
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Workspace;
