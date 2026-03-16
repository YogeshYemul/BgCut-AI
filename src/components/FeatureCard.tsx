import { type LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  delay?: number;
}

const FeatureCard = ({ icon: Icon, title, description, delay = 0 }: FeatureCardProps) => (
  <motion.div
    className="glass rounded-2xl p-5 sm:p-6 group transition-all duration-300 hover:-translate-y-1 hover:glow"
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    whileHover={{ scale: 1.015 }}
    transition={{ delay, duration: 0.5, ease: "easeOut" }}
  >
    <div className="bg-primary/10 rounded-xl w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
      <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
    </div>
    <h3 className="font-display font-semibold text-base sm:text-lg mb-2">{title}</h3>
    <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
  </motion.div>
);

export default FeatureCard;
