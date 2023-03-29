import React, { useState, Suspense, useEffect } from "react";
import { useRouter } from "next/navigation";
import CommonBanner from "@/components/Banner/CommonBanner";
import CommonBtn from "@/components/Button/CommonBtn";
import DonateSearchInputBox from "@/features/Donate/DonateSearchInputBox";
import DonateFloatingActionButton from "@/features/Donate/DonateFloatingActionButton";
import DonateTitle from "@/features/Donate/DonateTitle";
import DonateCheckBox from "@/features/Donate/DonateCheckBox";
import DonateCardList from "./../../features/Donate/DonateCardList";
import MoveBtn from "@/components/Button/MoveBtn";
import useDonateListQuery from "./../../apis/donate/useDonateListQuery";
import useDonateDeadLineListQuery from "./../../apis/donate/useDonateDeadLineListQuery";
import CircularProgress from "@mui/material/CircularProgress";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import useDonateMyListQuery from "@/apis/donate/useDonateMyListQuery";
import useDonateSearchQuery from "@/apis/donate/useDonateSearchQuery";
import { Donation } from "@/types/Donation";

export default function DonatePage() {
  const router = useRouter();

  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [newMemberId, setNewMemberId] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string>("");
  const [keyword, setKeyword] = useState<string>("");
  const [nowDonateList, setNowDonateList] = useState<Donation[]>([]);

  const { memberId } = useSelector((state: RootState) => state.member);

  const donateList = useDonateListQuery();
  const donateDeadLineList = useDonateDeadLineListQuery();
  const donateMyList = useDonateMyListQuery(newMemberId);
  const searchList = useDonateSearchQuery(keyword);

  useEffect(() => {
    setNewMemberId(memberId);
  }, [isChecked]);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSearchValue(event.target.value);
  };

  const handleSearchInputKeyDown = (
    event: React.KeyboardEvent<HTMLElement>,
  ) => {
    if (event.code === "Enter") {
      setKeyword(searchValue);
    }
  };

  const handleSearchIconOnClick = () => {
    setKeyword(searchValue);
  };

  useEffect(() => {
    if (isChecked && donateMyList.data) {
      setNowDonateList(donateMyList.data);
      setSearchValue("");
      setKeyword("");
      return;
    }
    if (keyword && searchList.isLoading) {
      console.log("로딩중...");
    }
    if (keyword && searchList.data) {
      setNowDonateList(searchList.data);
      return;
    }
    if (donateList.data) {
      setNowDonateList(donateList.data);
    }
  }, [isChecked, keyword]);

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
              <Suspense fallback={<CircularProgress />}>
                <DonateCardList items={donateDeadLineList.data!} />
              </Suspense>
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
              onClick={handleSearchIconOnClick}
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
              <Suspense fallback={<CircularProgress />}>
                <DonateCardList items={nowDonateList!} />
              </Suspense>
            </div>
          </div>
        </div>
        <DonateFloatingActionButton />
      </div>
    </>
  );
}
