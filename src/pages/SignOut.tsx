import useRemoveUserState from "@/hooks/useRemoveUserState";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  h1 {
    font-size: 3rem;
    font-weight: 900;
  }
`;

const SignOut = () => {
  const navigate = useNavigate();
  const { removeLocalStorage, setUserState } = useRemoveUserState();

  useEffect(() => {
    const timer = setTimeout(() => {
      removeLocalStorage();
      setUserState({ isLogin: false, uid: "", email: null, name: null });
      navigate("/");
    }, 1000) as NodeJS.Timeout;

    return () => clearTimeout(timer);
  }, []);

  return (
    <Wrapper>
      <h1>✨ 안녕히가세요!</h1>
    </Wrapper>
  );
};

export default SignOut;
