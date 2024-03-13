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
  padding: 10px 10px;
  width: calc(100% - 20px);
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

export const PlaceMarkerList = styled.li`
  display: flex;
  flex-direction: row;
  margin-bottom: 5px;
  padding: 8px 5px;
  width: calc(100% - 10px);
  height: 80px;
  border: none;
  border-radius: 4px;
  box-shadow:
    0 2px 4px rgba(0, 0, 0, 0.2),
    0 -1px 0px rgba(0, 0, 0, 0.02);
  &:last-child {
    margin-bottom: 0;
  }
  cursor: pointer;
`;

export const PMLIcon = styled.div`
  flex-shrink: 0;
  width: 65px;
  height: 100%;
  @media screen and (max-width: 768px) {
    width: 40px;
  }
`;

export const PMLContents = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  font-size: 1.3em;
  font-family: "Noto Sans KR", sans-serif;
  font-optical-sizing: auto;
  font-style: normal;
  p {
    padding-bottom: 3px;
  }
  p:first-child {
    font-size: 1.35em;
  }
  @media screen and (max-width: 768px) {
    font-size: 1.2em;
    p:first-child {
      font-size: 1.25em;
    }
  }
`;
