import FormContainer from "@/components/FormContainer";
import styled from "styled-components";
import more_off from "@/assets/images/more_off.png";
import search from "@/assets/images/search.png";
import double_right from "@/assets/images/double_right.png";
import review from "@/assets/images/review.png";
import visit from "@/assets/images/visit.png";

export const SearchContainer = styled(({ ...parentsProps }) => (
  <FormContainer {...parentsProps} />
))<{ isListOpen: boolean }>`
  position: absolute;
  display: flex;
  flex-direction: column;
  z-index: 1031;
  top: 3px;
  left: 3px;
  width: 350px;
  min-height: ${({ isListOpen }) => (isListOpen ? "auto" : "60px")};
  height: ${({ isListOpen }) => (isListOpen ? "auto" : "60px")};
  max-height: ${({ isListOpen }) => (isListOpen ? "700px" : "60px")};
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px;
  transition:
    height 0.3s ease-in-out,
    opacity 0.3s ease-in;
  opacity: 0.5;
  &:hover {
    opacity: 1;
  }
  @media screen and (max-width: 768px) {
    width: 180px;
    min-height: ${({ isListOpen }) => (isListOpen ? "auto" : "45px")};
    height: ${({ isListOpen }) => (isListOpen ? "auto" : "45px")};
    max-height: ${({ isListOpen }) => (isListOpen ? "450px" : "45px")};
  }
  @media screen and (min-width: 1281px) {
    width: 420px;
    max-height: ${({ isListOpen }) => (isListOpen ? "820px" : "35px")};
  }
`;

export const SearchHeader = styled.div`
  display: flex;
  flex-direction: row;
  flex-shrink: 0;
  width: calc(100% - 10px);
  height: 50px;
  margin: 5px 5px;
  @media screen and (max-width: 768px) {
    height: 35px;
  }
`;

export const SearchInput = styled(({ ...parentsProps }) => (
  <FormContainer.Input {...parentsProps} />
))`
  flex: 1;
  width: 100%;
  height: 100%;
  padding: 0 20px 0 50px;
  border-radius: 15px;
  border: none;
  box-shadow:
    0 2px 4px rgba(0, 0, 0, 0.2),
    0 -1px 0px rgba(0, 0, 0, 0.02);
  outline: none;
  font-size: 1.4em;
  background: url(${search}) 18px 14px/22px 22px no-repeat;
  @media screen and (max-width: 768px) {
    border-radius: 4px;
    padding: 0 10px;
    font-size: 1.1em;
    background: none;
  }
`;

export const SearchMoreIcon = styled.div<{ isBtnOpen: boolean }>`
  flex-shrink: 0;
  width: 46px;
  height: 46px;
  border-radius: 10px;
  border: 2px solid ${({ theme }) => theme.color.second};
  background: ${({ isBtnOpen }) =>
    isBtnOpen
      ? `url(${double_right}) center/30px 30px no-repeat, linear-gradient(to right, #59ce8f, #83f298)`
      : `url(${more_off}) center/30px 30px no-repeat, linear-gradient(to right, #59ce8f, #83f298)`};
  transition: background-image 2s ease;
  box-shadow:
    0 2px 4px rgba(0, 0, 0, 0.2),
    0 -1px 0px rgba(0, 0, 0, 0.02);
  margin: 1px 2px 2px 8px;
  cursor: pointer;
  @media screen and (max-width: 768px) {
    width: 31px;
    height: 31px;
    background: ${({ isBtnOpen }) =>
      isBtnOpen
        ? `url(${double_right}) center/20px 20px no-repeat, linear-gradient(to right, #59ce8f, #83f298)`
        : `url(${more_off}) center/20px 20px no-repeat, linear-gradient(to right, #59ce8f, #83f298)`};
  }
`;

export const SearchMoreSelect = styled.ul<{ isBtnOpen: boolean }>`
  position: absolute;
  right: -105px;
  top: 0;
  display: ${({ isBtnOpen }) => (isBtnOpen ? "flex" : "none")};
  opacity: ${({ isBtnOpen }) => (isBtnOpen ? "1" : "0")};
  transition: opacity 0.3s ease-in-out;
  flex-direction: column;
  width: 100px;
  height: 100px;
  background: #ffffff;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px;
`;

export const SearchMoreValue = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100&;
  flex: 1;
  font-weight: 600;
  font-size: 1.1em;
  cursor: pointer;
  &:hover {
    background: linear-gradient(to right, #59ce8f, #83f298);
    color: #ffffff;
  }
`;

export const PlaceList = styled.ul<{
  hasMultiPage?: boolean;
}>`
  position: relative;
  width: 100%;
  flex: 1;
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
  border: none;
  border-radius: ${({ hasMultiPage }) =>
    hasMultiPage ? "4px 4px 0 0" : "4px"};
  box-shadow: ${({ hasMultiPage }) =>
    hasMultiPage
      ? "none"
      : "0 2px 4px rgba(0, 0, 0, 0.2),0 -1px 0px rgba(0, 0, 0, 0.02)"};
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
  transition: border-color 0.3s ease;
  &:hover {
    border-color: ${({ theme }) => theme.color.second};
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
  /* flex: 1; */
  width: calc(100% - 65px);
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0px 5px;
  font-size: 1.3em;
  font-family: "Noto Sans KR", sans-serif;
  font-optical-sizing: auto;
  font-style: normal;
  p {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding-bottom: 3px;
    &:first-child {
      font-size: 1.35em;
    }
  }
  @media screen and (max-width: 768px) {
    width: calc(100% - 50px);
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
  display: grid;
  grid-template-rows: repeat(2, 1fr); /* 2개의 행을 생성 */
  grid-template-columns: repeat(2, 1fr); /* 1개의 열을 생성 */
  @media screen and (max-width: 768px) {
    width: 40px;
  }
`;

export const PMLIconBox = styled.div`
  &:first-child {
    background: url(${visit}) center/20px 20px no-repeat;
  }
  &:nth-child(2) {
    background: url(${review}) center/20px 20px no-repeat;
  }
  &:nth-child(3) {
    grid-column: span 2;
  }
  @media screen and (max-width: 768px) {
    &:first-child {
      background: url(${visit}) center/16px 16px no-repeat;
    }
    &:nth-child(2) {
      background: url(${review}) center/16px 16px no-repeat;
    }
  }
`;

export const Pagination = styled.div`
  position: sticky;
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: center;
  @media screen and (max-width: 768px) {
    width: 180px;
  }
  @media screen and (min-width: 1281px) {
    width: 420px;
  }
  ul {
    width: auto;
    height: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
  }
`;

export const PaginationNumber = styled.li<{ currentPage: boolean }>`
  cursor: pointer;
  width: 30px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  font-size: 13px;
  color: ${({ currentPage, theme }) =>
    currentPage ? theme.color.second : "inherit"};
`;
