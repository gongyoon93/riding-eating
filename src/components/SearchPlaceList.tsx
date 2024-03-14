import styled from "styled-components";
import React, { useState } from "react";
import useSetMapsState from "@/hooks/useSetMapsState";
import {
  PMLContents,
  PMLIcon,
  PlaceList,
  PlaceMarkerList,
  SearchContainer,
  SearchHeader,
  SearchInput,
  SearchMoreIcon,
  SearchMoreSelect,
  SearchMoreValue,
} from "@/styled/maps/MapSearchStyle";
import useMaps from "@/hooks/useMaps";

const CountPerPage = styled.ul``;

const SearchPlaceList = React.memo(({ map }: { map?: kakao.maps.Map }) => {
  const [isBtnOpen, setIsBtnOpen] = useState(false);
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
  const clickMoreIcon = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsBtnOpen(!isBtnOpen);
  };

  return (
    <SearchContainer onSubmit={onSubmit}>
      <SearchHeader>
        <SearchInput
          placeholder="장소를 검색하세요."
          value={keyword}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setKeywordState({ keyword: event.currentTarget.value })
          }
        />
        <SearchMoreIcon
          isBtnOpen={isBtnOpen}
          onClick={(e: React.FormEvent<HTMLFormElement>) => clickMoreIcon(e)}
        />
        {isBtnOpen && (
          <SearchMoreSelect
            isBtnOpen={isBtnOpen}
            onMouseLeave={() => setIsBtnOpen(!isBtnOpen)}
          >
            <SearchMoreValue>목록 닫기</SearchMoreValue>
            <SearchMoreValue>나의 정보</SearchMoreValue>
            <SearchMoreValue>로그아웃</SearchMoreValue>
          </SearchMoreSelect>
        )}
      </SearchHeader>

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
