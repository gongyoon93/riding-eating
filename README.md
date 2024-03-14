## 프로젝트 설명

애견 동반 가능 지역 안내 서비스

1. 애견 카페, 애견 레스토랑, 애견 공원 등 애견과 함께 방문할 수 있는 장소를 지도에 표시
2. 각 장소의 정보에 사용자들이 리뷰를 남길 수 있는 기능을 제공
3. 검색 기능을 통해 특정 지역의 정보 확인
4. 애견용 시설물이 있는 공원이나 해변을 표시하고 이용한 경우 마이페이지 - 이용 장소 목록에 추가.
5. 길찾기 기능을 통해 사용자들이 선택한 장소로 가는 방법을 안내.

## 기능 및 기술 설명

- 웹앱 방향으로 계획 중
- 기술 스택 : react + typescript + react-query + recoil + swc + vite + firebase + styled-components

### chapter 1 설정

`vite.config.ts`를 수정 - [https://velog.io/@sik02/React-프로젝트-초기-세팅하기-React-TypeScript-Vite-ESLint-Prettier](https://velog.io/@sik02/React-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EC%B4%88%EA%B8%B0-%EC%84%B8%ED%8C%85%ED%95%98%EA%B8%B0-React-TypeScript-Vite-ESLint-Prettier) https://jforj.tistory.com/368

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

![riding-eating_폴더구조2](https://github.com/gongyoon93/riding-eating/assets/94844343/60472615-5f6f-418a-a981-6388d201d836)

### chapter 3 구현

- 로그인 화면(~24.03.04)
  - react - hook - form 라이브러리 없이 formData 관리 및 유효성 검사 구현
- firebase의 uid 값을 sessionId로 식별하여 사용하려 하면서 고려해야 할 점
  - 세션 ID를 localStorage에 저장하는 것은 일반적으로 안전하지 않다. localStorage는 JavaScript로 쉽게 접근할 수 있기 때문에, XSS (Cross-Site Scripting) 공격에 취약. 공격자가 악의적인 스크립트를 삽입하여 localStorage에 저장된 세션 ID를 훔쳐갈 수 있다.
  - 세션 스토리지는 브라우저 세션이 유지되는 동안에만 데이터를 저장된다. 브라우저 세션이 종료되면(브라우저를 닫거나 탭을 닫을 때), 세션 스토리지에 저장된 데이터도 자동으로 삭제된다. 이에 따라 뒤로가기를 하거나 새로고침을 해도 세션 스토리지에 저장된 uid값이 삭제됩니다
- 지도 위의 이동 경로를 저장하는 방법(24.03.05)
  1. **Client Side (클라이언트 측)**
     - **장점**:
       - 사용자의 브라우저 내에서 데이터를 직접 처리하므로 속도가 빠를 수 있습니다.
       - 사용자의 프라이버시를 보다 존중할 수 있습니다.
     - **단점**:
       - 사용자의 장치에 데이터가 저장되므로 보안에 취약할 수 있습니다.
       - 로컬 스토리지의 용량 제한이 있을 수 있으며, 많은 양의 데이터를 처리하기 어려울 수 있습니다.
  2. **Server Side (서버 측)**
     - **장점**:
       - 서버 측에서 데이터를 처리하고 저장하므로 데이터 보안이 보다 용이합니다.
       - 대용량 데이터를 처리하고 분석하는 데 효과적입니다.
     - **단점**:
       - 클라이언트와의 통신이 필요하므로 속도가 상대적으로 느릴 수 있습니다.
       - 서버 측에서 사용자의 위치 정보를 관리할 때 보안과 개인 정보 보호에 대한 책임이 더욱 큽니다.
     - 일정 기간이나 일정 거리의 데이터가 쌓일 때마다 데이터를 서버로 전송하여 부분적으로 전송하여 보관
- 메인 기능의 구현 계획(24.03.06)

1. **메인 화면 구성**:
   - React와 Styled-components를 사용하여 메인 화면을 디자인
   - Naver Maps API를 사용하여 지도를 메인 화면에 표시
   - Recoil을 사용하여 앱 상태를 관리하고 지도 위에 마커를 표시
2. **이동 경로 추적 및 저장**:
   - 클라이언트 측에서 사용자의 이동 경로를 추적하고, Recoil을 사용하여 이를 앱 상태로 저장
   - 사용자가 걷는 동안 이동 경로를 실시간으로 지도에 표시
   - Firebase를 사용하여 사용자의 이동 경로를 서버에 저장
3. **걷기 추천 기능 구현**:
   - React-query를 사용하여 서버로부터 추천하는 걷기 코스 정보를 요청
   - 서버에서 받은 걷기 코스 정보를 Recoil을 통해 앱 상태로 관리하고, 지도 위에 표시
   - 사용자의 위치와 걷기 코스 정보를 비교하여 가장 적합한 코스를 추천
4. **이동 경로 공유 기능 추가**:
   - 사용자가 걷기를 마치고 이동 경로를 저장하면, Firebase를 사용하여 서버에 이동 경로를 저장
   - 저장된 이동 경로를 공유할 수 있는 링크를 생성하여 사용자에게 제공
   - 사용자가 이 링크를 공유하면, 다른 사용자도 이동 경로를 확인

- Maps Geolocation API 요금 문제로 인해 NAVER에서 KAKAO 오픈 API로 변경(24.03.06)
- react -kakao-maps-sdk libarary : 기능 구현에 집중 할 수 있도록 KakaoMap과 React Life Cycle을 연결하여 제공, Component와 hook을 활용, Typescript의 타입 추론 > 사용 결정(24.03.06)
- 현재 위치에 마커(커스텀 오버레이) 띄우기, useMaps와 useSetMapsState 정리, 기록 시작 event 함수 (24.03.07)
- !Error Issue
  - **React does not recognize the `isMoving` prop on a DOM element. If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase `ismoving` instead. If you accidentally passed it from a parent component, remove it from the DOM element. (24.03.07)**
- 비지니스 로직 / View / 상태 관리 분리

  - 아래와 같이 폴더 별로 분리

  1. **hooks 폴더**: 비즈니스 로직을 작성하는 곳. 핵심 기능 및 데이터 처리, 상태 관리를 담는 코드를 작성한다. 이 추상화된 로직(hooks)들은 재사용 컴포넌트와 page 컴포넌트에서 재사용 될 수 있다.
  2. **components 폴더**: 재사용 가능한 UI 요소들을 작성하고, props를 통해 데이터를 전달 받아 화면에 표시. 비즈니스 로직을 포함하지 않으며, hooks 폴더에서 작성된 hooks를 사용하여 데이터나 함수를 가져오거나 바인딩.
  3. **pages 폴더**: 각 페이지에 대한 뷰와 페이지 전용의 useEffect hook을 사용하여 페이지 진입 및 dependency에 따라 필요한 작업을 수행할 수 있게 하는 곳. 필요에 따라 hooks를 가져와 사용한다.

  - **components/Maps.tsx 와 pages/DashBoard.tsx로 분리하였지만 Maps.tsx가 재사용 UI가 아닌 Page 컴포넌트에 가깝고 useEffect hook으로 페이지 진입, dependency 의존해 작업 수행하는 코드 위주이므로 pages/Map.tsx로 변경, components의 파일도 필요에 따라 hooks를 가져와 사용할 수 있다는 점도 이해(24.03.08)**

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
