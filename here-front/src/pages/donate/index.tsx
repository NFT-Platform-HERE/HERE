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
import { useInView } from "react-intersection-observer";
import { IoCaretUpCircle } from "react-icons/io5";

export default function DonatePage() {
  const router = useRouter();
  const { ref, inView } = useInView();

  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [newMemberId, setNewMemberId] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string>("");
  const [keyword, setKeyword] = useState<string>("");

  const { memberId } = useSelector((state: RootState) => state.member);

  const donateList = useDonateListQuery();
  const donateDeadLineList = useDonateDeadLineListQuery();
  const donateMyList = useDonateMyListQuery(newMemberId);
  const searchList = useDonateSearchQuery(keyword);

  useEffect(() => {
    if (isChecked && inView) {
      donateMyList.fetchNextPage();
      return;
    }
    if (keyword && inView) {
      searchList.fetchNextPage();
      return;
    }
    if (inView) {
      donateList.fetchNextPage();
    }
  }, [inView]);

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

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
    if (isChecked) {
      setNewMemberId(memberId);
      setSearchValue("");
      setKeyword("");
      return;
    }
  }, [isChecked]);

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
          bgColor={"#FFB0B0"}
          imgUrl={"banners/donateBannerWeb.png"}
        />
        <div className="absolute top-196 left-[50%] translate-x-[-50%] banner:left-[600px]">
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
        <IoCaretUpCircle
          className="fixed right-30 bottom-30 z-30 cursor-pointer rounded-full bg-white text-50 text-red-1 mobile:hidden"
          onClick={goToTop}
        />
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
          <div className="mt-55 flex justify-center mobile:mt-10 mobile:mb-40">
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
            <div className="mx-auto flex w-1112 flex-wrap justify-start mobile:w-326 mobile:justify-center">
              {isChecked &&
                donateMyList.data?.pages?.map((page, idx) => (
                  <div key={idx} className="flex flex-wrap">
                    <DonateCardList items={page.content!} />
                    {!donateMyList.isFetchingNextPage && (
                      <div ref={ref} className="h-10 w-full"></div>
                    )}
                  </div>
                ))}
              {keyword &&
                searchList.data?.pages?.map((page, idx) => (
                  <div key={idx} className="flex flex-wrap">
                    <DonateCardList items={page.content!} />
                    {!searchList.isFetchingNextPage && (
                      <div ref={ref} className="h-10 w-full"></div>
                    )}
                  </div>
                ))}
              {!isChecked &&
                !keyword &&
                donateList.data?.pages?.map((page, idx) => (
                  <div key={idx} className="flex flex-wrap">
                    <DonateCardList items={page.content!} />
                    {!donateList.isFetchingNextPage && (
                      <div ref={ref} className="h-10 w-full"></div>
                    )}
                  </div>
                ))}
            </div>
          </div>
        </div>
        <DonateFloatingActionButton />
      </div>
    </>
  );
}
