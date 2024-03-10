import useSetMapsState from "./useSetMapsState";
import { getDistance } from "geolib";

const useMaps = () => {
  const {
    positionStateValue,
    setPositionState,
    watchStateValue: { watchId },
    setWatchState,
    setWatchStorage,
  } = useSetMapsState();
  const getCurrentPosition = (centerFn: () => void) => {
    // 사용자의 현재 위치를 가져와 상태에 설정
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // 기록 시작 후 전역 상태에 저장?
          if (
            positionStateValue[0].lat === latitude &&
            positionStateValue[0].lng === longitude
          ) {
            centerFn();
          } else {
            if (watchId === 0) {
              setPositionState([{ lat: latitude, lng: longitude }]);
            } else {
              setPositionState((pre) => [
                {
                  lat: latitude,
                  lng: longitude,
                },
                ...pre,
              ]);
            }
          }
        },
        (error) => {
          console.error("Error getting user's location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };
  const watchPosition = () => {
    //watchId:0 값으로 기록 중 중지 여부를 확인
    const watchPositionId = navigator.geolocation.watchPosition(
      (position) => {
        // 시작시에만 변경하는 상태
        if (watchId === 0) {
          setWatchStorage(watchPositionId);
          setWatchState({ watchId: watchPositionId });
        }
        //거리 25m 이동시 저장
        const { latitude, longitude } = position.coords;
        const distance = getDistance(
          { latitude, longitude },
          {
            latitude: positionStateValue[0].lat,
            longitude: positionStateValue[0].lng,
          }
        );
        if (distance > 25) {
          setPositionState((pre) => [
            {
              lat: latitude,
              lng: longitude,
            },
            ...pre,
          ]);
        }
      },
      (error) => {
        console.error("Error getting user's location:", error);
      }
    );
  };
  const clearWatch = (watchId: number) => {
    navigator.geolocation.clearWatch(watchId);
    setWatchStorage(0);
    setWatchState({ watchId: 0 });
  };
  return { getCurrentPosition, watchPosition, clearWatch };
};

export default useMaps;
