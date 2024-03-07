## 프로젝트 설명
걷기 코스를 기록해 공유하고 추천 받을 수 있는 Web App Project

## 기능 및 기술 설명

이 서비스를 GPS가 필요한 모바일 웹 방향으로 갈지 웹서비스로 기능을 제한해서 개발하는 방향으로 갈지 결정해야 됨

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

vite 환경변수 설정 - [https://velog.io/@riley_dev/React-vite에서-환경변수-.env-설정하기](https://velog.io/@riley_dev/React-vite%EC%97%90%EC%84%9C-%ED%99%98%EA%B2%BD%EB%B3%80%EC%88%98-.env-%EC%84%A4%EC%A0%95%ED%95%98%EA%B8%B0)

! 중간 에러

1. no- unused-vars eslint 에러 > 선언하고 사용하지 않는 변수는 제거로 임시 해결

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

   이 정보들을 종합해 일정 기간이나 일정 거리의 데이터가 쌓일 때마다 데이터를 서버로 전송하여 부분적으로 전송하여 보관

메인 기능의 구현 계획(24.03.06)

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
- ! Error Issue
  - React does not recognize the `isMoving` prop on a DOM element. If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase `ismoving` instead. If you accidentally passed it from a parent component, remove it from the DOM element.
    >

### chapter 4 배포

### chapter 5 운영

### chapter 리팩토링

폴더 구조 정리 및 추상화 필요
