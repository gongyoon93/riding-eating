import React, { useState } from "react";
import useSetMapsState from "@/hooks/useSetMapsState";
import useSetUserState from "@/hooks/useSetUserState";
import {
  PMLContents,
  PMLIcon,
  Pagination,
  PaginationNumber,
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
import { useNavigate } from "react-router-dom";

const SearchPlaceList = React.memo(({ map }: { map?: kakao.maps.Map }) => {
  const navigate = useNavigate();
  const [isBtnOpen, setIsBtnOpen] = useState(false);
  const {
    userStateValue: { isLogin },
  } = useSetUserState();
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
          onClick={() => setIsBtnOpen(!isBtnOpen)}
        />
        {isBtnOpen && (
          <SearchMoreSelect
            isBtnOpen={isBtnOpen}
            onMouseLeave={() => setIsBtnOpen(!isBtnOpen)}
          >
            <SearchMoreValue>목록 닫기</SearchMoreValue>
            <SearchMoreValue>나의 정보</SearchMoreValue>
            {isLogin && (
              <SearchMoreValue onClick={() => navigate("/signout")}>
                로그아웃
              </SearchMoreValue>
            )}
          </SearchMoreSelect>
        )}
      </SearchHeader>

      <PlaceList hasNextPage={(markerStateValue?.page.last ?? 0) > 1}>
        {markerStateValue?.marker.map((mark) => (
          <PlaceMarkerList
            key={`Place-Marker-List-${mark.id}`}
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

      {(markerStateValue?.page.last ?? 0) > 1 && (
        <Pagination>
          <ul>
            {Array.from(
              {
                length: Math.ceil(
                  (markerStateValue?.page.totalCount ?? 0) / 15
                ),
              },
              (_, index) => index + 1
            ).map((pageNumber) => (
              <PaginationNumber
                key={"PaginationNumber" + pageNumber}
                currentPage={pageNumber === markerStateValue?.page.current}
                onClick={() => markerStateValue?.page.gotoPage(pageNumber)}
              >
                {pageNumber}
              </PaginationNumber>
            ))}
          </ul>
        </Pagination>
      )}
    </SearchContainer>
  );
});

export default SearchPlaceList;
