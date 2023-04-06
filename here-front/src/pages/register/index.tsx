import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { QrScanner } from "@yudiel/react-qr-scanner";
import CommonBtn from "@/components/Button/CommonBtn";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import useRegisterPaperNftQuery from "@/apis/register/useRegisterPaperNftQuery";
import { makeJsonMetaData, randomFromZeroToN } from "@/utils/utils";
import { NFT_IMAGE_URL_LIST } from "@/constants/blockchain";
import { sendIpfs } from "@/apis/blockchain/ipfs";
import { BlockChainMint } from "@/types/BlockChainMint";
import { getHashValue } from "@/apis/blockchain/contracts";
import useNftMint from "@/apis/redcross/useNftMint";
import useBlockChainNftMint from "@/apis/redcross/useBlockChainNftMint";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import withReactContent from "sweetalert2-react-content";
import RedCrossLoadingModal from "@/features/RedCross/RedCrossLoadingModal";
import {
  Blood,
  GenderType,
  RhType,
  BloodType,
  NftType,
} from "@/enum/statusType";
import { Mint } from "@/types/Mint";

const MySwal = withReactContent(Swal);

export default function RegisterPage() {
  const [serialNumber, setSerialNumber] = useState<string>("");
  const [openModal, setOpenModal] = useState<boolean>(false);
  const router = useRouter();

  const mutation = useNftMint();

  const blockChainMutation = useBlockChainNftMint();

  const { memberId } = useSelector((state: RootState) => state.member);

  const { refetch } = useRegisterPaperNftQuery(memberId, serialNumber);

  const [opendLoadingModal, setOpendLoadingModal] = useState<boolean>(false);

  const errorHandler = (message: string) => {
    setOpendLoadingModal(false);
    failMint();
    return;
  };

  function makeMetaDataAgency(data: any, mintImageURL: string) {
    return {
      name: data.name,
      rhType: data.rhType,
      blood: data.blood,
      bloodAmount: data.bloodVolume,
      gender: data.genderType,
      type: data.bloodType,
      walletAddress: data.walletAddress,
      birth: data.birth,
      createdDate: data.bdDate,
      place: data.place,
      imageURL: mintImageURL,
      nftType: NftType.AGENCY,
    };
  }

  function makeMetaDataHospital(data: any, mintImageURL: string) {
    return {
      name: data.name,
      rhType: data.rhType,
      blood: data.blood,
      bloodAmount: data.bloodVolume,
      gender: data.genderType,
      type: data.bloodType,
      walletAddress: data.walletAddress,
      birth: data.birth,
      createdDate: data.bdDate,
      place: data.place,
      imageURL: mintImageURL,
      nftType: NftType.HOSPITAL,
    };
  }

  function makeAgencyPayload(
    agencyHashValue: string,
    mintImageURL: string,
    agencyTokenId: number,
    bloodType: string,
    place: string,
  ) {
    const agencyPayload: Mint = {
      bdType: bloodType,
      hashValue: agencyHashValue,
      imgUrl: mintImageURL,
      issuerId: memberId,
      ownerId: memberId,
      place: place,
      tokenId: agencyTokenId,
      nftType: NftType.AGENCY,
    };

    return agencyPayload;
  }

  function makeHospitalPayload(
    hospitalHashValue: string,
    mintImageURL: string,
    hospitalTokenId: number,
    bloodType: string,
    place: string,
  ) {
    const agencyPayload: Mint = {
      bdType: bloodType,
      hashValue: hospitalHashValue,
      imgUrl: mintImageURL,
      issuerId: memberId,
      ownerId: memberId,
      place: place,
      tokenId: hospitalTokenId,
      nftType: NftType.HOSPITAL,
    };

    return agencyPayload;
  }

  function makeBlockChainMintPayload(
    ipfsResultAgencyUrl: string,
    ipfsResultHospitalUrl: string,
    wallet: string,
  ) {
    const mintPayload: BlockChainMint = {
      account: wallet,
      agencyTokenUrl: ipfsResultAgencyUrl,
      hospitalTokenUrl: ipfsResultHospitalUrl,
    };

    return mintPayload;
  }

  const registerPaper = async () => {
    const value = await refetch();
    const { data } = value;
    // console.log("value", value);
    console.log("data", data);

    //if(openModal)
    // router.push("/my-nft");

    // 랜덤 숫자 생성(0~12)
    const randomNumber = randomFromZeroToN(12);
    // 랜덤 이미지 선택
    const mintImageURL = NFT_IMAGE_URL_LIST[randomNumber];

    //기관용 메타데이터
    const metaInfoAgency = makeMetaDataAgency(data, mintImageURL);

    //병원용 메타데이터
    const metaInfoHospital = makeMetaDataHospital(data, mintImageURL);

    const jsonMetaDataAgency = makeJsonMetaData(metaInfoAgency);
    const jsonMetaDataHospital = makeJsonMetaData(metaInfoHospital);

    try {
      const ipfsResultAgencyUrl = await sendIpfs(jsonMetaDataAgency);
      const ipfsResultHospitalUrl = await sendIpfs(jsonMetaDataHospital);

      setOpendLoadingModal(true);

      const mintPayload = makeBlockChainMintPayload(
        ipfsResultAgencyUrl,
        ipfsResultHospitalUrl,
        data.walletAddress,
      );

      // 블록체인 네트워크에 저장
      const result = await blockChainMutation.mutateAsync(mintPayload);

      const agencyTokenId = result.events.Transfer[0].returnValues.tokenId;
      const hospitalTokenId = result.events.Transfer[1].returnValues.tokenId;

      const agencyHashValue = await getHashValue(agencyTokenId);
      const hospitalHashValue = await getHashValue(hospitalTokenId);

      const agencyPayload = makeAgencyPayload(
        agencyHashValue,
        mintImageURL,
        agencyTokenId,
        data.bloodType,
        data.place,
      );

      const hospitalPayload = makeHospitalPayload(
        hospitalHashValue,
        mintImageURL,
        hospitalTokenId,
        data.bloodType,
        data.place,
      );

      const agencyNftMintResult = await mutation.mutateAsync(agencyPayload);
      const hospitalNftMintResult = await mutation.mutateAsync(hospitalPayload);

      setOpendLoadingModal(false);
      successMint();
    } catch (error) {
      console.error("error", error);
      let message;
      if (error instanceof Error) message = error.message;
      else message = String(error);
      errorHandler(message);
    }
  };

  const successMint = () => {
    MySwal.fire({
      icon: "success",
      title: "헌혈증 NFT 발행 완료",

      showConfirmButton: false,
      timer: 1500,
    });
    setOpenModal(false);
    router.push("/my-nft");
  };

  const failMint = () => {
    MySwal.fire({
      icon: "error",
      title: "헌혈증 NFT 발행 실패",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const cancelRegister = () => {
    setSerialNumber("");
    setOpenModal(false);
  };

  const decode = (result: string) => {
    if (!openModal) {
      setSerialNumber(result);
    }
  };

  useEffect(() => {
    if (serialNumber) setOpenModal(true);
  }, [serialNumber]);

  return (
    <div className="flex w-full items-center justify-center mobile:h-[calc(100vh-60px)]">
      <div className="h-300 w-300 mobile:h-[100vw] mobile:w-full">
        <QrScanner
          onDecode={(result: string) => decode(result)}
          onError={(error) => console.log(error?.message)}
          containerStyle={{
            width: "100%",
            height: "100%",
          }}
          videoStyle={{ width: "100%", height: "100%" }}
        />
      </div>
      {openModal && (
        <div className="fixed top-[calc(50%-120px)] left-[calc(50%-150px)] z-30 rounded-20 border-2 border-red-2 bg-white">
          <div className="flex h-240 w-300 flex-col items-center justify-center">
            <div className="mb-30 text-18">등록하시겠습니까?</div>
            <div className="text-15">헌혈증 ID</div>
            <div className="text-15">{serialNumber}</div>
            <div className="mt-30 flex gap-20">
              <CommonBtn
                width={100}
                height={40}
                fontSize={15}
                isDisabled={false}
                onClick={registerPaper}
              >
                등록
              </CommonBtn>
              <CommonBtn
                width={100}
                height={40}
                fontSize={15}
                isDisabled={false}
                onClick={cancelRegister}
              >
                취소
              </CommonBtn>
            </div>
          </div>
        </div>
      )}
      {opendLoadingModal && <RedCrossLoadingModal />}
    </div>
  );
}
