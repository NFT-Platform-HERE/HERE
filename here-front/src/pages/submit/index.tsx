import CommonBanner from "@/components/Banner/CommonBanner";
import TabBtn from "@/components/Button/TabBtn";
import NFTCardBack from "@/components/Card/NFTCardBack";
import SubmitNFTList from "@/features/Submit/submitNFTList";

export default function SubmitPage() {
  return (
    <>
      <div className="mobile:hidden">
        <CommonBanner
          width={1200}
          height={240}
          marginTop={50}
          bgColor={"#FEA6B4"}
          imgUrl={"banners/bloodBannerWeb.png"}
        />
      </div>
      <div className="hidden mobile:block mobile:h-180">
        <CommonBanner
          width={300}
          height={150}
          marginTop={20}
          bgColor={"#FEA6B4"}
          imgUrl={"banners/bloodBannerMobile.png"}
        />
      </div>
      <div className="mx-auto flex flex-col items-center justify-center">
        <div className="mb-50 flex w-[1200px]">
          <TabBtn
            width={1200}
            height={100}
            fontSize={24}
            onClick={() => console.log("click!")}
            isSelected={true}
          >
            기관 제출용(인증)
          </TabBtn>
          <TabBtn
            width={1200}
            height={100}
            fontSize={24}
            onClick={() => console.log("click!")}
            isSelected={false}
          >
            병원 제출용(수납)
          </TabBtn>
        </div>
        <NFTCardBack height={350} fontSize={18} />
        <SubmitNFTList />
      </div>
    </>
  );
}
