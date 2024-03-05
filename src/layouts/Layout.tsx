import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Header from "@/components/Header";

const AuthMain = styled.main`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

const Main = styled.main`
  width: 100%;
`;

interface ILayoutProps {
  isLogin: boolean;
}

const Layout = ({ isLogin }: ILayoutProps) => {
  return (
    <>
      {!isLogin && <Header />}
      {!isLogin ? (
        <AuthMain>
          <Outlet />
        </AuthMain>
      ) : (
        <Main>
          <Outlet />
        </Main>
      )}
    </>
  );
};

// 이후에 styled/LayoutDefaultStyle.tsx 와 LayoutContainer.tsx를 분리하여 관리 ?

export default Layout;
