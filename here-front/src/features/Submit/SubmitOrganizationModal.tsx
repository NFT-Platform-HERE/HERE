import useSearchQuery from "@/apis/submit/useSearchQuery";
import Background from "@/components/Background/Background";
import CommonBtn from "@/components/Button/CommonBtn";
import { useEffect, useState } from "react";

interface Iprops {
  onClick: () => void;
}

export default function SubmitOrganizationModal({ onClick }: Iprops) {
  const [searchInput, setSearchInput] = useState<string>("");
  const [purposeInput, setPurposeInput] = useState<string>("");
  const searchOrganizationList = useSearchQuery("AGENCY", searchInput);

  const onChangeSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const onChangePurposeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPurposeInput(e.target.value);
  };

  const onClickSubmit = () => {};

  return (
    <div>
      <Background onClick={onClick} />
      <div className="fixed top-[calc(50%-300px)] left-[calc(50%-300px)] z-30 flex h-629 w-624 flex-col gap-15 rounded-10 bg-white p-40">
        <div className="flex w-full justify-center text-24 font-semibold">
          기관에 제출하기
        </div>
        <div className="text-20">검색</div>
        <div className="flex w-full items-center overflow-hidden rounded-10 border-2 border-red-2 pl-10">
          <img src="/icons/search-icon.svg" className="h-25 w-25" />
          <input
            placeholder="제출할 기관의 이름을 입력하세요."
            className="h-54 w-full pl-10 focus:outline-none"
            onChange={onChangeSearchValue}
          />
        </div>

        <div className="h-182 w-full overflow-y-auto ">
          {searchOrganizationList?.data?.data?.map(
            (item: any, index: number) => (
              <div
                className={
                  (index == 0 ? "border-t-2 " : "") +
                  "h-54 w-full cursor-pointer border-x-2 border-b-2 border-red-2 pl-10 leading-50 hover:bg-pink-0"
                }
                key={index}
              >
                {item.agencyName}
              </div>
            ),
          )}
        </div>
        <div className="text-20">인증 사유</div>
        <input
          placeholder="인증 사유를 입력하세요."
          className="mb-10 h-54 w-full items-center rounded-10 border-2 border-red-2 pl-15 focus:outline-none"
          onChange={onChangePurposeValue}
        />
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
