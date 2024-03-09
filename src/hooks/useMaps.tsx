// import { snackbarState } from "@/atoms/snackbar";
import useSetMapsState from "./useSetMapsState";

const useMaps = () => {
  //   const setSnackBar = useSetRecoilState(snackbarState);
  const {
    setPositionState,
    watchStateValue: { watchId },
    setWatchState,
    setWatchStorage,
  } = useSetMapsState();
  const getCurrentPosition = () => {
    // 사용자의 현재 위치를 가져와 상태에 설정
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // 걷기 기록 시작 후 전역 상태에 저장?
          // console.log(latitude, longitude);
          setPositionState({
            lat: latitude,
            lng: longitude,
          });
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
        // console.log(Math.random());
        if (watchId === 0) {
          setWatchStorage(watchPositionId);
          setWatchState({ watchId: watchPositionId });
        }
        const { latitude, longitude } = position.coords;

        //거리 25m 이동시 저장

        setPositionState({ lat: latitude, lng: longitude });
      },
      (error) => {
        console.error("Error getting user's location:", error);
      }
    );
  };
  const clearWatch = (watchId: number) => {
    navigator.geolocation.clearWatch(watchId);
    // console.log("clear Watch");
    setWatchStorage(0);
    setWatchState({ watchId: 0 });
  };
  return { getCurrentPosition, watchPosition, clearWatch };
};

export default useMaps;
