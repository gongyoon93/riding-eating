import Footer from "@/components/Footer";
import useMaps from "@/hooks/useMaps";
import useSetMapsState from "@/hooks/useSetMapsState";
import { useEffect, useState } from "react";
import {
  Map as MapView,
  useKakaoLoader,
  // CustomOverlayMap,
  ZoomControl,
  MapTypeControl,
  MapMarker,
  // Polyline,
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

const Btn = styled.button`
  cursor: pointer;
  position: absolute;
  z-index: 1031;
  bottom: 120px;
  right: 25px;
  width: 45px;
  height: 45px;
`;

function Map() {
  const [map, setMap] = useState<kakao.maps.Map>();
  const {
    positionStateValue,
    markerStateValue,
    watchStateValue: { watchId },
    setWatchState,
  } = useSetMapsState();
  const [loading, error] = useKakaoLoader({
    appkey: import.meta.env.VITE_MAPS_SCRIPT_KEY, // 발급 받은 APPKEY
    libraries: ["clusterer", "services"],
  });

  const { setPositionCenter, getCurrentPosition, searchPlaces } = useMaps(map);

  useEffect(() => {
    const watchState = localStorage.getItem("watchState");
    if (watchState) {
      const { watchId } = JSON.parse(watchState);
      setWatchState({ watchId });
    }
  }, []);

  useEffect(() => {
    if (!loading && map) {
      console.log("loaded");
      // getCurrentPosition(setPositionCenter);
      searchPlaces("하월곡동 치킨");
    }
    if (error) {
      console.log(error);
    }
  }, [loading, error, map]);

  return (
    <MapContainer>
      {/* MapView 내부에서 loading 상태를 관찰 > conditional rendering 필요 x, hook의 return 값으로 판별*/}
      <MapView
        isPanto={true}
        center={{
          lat: positionStateValue.lat,
          lng: positionStateValue.lng,
        }}
        style={{
          width: "100%",
          flex: 1,
          backgroundColor: "#f0f0f0",
        }}
        level={3}
        onCreate={setMap}
      >
        {/* 이동 경로 표시 */}
        {/* {watchId !== 0 && (
          <Polyline
            path={positionStateValue}
            strokeColor={"#4B96F3"}
            strokeOpacity={0.7}
            strokeWeight={5}
          />
        )} */}

        {/* 컨트롤 표시 */}
        <ZoomControl position={"RIGHT"} />
        <MapTypeControl position={"TOPRIGHT"} />

        {/* 현재 위치 표시 */}
        {/* <CustomOverlayMap
          position={{
            lat: positionStateValue.lat,
            lng: positionStateValue.lng,
          }}
          yAnchor={0.85}
        >
          <StyledMarker watchId={watchId} />
        </CustomOverlayMap> */}
        {markerStateValue?.map((marker) => (
          <MapMarker
            key={`marker-${marker.place_name}-${marker.lat},${marker.lng}`}
            position={{ lat: marker.lat, lng: marker.lng }}
            // onClick={() => setInfo(marker)}
          >
            {/* {info && info.content === marker.content && (
            <div style={{color:"#000"}}>{marker.content}</div>
          )} */}
          </MapMarker>
        ))}
      </MapView>
      <StyledPoistionButton
        onClick={() => getCurrentPosition(setPositionCenter)}
      />
      <Btn onClick={() => searchPlaces("하월곡동 애견 동반")} />
      <Footer />
    </MapContainer>
  );
}

export default Map;
