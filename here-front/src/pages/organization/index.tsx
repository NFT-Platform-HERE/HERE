import TabBtn from "@/components/Button/TabBtn";
import Paging from "@/components/Pagination/Paging";
import { useEffect, useState } from "react";

interface Confirm {
  id: number;
  user: string;
  reason?: string;
  count?: number;
  date: string;
}

const testOne = [
  {
    id: 1,
    user: "이경택",
    reason: "공가",
    date: "2022-01-01",
  },
  {
    id: 2,
    user: "최규림",
    reason: "공가",
    date: "2022-01-01",
  },
  {
    id: 3,
    user: "최정온",
    reason: "예비군",
    date: "2022-01-01",
  },
  {
    id: 4,
    user: "이현구",
    reason: "봉사활동",
    date: "2022-01-01",
  },
  {
    id: 5,
    user: "조용현",
    reason: "공가",
    date: "2022-01-01",
  },
  {
    id: 6,
    user: "김도언",
    reason: "공가",
    date: "2022-01-01",
  },
];

const testTwo = [
  {
    id: 1,
    user: "김도언",
    reason: "대학입시 가산점",
    date: "2022-01-01",
  },
  {
    id: 2,
    user: "조용현",
    reason: "봉사활동",
    date: "2022-01-01",
  },
  {
    id: 3,
    user: "이현구",
    reason: "예비군",
    date: "2022-01-01",
  },
  {
    id: 4,
    user: "최정온",
    reason: "공가",
    date: "2022-01-01",
  },
  {
    id: 5,
    user: "최규림",
    reason: "봉사활동",
    date: "2022-01-01",
  },
  {
    id: 6,
    user: "이경택",
    reason: "공가",
    date: "2022-01-01",
  },
];

const testThree = [
  {
    id: 1,
    user: "이경택",
    count: 1,
    date: "2022-01-01",
  },
  {
    id: 2,
    user: "최규림",
    count: 2,
    date: "2022-01-01",
  },
  {
    id: 3,
    user: "최정온",
    count: 5,
    date: "2022-01-01",
  },
  {
    id: 4,
    user: "이현구",
    count: 1,
    date: "2022-01-01",
  },
  {
    id: 5,
    user: "조용현",
    count: 1,
    date: "2022-01-01",
  },
  {
    id: 6,
    user: "김도언",
    count: 1,
    date: "2022-01-01",
  },
];

export default function OrganizationPage() {
  const [isHospital] = useState<boolean>(false);

  const [isInactive, setIsInactive] = useState<boolean>(true);
  const [isActive, setIsActive] = useState<boolean>(false);

  const [confirmList, setConfirmList] = useState<Confirm[]>(testOne);
  const [currentList, setCurrentList] = useState<Confirm[]>(confirmList);
  const [page, setPage] = useState<number>(1);

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const [postPerPage] = useState<number>(5);
  const indefOfLastPost = page * postPerPage;
  const indefOfFirstPost = indefOfLastPost - postPerPage;

  useEffect(() => {
    setCurrentList(confirmList.slice(indefOfFirstPost, indefOfLastPost));
  }, [indefOfFirstPost, indefOfLastPost, page, confirmList]);

  useEffect(() => {
    setPage(1);
  }, [confirmList]);

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

  return (
    <div className="mx-auto mt-50 w-1000">
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
      {currentList.map((item) => (
        <div key={item.id}>
          <div className="flex h-70 w-1000 justify-between text-center">
            <p className="ml-40 inline-block w-100 font-light leading-70">
              {item.id}
            </p>
            <p className="inline-block w-100 font-light leading-70">
              {item.user}
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
              {item.date}
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
