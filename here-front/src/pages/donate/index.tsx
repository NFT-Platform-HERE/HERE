import React, { useState, useEffect } from "react";

import CommonBanner from "@/components/Banner/CommonBanner";
import CommonBtn from "@/components/Button/CommonBtn";
import DonateCard, { DonateCardMobile } from "@/features/Donate/DonateCard";
import DonateSearchInputBox from "@/features/Donate/DonateSearchInputBox";
import { useRouter } from "next/navigation";

export default function DonatePage() {
  const [value, setValue] = useState<string>("");
  const [width, setWidth] = useState<number>(0); // 최초 화면 로딩 시 에러 때문에 초기값 0으로 세팅

  const router = useRouter();

  const breakpoint: number = 480;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("event.target.value", event.target.value);
    setValue(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.code === "Enter") {
      console.log(event.code);
    }
  };

  const testTimeJson: any[] = [
    {
      id: 1,
      title: "헌혈증으로 사랑을 나눠요",
      nickname: "구스구스",
      expirationDate: "2023-03-14 16:46:08",
      donatePercent: 45,
      isCompleted: false,
    },
    {
      id: 2,
      title: "헌혈증 NFT로 기부를 편리하게",
      nickname: "규나카",
      expirationDate: "2023-03-13 16:46:08",
      donatePercent: 53,
      isCompleted: false,
    },
    {
      id: 3,
      title: "헌혈증 NFT 플랫폼 HERE",
      nickname: "언도",
      expirationDate: "2023-03-12 16:46:08",
      donatePercent: 70,
      isCompleted: false,
    },
    {
      id: 4,
      title: "Heart Share",
      nickname: "용용",
      expirationDate: "2023-03-10 16:46:08",
      donatePercent: 67,
      isCompleted: false,
    },
  ];

  const testJson: any[] = [
    {
      id: 1,
      title: "제목1",
      nickname: "닉네임1",
      expirationDate: "2023-03-14 16:46:08",
      donatePercent: 25,
      representativeImageUrl: "/test/test-01.jpg",
      isCompleted: false,
    },
    {
      id: 2,
      title: "제목2",
      nickname: "닉네임2",
      expirationDate: "2020-05-14 16:46:08",
      donatePercent: 25,
      isCompleted: false,
    },
    {
      id: 3,
      title: "제목3",
      nickname: "닉네임3",
      expirationDate: "2021-06-14 16:46:08",
      donatePercent: 25,
      representativeImageUrl: "/test/test-02.jpg",
      isCompleted: false,
    },
    {
      id: 4,
      title: "제목4",
      nickname: "닉네임4",
      expirationDate: "2022-12-14 16:46:08",
      donatePercent: 25,
      representativeImageUrl: "/test/test-03.jpg",
      isCompleted: false,
    },
    {
      id: 5,
      title: "제목",
      nickname: "닉네임",
      expirationDate: "2022-12-14 16:46:08",
      donatePercent: 25,
      representativeImageUrl: "/test/test-04.jpg",
      isCompleted: false,
    },
    {
      id: 6,
      title: "제목",
      nickname: "닉네임",
      expirationDate: "2022-12-14 16:46:08",
      donatePercent: 100,
      representativeImageUrl: "/test/test-05.jpg",
      isCompleted: false,
    },
    {
      id: 7,
      title: "제목",
      nickname: "닉네임",
      expirationDate: "2022-12-14 16:46:08",
      donatePercent: 25,
      isCompleted: false,
    },
    {
      id: 8,
      title: "제목",
      nickname: "닉네임",
      expirationDate: "2022-12-14 16:46:08",
      donatePercent: 25,
      isCompleted: false,
    },
    {
      id: 9,
      title: "제목",
      nickname: "닉네임",
      expirationDate: "2022-12-14 16:46:08",
      donatePercent: 90,
      isCompleted: true,
    },
    {
      id: 10,
      title: "제목",
      nickname: "닉네임",
      expirationDate: "2022-12-14 16:46:08",
      donatePercent: 100,
      isCompleted: true,
    },
  ];

  useEffect(() => {
    console.log("width", window.screen.width);
    setWidth(window.screen.width);
    const handleWindowResize = () => setWidth(window.screen.width);
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return (
    <div className="mt-60 w-full">
      {/* <CommonBanner /> */}
      <div className="grid grid-cols-8 gap-2">
        <div className="mobile:hidden"></div>
        <div className="col-span-6 mobile:col-span-8">
          <div className="mr-5 mt-5 flex justify-end mobile:hidden">
            <CommonBtn
              width={150}
              height={55}
              fontSize={18}
              children={"글 작성하기"}
              isDisabled={false}
              onClick={() => router.push("/donate/write")}
            />
          </div>
          <div className="mb-62 flex justify-center text-22 font-bold text-pen-2 mobile:mb-14 mobile:text-16">
            종료가 얼마 남지 않았어요!
          </div>
          <div className="flex flex-wrap justify-start mobile:justify-center">
            {testTimeJson.map((item) =>
              width < breakpoint ? (
                <DonateCardMobile
                  key={item.id}
                  title={item.title}
                  nickname={item.nickname}
                  isCompleted={item.isCompleted}
                  donatePercent={item.donatePercent}
                  expirationDate={item.expirationDate}
                  representativeImageUrl={item.representativeImageUrl}
                />
              ) : (
                <DonateCard
                  key={item.id}
                  title={item.title}
                  nickname={item.nickname}
                  isCompleted={item.isCompleted}
                  donatePercent={item.donatePercent}
                  expirationDate={item.expirationDate}
                  representativeImageUrl={item.representativeImageUrl}
                />
              ),
            )}
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
          <div className="mb-83 flex items-center justify-center mobile:mb-14">
            <DonateSearchInputBox
              value={value}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
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
          <div className="flex flex-wrap justify-start mobile:justify-center">
            {testJson.map((item) =>
              width < breakpoint ? (
                <DonateCardMobile
                  key={item.id}
                  title={item.title}
                  nickname={item.nickname}
                  isCompleted={item.isCompleted}
                  donatePercent={item.donatePercent}
                  expirationDate={item.expirationDate}
                  representativeImageUrl={item.representativeImageUrl}
                />
              ) : (
                <DonateCard
                  key={item.id}
                  title={item.title}
                  nickname={item.nickname}
                  isCompleted={item.isCompleted}
                  donatePercent={item.donatePercent}
                  expirationDate={item.expirationDate}
                  representativeImageUrl={item.representativeImageUrl}
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
