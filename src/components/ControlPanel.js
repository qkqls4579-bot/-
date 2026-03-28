"use client";

import React from "react";
import { useWeatherStore } from "@/store/useWeatherStore";
import { Thermometer, CloudRain, Wind, MapPin } from "lucide-react";
import { motion } from "framer-motion";

export default function ControlPanel() {
  const { activeLayer, setActiveLayer, locationInfo } = useWeatherStore();

  const layers = [
    { id: 'temp', name: '기온', icon: Thermometer },
    { id: 'precip', name: '강수', icon: CloudRain },
    { id: 'pm10', name: '미세먼지', icon: Wind }
  ];

  return (
    <div className="absolute top-6 left-6 right-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 z-10 pointer-events-none">
      
      {/* 사용자 위치 요약 패널 */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="pointer-events-auto bg-white/20 backdrop-blur-xl border border-white/30 p-4 rounded-2xl shadow-lg flex items-center gap-4"
      >
        <div className="bg-blue-500/20 p-3 rounded-full">
          <MapPin className="text-white w-6 h-6" />
        </div>
        <div>
          <h2 className="text-white/80 text-sm font-medium">현재 계신 위치</h2>
          <p className="text-white text-lg font-bold tracking-tight">
            {locationInfo.name}은(는) {locationInfo.status}, 체감 {locationInfo.temp}°C
          </p>
        </div>
      </motion.div>

      {/* 레이어 토글(기온, 강수, 미세먼지) */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="pointer-events-auto bg-white/10 backdrop-blur-xl border border-white/20 p-2 rounded-2xl shadow-lg flex gap-2"
      >
        {layers.map(layer => {
          const Icon = layer.icon;
          const isActive = activeLayer === layer.id;
          return (
            <button
              key={layer.id}
              onClick={() => setActiveLayer(layer.id)}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all duration-300 ${
                isActive 
                  ? 'bg-white text-blue-900 shadow-md scale-105' 
                  : 'text-white hover:bg-white/20'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-semibold text-sm">{layer.name}</span>
            </button>
          );
        })}
      </motion.div>
    </div>
  );
}
