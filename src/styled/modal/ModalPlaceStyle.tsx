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
    li {
      font-size: 1.4em;
      &:first-child {
        padding-bottom: 10px;
        height: 80px;
        background: url(${fashong}) center/70px 70px no-repeat;
      }
    }
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
  position: relative;
  width: calc(100% - 4px);
  height: 216px;
  border: 2px solid ${({ theme }) => theme.color.second};
  border-radius: 5px;
  @media screen and (max-width: 768px) {
    height: 108px;
  }
`;

export const PMTextarea = styled(({ ...parentsProps }) => (
  <FormContainer.Textarea {...parentsProps}></FormContainer.Textarea>
))`
  outline: none;
  overflow: hidden;
  width: 100%;
  height: calc(100% - 35px);
  padding: 15px;
  font-weight: 500;
  font-size: 1.7em;
  border: none;
  resize: none;
  @media screen and (max-width: 768px) {
    padding: 8px 8px;
    height: calc(100% - 35px);
    font-size: 1.3em;
  }
`;

export const PMIpBtnY = styled.button`
  position: absolute;
  bottom: 5px;
  right: 5px;
  width: 50px;
  height: 30px;
  border: 2px solid ${({ theme }) => theme.color.second};
  border-radius: 4px;
  color: #ffffff;
  background: linear-gradient(to left, #59ce8f, #83f298);
  font-size: 1.1em;
  font-weight: 600;
  cursor: pointer;
  @media screen and (max-width: 768px) {
    width: 40px;
    height: 22px;
    font-size: 1em;
    font-weight: 600;
  }
`;

export const PMIpBtnN = styled.button`
  position: absolute;
  bottom: 5px;
  right: 60px;
  width: 50px;
  height: 30px;
  border: 2px solid ${({ theme }) => theme.color.second};
  border-radius: 4px;
  color: ${({ theme }) => theme.color.second};
  background: linear-gradient(to right, #ffffff, #f0f0f0);
  font-size: 1.1em;
  font-weight: 600;
  cursor: pointer;
  @media screen and (max-width: 768px) {
    right: 50px;
    width: 40px;
    height: 22px;
    font-size: 1em;
    font-weight: 600;
  }
`;
