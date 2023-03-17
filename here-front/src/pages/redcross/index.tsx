import CommonBtn from "@/components/Button/CommonBtn";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface publishedNFT {
  id: number;
  user: string;
  date: string;
}

const testList = [
  {
    id: 1,
    user: "이경택",
    date: "2023-02-12",
  },
  {
    id: 2,
    user: "이경택",
    date: "2023-02-12",
  },
  {
    id: 3,
    user: "이경택",
    date: "2023-02-12",
  },
  {
    id: 4,
    user: "이경택",
    date: "2023-02-12",
  },
];

// 페이지네이션은 FE-2003 merge 후 구현
export default function RedCrossPage() {
  const router = useRouter();
  const [nftList, setNftList] = useState<publishedNFT[]>([]);

  useEffect(() => {
    setNftList(testList);
  }, []);

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
        <p className="ml-40 inline-block w-100 text-18 font-medium leading-70">
          번호
        </p>
        <p className="inline-block w-100 text-18 font-medium leading-70">
          헌혈자
        </p>
        <p className="mr-[6rem] inline-block w-100 text-18 font-medium leading-70">
          발행일
        </p>
      </div>
      {nftList?.map((item) => (
        <div key={item.id}>
          <div className="flex h-70 w-1000 justify-between text-center">
            <p className="ml-40 inline-block w-100 font-light leading-70">
              {item.id}
            </p>
            <p className="inline-block w-100 font-light leading-70">
              {item.user}
            </p>
            <p className="mr-[6rem] inline-block w-100 font-light leading-70">
              {item.date}
            </p>
          </div>
          <hr />
        </div>
      ))}
    </div>
  );
}
