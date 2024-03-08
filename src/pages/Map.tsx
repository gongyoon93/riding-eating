import Footer from "@/components/Footer";
import useMaps from "@/hooks/useMaps";
import useSetMapsState from "@/hooks/useSetMapsState";
import { useEffect } from "react";
import {
  Map as MapView,
  useKakaoLoader,
  CustomOverlayMap,
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

const StyledMarker = styled.div<{ isMoving: boolean }>`
  font-size: 1.5em;
  width: 50px;
  height: 50px;
  border: none;
  background: ${(props) =>
      props.isMoving ? `url(${markerRed})` : `url(${markerGreen})`}
    transparent;
  color: #000;
  animation: ${blinkAnimation} 1s linear infinite;
`;

function Map() {
  const {
    positionStateValue,
    movingStateValue: { isMoving },
    setMovingState,
  } = useSetMapsState();
  const [loading, error] = useKakaoLoader({
    appkey: import.meta.env.VITE_MAPS_SCRIPT_KEY, // 발급 받은 APPKEY
  });

  const { getCurrentPosition } = useMaps();

  useEffect(() => {
    const isMovingState = localStorage.getItem("movingState");
    if (isMovingState) {
      const isMoving = JSON.parse(isMovingState).isMoving === true;
      setMovingState((pre) => ({ ...pre, isMoving }));
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
      {/* MapView 내부에서 loading 상태를 관찰 > conditional rendering 필요 x. */}
      <MapView
        center={{ lat: positionStateValue.lat, lng: positionStateValue.lng }}
        style={{
          width: "100%",
          flex: 1,
          backgroundColor: "#f0f0f0",
        }}
        level={3}
      >
        <CustomOverlayMap
          position={{
            lat: positionStateValue.lat,
            lng: positionStateValue.lng,
          }}
          xAnchor={0.7}
          yAnchor={0.8}
        >
          <StyledMarker isMoving={isMoving} />
        </CustomOverlayMap>
      </MapView>
      <Footer />
    </MapContainer>
  );
}

export default Map;
