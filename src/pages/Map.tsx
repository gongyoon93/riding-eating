import Footer from "@/components/Footer";
import useMaps from "@/hooks/useMaps";
import useSetMapsState from "@/hooks/useSetMapsState";
import { useEffect, useState } from "react";
import {
  Map as MapView,
  useKakaoLoader,
  CustomOverlayMap,
  ZoomControl,
  MapTypeControl,
  MapMarker,
  // Polyline,
} from "react-kakao-maps-sdk";
import styled, { keyframes } from "styled-components";
import markerGreen from "@/assets/images/marker_green.png";
import markerRed from "@/assets/images/marker_red.png";
import SearchPlaceList from "@/components/SearchPlaceList";
import {
  MapContainer,
  StyledPoistionButton,
} from "@/styled/maps/MapDefaultStyle";

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
    keywordStateValue: { keyword },
    setKeywordState,
    // watchStateValue: { watchId },
    // setWatchState,
  } = useSetMapsState();
  const [loading, error] = useKakaoLoader({
    appkey: import.meta.env.VITE_MAPS_SCRIPT_KEY, // 발급 받은 APPKEY
    libraries: ["clusterer", "services"],
  });

  const { setPositionCenter, getCurrentPosition, searchPlaces } = useMaps(map);

  useEffect(() => {
    // const watchState = localStorage.getItem("watchState");
    // if (watchState) {
    //   const { watchId } = JSON.parse(watchState);
    //   setWatchState({ watchId });
    // }
    const keywordState = localStorage.getItem("keywordState");
    if (keywordState) {
      const keyword = JSON.parse(keywordState);
      setKeywordState(keyword);
    }
  }, []);

  useEffect(() => {
    if (!loading && map) {
      console.log("loaded");
      // getCurrentPosition(setPositionCenter);
      searchPlaces(keyword);
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
        <CustomOverlayMap
          position={{
            lat: positionStateValue.lat,
            lng: positionStateValue.lng,
          }}
          yAnchor={0.85}
        >
          <StyledMarker watchId={0} />
        </CustomOverlayMap>
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
      <SearchPlaceList map={map} />
      <StyledPoistionButton
        onClick={() => getCurrentPosition(setPositionCenter)}
      />
      <Btn onClick={() => {}} />
      <Footer />
    </MapContainer>
  );
}

export default Map;
