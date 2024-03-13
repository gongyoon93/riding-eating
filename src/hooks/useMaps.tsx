import { useCallback } from "react";
import useSetMapsState from "./useSetMapsState";
import { getDistance } from "geolib";

const useMaps = (map?: kakao.maps.Map) => {
  const {
    positionStateValue,
    setPositionState,
    setMarkerState,
    setKeywordStorage,
    watchStateValue: { watchId },
    setWatchState,
    setWatchStorage,
  } = useSetMapsState();

  // 지도 중심 좌표 이동
  const setPositionCenter = useCallback(() => {
    if (!map) return;
    map.setCenter(
      new kakao.maps.LatLng(positionStateValue.lat, positionStateValue.lng)
    );
  }, [map, positionStateValue]);

  // 사용자의 현재 위치로 상태 업데이트
  const getCurrentPosition = (centerFn: () => void) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          if (
            positionStateValue.lat === latitude &&
            positionStateValue.lng === longitude
          ) {
            centerFn();
          } else {
            setPositionState({ lat: latitude, lng: longitude });
          }
        },
        (error) => {
          console.error("Error getting user's location:", error);
        },
        { enableHighAccuracy: true }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  // 키워드로 장소 검색
  const searchPlaces = useCallback(
    (keyword: string) => {
      if (!map) return;
      const places = new kakao.maps.services.Places();
      const options = { page: 1 };
      console.log(keyword);
      if (keyword === "") return;
      keyword += " 반려동물";
      places.keywordSearch(
        keyword,
        (result, status, pagination) => {
          // console.log(result, status, pagination);
          if (status === "OK") {
            const markers = result.map((item) => ({
              address_name: item.address_name,
              road_address_name: item.road_address_name,
              category_group_name: item.category_group_name,
              category_name: item.category_name,
              phone: item.phone,
              place_name: item.place_name,
              place_url: item.place_url,
              lat: +item.y,
              lng: +item.x,
              id: +item.id,
            }));

            console.log(markers);
            if (markers.length !== 0) {
              setMarkerState(markers);

              const bounds = new kakao.maps.LatLngBounds();
              markers.forEach((marker) =>
                bounds.extend(new kakao.maps.LatLng(marker.lat, marker.lng))
              );
              // 검색된 장소 위치를 기준으로 지도 범위를 재설정.
              map.setBounds(bounds);
            } else {
              setMarkerState(null);
              getCurrentPosition(setPositionCenter);
            }
            setKeywordStorage(keyword);
          } else if (status == "ZERO_RESULT") {
            setMarkerState(null);
            getCurrentPosition(setPositionCenter);
          } else {
            console.log("SearchPlaces Error");
          }
        },
        options
      );
    },
    [map]
  );

  // 마커 클러스터링

  const watchPosition = () => {
    //watchId:0 값으로 기록 중 중지 여부를 확인
    const watchPositionId = navigator.geolocation.watchPosition(
      (position) => {
        // 시작시에만 변경하는 상태
        if (watchId === 0) {
          setWatchStorage(watchPositionId);
          setWatchState({ watchId: watchPositionId });
        }
        //거리 25m 이상 이동한 경우 저장
        const { latitude, longitude } = position.coords;
        const distance = getDistance(
          { latitude, longitude },
          {
            latitude: positionStateValue.lat,
            longitude: positionStateValue.lng,
          }
        );
        if (distance > 25) {
          setPositionState({
            lat: latitude,
            lng: longitude,
          });
        }
      },
      (error) => {
        console.error("Error getting user's location:", error);
      },
      { enableHighAccuracy: true }
    );
  };
  const clearWatch = (watchId: number) => {
    navigator.geolocation.clearWatch(watchId);
    setWatchStorage(0);
    setWatchState({ watchId: 0 });
  };
  return {
    setPositionCenter,
    getCurrentPosition,
    searchPlaces,
    watchPosition,
    clearWatch,
  };
};

export default useMaps;
