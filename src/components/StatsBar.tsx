import { motion } from "framer-motion";

const stats = [
  { value: "5M+", label: "Images Processed" },
  { value: "<3s", label: "Avg Processing" },
  { value: "99.9%", label: "Uptime" },
  { value: "50K+", label: "Happy Users" },
];

const StatsBar = () => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 py-8 sm:py-11">
    {stats.map((s, i) => (
      <motion.div
        key={s.label}
        className="text-center rounded-xl py-2"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileHover={{ y: -3 }}
        transition={{ delay: i * 0.08, duration: 0.45, ease: "easeOut" }}
      >
        <div className="font-display font-bold text-2xl sm:text-3xl text-gradient mb-1">{s.value}</div>
        <div className="text-xs sm:text-sm text-muted-foreground">{s.label}</div>
      </motion.div>
    ))}
  </div>
);

export default StatsBar;
