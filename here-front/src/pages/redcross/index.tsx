import useRedCrossNFTListQuery from "@/apis/redcross/useRedCrossNFTListQuery";
import CommonBtn from "@/components/Button/CommonBtn";
import Paging from "@/components/Pagination/Paging";
import RedCrossNFTModal from "@/features/RedCross/RedCrossNFTModal";
import usePagination from "@/hooks/organization/usePagination";
import { CircularProgress } from "@mui/material";
import { useRouter } from "next/router";
import { Suspense, useState } from "react";

export default function RedCrossPage() {
  const router = useRouter();
  const nftList = useRedCrossNFTListQuery();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [nowToken, setNowToken] = useState<number>(0);

  const hanldleClick = (tokenId: number) => {
    setIsOpen(!isOpen);
    setNowToken(tokenId);
  };

  const { page, currentList, postPerPage, handlePageChange } = usePagination({
    confirmList: nftList?.data,
  });

  const moveToCreate = () => {
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
      <Suspense fallback={<CircularProgress />}>
        {currentList?.map((item, idx) => (
          <div key={idx}>
            <div
              onClick={() => hanldleClick(item.tokenId)}
              className="flex h-70 w-1000 cursor-pointer justify-between text-center "
            >
              <p className="ml-40 mr-56 inline-block w-100 font-light leading-70">
                {(page - 1) * postPerPage + idx + 1}
              </p>
              <p className="inline-block w-100 font-light leading-70">
                {item.memberName}
              </p>
              <p className="mr-[6rem] inline-block w-100 font-light leading-70">
                {item.createdDate.slice(0, 10)}
              </p>
            </div>
            {item.tokenId === nowToken && isOpen && (
              <RedCrossNFTModal tokenId={nowToken} onClick={hanldleClick} />
            )}
            <hr />
          </div>
        ))}
        <Paging
          totalCount={nftList.data?.length}
          page={page}
          postPerPage={postPerPage}
          pageRangeDisplayed={5}
          handlePageChange={(newPage: number) => handlePageChange(newPage)}
        />
      </Suspense>
    </div>
  );
}
