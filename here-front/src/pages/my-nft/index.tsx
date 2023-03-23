import "swiper/css";
import "swiper/css/navigation";
import InstaBtn from "@/components/Button/InstaBtn";
import MyNFTList from "@/features/MyNFT/MyNFTList";
import SelectedNFTList from "@/features/MyNFT/SelectedNFTList";
import { RootState } from "@/stores/store";
import { useSelector } from "react-redux";
import SelectedNFT from "@/features/MyNFT/SelectedNFT";

const swiperList = [
  {
    index: 2,
  },
  {
    index: 3,
  },
  {
    index: 4,
  },
  {
    index: 5,
  },
  {
    index: 6,
  },
  {
    index: 7,
  },
  {
    index: 8,
  },
  {
    index: 9,
  },
];

export default function MyNFTPage() {
  const NFTCardBackIndex = useSelector((state: RootState) => {
    return state.selectedNFT.selectedNFT;
  });
  const selectedCardList = useSelector((state: RootState) => {
    return state.myNFT.selectedNFTList;
  });

  return (
    <div className="w-min-[1200px] mobile:w-min-full mobile:w-full">
      <div className="flex h-[calc(100vh-65px)] min-h-630 w-full min-w-[1200px] items-center justify-center mobile:h-[calc(100vh-60px)] mobile:min-h-full mobile:w-full mobile:min-w-full">
        <div className="relative flex h-full w-[1200px] items-center justify-between mobile:w-full mobile:flex-col-reverse mobile:justify-between">
          <div className="absolute right-0 top-20 mobile:hidden">
            <InstaBtn
              width={195}
              height={40}
              onClick={() => console.log("click!")}
              fontSize={18}
            >
              SNS 공유하기
            </InstaBtn>
          </div>
          <img
            src="/icons/instagram.png"
            className="hidden mobile:absolute mobile:top-20 mobile:right-20 mobile:block mobile:h-35 mobile:w-35"
          ></img>
          <div className="relative flex h-630 w-137 items-center justify-center mobile:h-180 mobile:w-full">
            <MyNFTList myNFTList={swiperList} />
          </div>

          <div className="relative flex w-983 justify-center gap-43 mobile:w-full mobile:items-center">
            <SelectedNFTList selectedCardList={selectedCardList} />
          </div>
        </div>
      </div>
      {NFTCardBackIndex !== 0 && <SelectedNFT />}
    </div>
  );
}
