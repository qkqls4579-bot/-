# -
# 🌤️ 대한민국 날씨 한눈에 보기 ('웨더맵 코리아')

이 프로젝트는 `Next.js`, `Tailwind CSS`, `Framer Motion`, `react-simple-maps`를 활용하여 개발된 반응형 인터랙티브 날씨 대시보드입니다.

## 🚀 주요 기능 (Features)
1. **전국 날씨 히트맵 (인터랙티브 맵)**
   - 기온, 강수량, 미세먼지 수치에 따라 17개 시/도의 색상이 다이내믹하게 변경.
2. **지역명 및 날씨 요약 (항시 표기)**
   - 각 지역 정중앙에서 날씨 이모지(☀️☁️🌧️❄️), 섭씨(°C), 시도 명칭 확인 가능.
3. **Drill-down (줌인 및 슬라이드 상세 보기)**
   - 지도의 특정 지역(예: 서울, 부산)을 클릭하면 지도가 부드럽게 줌인(Zoom-in) 되며 집중됩니다.
   - 우측에서 글래스모피즘(Glassmorphism) 세련된 상태 패널이 슬라이딩되어 나오며 해당 지역 내 하위 구역('동', '시/군/구') 단위의 상세 날씨 리스트를 보여줍니다.
4. **글래스모피즘 기반 프리미엄 UI / UX**
   - 블러 효과(`backdrop-blur`)가 적용된 컨트롤 패널, 타임 슬라이더.

## 🛠️ 기술 스택 (Tech Stack)
- `React 18` / `Next.js 15` (App Router)
- `Tailwind CSS` (Styling & Glassmorphism)
- `Framer Motion` (UI Panel Animation)
- `react-simple-maps` (SVG Map & D3 Projections)
- `Zustand` (Global State Layer)
- `lucide-react` (SVG Icons)
