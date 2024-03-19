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
  useQueryClient as ReactQueryClient,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { MarkerData } from "@/atoms/maps";
import useSetModalState from "./useSetModalState";
import { useSetRecoilState } from "recoil";
import { snackbarState } from "@/atoms/snackbar";

interface GetReviewData {
  id: string;
  userId: string;
  userName: string;
  text: string;
  createdAt: string;
  updatedAt: string;
  markerId: number | null;
}

interface AddReviewVariable {
  userId: string;
  userName: string;
  text: string;
}

const useModals = () => {
  const date = new Date();
  const formattedDate = (date: number) => {
    const newDate = new Date(date);
    return `${newDate.getFullYear()}.${String(newDate.getMonth() + 1).padStart(2, "0")}.${String(newDate.getDate()).padStart(2, "0")} ${String(newDate.getHours()).padStart(2, "0")}:${String(newDate.getMinutes()).padStart(2, "0")}`;
  };

  const setSnackBar = useSetRecoilState(snackbarState);

  const {
    placeModalStateValue: { isOpen, marker },
  } = useSetModalState();

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
    return ReactQuery<GetReviewData[], AxiosError>({
      queryKey: ["place", marker?.id ?? 0, "review"],
      queryFn: async () => {
        const snapshot = await getDocs(
          query(
            collection(db, `place/${marker?.id ?? 0}/review`),
            orderBy("createdAt", "desc")
          )
        );
        const reviews = snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            text: doc.data().text,
            userId: doc.data().userId,
            userName: doc.data().userName,
            markerId: doc.data().markerId,
            createdAt: doc.data().createdAt,
            updatedAt: doc.data().updatedAt,
          };
        });
        // console.log(reviews);
        return reviews;
      },
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      enabled: !!isOpen && !!marker?.id,
    });
  };
  // 장소 별 리뷰 등록하기
  const addReviewByPlace = () => {
    const queryClient = ReactQueryClient();
    return ReactMutation<
      DocumentReference<DocumentData>,
      AxiosError,
      AddReviewVariable
    >({
      mutationFn: async ({ userId, userName, text }) =>
        await addDoc(collection(db, `place/${marker?.id ?? 0}/review`), {
          text,
          createdAt: formattedDate(date.getTime()),
          updatedAt: formattedDate(date.getTime()),
          userId,
          userName,
          markerId: marker?.id ?? 0,
        }),
      onError: (error) => {
        if (error.response?.status === 400) {
          setSnackBar((pre) => [
            ...pre,
            {
              id: Date.now().toString(),
              type: "warning",
              message: "⛔️ 리뷰 등록에 실패하였어요.",
            },
          ]);
        }
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["place", marker?.id ?? 0, "review"],
        });
        setSnackBar((pre) => [
          ...pre,
          {
            id: Date.now().toString(),
            type: "notice",
            message: "✅ 리뷰가 등록되었어요.",
          },
        ]);
      },
    });
  };
  return { getPlaceByUser, addPlaceByUser, getReviewByPlace, addReviewByPlace };
};

export default useModals;
