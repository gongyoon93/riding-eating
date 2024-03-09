import Footer from "@/components/Footer";
import useMaps from "@/hooks/useMaps";
import useSetMapsState from "@/hooks/useSetMapsState";
import { useCallback, useEffect, useRef } from "react";
import {
  Map as MapView,
  useKakaoLoader,
  CustomOverlayMap,
  Polyline,
} from "react-kakao-maps-sdk";
import styled, { keyframes } from "styled-components";
import markerGreen from "@/assets/images/marker_green.png";
import markerRed from "@/assets/images/marker_red.png";
import targetBlack from "@/assets/images/target_black.png";

const MapContainer = styled.section`
  display: flex;
  flex-direction: column;
  height: 100vh; /* 화면 전체 높이 */
  position: relative;
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

const StyledPoistionButton = styled.button`
  cursor: pointer;
  position: absolute;
  z-index: 1031;
  bottom: 70px;
  right: 25px;
  width: 45px;
  height: 45px;
  background: url(${targetBlack}) center/30px 30px no-repeat #ffffff;
  overflow: hidden;
  background-clip: padding-box;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px;

  @media screen and (max-width: 768px) {
    background: url(${targetBlack}) center/22px 22px no-repeat #ffffff;
    width: 35px;
    height: 35px;
    right: 15px;
    bottom: 62px;
  }
`;

function Map() {
  const mapRef = useRef<kakao.maps.Map>(null);
  const {
    positionStateValue,
    watchStateValue: { watchId },
    setWatchState,
  } = useSetMapsState();
  const [loading, error] = useKakaoLoader({
    appkey: import.meta.env.VITE_MAPS_SCRIPT_KEY, // 발급 받은 APPKEY
  });
  const { getCurrentPosition } = useMaps();

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
        ref={mapRef}
        isPanto={true}
        center={{
          lat: positionStateValue[0].lat ?? 37.3595704,
          lng: positionStateValue[0].lng ?? 127.105399,
        }}
        style={{
          width: "100%",
          flex: 1,
          backgroundColor: "#f0f0f0",
        }}
        level={3}
      >
        {/* 이동 경로 표시 */}
        {watchId !== 0 && (
          <Polyline
            path={positionStateValue}
            strokeColor={"#4B96F3"}
            strokeOpacity={0.7}
            strokeWeight={5}
          />
        )}
        {/* 현재 위치 표시 */}
        <CustomOverlayMap
          position={{
            lat: positionStateValue[0].lat ?? 37.3595704,
            lng: positionStateValue[0].lng ?? 127.105399,
          }}
          yAnchor={0.85}
        >
          <StyledMarker watchId={watchId} />
        </CustomOverlayMap>
      </MapView>
      <StyledPoistionButton onClick={setPositionCenter} />
      <Footer />
    </MapContainer>
  );
}

export default Map;
