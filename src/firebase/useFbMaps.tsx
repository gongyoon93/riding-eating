import { db } from "./fbInstance";
import {
  DocumentData,
  DocumentReference,
  QuerySnapshot,
  addDoc,
  collection,
  getDocs,
} from "firebase/firestore";
import {
  useMutation as ReactMutation,
  useQuery as ReactQuery,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { MarkerData } from "@/atoms/maps";

const useFbMaps = () => {
  const getPlaceByUser = (userId: string) => {
    return ReactQuery<QuerySnapshot<DocumentData>, AxiosError>({
      queryKey: ["user", userId],
      queryFn: async () => await getDocs(collection(db, "places")),
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    });
  };
  const addPlaceByUser = () => {
    return ReactMutation<
      DocumentReference<DocumentData>,
      AxiosError,
      MarkerData
    >({
      mutationFn: async () =>
        await addDoc(collection(db, "places"), {
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
        }),
      onError: (error) => {
        console.log(error);
      },
      onSuccess: (data: DocumentReference<DocumentData>) => {
        console.log(data);
      },
    });
  };
  return { getPlaceByUser, addPlaceByUser };
};

export default useFbMaps;
