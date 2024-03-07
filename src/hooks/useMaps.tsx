// import { snackbarState } from "@/atoms/snackbar";
import useSetMapsState from "./useSetMapsState";

const useMaps = () => {
  //   const setSnackBar = useSetRecoilState(snackbarState);
  const {
    setPositionState,
    setMovingState,
    movingStateValue: { isMoving },
    setMovingStorage,
  } = useSetMapsState();
  const getCurrentPosition = () => {
    // 사용자의 현재 위치를 가져와서 상태에 설정합니다.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // 걷기 기록 시작 후 전역 상태에 저장?
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
  const changeMovingState = () => {
    setMovingStorage(isMoving);
    setMovingState((pre) => ({ ...pre, isMoving: !isMoving }));
  };
  return { getCurrentPosition, changeMovingState };
};

export default useMaps;
