import Footer from "@/components/Footer";
import styled from "styled-components";

const DashBoardContainer = styled.section`
  display: flex;
  flex-direction: column;
  height: 100vh; /* 화면 전체 높이 */
`;

const MapContainer = styled.article`
  flex: 1; /* 남은 공간을 모두 채우도록 함 */
  background-color: #f0f0f0; /* 임시 배경색 */
`;

function Dashboard() {
  return (
    <DashBoardContainer>
      <MapContainer></MapContainer>
      <Footer />
    </DashBoardContainer>
  );
}

export default Dashboard;
