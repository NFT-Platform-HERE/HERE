import React, { useState, useEffect } from "react";

import CommonBanner from "@/components/Banner/CommonBanner";
import CommonBtn from "@/components/Button/CommonBtn";
import DonateSearchInputBox from "@/features/Donate/DonateSearchInputBox";
import { useRouter } from "next/navigation";
import { Donation } from "@/types/Donation";
import DonateFloatingActionButton from "@/features/Donate/DonateFloatingActionButton";
import DonateTitle from "@/features/Donate/DonateTitle";
import DonateCheckBox from "@/features/Donate/DonateCheckBox";
import DonateCardList from "./../../features/Donate/DonateCardList";
import MoveBtn from "@/components/Button/MoveBtn";

export default function DonatePage() {
  const testTimeJson: Donation[] = [
    {
      boardId: 1,
      title: "헌혈증으로 사랑을 나눠요",
      nickname: "구스구스",
      dDay: "2023-03-14 16:46:08",
      percentage: 45,
      status: false,
    },
    {
      boardId: 2,
      title: "헌혈증 NFT로 기부를 편리하게",
      nickname: "규나카",
      dDay: "2023-03-13 16:46:08",
      percentage: 53,
      status: false,
    },
    {
      boardId: 3,
      title: "헌혈증 NFT 플랫폼 HERE",
      nickname: "언도",
      dDay: "2023-03-12 16:46:08",
      percentage: 70,
      status: false,
    },
    {
      boardId: 4,
      title: "Heart Share",
      nickname: "용용",
      dDay: "2023-03-10 16:46:08",
      percentage: 67,
      status: false,
    },
  ];

  const testJson: Donation[] = [
    {
      boardId: 1,
      title: "제목1",
      nickname: "닉네임1",
      dDay: "2023-03-14 16:46:08",
      percentage: 25,
      boardImgUrl: "/test/test-01.jpg",
      status: false,
    },
    {
      boardId: 2,
      title: "제목2",
      nickname: "닉네임2",
      dDay: "2020-05-14 16:46:08",
      percentage: 25,
      status: false,
    },
    {
      boardId: 3,
      title: "제목3",
      nickname: "닉네임3",
      dDay: "2021-06-14 16:46:08",
      percentage: 25,
      boardImgUrl: "/test/test-02.jpg",
      status: false,
    },
    {
      boardId: 4,
      title: "제목4",
      nickname: "닉네임4",
      dDay: "2022-12-14 16:46:08",
      percentage: 25,
      boardImgUrl: "/test/test-03.jpg",
      status: false,
    },
    {
      boardId: 5,
      title: "제목",
      nickname: "닉네임",
      dDay: "2022-12-14 16:46:08",
      percentage: 25,
      boardImgUrl: "/test/test-04.jpg",
      status: false,
    },
    {
      boardId: 6,
      title: "제목",
      nickname: "닉네임",
      dDay: "2022-12-14 16:46:08",
      percentage: 100,
      boardImgUrl: "/test/test-05.jpg",
      status: false,
    },
    {
      boardId: 7,
      title: "제목",
      nickname: "닉네임",
      dDay: "2022-12-14 16:46:08",
      percentage: 25,
      status: false,
    },
    {
      boardId: 8,
      title: "제목",
      nickname: "닉네임",
      dDay: "2022-12-14 16:46:08",
      percentage: 25,
      status: false,
    },
    {
      boardId: 9,
      title: "제목",
      nickname: "닉네임",
      dDay: "2022-12-14 16:46:08",
      percentage: 90,
      status: true,
    },
    {
      boardId: 10,
      title: "제목",
      nickname: "닉네임",
      dDay: "2022-12-14 16:46:08",
      percentage: 100,
      status: true,
    },
  ];

  const router = useRouter();

  const [searchValue, setSearchValue] = useState<string>("");
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    console.log("event.target.value", event.target.value);
    setSearchValue(event.target.value);
  };

  const handleSearchInputKeyDown = (
    event: React.KeyboardEvent<HTMLElement>,
  ) => {
    if (event.code === "Enter") {
      console.log(event.code);
    }
  };

  const goToSite = () => {
    location.assign(
      "https://www.bloodinfo.net/knrcbs/cm/cntnts/cntntsView.do?mi=1142&cntntsId=1022",
    );
  };

  return (
    <>
      <div className="relative mobile:hidden">
        <CommonBanner
          width={1200}
          height={240}
          marginTop={50}
          bgColor={"#FF9999"}
          imgUrl={"banners/donateBannerWeb.png"}
        />
        <div className="absolute left-[50%] top-196 translate-x-[-50%]">
          {/* 이 친구를 어떻게 배치한담... (화면 작아졌을 때 위치 이상함) */}
          <MoveBtn
            width={180}
            height={30}
            fontSize={14}
            children={"헌혈증서 알아보기"}
            onClick={goToSite}
          />
        </div>
      </div>
      <div className="relative hidden mobile:block mobile:h-200">
        <CommonBanner
          width={300}
          height={150}
          marginTop={20}
          bgColor={"#FF9999"}
          imgUrl={"banners/donateBannerMobile.png"}
        />
        <div className="absolute left-[54%] top-130">
          <MoveBtn
            width={110}
            height={20}
            fontSize={10}
            children={"헌혈증서 알아보기"}
            onClick={goToSite}
          />
        </div>
      </div>
      <div className="w-full mobile:flex">
        <div className="mx-auto w-1200 mobile:min-w-350">
          <div className="mr-10 mt-7 flex justify-end mobile:hidden">
            <CommonBtn
              width={150}
              height={55}
              fontSize={18}
              children={"글 작성하기"}
              isDisabled={false}
              onClick={() => router.push("/donate/write")}
            />
          </div>
          <DonateTitle title={"종료가 얼마 남지 않았어요!"} />
          <div className="mt-55 flex justify-center mobile:mt-10 mobile:mb-10">
            <div className="flex w-1112 flex-wrap justify-start mobile:justify-center">
              <DonateCardList items={testTimeJson} />
            </div>
          </div>
          <DonateTitle title={"전체 목록"} />
          <div className="mb-10 mr-25 hidden mobile:flex mobile:justify-end ">
            <DonateCheckBox
              onChange={handleCheckboxChange}
              checked={isChecked}
            />
          </div>
          <div className="mb-55 mt-27 flex items-center justify-center mobile:mt-5 mobile:mb-5 ">
            <DonateSearchInputBox
              value={searchValue}
              onChange={handleSearchInputChange}
              onKeyDown={handleSearchInputKeyDown}
            />
            <div className="ml-15 flex mobile:hidden">
              <DonateCheckBox
                onChange={handleCheckboxChange}
                checked={isChecked}
              />
            </div>
          </div>
          <div className="flex justify-center">
            <div className="flex w-1112 flex-wrap justify-start mobile:justify-center">
              <DonateCardList items={testJson} />
            </div>
          </div>
        </div>
        <DonateFloatingActionButton />
      </div>
    </>
  );
}
