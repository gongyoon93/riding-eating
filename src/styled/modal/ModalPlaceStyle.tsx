import styled from "styled-components";
import FormContainer from "@/components/FormContainer";
import fashong from "@/assets/images/fashong.png";

export const PMTitle = styled.p`
  position: relative;
  font-weight: 600;
  font-size: 1.5em;
  border-bottom: 1px solid gray;
  padding-bottom: 5px;
  margin: 20px 0;
  &:first-child {
    margin-top: 0;
  }
  &:last-child {
    margin-bottom: 0;
  }
`;

export const PMBtn = styled.button`
  cursor: pointer;
  position: absolute;
  right: 0;
  background-color: transparent;
  border: none;
  margin-top: 2px;
  padding: 0;
  padding-bottom: 2px;
  font-size: 12px;
  font-weight: 700;
  border-bottom: 1px solid #000000;
  &:hover {
    border-bottom: 1px solid ${({ theme }) => theme.color.second};
    color: ${({ theme }) => theme.color.second};
  }
`;

export const PMText = styled.p`
  font-weight: 500;
  font-size: 1.4em;
  margin-bottom: 5px;
`;

export const PMUlN = styled.ul`
  width: 100%;
  height: 219px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  li {
    width: 100%;
    text-align: center;
    font-weight: 500;
    font-size: 1.5em;
    &:first-child {
      padding-bottom: 20px;
      height: 100px;
      background: url(${fashong}) center/95px 95px no-repeat;
    }
  }
  @media screen and (max-width: 768px) {
    height: 108px;
  }
`;

export const PMUlY = styled.ul`
  width: 100%;
  height: 220px;
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  li {
    width: 100%;
  }
  @media screen and (max-width: 768px) {
    height: 108px;
  }
`;

export const PMContainer = styled(({ ...parentsProps }) => (
  <FormContainer {...parentsProps}></FormContainer>
))`
  width: 100%;
  height: 220px;
  @media screen and (max-width: 768px) {
    height: 108px;
  }
`;

export const PMTextarea = styled(({ ...parentsProps }) => (
  <FormContainer.Textarea {...parentsProps}></FormContainer.Textarea>
))`
  position: relative;
  outline: none;
  overflow: hidden;
  width: calc(100% - 4px);
  height: calc(100% - 4px);
  padding: 20px 20px;
  padding-bottom: 35px;
  font-weight: 500;
  font-size: 1.7em;
  border: 2px solid ${({ theme }) => theme.color.second};
  border-radius: 5px;
  resize: none;
`;
