import Footer from "@/components/Footer";
import Map from "@/components/Map";
import styled from "styled-components";

const DashBoardContainer = styled.section`
  display: flex;
  flex-direction: column;
  height: 100vh; /* 화면 전체 높이 */
`;

function Dashboard() {
  return (
    <DashBoardContainer>
      <Map />
      <Footer />
    </DashBoardContainer>
  );
}

export default Dashboard;
