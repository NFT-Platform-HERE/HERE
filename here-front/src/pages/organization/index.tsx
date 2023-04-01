import TabBtn from "@/components/Button/TabBtn";
import Paging from "@/components/Pagination/Paging";
import usePagination from "@/hooks/organization/usePagination";
import { Suspense, useEffect, useState } from "react";
import { Confirm } from "@/types/Confirm";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import useOrganizationNFTListQuery from "@/apis/organization/useOrganizationNFTListQuery";

export default function OrganizationPage() {
  // const { organizationId, isHospital } = useSelector(
  //   (state: RootState) => state.member,
  // );

  // 현재 테스트 데이터
  const organizationId = "696d4121-ab33-45c0-9413-f744d6a241c2";
  const isHospital = false;

  const [isActive, setIsActive] = useState<boolean>(false);
  const [active, setActive] = useState<string>("ACTIVE");

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

  return (
    <div className="mx-auto mt-50 w-1000 text-center">
      <p className="mb-30 text-24">헌혈 사실 확인 요청</p>
      <TabBtn
        width={500}
        height={70}
        fontSize={20}
        isSelected={!isActive}
        children={"승인 대기"}
        onClick={changeTab}
      />
      <TabBtn
        width={500}
        height={70}
        fontSize={20}
        isSelected={isActive}
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
          <div className="flex h-70 w-1000 justify-between text-center">
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
