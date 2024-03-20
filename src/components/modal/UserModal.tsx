import Modal from "react-modal";
import { customModalStyle } from "@/styled/style";
import useSetModalState from "@/hooks/useSetModalState";
import { useState } from "react";
import {
  PMContainer,
  PMCount,
  PMIpBtnN,
  PMIpBtnY,
  PMText,
  PMTextarea,
  PMTitle,
  PMUlN,
  PMUlY,
  PMUlYDBtn,
  PMUlYUBtn,
} from "@/styled/modal/ModalUserStyle";
import useSetUserState from "@/hooks/useSetUserState";
import useModals from "@/hooks/useModals";

const UserModal = () => {
  const [textInfo, setTextInfo] = useState({
    isText: false,
    text: "",
    rId: "",
  });
  const {
    userModalStateValue: { isOpen },
    setUserModalState,
  } = useSetModalState();
  const {
    userStateValue: { uid, name, email },
  } = useSetUserState();
  const { getReviewByUser, updateReviewByUser, deleteReviewByUser } =
    useModals();
  const { data: userReviews = [], isLoading } = getReviewByUser(uid);
  const { mutate: updateReviewMutate } = updateReviewByUser();
  const { mutate: deleteReviewMutate } = deleteReviewByUser();
  const updateReview = () => {
    const review = { reviewId: textInfo.rId, text: textInfo.text };
    updateReviewMutate(review);
    setTextInfo({ isText: false, text: "", rId: "" });
  };
  const deleteReview = (reviewId: string) => {
    const review = { reviewId };
    deleteReviewMutate(review);
  };
  const closeModal = () => {
    setTextInfo({ isText: false, text: "", rId: "" });
    setUserModalState({ isOpen: false, user: null });
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customModalStyle}
      ariaHideApp={false}
      contentLabel="User Modal"
      shouldCloseOnOverlayClick={true}
    >
      <PMTitle>나의 정보</PMTitle>
      <PMText>이메일 : {email}</PMText>
      <PMText>이름 : {name}</PMText>
      <PMTitle>나의 방문 정보</PMTitle>
      <PMUlN>
        <li></li>
        <li>나의 방문 정보가 없습니다.</li>
      </PMUlN>
      <PMTitle>
        나의 리뷰 정보
        <PMCount>{`(${userReviews.length} 건)`}</PMCount>
      </PMTitle>
      {!textInfo.isText ? (
        !isLoading && userReviews.length > 0 ? (
          <PMUlY>
            {userReviews.map((review) => (
              <li
                key={`reviewByUser-${review.markerId}-${review.userId}-${review.id}`}
              >
                <p>{review.markerName}</p>
                <p>{review.createdAt}</p>
                <PMUlYDBtn onClick={() => deleteReview(review.id)}>
                  삭제
                </PMUlYDBtn>
                <p>{review.text}</p>
                <PMUlYUBtn
                  onClick={() =>
                    setTextInfo({
                      isText: true,
                      text: review.text,
                      rId: review.id,
                    })
                  }
                >
                  수정
                </PMUlYUBtn>
              </li>
            ))}
          </PMUlY>
        ) : (
          <PMUlN>
            <li></li>
            <li>나의 리뷰 정보가 없습니다.</li>
          </PMUlN>
        )
      ) : (
        <PMContainer>
          <PMTextarea
            value={textInfo.text}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setTextInfo((pre) => ({ ...pre, text: e.target.value }))
            }
          ></PMTextarea>
          <PMIpBtnY type="button" onClick={updateReview}>
            적용
          </PMIpBtnY>
          <PMIpBtnN
            type="button"
            onClick={() => setTextInfo({ isText: false, text: "", rId: "" })}
          >
            취소
          </PMIpBtnN>
        </PMContainer>
      )}
    </Modal>
  );
};

export default UserModal;
