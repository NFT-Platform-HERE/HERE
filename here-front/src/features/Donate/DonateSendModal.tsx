import CommonBtn from "@/components/Button/CommonBtn";
import Background from "@/components/Background/Background";
import { useState } from "react";

import Lottie from "react-lottie-player";

import sendingHeart from "../../..//public/lottieJson/sending-heart.json";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import { MemberInfo } from "@/types/MemberInfo";
import useDonateNftCountQuery from "@/apis/donate/useDonateNftCountQuery";
import useDonateTokenIdListQuery from "./../../apis/donate/useDonateTokenIdListQuery";
import useBlockChainNftDonate from "./../../apis/donate/useBlockChainNftDonate";
import { DonationNftList } from "@/types/DonationNftList";
import useDonateNftWrite from "@/apis/donate/useDonateNftWrite";
import { DonationNft } from "@/types/DonationNft";

import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import withReactContent from "sweetalert2-react-content";
import DonateLoadingModal from "./DonateLoadingModal";

const MySwal = withReactContent(Swal);

interface Iprops {
  onClick: () => void;
  writerId: string;
  writerInfo: MemberInfo | undefined;
}

export default function DonateSendModal({
  onClick,
  writerId,
  writerInfo,
}: Iprops) {
  const [count, setCount] = useState<number>(1);

  const characterImgUrl = useSelector(
    (state: RootState) => state.member.characterImgUrl,
  );

  const myWalletAddress = useSelector(
    (state: RootState) => state.member.walletAddress,
  );
  const senderId = useSelector((state: RootState) => state.member.memberId);

  const maxCnt = useDonateNftCountQuery(senderId);

  const { refetch } = useDonateTokenIdListQuery(senderId, count);

  const mutation = useBlockChainNftDonate();

  const writeMutation = useDonateNftWrite();

  const [opendLoadingModal, setOpendLoadingModal] = useState<boolean>(false);


  function handleCountPlus() {
    if (count < maxCnt.data.cnt) {
      setCount(count + 1);
    }
  }

  function handleCountMinus() {
    if (count > 1) {
      setCount(count - 1);
    }
  }

  async function donateMyNftList() {
    setOpendLoadingModal(true);
    try {
      // 1. 기부 할 TokenIdList 가져오기
      const value = await refetch();
      const resultList = value.data;

      const tokenIdList: string[] = [];

      resultList.forEach((obj: any) => {
        tokenIdList.push(obj.tokenId);
      });

      if (writerInfo) {
        const payload: DonationNftList = {
          myAccount: myWalletAddress,
          sendAccount: writerInfo.walletAddress,
          tokenIdList: tokenIdList
        };

        const writePayload: DonationNft = {
          receiverId: writerId,
          senderId: senderId,
          nftTokenList: tokenIdList
        }

        // 블록체인 네트워크 소유권 이전
        const blockResult = await mutation.mutateAsync(payload);

        console.log("blockResult", blockResult);

        // 백엔드 소유권 이전
        const result = await writeMutation.mutateAsync(writePayload);

        console.log("backResult", result);

        // 백엔드 기부 내역 등록(보류)

        setOpendLoadingModal(false);
        onClick();
        successDonate();
      }
    } catch (error) {
      console.error("error", error);
      let message;
      if (error instanceof Error) message = error.message;
      else message = String(error);
      errorHandler(message);
    }
  }

  function handleSendButton() {
    donateMyNftList();
  }

  const errorHandler = (message: string) => {
    setOpendLoadingModal(false);
    failDonate();
    return;
  };

  const successDonate = () => {
    MySwal.fire({
      icon: "success",
      title: "헌혈증 NFT 기부 완료",

      showConfirmButton: false,
      timer: 1500,
    });
  };

  const failDonate = () => {
    MySwal.fire({
      icon: "error",
      title: "헌혈증 기부 실패",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div>
      <Background onClick={onClick} />
      <div className="fixed left-[50%] top-[50%] z-50 h-490 w-820 translate-x-[-50%] translate-y-[-50%] rounded-30 border-1 border-pen-0 bg-white text-center mobile:h-400 mobile:w-340">
        <div className="flex w-full flex-col items-center justify-center p-35">
          <div className="text-24 font-light text-pen-2">
            기부 할 헌혈증 NFT 수량을 입력하세요
          </div>
          <div className="my-20 flex justify-center">
            <img
              src={"/icons/minus-circle-button.svg"}
              onClick={handleCountMinus}
              className="h-70 w-70 mobile:h-45 mobile:w-45"
            />
            <div className="mx-20 h-70 w-15 text-18 font-normal leading-70 text-pen-2 mobile:h-45 mobile:leading-45">
              {count}
            </div>
            <img
              src={"/icons/add-circle-button.svg"}
              onClick={handleCountPlus}
              className="h-70 w-70 mobile:h-45 mobile:w-45"
            />
          </div>
          <div className="mb-25 flex w-full justify-around">
            <img
              src={characterImgUrl}
              className="mb-15 h-190 w-190 rounded-15 mobile:h-100 mobile:w-100"
            />
            <Lottie
              loop
              animationData={sendingHeart}
              play
              style={{ width: 167, height: 167 }}
            />
            <img
              src={writerInfo?.characterImgUrl}
              className="mb-15 h-190 w-190 rounded-15 mobile:h-100 mobile:w-100"
            />
          </div>
          <CommonBtn
            width={230}
            height={50}
            fontSize={18}
            children={"전송"}
            isDisabled={false}
            onClick={handleSendButton}
          />
        </div>
      </div>
      {opendLoadingModal && <DonateLoadingModal />}
    </div>
  );
}
