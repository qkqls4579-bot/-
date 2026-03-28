"use client";

import React, { useEffect, useState } from "react";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import { useWeatherStore } from "@/store/useWeatherStore";
import { motion } from "framer-motion";

const geoUrl = "/korea.json";

const getTempColor = (temp) => {
  if (temp < 0) return "#3b82f6";
  if (temp < 10) return "#60a5fa";
  if (temp < 20) return "#fbbf24";
  if (temp < 30) return "#ef4444";
  return "#b91c1c"; 
};

const getPm10Color = (val) => {
  if (val <= 30) return "#3b82f6";
  if (val <= 80) return "#22c55e";
  if (val <= 150) return "#eab308";
  return "#ef4444";
};

const getPrecipColor = (val) => {
  if (val === 0) return "#f3f4f6";
  if (val < 10) return "#93c5fd"; 
  if (val < 30) return "#3b82f6"; 
  return "#1d4ed8";
};

// 주요 시/도 17개 중심 좌표
const provinceCoordinates = {
  "서울특별시": [126.9780, 37.5665],
  "부산광역시": [129.0756, 35.1795],
  "대구광역시": [128.6014, 35.8714],
  "인천광역시": [126.45, 37.4562],
  "광주광역시": [126.8526, 35.1595],
  "대전광역시": [127.3845, 36.3504],
  "울산광역시": [129.3113, 35.5383],
  "세종특별자치시": [127.2890, 36.4800],
  "경기도": [127.2, 37.3],
  "강원도": [128.3, 37.8],
  "충청북도": [127.7, 36.8],
  "충청남도": [126.8, 36.6],
  "전라북도": [127.1, 35.7],
  "전라남도": [126.9, 34.8],
  "경상북도": [128.7, 36.3],
  "경상남도": [128.2, 35.3],
  "제주특별자치도": [126.5, 33.4]
};

const getWeatherEmoji = (status) => {
  if (status === '맑음') return '☀️';
  if (status === '구름') return '☁️';
  if (status === '비') return '🌧️';
  if (status === '눈') return '❄️';
  return '☀️';
};

export default function WeatherMap() {
  const { activeLayer, weatherData, selectedProvince, setSelectedProvince } = useWeatherStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // 지역 클릭 상태에 따른 줌 배율 및 포커스 좌표 동적 계산 (옵션 A)
  const mapCenter = selectedProvince ? provinceCoordinates[selectedProvince] : [127.8, 35.9];
  const mapScale = selectedProvince ? 18000 : 5200; // 줌 배율 증대

  return (
    <div className="absolute inset-0 w-full h-full flex items-center justify-center p-4 pt-16 md:pt-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className={`w-full h-[75vh] md:h-[85vh] transition-all duration-700 ease-in-out ${selectedProvince ? 'max-w-7xl -translate-x-32' : 'max-w-4xl'}`}
      >
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            scale: mapScale,
            center: mapCenter
          }}
          className="w-full h-full drop-shadow-2xl filter"
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const provinceName = geo.properties.CTP_KOR_NM || geo.properties.name || "서울특별시"; 
                const data = weatherData[provinceName] || { temp: 15, precip: 0, pm10: 20 };
                
                let fillColor = "#e5e7eb";
                if (activeLayer === 'temp') fillColor = getTempColor(data.temp);
                else if (activeLayer === 'pm10') fillColor = getPm10Color(data.pm10);
                else if (activeLayer === 'precip') fillColor = getPrecipColor(data.precip);

                // 선택된 지역 외의 나머지 지역은 약간 흐릿하게 처리하여 강조 효과 부여
                const isSelected = selectedProvince === provinceName;
                const opacity = selectedProvince && !isSelected ? 0.3 : 1;

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={fillColor}
                    stroke="#ffffff"
                    strokeWidth={0.8}
                    onClick={() => {
                        // 같은 곳 클릭 시 줌 아웃(null), 다른 곳은 해당 지역 줌 인
                        if (selectedProvince === provinceName) setSelectedProvince(null);
                        else setSelectedProvince(provinceName);
                    }}
                    style={{
                      default: { outline: "none", opacity, transition: "all 0.4s ease" },
                      hover: { outline: "none", filter: "brightness(1.1)", opacity: 1, cursor: "pointer", transition: "all 0.2s" },
                      pressed: { outline: "none" }
                    }}
                  />
                );
              })
            }
          </Geographies>

          {/* 지역별 마커: 이모지 + 온도 + ❗지역 이름 표시 (요청 반영) */}
          {Object.entries(provinceCoordinates).map(([name, coords]) => {
            const data = weatherData[name];
            if (!data) return null;
            
            // 줌 인 상태일 경우, 초점이 맞춰진 지역 외에는 마커를 숨겨서 깔끔하게 보여줌
            if (selectedProvince && selectedProvince !== name) return null;

            return (
              <Marker key={name} coordinates={coords} style={{ pointerEvents: "none", userSelect: "none" }}>
                {/* 1. 날씨 이모지 */}
                <text 
                  textAnchor="middle" 
                  y={4} 
                  fontSize="24" 
                  className="drop-shadow-lg"
                >
                  {getWeatherEmoji(data.status)}
                </text>
                {/* 2. 기온 */}
                <text
                  textAnchor="middle"
                  y={22}
                  fontSize="12"
                  fill="#ffffff"
                  fontWeight="bold"
                  style={{ textShadow: "1px 1px 3px rgba(0,0,0,0.9)" }}
                >
                  {data.temp}°C
                </text>
                {/* 3. 명료한 지역 이름 항시 표시 */}
                <text
                  textAnchor="middle"
                  y={38}
                  fontSize="13"
                  fill="#ffffff"
                  fontWeight="900"
                  style={{ textShadow: "1px 1px 4px rgba(0,0,0,1)" }}
                >
                  {name}
                </text>
              </Marker>
            );
          })}
        </ComposableMap>
      </motion.div>
    </div>
  );
}
