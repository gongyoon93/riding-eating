import styled from "styled-components";
import React from "react";
import useSetMapsState from "@/hooks/useSetMapsState";
import { SearchContainer, SearchInput } from "@/styled/maps/MapSearchStyle";
import useMaps from "@/hooks/useMaps";

const PlaceList = styled.ul`
  padding: 10px 10px;
  width: calc(100% - 20px);
  flex: 1;
  border-radius: 4px;
  border: none;
  box-shadow:
    0 2px 4px rgba(0, 0, 0, 0.2),
    0 -1px 0px rgba(0, 0, 0, 0.02);
  li {
  }
`;

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
          <li key={`장소 목록-${mark.id}`}>마커 내용</li>
        ))}
      </PlaceList>
    </SearchContainer>
  );
});

export default SearchPlaceList;
