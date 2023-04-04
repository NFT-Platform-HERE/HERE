import CommonBanner from "@/components/Banner/CommonBanner";
import BloodInfo from "@/features/Blood/BloodInfo";
import BloodMap from "@/features/Blood/BloodMap";
import BloodStampMobile from "@/features/Blood/BloodStampMobile";
import BloodStampWeb from "@/features/Blood/BloodStampWeb";

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
      <div className="mx-auto mb-100 flex w-1200 flex-wrap justify-between px-60 mobile:mb-50 mobile:w-full mobile:px-30">
        <BloodInfo />
      </div>
      <div className="mx-auto mb-100 w-1200 px-60 mobile:w-full mobile:px-0">
        <div className="hidden mobile:block">
          <BloodStampMobile />
        </div>
        <div className="pb-30 mobile:hidden">
          <BloodStampWeb />
        </div>
        <BloodMap />
      </div>
    </>
  );
}
