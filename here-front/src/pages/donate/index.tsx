import React, { useState, useEffect } from "react";

import CommonBanner from "@/components/Banner/CommonBanner";
import CommonBtn from "@/components/Button/CommonBtn";
import DonateCard, { DonateCardMobile } from "@/features/Donate/DonateCard";
import DonateSearchInputBox from "@/features/Donate/DonateSearchInputBox";
import { useRouter } from "next/navigation";
import { Donation } from "@/types/Donation";

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

  const [searchValue, setSearchValue] = useState<string>("");

  const router = useRouter();

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

  return (
    <div className="mt-60 flex w-full justify-center">
      {/* <CommonBanner /> */}
      <div className="min-w-1200 mobile:min-w-350">
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
        <div className="mb-55 flex justify-center text-22 font-bold text-pen-2 mobile:mb-14 mobile:text-16">
          종료가 얼마 남지 않았어요!
        </div>
        <div className="flex justify-center">
          <div className="flex w-1112 flex-wrap justify-start mobile:justify-center">
            {testTimeJson.map((item) => (
              <div className="mobile:hidden" key={item.boardId}>
                <DonateCard
                  title={item.title}
                  nickname={item.nickname}
                  isCompleted={item.status}
                  donatePercent={item.percentage}
                  expirationDate={item.dDay}
                  representativeImageUrl={item.boardImgUrl}
                />
              </div>
            ))}
            {testJson.map((item) => (
              <div className="hidden mobile:inline-block" key={item.boardId}>
                <DonateCardMobile
                  title={item.title}
                  nickname={item.nickname}
                  isCompleted={item.status}
                  donatePercent={item.percentage}
                  expirationDate={item.dDay}
                  representativeImageUrl={item.boardImgUrl}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="mb-27 flex justify-center text-22 font-bold text-pen-2 mobile:mb-1 mobile:mt-27 mobile:text-16">
          전체 목록
        </div>
        <div className="mb-11 mr-25 hidden  mobile:flex mobile:justify-end ">
          <label>
            <div className="flex items-center">
              <input
                type="checkbox"
                className="h-16 w-16"
                // disabled={disabled}
                // checked={checked}
                // onChange={({ target: { checked } }) => onChange(checked)}
              />
              <span className="ml-5 text-10 font-normal text-pen-2">
                내 글 보기
              </span>
            </div>
          </label>
        </div>
        <div className="mb-55 flex items-center justify-center mobile:mb-14 ">
          <DonateSearchInputBox
            value={searchValue}
            onChange={handleSearchInputChange}
            onKeyDown={handleSearchInputKeyDown}
          />

          <label className="ml-18 mobile:hidden">
            <div className="flex items-center ">
              <input
                type="checkbox"
                className="h-25 w-25 mobile:h-16 mobile:w-16"
                // disabled={disabled}
                // checked={checked}
                // onChange={({ target: { checked } }) => onChange(checked)}
              />
              <span className="ml-8 text-16 font-normal text-pen-2 mobile:text-10">
                내 글 보기
              </span>
            </div>
          </label>
        </div>
        <div className="flex justify-center">
          <div className="flex w-1112 flex-wrap justify-start mobile:justify-center">
            {testJson.map((item) => (
              <div className="mobile:hidden" key={item.boardId}>
                <DonateCard
                  title={item.title}
                  nickname={item.nickname}
                  isCompleted={item.status}
                  donatePercent={item.percentage}
                  expirationDate={item.dDay}
                  representativeImageUrl={item.boardImgUrl}
                />
              </div>
            ))}
            {testJson.map((item) => (
              <div className="hidden mobile:inline-block" key={item.boardId}>
                <DonateCardMobile
                  title={item.title}
                  nickname={item.nickname}
                  isCompleted={item.status}
                  donatePercent={item.percentage}
                  expirationDate={item.dDay}
                  representativeImageUrl={item.boardImgUrl}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="fixed bottom-13 right-13 hidden mobile:inline-block">
        <img src="/icons/floating-action-button.svg" />
      </div>
    </div>
  );
}
