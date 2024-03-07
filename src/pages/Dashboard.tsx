import Footer from "@/components/Footer";
import Map from "@/components/Map";
import useSetMapsState from "@/hooks/useSetMapsState";
import { useEffect } from "react";
import styled from "styled-components";

const DashBoardContainer = styled.section`
  display: flex;
  flex-direction: column;
  height: 100vh; /* 화면 전체 높이 */
`;

function Dashboard() {
  const { setMovingState } = useSetMapsState();

  useEffect(() => {
    const isMovingState = localStorage.getItem("movingState");
    if (isMovingState) {
      const isMoving = JSON.parse(isMovingState).isMoving === true;
      setMovingState((pre) => ({ ...pre, isMoving }));
    }
  }, []);

  return (
    <DashBoardContainer>
      <Map />
      <Footer />
    </DashBoardContainer>
  );
}

export default Dashboard;
