## 프로젝트 설명

반려 동물 동반 가능 지역 안내 서비스

1. 카페, 펜션, 병원 등 반려 동물과 동반할 수 있는 장소를 지도에 표시
2. 각 장소의 정보에 사용자들이 리뷰를 남길 수 있는 기능을 제공
3. 검색 기능을 통해 특정 지역의 장소 정보 확인
4. 마이 페이지 - 이용 장소 목록, 리뷰 목록, 나의 정보 보기.

## 기능 및 기술 설명

- 반응형 디자인 적용
- 기술 스택 : react + typescript + react-query + recoil + swc + vite + firebase + styled-components

### chapter 1 설정

`vite.config.ts`

```tsx
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
});
```

### chapter 2 폴더 구조 정리

- 비지니스 로직 / View / 상태 관리 분리

  - 아래와 같이 폴더 별로 분리

  1. **hooks 폴더**: 추상화된 비즈니스 로직을 작성하는 곳. 핵심 기능 및 데이터 처리, 상태 관리를 담는 코드를 작성한다. 이 추상화된 로직(hooks)들은 재사용 컴포넌트와 page 컴포넌트에서 재사용 될 수 있다.
  2. **components 폴더**: 재사용 가능한 UI 컴포넌트를 작성하는 곳. 비즈니스 로직을 포함하지 않으며, hooks 폴더에서 작성된 hooks에서 상태나 함수를 가져와 활용한다.
  3. **pages 폴더**: 페이지 컴포넌트를 작성하는 곳. useEffect hook을 사용하여 페이지 진입 및 dependency에 따라 조건별 렌더링으로 필요한 작업을 수행한다. 필요에 따라 hooks를 가져와 사용한다.

  - **components/Maps.tsx 와 pages/DashBoard.tsx로 분리하였지만 Maps.tsx가 재사용 UI가 아닌 Page 컴포넌트에 가깝고 useEffect hook으로 페이지 진입, dependency 의존해 작업 수행하는 코드 위주이므로 pages/Map.tsx로 변경, components의 파일도 필요에 따라 hooks를 가져와 사용할 수 있다는 점도 이해(24.03.08)**

### chapter 3 구현

- 로그인 화면(~24.03.04)

  - react - hook - form 라이브러리 없이 formData 관리 및 유효성 검사 구현

- firebase authentication의 auth uid 값을 localStorage에 저장

- 메인 기능의 구현 계획(24.03.06)

  - Maps Geolocation API 요금 문제로 인해 NAVER에서 KAKAO 오픈 API로 변경(24.03.06)
  - react -kakao-maps-sdk libarary : 기능 구현에 집중 할 수 있도록 KakaoMap과 React Life Cycle을 연결하여 제공, Component와 hook을 활용, Typescript의 타입 추론 > 사용 결정(24.03.06)
  - keyword search component와 map marker 구현
  - 특정 장소 선택시 장소 정보(기본 정보, 방문 정보, 리뷰 정보) 구현
  - 나의 정보(로그인 정보, 나의 방문 정보, 나의 리뷰 정보) 구현

- 현재 위치에 마커(커스텀 오버레이) 띄우기, useMaps와 useSetMapsState 정리, 기록 시작 event 함수 (24.03.07)

- styled-components DOM issue

  - **React does not recognize the `isMoving` prop on a DOM element. If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase `ismoving` instead. If you accidentally passed it from a parent component, remove it from the DOM element. (24.03.07)**
    > props 이름 앞에 $를 붙여 해결

- watchPosition()은 클로저 개념을 이용해 (position) ⇒{ } 내부 함수에서 외부 변수인 watchId를 찾아서 접근하여 사용. (24.03.08)

```jsx
const watchId = navigator.geolocation.watchPosition(
  (position) => {
    setWatchState({ watchId });
  },
  (error) => {
    console.error("Error getting user's location:", error);
  }
);
```

- ‘() ⇒ void’ type을 사용하는 함수는 실제로 반환하는 값은 undefined이고 반환 되지 않는 것을 강제 않는다. (24.03.09)

  - const f1 = ():void ⇒ ({lat:123, lngt:110})

- new kakao.maps.LatLng() 반복적인 생성 > useCallback 이전의 함수 인스턴스 재사용으로 성능 향상 (24.03.09)

```jsx
const setPositionCenter = useCallback(() => {
  const map = mapRef.current;
  if (!map) return;
  map.setCenter(
    new kakao.maps.LatLng(
      positionStateValue[0].lat ?? 37.3595704,
      positionStateValue[0].lng ?? 127.105399
    )
  );
}, [positionStateValue]);
```

- SearchPlaceList Style & function customization (24.03.13)

- components 폴더의 component.tsx는 재사용 컴포넌트이며 hooks를 가져와 활용하고 이벤트 처리 함수 작성이나 상태 값 바인딩 등을 구현함에 따라서 styled-components로만 작성된 컴포넌트 형태는 styled 폴더 하위에 작성. (24.03.13)

- 마커 클러스터링 적용할 경우 클러스터 마커 제외, 일부 일반 마커들에 느린 렌더링 현상(24.03.14)

### chapter 4 배포

### chapter 5 운영

### chapter 리팩토링

폴더 구조 정리 및 추상화 필요
