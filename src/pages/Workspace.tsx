import Navbar from "@/components/Navbar";
import UploadZone from "@/components/UploadZone";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Download, RotateCcw, Loader2, History, Wand2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { useLocation } from "react-router-dom";

type WorkspaceState = "idle" | "ready" | "processing" | "done";
type WorkspaceTab = "remove" | "history";

interface HistoryItem {
  id: string;
  createdAt: string;
  filename: string;
  originalDataUrl: string;
  resultUrl: string;
}

const HISTORY_KEY = "bgcut-history";

const Workspace = () => {
  const location = useLocation();
  const [state, setState] = useState<WorkspaceState>("idle");
  const [activeTab, setActiveTab] = useState<WorkspaceTab>("remove");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    const rawHistory = localStorage.getItem(HISTORY_KEY);
    if (!rawHistory) return;
    try {
      const parsed = JSON.parse(rawHistory) as HistoryItem[];
      if (Array.isArray(parsed)) setHistory(parsed);
    } catch {
      setHistory([]);
    }
  }, []);

  useEffect(() => {
    const state = location.state as { file?: File; fileDataUrl?: string | ArrayBuffer | null; filename?: string } | null;

    if (state?.file) {
      handleFileSelect(state.file);
      return;
    }

    if (state?.fileDataUrl) {
      const loadFromDataUrl = async () => {
        try {
          const response = await fetch(state.fileDataUrl as string);
          const blob = await response.blob();
          const fileName = state.filename || "upload.png";
          const file = new File([blob], fileName, { type: blob.type || "image/png" });
          handleFileSelect(file);
        } catch (error) {
          console.error("Failed to restore file from data URL", error);
        }
      };

      loadFromDataUrl();
    }
  }, [location.state]);

  const saveHistory = (items: HistoryItem[]) => {
    setHistory(items);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(items));
  };

  const fileToDataUrl = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(new Error("Failed to read image file"));
      reader.readAsDataURL(file);
    });

  const handleFileSelect = (file: File) => {
    const url = URL.createObjectURL(file);
    setSelectedFile(file);
    setPreview(url);
    setResult(null);
    setState("ready");
  };

  const processBackground = async () => {
    if (!selectedFile) {
      toast.error("Please upload an image first.");
      return;
    }

    setState("processing");
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      const response = await fetch("/api/n8n/webhook/remove-background", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Processing failed: ${response.status} ${errorText}`);
      }

      const data = await response.json();
      if (!data.url) throw new Error("Invalid response format: Missing 'url' field");

      const originalDataUrl = await fileToDataUrl(selectedFile);
      const nextItem: HistoryItem = {
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        filename: selectedFile.name,
        originalDataUrl,
        resultUrl: data.url,
      };

      saveHistory([nextItem, ...history].slice(0, 50));
      setResult(data.url);
      setState("done");
      toast.success("Background removed successfully!");
    } catch (error) {
      console.error("Upload error:", error);
      toast.error(error instanceof Error ? error.message : "Failed to remove background");
      setState("ready");
    }
  };

  const handleDownload = async (url: string, filename: string) => {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Unable to download image");
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = blobUrl;
      anchor.download = filename;
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Download error:", error);
      toast.error("Download failed. Please try again.");
    }
  };

  const reset = () => {
    setState("idle");
    setSelectedFile(null);
    setPreview(null);
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20 sm:pt-24 pb-14 sm:pb-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-7 sm:mb-8">
            <h1 className="font-display font-bold text-2xl sm:text-3xl mb-2">Upload Workspace</h1>
            <p className="text-muted-foreground">Upload an image to remove its background instantly.</p>
          </div>

          <div className="glass rounded-2xl p-1 mb-6 max-w-md mx-auto">
            <div className="grid grid-cols-2 gap-1">
              <button
                className={`h-10 rounded-xl text-sm font-medium transition-colors ${activeTab === "remove" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
                onClick={() => setActiveTab("remove")}
              >
                <span className="inline-flex items-center gap-2">
                  <Wand2 className="w-4 h-4" />
                  Remove
                </span>
              </button>
              <button
                className={`h-10 rounded-xl text-sm font-medium transition-colors ${activeTab === "history" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
                onClick={() => setActiveTab("history")}
              >
                <span className="inline-flex items-center gap-2">
                  <History className="w-4 h-4" />
                  History
                </span>
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === "remove" && (
              <motion.div key="remove-tab" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                {state === "idle" && (
                  <motion.div key="upload" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <UploadZone onFileSelect={handleFileSelect} />
                  </motion.div>
                )}

                {state === "ready" && preview && (
                  <motion.div
                    key="ready"
                    className="glass rounded-2xl p-4 sm:p-6"
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <p className="text-sm text-muted-foreground mb-3 font-medium">Selected Image</p>
                    <div className="rounded-xl overflow-hidden border border-border mb-5">
                      <img src={preview} alt="Selected" className="w-full h-auto" />
                    </div>
                    <div className="flex flex-col gap-3 justify-center sm:flex-row sm:justify-center sm:items-center">
                      <Button variant="hero" size="lg" className="w-full sm:w-auto" onClick={processBackground}>
                        Remove Background
                      </Button>
                      <Button variant="hero-outline" size="lg" className="w-full sm:w-auto" onClick={reset}>
                        Choose Another
                      </Button>
                    </div>
                  </motion.div>
                )}

                {state === "processing" && (
                  <motion.div
                    key="processing"
                    className="glass rounded-2xl p-6 sm:p-12 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="animate-pulse-glow inline-flex bg-primary/10 rounded-full p-5 sm:p-6 mb-5 sm:mb-6">
                      <Loader2 className="w-8 h-8 sm:w-10 sm:h-10 text-primary animate-spin" />
                    </div>
                    <h2 className="font-display font-semibold text-lg sm:text-xl mb-2">Processing your image...</h2>
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

                {state === "done" && preview && result && (
                  <motion.div
                    key="result"
                    className="glass rounded-2xl p-4 sm:p-8"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <div className="grid md:grid-cols-2 gap-4 sm:gap-6 mb-6">
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
                          <img src={result} alt="Result" className="w-full h-auto" />
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <Button
                        variant="hero"
                        size="lg"
                        className="w-full sm:w-auto"
                        onClick={() => handleDownload(result, "background-removed.png")}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download PNG
                      </Button>
                      <Button variant="hero-outline" size="lg" className="w-full sm:w-auto" onClick={reset}>
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Process Another
                      </Button>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}

            {activeTab === "history" && (
              <motion.div key="history-tab" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                {history.length === 0 ? (
                  <div className="glass rounded-2xl p-8 sm:p-10 text-center">
                    <History className="w-10 h-10 text-primary mx-auto mb-3" />
                    <h2 className="font-display font-semibold text-lg sm:text-xl mb-2">No history yet</h2>
                    <p className="text-sm text-muted-foreground">Processed images will appear here and stay after refresh.</p>
                  </div>
                ) : (
                  <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
                    {history.map((item, index) => (
                      <motion.div
                        key={item.id}
                        className="glass rounded-2xl p-4"
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.04 }}
                      >
                        <p className="text-xs text-muted-foreground mb-3">
                          {new Date(item.createdAt).toLocaleString()}
                        </p>
                        <div className="grid grid-cols-2 gap-3 mb-4">
                          <img src={item.originalDataUrl} alt={`${item.filename} original`} className="w-full rounded-lg border border-border" />
                          <img src={item.resultUrl} alt={`${item.filename} removed`} className="w-full rounded-lg border border-border" />
                        </div>
                        <Button
                          variant="hero"
                          className="w-full"
                          onClick={() => handleDownload(item.resultUrl, `bg-removed-${item.id}.png`)}
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Workspace;
