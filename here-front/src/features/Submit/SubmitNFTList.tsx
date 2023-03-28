import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import SubmitNFTListItem from "./SubmitNFTListItem";
import useSubmitNFTListQuery from "@/apis/submit/useSubmitNFTListQuery";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import { useDispatch } from "react-redux";
import { selectNFT } from "@/stores/submit/selectedOrganizationNFT";
import { addNFT, deleteNFT } from "@/stores/submit/selectedHospitalNFT";

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

const samplePreview = [
  {
    name: "이경택",
    registerDate: "2023-03-24",
  },
  {
    name: "최정온",
    registerDate: "2023-02-14",
  },
  {
    name: "조용현",
    registerDate: "2023-01-14",
  },
  {
    name: "이현구",
    registerDate: "2022-05-24",
  },
  {
    name: "최규림",
    registerDate: "2021-02-24",
  },
  {
    name: "김도언",
    registerDate: "2021-07-24",
  },
];

export default function SubmitNFTList() {
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

  const submitNFTList = useSubmitNFTListQuery(
    "ae4c93d4-67f0-4502-9a0c-04d003ce6f0c",
    submitTab,
  );

  const handleSetSelectedCard = (index: number) => {
    if (submitTab === "AGENCY") {
      dispatch(selectNFT(index));
    } else if (submitTab === "HOSPITAL") {
      if (selectedCardList.includes(index)) {
        dispatch(deleteNFT(index));
      } else {
        dispatch(addNFT(index));
      }
    }
  };

  const isSelected = (index: number) => {
    if (submitTab === "AGENCY") {
      if (selectedCard === index) {
        return true;
      }
      return false;
    } else if (submitTab === "HOSPITAL") {
      if (selectedCardList.includes(index)) {
        return true;
      }
      return false;
    }
    return false;
  };

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
          {samplePreview.map((item, index) => (
            <SwiperSlide className="relative flex justify-center" key={index}>
              <SubmitNFTListItem
                name={item.name}
                registerDate={item.registerDate}
                onClick={() => handleSetSelectedCard(index)}
                isSelected={isSelected(index)}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="mt-30 hidden w-330 overflow-hidden rounded-10 border-1 border-black mobile:block">
        {samplePreview.map((item, index) => (
          <div
            className="flex h-47 w-330 items-center justify-between border-b-1 border-pen-0 pl-15 pr-15 text-15"
            onClick={() => handleSetSelectedCard(index)}
            key={index}
          >
            <div className="flex items-center gap-10">
              <img
                src="icons/check.svg"
                className={
                  (isSelected(index) ? "visible " : "invisible ") + "h-20 w-20"
                }
              />

              <div>{item.registerDate}</div>
            </div>
            <div>{item.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
