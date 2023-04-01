import TabBtn from "@/components/Button/TabBtn";
import Paging from "@/components/Pagination/Paging";
import usePagination from "@/hooks/organization/usePagination";
import { Suspense, useEffect, useState } from "react";
import { Confirm } from "@/types/Confirm";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import useOrganizationNFTListQuery from "@/apis/organization/useOrganizationNFTListQuery";
import AgencyNFTModal from "@/features/Organization/AgencyNFTModal";
import { useDispatch } from "react-redux";
import {
  getAgencyNft,
  getHospitalNft,
} from "@/stores/organization/organization";
import HospitalNFTModal from "@/features/Organization/HospitalNFTModal";

export default function OrganizationPage() {
  const dispatch = useDispatch();
  // const { organizationId, isHospital } = useSelector(
  //   (state: RootState) => state.member,
  // );

  // 기관 테스트 데이터
  const organizationId = "696d4121-ab33-45c0-9413-f744d6a241c2";
  const isHospital = false;

  // 병원 테스트 데이터
  // const organizationId = "33674ae5-e7ae-4619-a7c4-ac4d11ac3b44";
  // const isHospital = true;

  const [isActive, setIsActive] = useState<boolean>(true);
  const [active, setActive] = useState<string>("INACTIVE");

  const [confirmList, setConfirmList] = useState<Confirm[]>([]);

  const activeList = useOrganizationNFTListQuery(
    !isHospital ? "agency" : "hospital",
    organizationId,
    active,
    setConfirmList,
  );

  const changeTab = () => {
    setIsActive(!isActive);
    if (isActive) {
      setActive("ACTIVE");
    } else {
      setActive("INACTIVE");
    }
  };

  const { page, currentList, postPerPage, handlePageChange } = usePagination({
    confirmList: confirmList,
  });

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const hanldleClick = (idx: number) => {
    setIsOpen(!isOpen);
    if (isHospital) {
      dispatch(getHospitalNft(currentList[idx].hashValueList));
    } else {
      const payload = {
        tokenId: currentList[idx].tokenId,
        hashValue: currentList[idx].hashValue,
      };
      dispatch(getAgencyNft(payload));
    }
  };

  return (
    <div className="mx-auto mt-50 w-1000 text-center">
      <p className="mb-30 text-24">헌혈 사실 확인 요청</p>
      <TabBtn
        width={500}
        height={70}
        fontSize={20}
        isSelected={isActive}
        children={"승인 대기"}
        onClick={changeTab}
      />
      <TabBtn
        width={500}
        height={70}
        fontSize={20}
        isSelected={!isActive}
        children={"승인 완료"}
        onClick={changeTab}
      />
      <div className="flex h-70 w-1000 justify-between bg-pink-0 text-center">
        <p className="ml-40 inline-block w-100 text-18 font-medium leading-70">
          번호
        </p>
        <p className="inline-block w-100 text-18 font-medium leading-70">
          작성자
        </p>
        {isHospital ? (
          <p className="inline-block w-200 text-18 font-medium leading-70">
            개수
          </p>
        ) : (
          <p className="inline-block w-200 text-18 font-medium leading-70">
            사유
          </p>
        )}
        <p className="mr-[6rem] inline-block w-100 text-18 font-medium leading-70">
          등록일
        </p>
      </div>
      {currentList?.map((item, idx) => (
        <div key={idx}>
          <div
            onClick={() => hanldleClick(idx)}
            className="flex h-70 w-1000 cursor-pointer justify-between text-center "
          >
            <p className="ml-40 inline-block w-100 font-light leading-70">
              {(page - 1) * postPerPage + idx + 1}
            </p>
            <p className="inline-block w-100 font-light leading-70">
              {item.memberName}
            </p>
            {isHospital ? (
              <p className="inline-block w-200 font-light leading-70">
                {item.count}
              </p>
            ) : (
              <p className="inline-block w-200 font-light leading-70">
                {item.reason}
              </p>
            )}
            <p className="mr-[6rem] inline-block w-100 font-light leading-70">
              {item.createdDate.slice(0, 10)}
            </p>
          </div>
          {isOpen && !isHospital && <AgencyNFTModal onClick={hanldleClick} />}
          {isOpen && isHospital && <HospitalNFTModal onClick={hanldleClick} />}
          <hr />
        </div>
      ))}
      <Paging
        totalCount={confirmList?.length}
        page={page}
        postPerPage={postPerPage}
        pageRangeDisplayed={5}
        handlePageChange={(newPage: number) => handlePageChange(newPage)}
      />
    </div>
  );
}
