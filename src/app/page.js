import WeatherMap from "@/components/WeatherMap";
import ControlPanel from "@/components/ControlPanel";
import TimeSlider from "@/components/TimeSlider";
import DetailPanel from "@/components/DetailPanel";

export const metadata = {
  title: "웨더맵 코리아 | 한눈에 보는 전국 상세 날씨",
  description: "글래스모피즘과 인터랙티브 줌/상세 뷰가 적용된 대한민국 날씨 대시보드",
};

export default function Home() {
  return (
    <main className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="absolute inset-0 bg-black/10 mix-blend-overlay pointer-events-none"></div>

      {/* Main Interactive Map Component */}
      <WeatherMap />

      {/* User Interface Overlays */}
      <ControlPanel />
      <TimeSlider />
      
      {/* Drill-down Detail Panel Container */}
      <DetailPanel />
    </main>
  );
}
