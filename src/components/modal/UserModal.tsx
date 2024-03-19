import Modal from "react-modal";
import { customModalStyle } from "@/styled/style";
import useSetModalState from "@/hooks/useSetModalState";
import { useState } from "react";
import {
  PMBtn,
  PMContainer,
  PMCount,
  PMIpBtnN,
  PMIpBtnY,
  PMText,
  PMTextarea,
  PMTitle,
  PMUlN,
  PMUlY,
} from "@/styled/modal/ModalUserStyle";
import useSetUserState from "@/hooks/useSetUserState";
import useModals from "@/hooks/useModals";

const UserModal = () => {
  const [textInfo, setTextInfo] = useState({ isText: false, text: "" });
  const {
    userModalStateValue: { isOpen },
    setUserModalState,
  } = useSetModalState();
  const {
    userStateValue: { uid, name, email },
  } = useSetUserState();
  const { getReviewByPlace, addReviewByPlace } = useModals();
  const { data: reveiws = [], isLoading } = getReviewByPlace();
  const { mutate: addReviewMutate } = addReviewByPlace();
  const addReview = () => {
    addReviewMutate({ userId: uid, userName: name ?? "", text: textInfo.text });
    setTextInfo({ isText: false, text: "" });
  };
  const closeModal = () => {
    setTextInfo({ isText: false, text: "" });
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
        <PMCount>{`(${reveiws.length} 건)`}</PMCount>
        {!textInfo.isText && (
          <PMBtn
            onClick={() => setTextInfo((pre) => ({ ...pre, isText: true }))}
          >
            리뷰 쓰기
          </PMBtn>
        )}
      </PMTitle>
      {!textInfo.isText ? (
        !isLoading && reveiws.length > 0 ? (
          <PMUlY>
            {reveiws.map((review, idx) => (
              <li key={`review-${review.markerId}-${review.userId}-${idx}`}>
                <p>{review.userName}</p>
                <p>{review.createdAt}</p>
                <p>{review.text}</p>
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
          <PMIpBtnY type="button" onClick={addReview}>
            등록
          </PMIpBtnY>
          <PMIpBtnN
            type="button"
            onClick={() => setTextInfo({ isText: false, text: "" })}
          >
            취소
          </PMIpBtnN>
        </PMContainer>
      )}
    </Modal>
  );
};

export default UserModal;
