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
      className={`upload-zone flex flex-col items-center justify-center cursor-pointer ${
        dragActive ? "upload-zone-active" : ""
      } ${compact ? "p-8" : "p-12 md:p-20"}`}
      onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
      onDragLeave={() => setDragActive(false)}
      onDrop={onDrop}
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <input
        type="file"
        accept=".jpg,.jpeg,.png,.webp"
        className="hidden"
        onChange={onInputChange}
      />
      <div className="bg-primary/10 rounded-full p-4 mb-4">
        {dragActive ? (
          <ImageIcon className="w-8 h-8 text-primary" />
        ) : (
          <Upload className="w-8 h-8 text-primary" />
        )}
      </div>
      <p className="font-display font-semibold text-lg mb-1">
        {dragActive ? "Drop your image here" : "Drag & drop your image"}
      </p>
      <p className="text-sm text-muted-foreground mb-3">
        or click to browse • JPG, PNG, WEBP • Max 10MB
      </p>
      {error && (
        <p className="text-sm text-destructive font-medium">{error}</p>
      )}
    </motion.label>
  );
};

export default UploadZone;
