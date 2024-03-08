import Footer from "@/components/Footer";
import useMaps from "@/hooks/useMaps";
import useSetMapsState from "@/hooks/useSetMapsState";
import { useEffect } from "react";
import {
  Map as MapView,
  useKakaoLoader,
  CustomOverlayMap,
  Polyline,
} from "react-kakao-maps-sdk";
import styled, { keyframes } from "styled-components";
import markerGreen from "@/assets/images/marker_green.png";
import markerRed from "@/assets/images/marker_red.png";

const MapContainer = styled.section`
  display: flex;
  flex-direction: column;
  height: 100vh; /* 화면 전체 높이 */
`;

const blinkAnimation = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
`;

const StyledMarker = styled.div<{ watchId: number }>`
  font-size: 1.5em;
  width: 50px;
  height: 50px;
  border: none;
  background: ${(props) =>
      props.watchId === 0 ? `url(${markerGreen})` : `url(${markerRed})`}
    transparent;
  color: #000;
  animation: ${blinkAnimation} 1s linear infinite;
`;

function Map() {
  const {
    positionStateValue,
    watchStateValue: { watchId },
    setWatchState,
  } = useSetMapsState();
  const [loading, error] = useKakaoLoader({
    appkey: import.meta.env.VITE_MAPS_SCRIPT_KEY, // 발급 받은 APPKEY
  });

  const { getCurrentPosition } = useMaps();

  useEffect(() => {
    const watchState = localStorage.getItem("watchState");
    if (watchState) {
      const { watchId } = JSON.parse(watchState);
      setWatchState({ watchId });
    }
  }, []);

  useEffect(() => {
    if (!loading) {
      console.log("loaded");
      getCurrentPosition();
    }
    if (error) {
      console.log(error);
    }
  }, [loading, error]);

  return (
    <MapContainer>
      {/* MapView 내부에서 loading 상태를 관찰 > conditional rendering 필요 x, hook의 return 값으로 판별*/}
      <MapView
        center={{ lat: positionStateValue.lat, lng: positionStateValue.lng }}
        style={{
          width: "100%",
          flex: 1,
          backgroundColor: "#f0f0f0",
        }}
        level={3}
      >
        {/* 이동 경로 표시 */}
        <Polyline
          path={[
            {
              lat: 37.6129508,
              lng: 127.035433,
            },
            {
              lat: 37.61299491199771,
              lng: 127.03542836895198,
            },
          ]}
          strokeColor={"#4B96F3"}
          strokeOpacity={0.7}
          strokeWeight={5}
        />
        {/* 현재 위치 표시 */}
        <CustomOverlayMap
          position={{
            lat: positionStateValue.lat,
            lng: positionStateValue.lng,
          }}
          yAnchor={0.85}
        >
          <StyledMarker watchId={watchId} />
        </CustomOverlayMap>
      </MapView>
      <Footer />
    </MapContainer>
  );
}

export default Map;
