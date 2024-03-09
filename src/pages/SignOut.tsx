import useRemoveMapsState from "@/hooks/useRemoveMapsState";
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
  const { setUserState } = useRemoveUserState();
  const { setWatchState, setPositionState } = useRemoveMapsState();

  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.clear();
      setUserState({ isLogin: false, uid: "", email: null, name: null });
      setWatchState({ watchId: 0 });
      setPositionState([
        {
          lat: 37.3595704,
          lng: 127.105399,
        },
      ]);
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
