import useMaps from "@/hooks/useMaps";
import useSetMapsState from "@/hooks/useSetMapsState";
import useSetUserState from "@/hooks/useSetUserState";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const TabBar = styled.footer<{ watchId: number }>`
  background-color: ${({ theme }) => theme.color.second};
  box-shadow: 0px -2px 4px rgba(0, 0, 0, 0.1);
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  color: #ffffff;
  z-index: 1031;
  ul {
    width: 100%;
    display: flex;
    justify-content: space-between;
    li {
      cursor: pointer;
      width: 100%;
      text-align: center;
      padding: 15px 20px;
      font-size: 1.5rem;
      font-weight: bolder;
      color: ${({ theme }) => theme.color.fontSecond};
      border-right: 1px solid #ffffff;
      &:first-child {
        background-color: ${(props) =>
          props.watchId === 0
            ? props.theme.color.second
            : props.theme.color.main};
      }
      &:last-child {
        border-right: none;
      }
    }
  }

  @media screen and (min-width: 768px) {
    position: static;
    width: auto;
    display: flex;
    justify-content: center;
  }
`;

const Footer = () => {
  const navigate = useNavigate();
  const {
    userStateValue: { isLogin },
  } = useSetUserState();

  const {
    watchStateValue: { watchId },
  } = useSetMapsState();

  const { watchPosition, clearWatch } = useMaps();

  const changeWatchPosition = () => {
    // if (watchId === 0) {
    //   watchPosition();
    // } else {
    //   clearWatch(watchId);
    // }
  };

  return (
    <TabBar watchId={watchId}>
      <ul>
        {/* <li onClick={changeWatchPosition}>
          {watchId === 0 ? "길 찾기" : "길 찾기 중지"}
        </li> */}
        {isLogin && <li onClick={() => navigate("/signout")}>로그아웃</li>}
      </ul>
    </TabBar>
  );
};

export default Footer;
