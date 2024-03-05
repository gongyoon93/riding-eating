import styled from "styled-components";

const MapContainer = styled.article`
  flex: 1; /* 남은 공간을 모두 채우도록 함 */
  background-color: #f0f0f0; /* 임시 배경색 */
  div {
    width: 100%;
  }
`;

function Map() {
  return (
    <MapContainer>
      <div></div>
    </MapContainer>
  );
}

export default Map;
