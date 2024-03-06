import useMapsState from "@/hooks/useMapsState";
import useSetPositionState from "@/hooks/useSetPositionState";
import { useEffect } from "react";
import {
  Map as MapView,
  MapMarker,
  useKakaoLoader,
} from "react-kakao-maps-sdk";
import styled, { keyframes } from "styled-components";

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

const StyledMarker = styled.div`
  font-size: 1.5em;
  color: #000;
  animation: ${blinkAnimation} 1s linear infinite;
`;

function Map() {
  const { positionStateValue } = useSetPositionState();
  const [loading, error] = useKakaoLoader({
    appkey: import.meta.env.VITE_MAPS_SCRIPT_KEY, // 발급 받은 APPKEY
  });

  const { getCurrentPosition } = useMapsState();

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
    //Map 내부에서 loading 상태를 관찰 > conditional rendering 필요 x.
    <MapView
      center={{ lat: positionStateValue.lat, lng: positionStateValue.lng }}
      style={{
        width: "100%",
        flex: 1,
        backgroundColor: "#f0f0f0",
      }}
      level={3}
    >
      <MapMarker
        position={{ lat: positionStateValue.lat, lng: positionStateValue.lng }}
      >
        <StyledMarker>현재 위치</StyledMarker>
      </MapMarker>
    </MapView>
  );
}

export default Map;
