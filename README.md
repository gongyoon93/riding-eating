## 프로젝트 설명

자전거 라이딩을 하다 보관소나 대여소에 보관이나 반납을 하고 주변 맛집을 추천해주는 서비스

1. 자전거 도로를 안내해준다(지도상에 길을 보여주거나 표시할 방법을 찾아야함) https://www.data.go.kr/data/15057099/openapi.do 오픈 api 이용
2. 마커를 찍을 경우 인근 주변의 맛집 리스트를 보여줄 수 있는 리스트 기능 등(intersectionObserver 무한 스크롤, open api)
3. 따릉이 대여소(open api) 추가 여부 고민

## 기능 및 기술 설명

이 서비스를 GPS가 필요한 모바일 웹 방향으로 갈지 웹서비스로 기능을 제한해서 개발하는 방향으로 갈지 결정해야 됨

- 웹앱 방향으로 계획 중

자전거 이동 경로 실시간 추적 기록 : Firebase의 Realtime Database로 위치 기록 서비스와 통합

react + typescript + react-query + recoil + swc + vite + firebase

emotion 과 styled-components 중 선택 > emotion

storybook?

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
![riding-eating_폴더구조](https://github.com/gongyoon93/riding-eating/assets/94844343/ffdfd3aa-2964-452a-8f20-b666c5021776)

### chapter 3 로그인 화면

- react - hook - form 라이브러리 없이 formData 관리 및 유효성 검사 구현
- firebase의 signInWithEmailAndPassword와 react-query의 useQuery 함께 사용하려고 삽질

  > 로그인이나 인증 후에 필요한 데이터를 가져오는 작업(signInWithEmailAndPassword)은 로그인 성공 후에 별도의 요청으로 처리(useQuery)하는 것이 더 적절합니다. 따라서 분리하는 것이 맞다.
