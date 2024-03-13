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
    keywordStateValue: { keyword },
    setKeywordState,
    markerStateValue,
  } = useSetMapsState();
  const { searchPlaces } = useMaps(map);
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
          <PlaceMarkerList key={`장소 목록-${mark.id}`}>
            <PMLIcon />
            <PMLContents>
              <p>{mark.place_name}</p>
              <p>{mark.road_address_name}</p>
              <p>{mark.phone}</p>
            </PMLContents>
          </PlaceMarkerList>
        ))}
      </PlaceList>
      <CountPerPage />
    </SearchContainer>
  );
});

export default SearchPlaceList;
