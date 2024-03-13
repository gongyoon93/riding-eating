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
  height: 700px;
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
    width: 150px;
    height: 450px;
  }
  @media screen and (min-width: 1281px) {
    width: 420px;
    height: 820px;
  }
`;

export const SearchInput = styled(({ ...parentsProps }) => (
  <FormContainer.Input {...parentsProps} />
))`
  width: calc(100% - 20px);
  height: 50px;
  margin: 10px 10px;
  padding: 0 20px 0 50px;
  border-radius: 25px;
  border: none;
  box-shadow:
    0 2px 4px rgba(0, 0, 0, 0.2),
    0 -1px 0px rgba(0, 0, 0, 0.02);
  outline: none;
  font-size: 1.5em;
  @media screen and (max-width: 768px) {
    width: calc(100% - 10px);
    height: 35px;
    margin: 10px 5px;
    border-radius: 4px;
    padding: 0 10px 0 25px;
    font-size: 1.2em;
  }
`;
