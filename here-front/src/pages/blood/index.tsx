import CommonBanner from "@/components/Banner/CommonBanner";
import BloodInfoContainer from "@/features/Blood/BloodInfoContainer";
import BloodMap from "@/features/Blood/BloodMap";
import BloodStamp from "@/features/Blood/BloodStamp";
import BloodUserContainer from "@/features/Blood/BloodUserContainer";

export default function BloodPage() {
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
      <div className="mx-auto mb-100 flex w-1200 flex-wrap justify-between px-60 mobile:w-full mobile:px-30">
        <BloodUserContainer />
        <BloodInfoContainer />
      </div>
      <div className="mx-auto mb-100 h-1000 w-1200 bg-red-0 px-60 mobile:w-full mobile:px-30">
        <BloodStamp />
        <BloodMap />
      </div>
    </>
  );
}
