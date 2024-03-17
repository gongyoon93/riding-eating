import React, { useState } from "react";
import useSetMapsState from "@/hooks/useSetMapsState";
import useSetUserState from "@/hooks/useSetUserState";
import {
  PMLContents,
  PMLIcon,
  PMLIconBox,
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
import useSetModalState from "@/hooks/useSetModalState";
import { MarkerData } from "@/atoms/maps";

const SearchPlaceList = React.memo(({ map }: { map?: kakao.maps.Map }) => {
  const navigate = useNavigate();
  const [isBtnOpen, setIsBtnOpen] = useState(false);
  const [isListOpen, setIsListOpen] = useState(true);
  const {
    userStateValue: { isLogin },
  } = useSetUserState();
  const {
    positionStateValue,
    setPositionState,
    keywordStateValue: { keyword },
    setKeywordState,
    markerStateValue,
  } = useSetMapsState();
  const { setPlaceModalState } = useSetModalState();
  const { setPositionPanTo, searchPlaces } = useMaps(map);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    searchPlaces(keyword);
  };
  const goToPage = (pageNumber: number) => {
    markerStateValue?.page.gotoPage(pageNumber);
    setPositionState((pre) => ({
      ...pre,
      map: { lat: 37.3595704, lng: 127.105399 },
    }));
  };
  const toggleSearchList = () => {
    setIsListOpen(!isListOpen);
    setIsBtnOpen(false);
  };
  const openPlaceModal = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    mark: MarkerData
  ) => {
    e.stopPropagation();
    setPlaceModalState({ isOpen: true, marker: mark });
  };

  return (
    <SearchContainer onSubmit={onSubmit} isListOpen={isListOpen}>
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
            onMouseLeave={() => setIsBtnOpen(false)}
          >
            <SearchMoreValue onClick={toggleSearchList}>
              {isListOpen ? "목록 닫기" : "목록 열기"}
            </SearchMoreValue>
            <SearchMoreValue>나의 정보</SearchMoreValue>
            {isLogin && (
              <SearchMoreValue onClick={() => navigate("/signout")}>
                로그아웃
              </SearchMoreValue>
            )}
          </SearchMoreSelect>
        )}
      </SearchHeader>

      <PlaceList hasMultiPage={(markerStateValue?.page.last ?? 0) > 1}>
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
              <p title={mark.place_name}>{mark.place_name}</p>
              <p title={mark.road_address_name}>{mark.road_address_name}</p>
              <p title={mark.phone}>{mark.phone}</p>
            </PMLContents>
            <PMLIcon>
              <PMLIconBox />
              <PMLIconBox />
              <PMLIconBox
                onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
                  openPlaceModal(e, mark)
                }
              />
            </PMLIcon>
          </PlaceMarkerList>
        ))}
      </PlaceList>

      {(markerStateValue?.page.last ?? 0) > 1 && isListOpen && (
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
                onClick={() => goToPage(pageNumber)}
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
