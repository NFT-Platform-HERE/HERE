import CommonBanner from "@/components/Banner/CommonBanner";
import TabBtn from "@/components/Button/TabBtn";
import SubmitNFTList from "@/features/Submit/SubmitNFTList";
import SelectedSubmitNFTList from "@/features/Submit/SelectedSubmitNFTList";
import { RootState } from "@/stores/store";
import { setTabHospital, setTabOrganization } from "@/stores/submit/submitTab";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import "swiper/css";
import "swiper/css/navigation";
import CommonBtn from "@/components/Button/CommonBtn";

export default function SubmitPage() {
  const dispatch = useDispatch();
  const tabIndex = useSelector((state: RootState) => {
    return state.submitTab.tabIndex;
  });

  const isOrganizationTab = tabIndex === 1 ? true : false;

  const isHospitalTab = tabIndex === 2 ? true : false;

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
      <div className="mx-auto flex w-[1200px] flex-col items-center justify-center">
        <div className="mb-50 flex w-full">
          <TabBtn
            width={1200}
            height={80}
            fontSize={24}
            onClick={() => dispatch(setTabOrganization())}
            isSelected={isOrganizationTab}
          >
            기관 제출용(인증)
          </TabBtn>
          <TabBtn
            width={1200}
            height={80}
            fontSize={24}
            onClick={() => dispatch(setTabHospital())}
            isSelected={isHospitalTab}
          >
            병원 제출용(수납)
          </TabBtn>
        </div>
        <div className="relative w-full">
          <div className="absolute top-0 right-0">
            <CommonBtn
              width={130}
              height={45}
              fontSize={16}
              onClick={() => console.log("submit!")}
              isDisabled={false}
            >
              제출하기
            </CommonBtn>
          </div>
          <SelectedSubmitNFTList />
          {isHospitalTab && (
            <div className="absolute top-[400px] right-0 flex items-end">
              <input className="h-39 w-46 border-1 border-pen-0"></input>
              <div className="ml-5 mr-20 text-16">장</div>
              <CommonBtn
                width={130}
                height={45}
                fontSize={16}
                onClick={() => console.log("submit!")}
                isDisabled={false}
              >
                자동선택
              </CommonBtn>
              <div className="group cursor-pointer">
                <img
                  src="/icons/question-mark.svg"
                  className="absolute -top-5 -right-5 h-20 w-20 "
                />
                <img
                  src="/icons/auto-select-info.svg"
                  className="absolute -top-100 right-0 z-100 hidden group-hover:block"
                />
              </div>
            </div>
          )}
          <SubmitNFTList />
        </div>
      </div>
    </>
  );
}
