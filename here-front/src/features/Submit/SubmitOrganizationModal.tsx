import useOrganizationNFTSubmit from "@/apis/submit/useOrganizationNFTSubmit";
import useSearchQuery from "@/apis/submit/useSearchQuery";
import Background from "@/components/Background/Background";
import CommonBtn from "@/components/Button/CommonBtn";
import { RootState } from "@/stores/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "sweetalert2/dist/sweetalert2.min.css";

const MySwal = withReactContent(Swal);

interface Iprops {
  onClick: () => void;
}

export default function SubmitOrganizationModal({ onClick }: Iprops) {
  const [searchInput, setSearchInput] = useState<string>("");
  const [purposeInput, setPurposeInput] = useState<string>("");
  const [organization, setOrganization] = useState<string>("");

  const { memberId } = useSelector((state: RootState) => state.member);

  const submitNFT = useSelector((state: RootState) => {
    return state.submitSelectedOrganizationNFT.selectedOrganizationNFTInfo;
  });

  const searchOrganizationList = useSearchQuery("AGENCY", searchInput);

  const { mutate, isSuccess, isError } = useOrganizationNFTSubmit();

  const onChangeSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const onChangePurposeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPurposeInput(e.target.value);
  };

  const onClickSubmit = () => {
    mutate({
      agencyId: organization,
      hashValue: submitNFT.hashValue,
      memberId: "ae4c93d4-67f0-4502-9a0c-04d003ce6f0c",
      reason: purposeInput,
      tokenId: submitNFT.tokenId,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      onClick();
      MySwal.fire({
        icon: "success",
        title: "헌혈증 NFT 제출 완료",

        showConfirmButton: false,
        timer: 1500,
      });
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      MySwal.fire({
        icon: "error",
        title: "헌혈증 NFT 제출 실패",

        showConfirmButton: false,
        timer: 1500,
      });
    }
  }, [isError]);

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

        <div className="h-182 w-full overflow-y-auto border-2 border-red-2 scrollbar-thin scrollbar-track-pink-1 scrollbar-thumb-red-2">
          {searchOrganizationList?.data?.data?.map(
            (item: any, index: number) => (
              <div
                className={
                  (index !== searchOrganizationList?.data?.data?.length - 1 ||
                  index < 3
                    ? "border-b-2 "
                    : "") +
                  (item.agencyId === organization
                    ? "bg-red-2 text-white hover:bg-red-2 "
                    : "hover:bg-pink-0 ") +
                  "h-54 w-full cursor-pointer border-red-2 pl-10 leading-50 hover:bg-pink-0 "
                }
                key={index}
                onClick={() => setOrganization(item.agencyId)}
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
