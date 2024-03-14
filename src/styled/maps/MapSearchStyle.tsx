import FormContainer from "@/components/FormContainer";
import styled from "styled-components";

export const SearchContainer = styled(({ ...parentsProps }) => (
  <FormContainer {...parentsProps} />
))`
  position: absolute;
  display: flex;
  flex-direction: column;
  z-index: 1031;
  top: 3px;
  left: 3px;
  width: 350px;
  min-height: 50px;
  height: auto;
  max-height: 700px;
  background: #ffffff;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px;
  transition: opacity 0.3s ease-in;
  opacity: 0.5;
  &:hover {
    opacity: 1;
  }
  @media screen and (max-width: 768px) {
    width: 180px;
    min-height: 35px;
    max-height: 450px;
  }
  @media screen and (min-width: 1281px) {
    width: 420px;
    max-height: 820px;
  }
`;

export const SearchInput = styled(({ ...parentsProps }) => (
  <FormContainer.Input {...parentsProps} />
))`
  flex-shrink: 0;
  width: calc(100% - 10px);
  height: 50px;
  margin: 5px 5px;
  padding: 0 20px 0 50px;
  border-radius: 15px;
  border: none;
  box-shadow:
    0 2px 4px rgba(0, 0, 0, 0.2),
    0 -1px 0px rgba(0, 0, 0, 0.02);
  outline: none;
  font-size: 1.4em;
  @media screen and (max-width: 768px) {
    width: calc(100% - 10px);
    height: 35px;
    margin: 5px 5px;
    border-radius: 4px;
    padding: 0 10px;
    font-size: 1.1em;
  }
`;

export const PlaceList = styled.ul`
  /* margin: 10px 10px; */
  width: 100%;
  flex: 1;
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
  border: none;
  border-radius: 4px;
  box-shadow:
    0 2px 4px rgba(0, 0, 0, 0.2),
    0 -1px 0px rgba(0, 0, 0, 0.02);
`;

export const PlaceMarkerList = styled.li<{ isClick: boolean }>`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  margin: 0 10px 10px 10px;
  padding: 8px 5px;
  width: calc(100% - 34px);
  height: 76px;
  border: 2px solid transparent;
  border-radius: 4px;
  box-shadow:
    0 2px 4px rgba(0, 0, 0, 0.2),
    0 -1px 0px rgba(0, 0, 0, 0.02);
  transition: border-color 0.3s ease; /* hover 효과를 위한 트랜지션 */
  &:hover {
    border-color: ${({ theme }) =>
      theme.color.second}; /* hover 시 변경되는 border 색상 */
    background: linear-gradient(to top, #59ce8f, #83f298);
  }
  border-color: ${({ isClick, theme }) =>
    isClick ? theme.color.second : "transparent"};
  background: ${({ isClick }) =>
    isClick ? "linear-gradient(to top, #59ce8f, #83f298)" : "transparent"};
  &:first-child {
    margin-top: 10px;
  }
`;

export const PMLContents = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0px 5px;
  font-size: 1.3em;
  font-family: "Noto Sans KR", sans-serif;
  font-optical-sizing: auto;
  font-style: normal;
  p {
    padding-bottom: 3px;
    &:first-child {
      font-size: 1.35em;
    }
  }
  @media screen and (max-width: 768px) {
    font-size: 1.2em;
    p:first-child {
      font-size: 1.25em;
    }
  }
`;

export const PMLIcon = styled.div`
  flex-shrink: 0;
  width: 65px;
  height: 100%;
  @media screen and (max-width: 768px) {
    width: 40px;
  }
`;
