import useHospitalNFTSubmit from "@/apis/submit/useHospitalNFTSubmit";
import useSearchQuery from "@/apis/submit/useSearchQuery";
import Background from "@/components/Background/Background";
import CommonBtn from "@/components/Button/CommonBtn";
import { RootState } from "@/stores/store";
import { useState } from "react";
import { useSelector } from "react-redux";

interface Iprops {
  onClick: () => void;
}

export default function SubmitHospitalModal({ onClick }: Iprops) {
  const [searchInput, setSearchInput] = useState<string>("");
  const [hospital, setHospital] = useState<string>("");

  const { memberId } = useSelector((state: RootState) => state.member);

  const submitNFTList = useSelector((state: RootState) => {
    return state.submitSelectedHospitalNFT.selectedHospitalNFTInfoList;
  });

  const searchHospitalList = useSearchQuery("HOSPITAL", searchInput);

  const { mutate } = useHospitalNFTSubmit();

  const onChangeSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const onClickSubmit = () => {
    mutate({
      agencyId: hospital,
      memberId: "ae4c93d4-67f0-4502-9a0c-04d003ce6f0c",
      nftList: submitNFTList,
    });
  };

  return (
    <div>
      <Background onClick={onClick} />
      <div className="fixed top-[calc(50%-300px)] left-[calc(50%-300px)] z-30 flex h-629 w-624 flex-col gap-15 rounded-10 bg-white p-40">
        <div className="flex w-full justify-center text-24 font-semibold">
          병원에 제출하기
        </div>
        <div className="text-20">검색</div>
        <div className="flex w-full items-center overflow-hidden rounded-10 border-2 border-red-2 pl-10">
          <img src="/icons/search-icon.svg" className="h-25 w-25" />
          <input
            placeholder="제출할 병원의 이름을 입력하세요."
            className="h-54 w-full pl-10 focus:outline-none"
            onChange={onChangeSearchValue}
          />
        </div>
        <div className="h-300 w-full overflow-y-auto border-2 border-red-2 scrollbar-thin scrollbar-track-pink-1 scrollbar-thumb-red-2">
          {searchHospitalList?.data?.data?.map((item: any, index: number) => (
            <div
              className={
                (index !== searchHospitalList?.data?.data?.length - 1 ||
                index < 5
                  ? "border-b-2 "
                  : "") +
                (item.agencyId === hospital
                  ? "bg-red-2 text-white hover:bg-red-2 "
                  : "hover:bg-pink-0 ") +
                "h-54 w-full cursor-pointer border-red-2 pl-10 leading-50"
              }
              key={index}
              onClick={() => setHospital(item.agencyId)}
            >
              {item.agencyName}
            </div>
          ))}
        </div>
        <CommonBtn
          width={544}
          height={60}
          fontSize={18}
          onClick={onClickSubmit}
          isDisabled={false}
        >
          제출하기
        </CommonBtn>
      </div>
    </div>
  );
}
