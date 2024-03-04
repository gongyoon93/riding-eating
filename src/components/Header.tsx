import { Link } from "react-router-dom";
import useSetUserState from "@/hooks/useSetUserState";
import styled from "styled-components";

const Wrapper = styled.header`
  display: flex;
  padding: 0.8rem;
  justify-content: space-between;
  align-items: center;
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
            color: ${({ theme }) => theme.color.main};
            font-weight: bolder;
          }
        }
      }
    }
  }
`;

const LogContainer = styled.div`
  h1 {
    a {
      text-decoration: unset;
      font-size: 1.5rem;
      font-weight: bolder;
      color: ${({ theme }) => theme.color.main};
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
        <h1>
          <Link to={"/"}>Home</Link>
        </h1>
      </LogContainer>
      <nav>
        <ul>
          {isLogin && (
            <li>
              <Link to="/signout">로그아웃</Link>
            </li>
          )}
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
