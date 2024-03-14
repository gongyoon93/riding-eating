import styled from "styled-components";
import React from "react";
import useSetMapsState from "@/hooks/useSetMapsState";
import {
  PMLContents,
  PMLIcon,
  PlaceList,
  PlaceMarkerList,
  SearchContainer,
  SearchInput,
} from "@/styled/maps/MapSearchStyle";
import useMaps from "@/hooks/useMaps";

const CountPerPage = styled.ul``;

const SearchPlaceList = React.memo(({ map }: { map?: kakao.maps.Map }) => {
  const {
    positionStateValue,
    keywordStateValue: { keyword },
    setKeywordState,
    markerStateValue,
  } = useSetMapsState();
  const { setPositionPanTo, searchPlaces } = useMaps(map);
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    searchPlaces(keyword);
  };

  return (
    <SearchContainer onSubmit={onSubmit}>
      <SearchInput
        placeholder="장소를 검색하세요."
        value={keyword}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setKeywordState({ keyword: event.currentTarget.value })
        }
      />
      <PlaceList>
        {markerStateValue?.map((mark) => (
          <PlaceMarkerList
            key={`장소 목록-${mark.id}`}
            onClick={() => setPositionPanTo(mark.lat, mark.lng)}
            isClick={
              positionStateValue.map.lat === mark.lat &&
              positionStateValue.map.lng === mark.lng
            }
          >
            <PMLContents>
              <p>{mark.place_name}</p>
              <p>{mark.road_address_name}</p>
              <p>{mark.phone}</p>
            </PMLContents>
            <PMLIcon />
          </PlaceMarkerList>
        ))}
      </PlaceList>
      <CountPerPage />
    </SearchContainer>
  );
});

export default SearchPlaceList;
