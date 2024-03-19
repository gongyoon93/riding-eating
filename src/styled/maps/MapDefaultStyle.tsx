import styled, { css, keyframes } from "styled-components";
import targetBlack from "@/assets/images/target_black.png";
import markerGreen from "@/assets/images/marker_green.png";
import markerRed from "@/assets/images/marker_red.png";
import placeMarker_p from "@/assets/images/pet-shop.png";

export const MapContainer = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100vh; /* 화면 전체 높이 */
  overflow: hidden;
`;

export const StyledPoistionButton = styled.button`
  cursor: pointer;
  position: absolute;
  z-index: 1031;
  bottom: 25px;
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
    right: 10px;
    bottom: 10px;
  }
`;

// Blink Animation
const blinkAnimation = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
`;

// Shake Animation
const shakeAnimation = keyframes`
  0% { transform: translate(0, 0) rotate(0deg); }
  25% { transform: translate(-5px, 0) rotate(-8deg); }
  50% { transform: translate(0, 0) rotate(0deg); }
  75% { transform: translate(5px, 0) rotate(8deg); }
  100% { transform: translate(0, 0) rotate(0deg); }
`;

export const UserMarker = styled.div<{ $watchId: number }>`
  font-size: 1.5em;
  width: 50px;
  height: 50px;
  border: none;
  background: ${(props) =>
      props.$watchId === 0 ? `url(${markerGreen})` : `url(${markerRed})`}
    transparent;
  color: #000;
  animation: ${blinkAnimation} 1s linear infinite;
`;

export const PlaceMarker = styled.div<{ $isOver: boolean }>`
  font-size: 1.5em;
  width: 50px;
  height: 50px;
  border: none;
  background: url(${placeMarker_p}) center/50px 50px transparent;
  animation: ${({ $isOver }) =>
    $isOver
      ? css`
          ${shakeAnimation} 1s linear infinite
        `
      : "none"};
  cursor: pointer;
`;
