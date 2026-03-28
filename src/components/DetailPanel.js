"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useWeatherStore } from "@/store/useWeatherStore";
import { X, MapPin } from "lucide-react";

export default function DetailPanel() {
  const { selectedProvince, setSelectedProvince, getSubRegionData } = useWeatherStore();
  const subRegions = selectedProvince ? getSubRegionData(selectedProvince) : [];

  return (
    <AnimatePresence>
      {selectedProvince && (
        <motion.div
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "100%", opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="absolute right-0 top-0 bottom-0 w-full sm:w-[400px] bg-slate-900/40 backdrop-blur-2xl border-l border-white/20 shadow-[-10px_0_30px_rgba(0,0,0,0.5)] z-50 overflow-y-auto"
        >
          <div className="p-6">
            <div className="flex justify-between items-center mb-10 pt-4">
              <div className="flex items-center gap-3">
                <div className="bg-blue-500/80 p-3 rounded-2xl shadow-lg">
                  <MapPin className="text-white w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-white tracking-tight">{selectedProvince}</h2>
                  <p className="text-blue-200 text-sm font-medium">동네별 상세 기상 요약</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedProvince(null)}
                className="p-3 bg-white/10 hover:bg-white/30 rounded-full transition text-white shadow-sm"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              {subRegions.map((region, idx) => (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + idx * 0.05 }}
                  key={idx} 
                  className="bg-white/10 border border-white/20 p-5 rounded-2xl flex justify-between items-center hover:bg-white/20 transition cursor-pointer shadow-lg"
                >
                  <div className="flex flex-col">
                    <span className="text-white font-bold text-lg mb-1">{region.name}</span>
                    <span className="text-blue-200 text-sm font-medium px-2 py-0.5 bg-blue-500/20 rounded-md w-fit">{region.status}</span>
                  </div>
                  <div className="text-right flex items-center gap-4">
                    <span className="text-4xl filter drop-shadow-md">{region.emoji}</span>
                    <span className="text-white text-2xl font-black">{region.temp}°</span>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-8 text-center">
              <p className="text-white/40 text-xs font-medium">실시간 기상청 API 연동 예정</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
