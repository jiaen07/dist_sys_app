"use client";

import { motion } from "framer-motion";

interface EncapsulationWidgetProps {
  isVisible: boolean;
  activeTopicId: string | null;
}

export function EncapsulationWidget({ isVisible, activeTopicId }: EncapsulationWidgetProps) {
  if (!isVisible && !activeTopicId) return null;

  const layers = [
    { id: "L7", color: "bg-rose-500", label: "Application (JSON data)" },
    { id: "L6", color: "bg-orange-500", label: "Presentation (TLS/Encoding)" },
    { id: "L4", color: "bg-amber-500", label: "Transport (TCP Segment)" },
    { id: "L3", color: "bg-emerald-500", label: "Network (IP Packet)" },
    { id: "L2", color: "bg-blue-500", label: "Data Link (Ethernet Frame)" },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="absolute bottom-6 left-6 z-[1000] pointer-events-none"
    >
      <div className="bg-zinc-950/90 backdrop-blur-xl border border-zinc-800 p-4 rounded-2xl shadow-2xl w-64 ring-1 ring-white/10">
        <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-4 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
          Encapsulation Stack
        </h3>
        
        <div className="space-y-1.5">
          {layers.map((layer, idx) => (
            <motion.div
              key={layer.id}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: idx * 0.1 }}
              className={`${layer.color} p-2 rounded-lg border-b-4 border-black/20 flex items-center justify-between shadow-lg`}
            >
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black text-black/60 bg-white/30 px-1.5 rounded uppercase">
                  {layer.id}
                </span>
                <span className="text-[9px] font-bold text-white leading-tight">
                  {layer.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-4 pt-3 border-t border-zinc-800 flex justify-between items-center px-1">
          <span className="text-[8px] font-bold text-zinc-500 uppercase tracking-tighter">
            PDU: Ethernet Frame
          </span>
          <span className="text-[8px] font-bold text-zinc-600 bg-zinc-900 px-1.5 py-0.5 rounded border border-zinc-800">
            MTU 1500
          </span>
        </div>
      </div>
    </motion.div>
  );
}
