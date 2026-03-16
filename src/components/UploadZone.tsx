import { useCallback, useState } from "react";
import { Upload, Image as ImageIcon } from "lucide-react";
import { motion } from "framer-motion";

interface UploadZoneProps {
  onFileSelect: (file: File) => void;
  compact?: boolean;
}

const ACCEPTED = ["image/jpeg", "image/png", "image/webp"];
const MAX_SIZE = 10 * 1024 * 1024; // 10MB

const UploadZone = ({ onFileSelect, compact }: UploadZoneProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validate = useCallback((file: File): string | null => {
    if (!ACCEPTED.includes(file.type)) return "Only JPG, PNG, and WEBP files are supported.";
    if (file.size > MAX_SIZE) return "File size must be under 10MB.";
    return null;
  }, []);

  const handleFile = useCallback(
    (file: File) => {
      const err = validate(file);
      if (err) {
        setError(err);
        return;
      }
      setError(null);
      onFileSelect(file);
    },
    [validate, onFileSelect]
  );

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragActive(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const onInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  return (
    <motion.label
      className={`upload-zone flex flex-col items-center justify-center cursor-pointer text-center ${
        dragActive ? "upload-zone-active" : ""
      } ${compact ? "p-6 sm:p-8" : "px-5 py-8 sm:px-8 sm:py-12 md:p-16"}`}
      onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
      onDragLeave={() => setDragActive(false)}
      onDrop={onDrop}
      whileHover={{ scale: 1.015 }}
      whileTap={{ scale: 0.995 }}
      animate={{ y: dragActive ? -2 : 0 }}
      transition={{ type: "spring", stiffness: 280, damping: 20 }}
    >
      <input
        type="file"
        accept=".jpg,.jpeg,.png,.webp"
        className="hidden"
        onChange={onInputChange}
      />
      <div className={`rounded-full p-3 sm:p-4 mb-4 transition-colors ${dragActive ? "bg-primary/20" : "bg-primary/10"}`}>
        {dragActive ? (
          <ImageIcon className="w-7 h-7 sm:w-8 sm:h-8 text-primary" />
        ) : (
          <Upload className="w-7 h-7 sm:w-8 sm:h-8 text-primary" />
        )}
      </div>
      <p className="font-display font-semibold text-base sm:text-lg mb-1">
        {dragActive ? "Drop your image here" : "Drag & drop your image"}
      </p>
      <p className="text-xs sm:text-sm text-muted-foreground mb-3">
        or click to browse • JPG, PNG, WEBP • Max 10MB
      </p>
      {error && (
        <p className="text-xs sm:text-sm text-destructive font-medium">{error}</p>
      )}
    </motion.label>
  );
};

export default UploadZone;
