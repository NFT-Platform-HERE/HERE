import React, { useState, useEffect } from "react";

import CommonBanner from "@/components/Banner/CommonBanner";
import CommonBtn from "@/components/Button/CommonBtn";
import WebHeader from "@/components/Header/WebHeader";
import DonateCard, { DonateCardMobile } from "@/features/Donate/DonateCard";
import DonateSearchInputBox from "@/features/Donate/DonateSearchInputBox";

export default function DonatePage() {
  const [value, setValue] = useState<string>("");
  const [width, setWidth] = useState<number>(0); // 최초 화면 로딩 시 에러 때문에 초기값 0으로 세팅
  const breakpoint: number = 480;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("event.target.value", event.target.value);
    setValue(event.target.value);
  };

  const testTimeJson = [
    {
      title: "제목1",
      nickname: "닉네임1",
      expirationDate: "2023-03-14 16:46:08",
      donatePercent: 25,
      representativeImageUrl: "/next.svg",
      isCompleted: false,
    },
    {
      title: "제목2",
      nickname: "닉네임2",
      expirationDate: "2020-05-14 16:46:08",
      donatePercent: 25,
      representativeImageUrl: "/next.svg",
      isCompleted: false,
    },
    {
      title: "제목3",
      nickname: "닉네임3",
      expirationDate: "2021-06-14 16:46:08",
      donatePercent: 25,
      representativeImageUrl: "/next.svg",
      isCompleted: false,
    },
    {
      title: "제목4",
      nickname: "닉네임4",
      expirationDate: "2022-12-14 16:46:08",
      donatePercent: 25,
      representativeImageUrl: "/next.svg",
      isCompleted: false,
    },
  ];

  const testJson = [
    {
      title: "제목1",
      nickname: "닉네임1",
      expirationDate: "2023-03-14 16:46:08",
      donatePercent: 25,
      representativeImageUrl: "/next.svg",
      isCompleted: false,
    },
    {
      title: "제목2",
      nickname: "닉네임2",
      expirationDate: "2020-05-14 16:46:08",
      donatePercent: 25,
      representativeImageUrl: "/next.svg",
      isCompleted: false,
    },
    {
      title: "제목3",
      nickname: "닉네임3",
      expirationDate: "2021-06-14 16:46:08",
      donatePercent: 25,
      representativeImageUrl: "/next.svg",
      isCompleted: false,
    },
    {
      title: "제목4",
      nickname: "닉네임4",
      expirationDate: "2022-12-14 16:46:08",
      donatePercent: 25,
      representativeImageUrl: "/next.svg",
      isCompleted: false,
    },
    {
      title: "제목4",
      nickname: "닉네임4",
      expirationDate: "2022-12-14 16:46:08",
      donatePercent: 25,
      representativeImageUrl: "/next.svg",
      isCompleted: false,
    },
    {
      title: "제목4",
      nickname: "닉네임4",
      expirationDate: "2022-12-14 16:46:08",
      donatePercent: 25,
      representativeImageUrl: "/next.svg",
      isCompleted: false,
    },
    {
      title: "제목4",
      nickname: "닉네임4",
      expirationDate: "2022-12-14 16:46:08",
      donatePercent: 25,
      representativeImageUrl: "/next.svg",
      isCompleted: false,
    },
    {
      title: "제목4",
      nickname: "닉네임4",
      expirationDate: "2022-12-14 16:46:08",
      donatePercent: 25,
      representativeImageUrl: "/next.svg",
      isCompleted: false,
    },
    {
      title: "제목4",
      nickname: "닉네임4",
      expirationDate: "2022-12-14 16:46:08",
      donatePercent: 25,
      representativeImageUrl: "/next.svg",
      isCompleted: false,
    },
    {
      title: "제목4",
      nickname: "닉네임4",
      expirationDate: "2022-12-14 16:46:08",
      donatePercent: 25,
      representativeImageUrl: "/next.svg",
      isCompleted: false,
    },
  ];

  useEffect(() => {
    console.log("width", window.innerWidth);
    setWidth(window.innerWidth);
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return (
    <div className="w-full">
      <WebHeader />
      <CommonBanner />
      <div className="grid grid-cols-8 gap-2">
        <div className="mobile:hidden"></div>
        <div className="col-span-6 mobile:col-span-8">
          <div className="mr-5 mt-5 flex justify-end mobile:hidden">
            <CommonBtn
              width={200}
              height={70}
              fontSize={22}
              children={"글 작성하기"}
              onClick={() => {}}
            />
          </div>
          <div className="mb-62 flex justify-center text-28 font-bold text-pen-2 mobile:mb-14 mobile:text-16">
            종료가 얼마 남지 않았어요!
          </div>
          <div className="flex flex-wrap justify-start mobile:justify-center">
            {testTimeJson.map((item) =>
              width < breakpoint ? (
                <DonateCardMobile
                  title={item.title}
                  nickname={item.nickname}
                  isCompleted={item.isCompleted}
                  donatePercent={item.donatePercent}
                  expirationDate={item.expirationDate}
                />
              ) : (
                <DonateCard
                  title={item.title}
                  nickname={item.nickname}
                  isCompleted={item.isCompleted}
                  donatePercent={item.donatePercent}
                  expirationDate={item.expirationDate}
                />
              ),
            )}
          </div>
          <div className="mb-27 flex justify-center text-28 font-bold text-pen-2 mobile:mb-1 mobile:mt-27 mobile:text-16">
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
          <div className="mb-83 flex items-center justify-center mobile:mb-14">
            <DonateSearchInputBox
              width={width < breakpoint ? 290 : 827}
              height={width < breakpoint ? 35 : 84}
              fontSize={width < breakpoint ? 11 : 24}
              value={value}
              onChange={handleChange}
            />

            <label className="ml-30 mobile:hidden">
              <div className="flex items-center ">
                <input
                  type="checkbox"
                  className="h-33 w-33 mobile:h-16 mobile:w-16"
                  // disabled={disabled}
                  // checked={checked}
                  // onChange={({ target: { checked } }) => onChange(checked)}
                />
                <span className="ml-8 text-20 font-normal text-pen-2 mobile:text-10">
                  내 글 보기
                </span>
              </div>
            </label>
          </div>
          <div className="flex flex-wrap justify-start mobile:justify-center">
            {testJson.map((item) =>
              width < breakpoint ? (
                <DonateCardMobile
                  title={item.title}
                  nickname={item.nickname}
                  isCompleted={item.isCompleted}
                  donatePercent={item.donatePercent}
                  expirationDate={item.expirationDate}
                />
              ) : (
                <DonateCard
                  title={item.title}
                  nickname={item.nickname}
                  isCompleted={item.isCompleted}
                  donatePercent={item.donatePercent}
                  expirationDate={item.expirationDate}
                />
              ),
            )}
          </div>
        </div>
        <div className="mobile:hidden"></div>
      </div>
      <div className="fixed bottom-13 right-13 hidden mobile:inline-block">
        <img src="/icons/floating-action-button.svg" />
      </div>
    </div>
  );
}
