import { create } from 'zustand';

const generateDummyData = () => {
  const provinces = [
    "서울특별시", "부산광역시", "대구광역시", "인천광역시", 
    "광주광역시", "대전광역시", "울산광역시", "세종특별자치시",
    "경기도", "강원도", "충청북도", "충청남도", 
    "전라북도", "전라남도", "경상북도", "경상남도", "제주특별자치도"
  ];
  
  const data = {};
  provinces.forEach(p => {
    data[p] = {
      temp: Math.floor(Math.random() * 30) - 5,
      precip: Math.random() > 0.7 ? Math.floor(Math.random() * 50) : 0,
      pm10: Math.floor(Math.random() * 150),
      status: Math.random() > 0.8 ? '비' : (Math.random() > 0.5 ? '구름' : '맑음')
    };
  });
  return data;
};

export const useWeatherStore = create((set, get) => ({
  activeLayer: 'temp',
  timeOffset: 0,
  locationInfo: { name: '서울시 강남구', temp: 24, status: '맑음', pm10: '좋음' },
  weatherData: generateDummyData(),
  
  // A & B 옵션 통합을 위한 신규 전역 상태
  selectedProvince: null, 
  
  setActiveLayer: (layer) => set({ activeLayer: layer }),
  setTimeOffset: (offset) => set({ timeOffset: offset }),
  refreshData: () => set({ weatherData: generateDummyData() }),
  setSelectedProvince: (province) => set({ selectedProvince: province }),

  // 클릭된 도/시 의 가상 동네 단위 데이터 생성 (MVP용)
  getSubRegionData: (provinceName) => {
    if (!provinceName) return [];
    
    // 임의의 동 이름(예시)
    const dongNames = ["역삼동", "삼성동", "대치동", "논현동", "압구정동", "청담동", "신사동", "판교동", "정자동", "서현동", "야탑동", "이매동", "해운대구 우동", "중동", "삼덕동"];
    const shuffled = [...dongNames].sort(() => 0.5 - Math.random());
    
    // 3개에서 6개 사이의 하위 지역 생성
    const count = Math.floor(Math.random() * 4) + 3; 
    
    return Array.from({ length: count }).map((_, i) => {
      const temp = Math.floor(Math.random() * 30) - 5;
      const status = Math.random() > 0.8 ? '비' : (Math.random() > 0.4 ? '구름' : '맑음');
      let emoji = '☀️';
      if (status === '구름') emoji = '☁️';
      if (status === '비') emoji = '🌧️';
      if (status === '눈') emoji = '❄️';
      
      return {
        name: shuffled[i],
        temp,
        status,
        emoji
      };
    });
  }
}));
