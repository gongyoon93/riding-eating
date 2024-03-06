import {
  Container as MapDiv,
  NaverMap,
  Marker,
  useNavermaps,
} from "react-naver-maps";

function Map() {
  // instead of window.naver.maps
  const navermaps = useNavermaps();
  return (
    <MapDiv
      style={{
        width: "100%",
        flex: 1,
        backgroundColor: "#f0f0f0",
      }}
    >
      <NaverMap
        defaultCenter={new navermaps.LatLng(37.3595704, 127.105399)}
        defaultZoom={15}
      >
        <Marker
          defaultPosition={new navermaps.LatLng(37.3595704, 127.105399)}
        />
      </NaverMap>
    </MapDiv>
  );
}

export default Map;
