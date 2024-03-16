import Modal from "react-modal";
import { customModalStyle } from "@/styled/style";
import useSetModalState from "@/hooks/useSetModalState";

const PlaceModal = () => {
  const {
    placeModalStateValue: { isOpen },
    setPlaceModalState,
  } = useSetModalState();
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => setPlaceModalState({ isOpen: !isOpen })}
      style={customModalStyle}
      ariaHideApp={true}
      contentLabel="Place Modal"
      shouldCloseOnOverlayClick={true}
    >
      <h3>모달 타이틀</h3>
      <p>모달 텍스트 입니다.</p>
    </Modal>
  );
};

export default PlaceModal;
