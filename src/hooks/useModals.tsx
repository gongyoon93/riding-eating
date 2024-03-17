import { db } from "../firebase/fbInstance";
import {
  DocumentData,
  DocumentReference,
  QuerySnapshot,
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import {
  useMutation as ReactMutation,
  useQuery as ReactQuery,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { MarkerData } from "@/atoms/maps";
import useSetModalState from "./useSetModalState";

interface GetReviewVariable {
  id: string;
  userId?: string;
  text?: string;
  createdAt?: number;
  updatedAt?: number;
  markerId?: number | null;
}

interface AddReviewVariable {
  userId: string;
  text: string;
}

const useModals = () => {
  const {
    placeModalStateValue: { isOpen, marker },
  } = useSetModalState();
  const date = new Date();
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
  // 장소 별 리뷰 불러오기
  const getReviewByPlace = () => {
    const q = query(
      collection(db, `place/${marker?.id ?? 0}/user`),
      orderBy("createdAt", "desc")
    );
    return ReactQuery<GetReviewVariable[], AxiosError>({
      queryKey: ["place", marker?.id ?? 0, "user"],
      queryFn: async () => {
        const snapshot = await getDocs(q);
        const reviews = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        return reviews;
      },
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      enabled: !!isOpen,
    });
  };
  // 장소 별 리뷰 등록하기
  const addReviewByPlace = () => {
    return ReactMutation<
      DocumentReference<DocumentData>,
      AxiosError,
      AddReviewVariable
    >({
      mutationFn: async ({ userId, text }) =>
        await addDoc(
          collection(db, `place/${marker?.id ?? 0}/user/${userId}/review`),
          {
            text,
            createdAt: date.getTime(),
            updatedAt: date.getTime(),
            userId,
            markerId: marker?.id ?? 0,
          }
        ),
      onError: (error) => {
        console.log(error);
      },
      onSuccess: (data: DocumentReference<DocumentData>) => {
        console.log(data);
      },
    });
  };
  return { getPlaceByUser, addPlaceByUser, getReviewByPlace, addReviewByPlace };
};

export default useModals;
