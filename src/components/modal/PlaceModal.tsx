import Modal from "react-modal";
import { customModalStyle } from "@/styled/style";
import useSetModalState from "@/hooks/useSetModalState";
import { useState } from "react";
import {
  PMBtn,
  PMContainer,
  PMIpBtnN,
  PMIpBtnY,
  PMText,
  PMTextarea,
  PMTitle,
  PMUlN,
  PMUlY,
} from "@/styled/modal/ModalPlaceStyle";
import useSetUserState from "@/hooks/useSetUserState";
import useModals from "@/hooks/useModals";

const PlaceModal = () => {
  const [textInfo, setTextInfo] = useState({ isText: false, text: "" });
  const {
    placeModalStateValue: { isOpen, marker },
    setPlaceModalState,
  } = useSetModalState();
  const {
    userStateValue: { uid },
  } = useSetUserState();
  const { getReviewByPlace, addReviewByPlace } = useModals();
  const { isSuccess, data } = getReviewByPlace();
  const { mutate: addReviewMutate } = addReviewByPlace();
  const addReview = () => {
    addReviewMutate({ userId: uid, text: textInfo.text });
    setTextInfo({ isText: false, text: "" });
  };
  const closeModal = () => {
    setTextInfo({ isText: false, text: "" });
    setPlaceModalState({ isOpen: false, marker: null });
  };
  if (isSuccess) {
    console.log(data);
  }
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customModalStyle}
      ariaHideApp={false}
      contentLabel="Place Modal"
      shouldCloseOnOverlayClick={true}
    >
      <PMTitle>{marker?.place_name}</PMTitle>
      <PMText>{marker?.road_address_name}</PMText>
      <PMText>{marker?.phone}</PMText>
      <PMText>
        <a href={marker?.place_url} target="_blank">
          카카오 맵 정보
        </a>
      </PMText>
      <PMTitle>방문 정보</PMTitle>
      <PMUlN>
        <li></li>
        <li>방문 정보가 없습니다.</li>
      </PMUlN>
      <PMTitle>
        리뷰 정보
        {!textInfo.isText && (
          <PMBtn
            onClick={() => setTextInfo((pre) => ({ ...pre, isText: true }))}
          >
            리뷰 쓰기
          </PMBtn>
        )}
      </PMTitle>
      {!textInfo.isText ? (
        <PMUlY>
          <li>좋아요</li>
          <li>쾌적합니다</li>
          <li>가성비가 좋네요</li>
        </PMUlY>
      ) : (
        // <PMUlN>
        //   <li></li>
        //   <li>리뷰 정보가 없습니다.</li>
        // </PMUlN>
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

export default PlaceModal;
