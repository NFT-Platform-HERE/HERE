import CommonBtn from "@/components/Button/CommonBtn";
import Paging from "@/components/Pagination/Paging";
import usePagination from "@/hooks/organization/usePagination";
import { Confirm } from "@/types/Confirm";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const testList = [
  {
    memberName: "이경택",
    createdDate: "2023-02-07",
  },
  {
    memberName: "이경택",
    createdDate: "2023-02-08",
  },
  {
    memberName: "이경택",
    createdDate: "2023-02-09",
  },
  {
    memberName: "이경택",
    createdDate: "2023-02-10",
  },
  {
    memberName: "이경택",
    createdDate: "2023-02-11",
  },
  {
    memberName: "이경택",
    createdDate: "2023-02-12",
  },
  {
    memberName: "이경택",
    createdDate: "2023-02-13",
  },
];

// 페이지네이션은 FE-2003 merge 후 구현
export default function RedCrossPage() {
  const router = useRouter();
  const [nftList, setNftList] = useState<Confirm[]>(testList);

  useEffect(() => {
    setNftList(testList);
  }, []);

  const { page, currentList, postPerPage, handlePageChange } = usePagination({
    confirmList: nftList,
  });

  const moveToCreate = () => {
    console.log("이동");
    router.push("/redcross/publish");
  };
  return (
    <div className="mx-auto mt-50 w-1000 text-center">
      <p className="text-24">발행한 NFT 목록</p>
      <div className="-mt-20 h-60 w-1000 text-right">
        <CommonBtn
          width={160}
          height={50}
          fontSize={16}
          children={"NFT 발행하기"}
          isDisabled={false}
          onClick={moveToCreate}
        />
      </div>
      <div className="mx-auto flex h-70 w-1000 justify-between bg-pink-0 text-center">
        <p className="ml-40 mr-56 inline-block w-100 text-18 font-medium leading-70">
          번호
        </p>
        <p className="inline-block w-100 text-18 font-medium leading-70">
          헌혈자
        </p>
        <p className="mr-[6rem] inline-block w-100 text-18 font-medium leading-70">
          발행일
        </p>
      </div>
      {currentList?.map((item, idx) => (
        <div key={idx}>
          <div className="flex h-70 w-1000 justify-between text-center">
            <p className="ml-40 mr-56 inline-block w-100 font-light leading-70">
              {(page - 1) * postPerPage + idx + 1}
            </p>
            <p className="inline-block w-100 font-light leading-70">
              {item.memberName}
            </p>
            <p className="mr-[6rem] inline-block w-100 font-light leading-70">
              {item.createdDate}
            </p>
          </div>
          <hr />
        </div>
      ))}
      <Paging
        totalCount={nftList.length}
        page={page}
        postPerPage={postPerPage}
        pageRangeDisplayed={5}
        handlePageChange={(newPage: number) => handlePageChange(newPage)}
      />
    </div>
  );
}
