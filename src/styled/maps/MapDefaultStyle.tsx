import styled from "styled-components";
import targetBlack from "@/assets/images/target_black.png";

export const MapContainer = styled.section`
  display: flex;
  flex-direction: column;
  height: 100vh; /* 화면 전체 높이 */
  position: relative;
`;

export const StyledPoistionButton = styled.button`
  cursor: pointer;
  position: absolute;
  z-index: 1031;
  bottom: 70px;
  right: 25px;
  width: 45px;
  height: 45px;
  background: url(${targetBlack}) center/30px 30px no-repeat #ffffff;
  overflow: hidden;
  background-clip: padding-box;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px;

  @media screen and (max-width: 768px) {
    background: url(${targetBlack}) center/22px 22px no-repeat #ffffff;
    width: 35px;
    height: 35px;
    right: 15px;
    bottom: 62px;
  }
`;
