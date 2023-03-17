import TabBtn from "@/components/Button/TabBtn";
import Paging from "@/components/Pagination/Paging";
import usePagination from "@/hooks/organization/usePagination";
import { useState } from "react";
import { Confirm } from "@/types/Confirm";

const testOne = [
  {
    memberName: "이경택",
    reason: "공가",
    createdDate: "2022-01-01",
  },
  {
    memberName: "최규림",
    reason: "공가",
    createdDate: "2022-01-01",
  },
  {
    memberName: "최정온",
    reason: "예비군",
    createdDate: "2022-01-01",
  },
  {
    memberName: "이현구",
    reason: "봉사활동",
    createdDate: "2022-01-01",
  },
  {
    memberName: "조용현",
    reason: "공가",
    createdDate: "2022-01-01",
  },
  {
    memberName: "김도언",
    reason: "공가",
    createdDate: "2022-01-01",
  },
];

const testTwo = [
  {
    memberName: "김도언",
    reason: "대학입시 가산점",
    createdDate: "2022-01-01",
  },
  {
    memberName: "조용현",
    reason: "봉사활동",
    createdDate: "2022-01-01",
  },
  {
    memberName: "이현구",
    reason: "예비군",
    createdDate: "2022-01-01",
  },
  {
    memberName: "최정온",
    reason: "공가",
    createdDate: "2022-01-01",
  },
  {
    memberName: "최규림",
    reason: "봉사활동",
    createdDate: "2022-01-01",
  },
  {
    memberName: "이경택",
    reason: "공가",
    createdDate: "2022-01-01",
  },
];

const testThree = [
  {
    memberName: "이경택",
    count: 1,
    createdDate: "2022-01-01",
  },
  {
    memberName: "최규림",
    count: 2,
    createdDate: "2022-01-01",
  },
  {
    memberName: "최정온",
    count: 5,
    createdDate: "2022-01-01",
  },
  {
    memberName: "이현구",
    count: 1,
    createdDate: "2022-01-01",
  },
  {
    memberName: "조용현",
    count: 1,
    createdDate: "2022-01-01",
  },
  {
    memberName: "김도언",
    count: 1,
    createdDate: "2022-01-01",
  },
];

export default function OrganizationPage() {
  const [isHospital] = useState<boolean>(false);

  const [isInactive, setIsInactive] = useState<boolean>(true);
  const [isActive, setIsActive] = useState<boolean>(false);

  const [confirmList, setConfirmList] = useState<Confirm[]>(testOne);

  const changeTab = () => {
    setIsInactive(!isInactive);
    setIsActive(!isActive);
    if (isActive) {
      // 완료된 배열 불러오는 쿼리 요청
      setConfirmList(testOne);
    } else {
      // 대기중인 배열 불러오는 쿼리 요청
      setConfirmList(testTwo);
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
        isSelected={isInactive}
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
      {currentList.map((item, idx) => (
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
              {item.createdDate}
            </p>
          </div>
          <hr />
        </div>
      ))}
      <Paging
        totalCount={confirmList.length}
        page={page}
        postPerPage={postPerPage}
        pageRangeDisplayed={5}
        handlePageChange={(newPage: number) => handlePageChange(newPage)}
      />
    </div>
  );
}
