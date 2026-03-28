"use client";

import React from "react";
import { useWeatherStore } from "@/store/useWeatherStore";
import { Clock } from "lucide-react";
import { motion } from "framer-motion";

export default function TimeSlider() {
  const { timeOffset, setTimeOffset, refreshData } = useWeatherStore();

  const handleSliderChange = (e) => {
    setTimeOffset(Number(e.target.value));
    // 타임라인 변동 시 임시로 모의 데이터를 새로 생성해 애니메이션을 시뮬레이션함
    if (Math.random() > 0.5) {
        refreshData();
    }
  };

  return (
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[90%] md:w-[600px] z-10"
    >
      <div className="bg-slate-900/60 backdrop-blur-xl border border-white/20 p-5 rounded-3xl shadow-2xl flex flex-col gap-4">
        <div className="flex justify-between items-center text-white">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-300" />
            <span className="font-semibold">시간대별 기상 예상</span>
          </div>
          <span className="text-blue-200 font-medium">
            {timeOffset === 0 ? '현재 (now)' : `+${timeOffset}시간 뒤`}
          </span>
        </div>
        
        <input 
          type="range" 
          min="0" 
          max="48" 
          step="3"
          value={timeOffset}
          onChange={handleSliderChange}
          className="w-full h-2 bg-white/30 rounded-lg appearance-none cursor-pointer accent-blue-400"
        />
        <div className="flex justify-between text-xs text-white/50 px-1 font-medium">
          <span>오늘</span>
          <span>내일</span>
          <span>모레</span>
        </div>
      </div>
    </motion.div>
  );
}
