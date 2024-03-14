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
  MarkerClusterer,
  // Polyline,
} from "react-kakao-maps-sdk";
import SearchPlaceList from "@/components/SearchPlaceList";
import {
  MapContainer,
  PlaceMarker,
  StyledPoistionButton,
  UserMarker,
} from "@/styled/maps/MapDefaultStyle";

function Map() {
  const [map, setMap] = useState<kakao.maps.Map>();
  const {
    positionStateValue,
    markerStateValue,
    setMarkerState,
    keywordStateValue: { keyword },
    setKeywordState,
    // watchStateValue: { watchId },
    // setWatchState,
  } = useSetMapsState();
  const [loading, error] = useKakaoLoader({
    appkey: import.meta.env.VITE_MAPS_SCRIPT_KEY, // 발급 받은 APPKEY
    libraries: ["clusterer", "services"],
  });

  const { setPositionCenter, getCurrentPosition, onClusterZoom, searchPlaces } =
    useMaps(map);

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
      if (keyword === "") {
        getCurrentPosition(() =>
          setPositionCenter(
            positionStateValue.user.lat,
            positionStateValue.user.lng
          )
        );
        setMarkerState(null);
      } else {
        searchPlaces(keyword);
      }
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
          lat: positionStateValue.user.lat,
          lng: positionStateValue.user.lng,
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

        {/* 사용자 현재 위치 표시 */}
        <CustomOverlayMap
          position={{
            lat: positionStateValue.user.lat,
            lng: positionStateValue.user.lng,
          }}
          yAnchor={0.85}
        >
          <UserMarker watchId={0} />
        </CustomOverlayMap>
        {/* <MarkerClusterer
          averageCenter={true}
          minLevel={5}
          disableClickZoom={true}
          onClusterclick={(target, cluster) => onClusterZoom(target, cluster)}
        > */}
        {/* 장소 마커 위치 표시 */}
        {markerStateValue?.map((marker) => (
          <CustomOverlayMap
            key={`marker-${marker.place_name}-${marker.lat},${marker.lng}`}
            position={{ lat: marker.lat, lng: marker.lng }}
            // onClick={() => setInfo(marker)}
          >
            <PlaceMarker
              isOver={
                positionStateValue.map.lat === marker.lat &&
                positionStateValue.map.lng === marker.lng
              }
            />
          </CustomOverlayMap>
        ))}
        {/* </MarkerClusterer> */}
      </MapView>
      <SearchPlaceList map={map} />
      <StyledPoistionButton
        onClick={() =>
          getCurrentPosition(() =>
            setPositionCenter(
              positionStateValue.user.lat,
              positionStateValue.user.lng
            )
          )
        }
      />
      <Footer />
    </MapContainer>
  );
}

export default Map;
