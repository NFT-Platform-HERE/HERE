import useBlockChainNftDonate from "@/apis/donate/useBlockChainNftDonate";
import useHospitalNFTSubmit from "@/apis/submit/useHospitalNFTSubmit";
import useSearchQuery from "@/apis/submit/useSearchQuery";
import Background from "@/components/Background/Background";
import CommonBtn from "@/components/Button/CommonBtn";
import { RootState } from "@/stores/store";
import { DonationNftList } from "@/types/DonationNftList";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "sweetalert2/dist/sweetalert2.min.css";
import SubmitHospitalLoadingModal from "./SubmitHospitalLoadingModal";

const MySwal = withReactContent(Swal);

interface Iprops {
  onClick: () => void;
}

export default function SubmitHospitalModal({ onClick }: Iprops) {
  const [searchInput, setSearchInput] = useState<string>("");
  const [hospital, setHospital] = useState<string>("");
  const [hospitalWalletAddress, setHospitalWalletAddress] =
    useState<string>("");

  const [opendLoadingModal, setOpendLoadingModal] = useState<boolean>(false);

  const { memberId, walletAddress } = useSelector(
    (state: RootState) => state.member,
  );

  const submitNFTList = useSelector((state: RootState) => {
    return state.submitSelectedHospitalNFT.selectedHospitalNFTInfoList;
  });

  const searchHospitalList = useSearchQuery("HOSPITAL", searchInput);

  const { mutate, isSuccess, isError } = useHospitalNFTSubmit();

  const mutation = useBlockChainNftDonate();

  const onChangeSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  function makeTokenIdList() {
    const tokenIdList: string[] = [];

    submitNFTList.forEach((value) => {
      tokenIdList.push(value.tokenId.toString());
    });

    return tokenIdList;
  }

  const onClickSubmit = async () => {
    setOpendLoadingModal(true);
    const tokenIdList = makeTokenIdList();

    const payload: DonationNftList = {
      myAccount: walletAddress,
      sendAccount: hospitalWalletAddress,
      tokenIdList: tokenIdList,
    };

    console.log("payload", payload);

    try {
      // 블록체인 네트워크 소유권 이전
      const blockResult = await mutation.mutateAsync(payload);

      // 백엔드 로직 처리
      mutate({
        agencyId: hospital,
        memberId: memberId,
        nftList: submitNFTList,
      });
    } catch (error) {
      setOpendLoadingModal(false);
      console.error("error", error);
    }
  };

  function handleHospitalListSelect(item: any) {
    console.log("handleHospitalListSelect", item);
    setHospital(item.agencyId);
    setHospitalWalletAddress(item.agencyWalletAddress);
  }

  useEffect(() => {
    if (isSuccess) {
      onClick();
      setOpendLoadingModal(false);
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
      setOpendLoadingModal(false);
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
              onClick={() => handleHospitalListSelect(item)}
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
          isDisabled={hospital.length == 0 ? true : false}
        >
          제출하기
        </CommonBtn>
      </div>
      {opendLoadingModal && <SubmitHospitalLoadingModal />}
    </div>
  );
}
