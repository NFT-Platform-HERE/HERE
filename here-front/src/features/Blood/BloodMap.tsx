import CommonBtn from "@/components/Button/CommonBtn";
import { bloodHouseInfo } from "@/constants/bloodHouse";
import { BloodHouse } from "@/types/BloodHouse";
import { useEffect, useRef, useState } from "react";
import useGeolocation from "react-hook-geolocation";
import Link from "next/link";
import { useRouter } from "next/router";

export default function BloodMap() {
  const [naverMap, setNaverMap] = useState<naver.maps.Map | null>(null);
  const [curPos, setCurPos] = useState<naver.maps.Marker | null>(null);
  const [markers, setMarkers] = useState<naver.maps.Marker[]>([]);
  const [bloodHouse, setBloodHouse] = useState<BloodHouse>();
  // naver map
  const mapElement: any | null = useRef(undefined);

  // initial call
  const geolocation = useGeolocation();
  const { naver } = window;

  const router = useRouter();

  function setMapIcon(
    icon: string,
    location: naver.maps.LatLng,
    map: naver.maps.Map,
    sizeX: number,
    sizeY: number,
    isBounce: boolean,
  ) {
    return new naver.maps.Marker({
      position: location,
      map,
      icon: {
        url: icon,
        size: new naver.maps.Size(sizeX, sizeY),
        scaledSize: new naver.maps.Size(sizeX, sizeY),
        origin: new naver.maps.Point(0, 0),
        anchor: new naver.maps.Point(sizeX / 2, sizeY),
      },
      animation: isBounce ? naver.maps.Animation.BOUNCE : undefined,
    });
  }

  useEffect(() => {
    if (!mapElement.current || !naver) return;
    // 지도에 표시할 위치의 위도와 경도 좌표를 파라미터로 넣어줍니다.
    const locationPos = new naver.maps.LatLng(36.3562036, 127.3566635);
    const mapOptions: naver.maps.MapOptions = {
      center: locationPos,
      zoom: 13,
    };
    const map = new naver.maps.Map(mapElement.current, mapOptions);

    setNaverMap(map);

    const temp: naver.maps.Marker[] = [];
    bloodHouseInfo.map((item, index) =>
      temp.push(
        setMapIcon(
          "/icons/blood-house.png",
          new naver.maps.LatLng(item.lat, item.lng),
          map,
          40,
          40,
          false,
        ),
      ),
    );

    setMarkers(temp);
  }, []);

  useEffect(() => {
    markers.map((item, index) =>
      naver.maps.Event.addListener(item, "click", () => {
        setBloodHouse(bloodHouseInfo[index]);
      }),
    );
  }, [markers]);

  useEffect(() => {
    if (!naverMap || !naver || !naver.maps) return;

    const location = new naver.maps.LatLng(
      geolocation.latitude,
      geolocation.longitude,
    );

    if (!curPos) naverMap.setCenter(location);

    // 기존 현재 위치 마커 제거
    if (curPos) {
      curPos.setMap(null);
    }

    // 현재 위치 맵에 표시
    setCurPos(
      setMapIcon(
        "/icons/current-position.png",
        location,
        naverMap,
        40,
        40,
        false,
      ),
    );
  }, [geolocation]);

  return (
    <div className="mx-auto flex h-500 w-full gap-45 mobile:h-full mobile:w-350 mobile:flex-col">
      <div
        ref={mapElement}
        className="h-500 w-[calc(100%-425px)] mobile:h-[100vw] mobile:w-full"
      ></div>
      <div className="relative flex h-500 w-380 items-end mobile:h-350 mobile:w-full mobile:items-end">
        <div className="absolute top-0 left-40 h-60 w-300 rounded-50 border-5 border-red-2 bg-white text-center text-20 font-semibold leading-50 text-red-2 mobile:h-50 mobile:w-[calc(100%-70px)] mobile:text-16 mobile:leading-40">
          헌혈의 집 정보
        </div>
        <div className="h-465 w-380 rounded-30 border-3 border-pen-5 bg-white mobile:h-325 mobile:w-full">
          {bloodHouse ? (
            <div className="flex h-465 w-380 flex-col justify-center gap-20 pl-20 pr-20 mobile:mt-30 mobile:h-325 mobile:w-full">
              <div className="flex gap-13">
                <img src="icons/house.png" className="h-25 w-25" />
                {bloodHouse.name}
              </div>
              <div className="flex gap-13">
                <img src="icons/place.png" className="h-25 w-25" />
                {bloodHouse.address}
              </div>
              <div className="flex gap-13">
                <img src="icons/phone.png" className="h-25 w-25" />
                {bloodHouse.phone}
              </div>
              <div className="absolute bottom-20 mobile:hidden">
                <CommonBtn
                  width={340}
                  height={40}
                  fontSize={18}
                  isDisabled={false}
                  onClick={() =>
                    router.push(
                      "https://www.bloodinfo.net/knrcbs/bh/resv/resvBldHousStep1.do?mi=1094",
                    )
                  }
                >
                  예약하러 가기
                </CommonBtn>
              </div>
              <div className="mt-20 hidden mobile:flex mobile:justify-center">
                <CommonBtn
                  width={250}
                  height={40}
                  fontSize={18}
                  isDisabled={false}
                  onClick={() =>
                    router.push(
                      "https://www.bloodinfo.net/knrcbs/bh/resv/resvBldHousStep1.do?mi=1094",
                    )
                  }
                >
                  예약하러 가기
                </CommonBtn>
              </div>
            </div>
          ) : (
            <div className="pt-120 text-center mobile:pt-80">
              <img
                src="/icons/blood-house.png"
                className="mx-auto mb-10 w-70"
              />
              <p>헌혈의 집 아이콘을 클릭하면</p>
              <p>상세정보를 볼 수 있어요</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
