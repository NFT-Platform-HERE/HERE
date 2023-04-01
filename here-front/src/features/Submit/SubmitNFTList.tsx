import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import SubmitOrganizationNFTListItem from "./SubmitOrganizationNFTListItem";
import useSubmitNFTListQuery from "@/apis/submit/useSubmitNFTListQuery";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import { useDispatch } from "react-redux";
import { selectNFT, setNFTInfo } from "@/stores/submit/selectedOrganizationNFT";
import {
  addNFT,
  addNFTInfo,
  clearNFTInfoList,
  clearNFTList,
  deleteNFT,
  deleteNFTInfo,
} from "@/stores/submit/selectedHospitalNFT";
import { SubmitNFTPreview } from "@/types/SubmitNFTPreview";
import SubmitHospitalNFTListItem from "./SubmitHospitalNFTListItem";
import useAutoSelectQuery from "@/apis/submit/useAutoSelectQuery";
import { useEffect } from "react";

const swiperStyle = `
.swiper-button-prev{
  width: 20px;
  height: 20px;
  top: 60px;
  margin-top: -5px;
  color: #ff5050;
}
.swiper-button-next{         
  width: 20px;
  height: 20px;
  margin-top: -5px;
  color: #ff5050;
}

`;

interface Iprops {
  count: number;
}

export default function SubmitNFTList({ count }: Iprops) {
  const dispatch = useDispatch();

  const { memberId } = useSelector((state: RootState) => state.member);

  const selectedCardList = useSelector((state: RootState) => {
    return state.submitSelectedHospitalNFT.selectedHospitalNFTList;
  });

  const selectedCard = useSelector((state: RootState) => {
    return state.submitSelectedOrganizationNFT.selectedOrganizationNFT;
  });

  const submitTab = useSelector((state: RootState) => {
    return state.submitTab.tabName;
  });

  const isClickBtn = useSelector((state: RootState) => {
    return state.clickAutoSelectBtn.onClick;
  });

  const autoSelectList = useAutoSelectQuery(memberId, count, isClickBtn);

  const submitNFTList = useSubmitNFTListQuery(memberId, submitTab);

  const handleSetSelectedCard = (
    tokenId: number,
    hashValue: string,
    index: number,
  ) => {
    if (submitTab === "AGENCY") {
      dispatch(selectNFT(index));
      dispatch(setNFTInfo({ tokenId: tokenId, hashValue: hashValue }));
    } else if (submitTab === "HOSPITAL") {
      if (selectedCardList.includes(index)) {
        dispatch(deleteNFT(index));
        dispatch(deleteNFTInfo(tokenId));
      } else {
        dispatch(addNFT(index));
        dispatch(
          addNFTInfo({
            tokenId: tokenId,
            hashValue: hashValue,
          }),
        );
      }
    }
  };

  const isSelected = (index: number) => {
    if (submitTab === "AGENCY") {
      if (selectedCard === index) {
        return true;
      }
    } else if (submitTab === "HOSPITAL") {
      if (selectedCardList.includes(index)) {
        return true;
      }
    }
    return false;
  };

  useEffect(() => {
    if (!autoSelectList.isSuccess || !submitNFTList.isSuccess) {
      return;
    }

    dispatch(clearNFTList());
    dispatch(clearNFTInfoList());
    const autoSelectData = autoSelectList.data.data;
    const submitNFTData = submitNFTList.data.data;

    for (let i = 0; i < autoSelectData.length; i++) {
      for (let j = 0; j < submitNFTData.length; j++) {
        if (autoSelectData[i].tokenId === submitNFTData[j].tokenId) {
          if (submitTab === "AGENCY") {
            dispatch(selectNFT(j));
            dispatch(
              setNFTInfo({
                tokenId: autoSelectData[i].tokenId,
                hashValue: autoSelectData[i].hashValue,
              }),
            );
          } else if (submitTab === "HOSPITAL") {
            dispatch(addNFT(j));
            dispatch(
              addNFTInfo({
                tokenId: autoSelectData[i].tokenId,
                hashValue: autoSelectData[i].hashValue,
              }),
            );
          }
        }
      }
    }
    console.log("자동");
  }, [autoSelectList?.data]);

  useEffect(() => {
    if (submitNFTList.data?.data?.length === 0) return;

    if (submitTab === "AGENCY") {
      dispatch(selectNFT(0));
      dispatch(
        setNFTInfo({
          tokenId: submitNFTList.data?.data[0]?.tokenId,
          hashValue: submitNFTList.data?.data[0]?.hashValue,
        }),
      );
    } else {
      dispatch(clearNFTList());
      dispatch(addNFT(0));
      dispatch(clearNFTInfoList());
      dispatch(
        addNFTInfo({
          tokenId: submitNFTList.data?.data[0]?.tokenId,
          hashValue: submitNFTList.data?.data[0]?.hashValue,
        }),
      );
    }
  }, [submitNFTList?.data]);

  return (
    <div className="relative mt-70 mb-50 flex justify-center mobile:mb-20">
      <div className="mobile:hidden">
        <Swiper
          slidesPerView={4}
          className="static flex w-[1050px] justify-center mobile:w-full"
          navigation={true}
          modules={[Navigation]}
          css={[swiperStyle]}
        >
          {submitNFTList?.data?.data?.map(
            (item: SubmitNFTPreview, index: number) => (
              <SwiperSlide className="relative flex justify-center" key={index}>
                {submitTab === "AGENCY" ? (
                  <SubmitOrganizationNFTListItem
                    place={item.place!}
                    registerDate={item.createdDate.slice(0, 10)}
                    onClick={() =>
                      handleSetSelectedCard(item.tokenId, item.hashValue, index)
                    }
                    isSelected={isSelected(index)}
                  />
                ) : (
                  <SubmitHospitalNFTListItem
                    name={item.name!}
                    registerDate={item.createdDate.slice(0, 10)}
                    onClick={() =>
                      handleSetSelectedCard(item.tokenId, item.hashValue, index)
                    }
                    isSelected={isSelected(index)}
                  />
                )}
              </SwiperSlide>
            ),
          )}
        </Swiper>
      </div>
      <div className="mt-30 hidden w-330 overflow-hidden rounded-10 border-1 border-black mobile:block">
        {submitNFTList?.data?.data?.map(
          (item: SubmitNFTPreview, index: number) => (
            <div
              className="flex h-47 w-330 items-center justify-between border-b-1 border-pen-0 pl-15 pr-15 text-15"
              onClick={() =>
                handleSetSelectedCard(item.tokenId, item.hashValue, index)
              }
              key={index}
            >
              <div className="flex items-center gap-10">
                <img
                  src="icons/check.svg"
                  className={
                    (isSelected(index) ? "visible " : "invisible ") +
                    "h-20 w-20"
                  }
                />

                <div>{item.createdDate}</div>
              </div>
              <div>{item.name}</div>
            </div>
          ),
        )}
      </div>
    </div>
  );
}
