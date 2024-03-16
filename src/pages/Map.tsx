import useMaps from "@/hooks/useMaps";
import useSetMapsState from "@/hooks/useSetMapsState";
import { useEffect, useState } from "react";
import {
  Map as MapView,
  useKakaoLoader,
  CustomOverlayMap,
  ZoomControl,
  MapTypeControl,
  // Polyline,
} from "react-kakao-maps-sdk";
import SearchPlaceList from "@/components/SearchPlaceList";
import {
  MapContainer,
  PlaceMarker,
  StyledPoistionButton,
  UserMarker,
} from "@/styled/maps/MapDefaultStyle";
import useFbMaps from "@/firebase/useFbMaps";
import useSetUserState from "@/hooks/useSetUserState";

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
  // const {
  //   userStateValue: { uid },
  // } = useSetUserState();
  const { setPositionCenter, getCurrentPosition, searchPlaces } = useMaps(map);
  const { getPlaceByUser, addPlaceByUser } = useFbMaps();
  // const { data } = getPlaceByUser(uid);
  // console.log(data);
  const { mutate: addPlaceMutate } = addPlaceByUser();
  const addPlace = () => {
    addPlaceMutate({
      address_name: "서울 성북구 길음2동 1163",
      category_group_name: "병원",
      category_name: "가정,생활 \u003e 반려동물 \u003e 동물병원",
      id: 25448952,
      phone: "02-984-0075",
      place_name: "N동물의료센터 강북점",
      place_url: "http://place.map.kakao.com/25448952",
      road_address_name: "서울 성북구 삼양로4길 3",
      lng: 127.024339606256,
      lat: 37.6058059826405,
    });
  };

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
        {markerStateValue?.marker.map((marker) => (
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
        onClick={
          addPlace
          // getCurrentPosition(() =>
          //   setPositionCenter(
          //     positionStateValue.user.lat,
          //     positionStateValue.user.lng
          //   )
          // )
        }
      />
    </MapContainer>
  );
}

export default Map;
