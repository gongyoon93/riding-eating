import { db } from "../firebase/fbInstance";
import {
  DocumentData,
  DocumentReference,
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import {
  useMutation as ReactMutation,
  useQuery as ReactQuery,
  useQueryClient as ReactQueryClient,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
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
  markerId: number;
  markerName: string;
}

interface AddReviewVariable {
  userId: string;
  userName: string;
  text: string;
}

interface updateReviewVariable {
  reviewId: string;
  text: string;
}

interface deleteReviewVariable {
  reviewId: string;
}

const useModals = () => {
  const formattedDate = (date: Timestamp) => {
    const newDate = new Date(date.toDate());
    return `${newDate.getFullYear()}.${String(newDate.getMonth() + 1).padStart(2, "0")}.${String(newDate.getDate()).padStart(2, "0")} ${String(newDate.getHours()).padStart(2, "0")}:${String(newDate.getMinutes()).padStart(2, "0")}`;
  };

  const timestamp = serverTimestamp();
  const setSnackBar = useSetRecoilState(snackbarState);

  const {
    placeModalStateValue: { isOpen: isPMOpen, marker },
    userModalStateValue: { isOpen: isUMOpen },
  } = useSetModalState();

  const queryClient = ReactQueryClient();

  // 장소 별 리뷰 불러오기
  const getReviewByPlace = (userId: string) => {
    return ReactQuery<GetReviewData[], AxiosError>({
      queryKey: ["reviewPlace", userId, marker?.id ?? 0],
      queryFn: async () => {
        console.log("장소 리뷰 정보");
        const snapshot = await getDocs(
          query(
            collection(db, `placeReview`),
            where("markerId", "==", marker?.id ?? 0),
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
            markerName: doc.data().markerName,
            createdAt: formattedDate(doc.data().createdAt),
            updatedAt: formattedDate(doc.data().updatedAt),
          };
        });
        return reviews;
      },
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      retry: 3,
      enabled: !!isPMOpen && !!marker?.id,
    });
  };
  // 장소 별 리뷰 등록하기
  const addReviewByPlace = () => {
    return ReactMutation<
      DocumentReference<DocumentData>,
      AxiosError,
      AddReviewVariable
    >({
      mutationFn: async ({ userId, userName, text }) =>
        await addDoc(collection(db, `placeReview`), {
          text,
          createdAt: timestamp,
          updatedAt: timestamp,
          userId,
          userName,
          markerId: marker?.id ?? 0,
          markerName: marker?.place_name ?? "",
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
          queryKey: ["reviewPlace"],
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

  // 사용자 별 리뷰 불러오기
  const getReviewByUser = (userId: string) => {
    return ReactQuery<GetReviewData[], AxiosError>({
      queryKey: ["reviewPlace", userId, "All"],
      queryFn: async () => {
        console.log("나의 리뷰 정보");
        const snapshot = await getDocs(
          query(
            collection(db, `placeReview`),
            where("userId", "==", userId),
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
            markerName: doc.data().markerName,
            createdAt: formattedDate(doc.data().createdAt),
            updatedAt: formattedDate(doc.data().updatedAt),
          };
        });
        return reviews;
      },
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      retry: 3,
      enabled: !!isUMOpen && !!userId,
    });
  };

  //사용자 별 리뷰 업데이트
  const updateReviewByUser = () => {
    return ReactMutation<void, AxiosError, updateReviewVariable>({
      mutationFn: async (review) => {
        const reviewRef = doc(db, "placeReview", review.reviewId);
        const snapshot = await getDoc(reviewRef);
        const prevData = snapshot.data();
        const updatedData = { ...prevData, text: review.text };
        await updateDoc(reviewRef, updatedData);
      },
      onError: (error) => {
        if (error.response?.status === 400) {
          setSnackBar((pre) => [
            ...pre,
            {
              id: Date.now().toString(),
              type: "warning",
              message: "⛔️ 리뷰 수정에 실패하였어요.",
            },
          ]);
        }
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["reviewPlace"],
        });
        setSnackBar((pre) => [
          ...pre,
          {
            id: Date.now().toString(),
            type: "notice",
            message: "✅ 리뷰가 수정되었어요.",
          },
        ]);
      },
    });
  };

  //사용자 별 리뷰 삭제
  const deleteReviewByUser = () => {
    return ReactMutation<void, AxiosError, deleteReviewVariable>({
      mutationFn: async (review) => {
        console.log(review);
        const reviewRef = doc(db, "placeReview", review.reviewId);
        await deleteDoc(reviewRef);
      },
      onError: (error) => {
        if (error.response?.status === 400) {
          setSnackBar((pre) => [
            ...pre,
            {
              id: Date.now().toString(),
              type: "warning",
              message: "⛔️ 리뷰 삭제에 실패하였어요.",
            },
          ]);
        }
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["reviewPlace"],
        });
        setSnackBar((pre) => [
          ...pre,
          {
            id: Date.now().toString(),
            type: "notice",
            message: "✅ 리뷰가 삭제되었어요.",
          },
        ]);
      },
    });
  };

  return {
    getReviewByPlace,
    addReviewByPlace,
    getReviewByUser,
    updateReviewByUser,
    deleteReviewByUser,
  };
};

export default useModals;
