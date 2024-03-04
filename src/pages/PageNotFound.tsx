import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import useSetUserState from "@/hooks/useSetUserState";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  h1 {
    font-size: 5rem;
    font-weight: bold;
  }
`;

const PageNotFound = () => {
  const navigate = useNavigate();
  const {
    userStateValue: { isLogin },
  } = useSetUserState();

  useEffect(() => {
    const timer = setTimeout(() => navigate("/"), 2500) as NodeJS.Timeout;

    return () => {
      clearTimeout(timer);
    };
  }, [isLogin]);

  return (
    <Wrapper>
      <h1>🥲 해당 페이지를 찾을 수 없습니다.</h1>
    </Wrapper>
  );
};

export default PageNotFound;
