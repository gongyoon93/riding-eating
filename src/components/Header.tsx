import { Link } from "react-router-dom";
import useSetUserState from "@/hooks/useSetUserState";
import styled from "styled-components";

const Wrapper = styled.header`
  position: sticky;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid transparent;
  z-index: 1031;
  width: calc(100% - 30px);
  padding: 25px 15px 15px;
  nav {
    ul {
      display: flex;
      li {
        &:not(first-child) {
          margin-left: 0.8rem;
        }
        a {
          font-size: 1.4rem;
          text-decoration: none;
          color: ${({ theme }) => theme.color.fontMain};
          &:hover {
            color: ${({ theme }) => theme.color.second};
            font-weight: bolder;
          }
        }
      }
    }
  }
`;

const LogContainer = styled.div`
  a {
    h1 {
      text-decoration: unset;
      font-size: 2.5rem;
      font-weight: bolder;
      color: ${({ theme }) => theme.color.second};
      padding-bottom: 5px;
    }
  }
`;

const Header = () => {
  const {
    userStateValue: { isLogin },
  } = useSetUserState();

  return (
    <Wrapper>
      <LogContainer>
        <Link to={"/"}>
          <h1>🚲</h1>
        </Link>
      </LogContainer>
      <nav>
        <ul>
          {/* {isLogin && (
            <li>
              <Link to="/signout">로그아웃</Link>
            </li>
          )} */}
          {!isLogin && (
            <>
              <li>
                <Link to="/auth/signin">로그인</Link>
              </li>
              <li>
                <Link to="/auth/signup">회원가입</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </Wrapper>
  );
};

export default Header;
