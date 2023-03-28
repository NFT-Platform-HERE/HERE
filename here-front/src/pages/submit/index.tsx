import TabBtn from "@/components/Button/TabBtn";
import SubmitNFTList from "@/features/Submit/SubmitNFTList";
import SubmitNFTDetailList from "@/features/Submit/SubmitNFTDetailList";
import { RootState } from "@/stores/store";
import { useEffect, useState } from "react";
import { setTabHospital, setTabOrganization } from "@/stores/submit/submitTab";
import { useSelector, useDispatch } from "react-redux";
import CommonBtn from "@/components/Button/CommonBtn";
import SubmitOrganizationModal from "@/features/Submit/SubmitOrganizationModal";
import SubmitHospitalModal from "@/features/Submit/SubmitHospitalModal";
import SubmitBanner from "@/features/Submit/SubmitBanner";
import QrCodeReader from "@/components/Register/QrCodeReader";
import "swiper/css";
import "swiper/css/navigation";
import { clearNFTList } from "@/stores/submit/selectedHospitalNFT";

export default function SubmitPage() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const dispatch = useDispatch();
  const tabIndex = useSelector((state: RootState) => {
    return state.submitTab.tabName;
  });

  const isOrganizationTab = tabIndex === "AGENCY" ? true : false;

  const isHospitalTab = tabIndex === "HOSPITAL" ? true : false;

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    dispatch(clearNFTList());
    dispatch(setTabOrganization());
  }, []);

  return (
    <>
      <SubmitBanner />
      <div className="mx-auto flex w-[1200px] flex-col items-center justify-center mobile:mt-20 mobile:w-full">
        <div className="mb-50 flex w-full mobile:hidden">
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
        <div className="mb-50 hidden w-full mobile:flex mobile:w-334">
          <TabBtn
            width={167}
            height={60}
            fontSize={15}
            onClick={() => dispatch(setTabOrganization())}
            isSelected={isOrganizationTab}
          >
            기관 제출용(인증)
          </TabBtn>
          <TabBtn
            width={167}
            height={60}
            fontSize={16}
            onClick={() => dispatch(setTabHospital())}
            isSelected={isHospitalTab}
          >
            병원 제출용(수납)
          </TabBtn>
        </div>
        <div className="relative w-full">
          <div className="absolute top-0 right-0 mobile:top-232 mobile:right-20">
            <div className="mobile:hidden">
              <CommonBtn
                width={130}
                height={45}
                fontSize={16}
                onClick={openModal}
                isDisabled={false}
              >
                제출하기
              </CommonBtn>
            </div>
            <div className="hidden mobile:block">
              <CommonBtn
                width={100}
                height={35}
                fontSize={15}
                onClick={openModal}
                isDisabled={false}
              >
                제출하기
              </CommonBtn>
            </div>
          </div>
          <SubmitNFTDetailList />
          {isHospitalTab && (
            <div className="absolute top-[400px] right-0 flex items-end mobile:left-20 mobile:top-230 mobile:w-190">
              <input className="h-39 w-46 border-1 border-pen-0"></input>
              <div className="ml-5 mr-20 text-16">장</div>
              <div className="mobile:hidden">
                <CommonBtn
                  width={130}
                  height={45}
                  fontSize={16}
                  onClick={() => console.log("submit!")}
                  isDisabled={false}
                >
                  자동선택
                </CommonBtn>
              </div>
              <div className="hidden mobile:block">
                <CommonBtn
                  width={100}
                  height={35}
                  fontSize={15}
                  onClick={() => console.log("submit!")}
                  isDisabled={false}
                >
                  자동선택
                </CommonBtn>
              </div>

              <div className="group cursor-pointer">
                <img
                  src="/icons/question-mark.svg"
                  className="absolute -top-5 -right-5 h-20 w-20"
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
      {isOrganizationTab && isModalOpen && (
        <SubmitOrganizationModal onClick={closeModal} />
      )}
      {isHospitalTab && isModalOpen && (
        <SubmitHospitalModal onClick={closeModal} />
      )}
      <div className="mobile:hidden">
        <QrCodeReader />
      </div>
    </>
  );
}
