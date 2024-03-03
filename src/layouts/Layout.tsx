import { Outlet } from "react-router-dom";
import styled from "@emotion/styled";
import Header from "@/components/Header";

const Main = styled.main`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

const Layout = () => {
  return (
    <>
      <Header />
      <Main>
        <Outlet />
      </Main>
    </>
  );
};

export default Layout;
