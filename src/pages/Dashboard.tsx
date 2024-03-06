import Footer from "@/components/Footer";
import Map from "@/components/Map";
import { NavermapsProvider } from "react-naver-maps";
import styled from "styled-components";

const DashBoardContainer = styled.section`
  display: flex;
  flex-direction: column;
  height: 100vh; /* 화면 전체 높이 */
`;

function Dashboard() {
  return (
    <NavermapsProvider ncpClientId={import.meta.env.VITE_MAPS_CLIENT_ID}>
      <DashBoardContainer>
        <Map />
        <Footer />
      </DashBoardContainer>
    </NavermapsProvider>
  );
}

export default Dashboard;
