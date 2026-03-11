import { motion } from "framer-motion";

const stats = [
  { value: "5M+", label: "Images Processed" },
  { value: "<3s", label: "Avg Processing" },
  { value: "99.9%", label: "Uptime" },
  { value: "50K+", label: "Happy Users" },
];

const StatsBar = () => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-12">
    {stats.map((s, i) => (
      <motion.div
        key={s.label}
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: i * 0.1 }}
      >
        <div className="font-display font-bold text-3xl text-gradient mb-1">{s.value}</div>
        <div className="text-sm text-muted-foreground">{s.label}</div>
      </motion.div>
    ))}
  </div>
);

export default StatsBar;
