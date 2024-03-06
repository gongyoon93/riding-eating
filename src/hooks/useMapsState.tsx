// import { snackbarState } from "@/atoms/snackbar";
import useSetPositionState from "./useSetPositionState";

const useMapsState = () => {
  //   const setSnackBar = useSetRecoilState(snackbarState);
  const { setCurrentPositionStorage, setPositionState } = useSetPositionState();
  const getCurrentPosition = () => {
    // 사용자의 현재 위치를 가져와서 상태에 설정합니다.
    console.log(navigator.geolocation);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setPositionState({ lat: latitude, lng: longitude });
          setCurrentPositionStorage(latitude, longitude);
        },
        (error) => {
          console.error("Error getting user's location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };
  return { getCurrentPosition };
};

export default useMapsState;
