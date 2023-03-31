import CommonBtn from "@/components/Button/CommonBtn";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import withReactContent from "sweetalert2-react-content";
import { randomFromZeroToN, makeJsonMetaData } from "../../utils/utils";
import { NFT_IMAGE_URL_LIST } from "../../constants/blockchain";
import { sendIpfs } from "../../apis/blockchain/ipfs";
import { mintBloodNFT, getHashValue } from "../../apis/blockchain/contracts";
import RedCrossLoadingModal from "./../../features/RedCross/RedCrossLoadingModal";
import useSearchEmailQuery from "@/apis/redcross/useSearchEmailQuery";
import {
  Blood,
  BloodType,
  GenderType,
  NftType,
  RhType,
} from "@/enum/statusType";
import useNftMintQuery from "@/apis/redcross/useNftMintQuery";
import { Mint } from "@/types/Mint";

const MySwal = withReactContent(Swal);

interface memberInfo {
  memberId: string;
  walletAddress: string;
}

export default function RedCrossPublishPage() {
  const [inputs, setInputs] = useState({
    name: "",
    rhType: RhType.RHPLUS,
    bloodAmount: "",
    blood: Blood.A,
    sex: GenderType.MALE,
    bloodType: BloodType.WHOLE,
    wallet: "",
    birth: new Date().toISOString().substring(0, 10),
    createdDate: new Date().toISOString().substring(0, 10),
    place: "",
  });

  const [formValid, setFormValid] = useState(false);
  const [opendLoadingModal, setOpendLoadingModal] = useState<boolean>(false);

  const mutation = useNftMintQuery();

  const {
    blood,
    name,
    sex,
    bloodType,
    wallet,
    birth,
    createdDate,
    place,
    rhType,
    bloodAmount,
  } = inputs;

  const validateForm = () => {
    if (
      name.length > 0 &&
      bloodAmount.length > 0 &&
      sex.length > 0 &&
      bloodType.length > 0 &&
      wallet.length > 0 &&
      birth.length > 0 &&
      createdDate.length > 0 &&
      place.length > 0
    ) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  };

  useEffect(() => {
    validateForm();
  }, [inputs]);

  const handlePlaceInputKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.code === "Enter") {
      handleMint();
    }
  };

  function handleMint() {
    publishNFT();
  }

  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const errorHandler = (message: string) => {
    setOpendLoadingModal(false);
    failMint();
    return;
  };

  const publishNFT = async () => {
    //랜덤 숫자 생성(0~12)
    const randomNumber = randomFromZeroToN(12);
    // 랜덤 이미지 선택
    const mintImageURL = NFT_IMAGE_URL_LIST[randomNumber];

    //기관용 메타데이터
    const metaInfoAgency = {
      name: name.trim(),
      rhType: rhType,
      blood: blood,
      bloodAmount: bloodAmount.trim(),
      gender: sex,
      type: bloodType,
      walletAddress: wallet.trim(),
      birth: birth,
      createdDate: createdDate,
      place: place.trim(),
      imageURL: mintImageURL,
      nftType: NftType.AGENCY,
    };

    //병원용 메타데이터
    const metaInfoHospital = {
      name: name.trim(),
      rhType: rhType,
      blood: blood,
      bloodAmount: bloodAmount.trim(),
      gender: sex,
      type: bloodType,
      walletAddress: wallet.trim(),
      birth: birth,
      createdDate: createdDate,
      place: place.trim(),
      imageURL: mintImageURL,
      nftType: NftType.HOSPITAL,
    };

    const jsonMetaDataAgency = makeJsonMetaData(metaInfoAgency);
    const jsonMetaDataHospital = makeJsonMetaData(metaInfoHospital);

    try {
      const ipfsResultAgencyUrl = await sendIpfs(jsonMetaDataAgency);
      const ipfsResultHospitalUrl = await sendIpfs(jsonMetaDataHospital);

      setOpendLoadingModal(true);

      const result = await mintBloodNFT(
        wallet,
        ipfsResultAgencyUrl,
        ipfsResultHospitalUrl,
      );

      const agencyTokenId = result.events.Transfer[0].returnValues.tokenId;
      const hospitalTokenId = result.events.Transfer[1].returnValues.tokenId;

      const agencyHashValue = await getHashValue(agencyTokenId);
      const hospitalHashValue = await getHashValue(hospitalTokenId);

      const agencyPayload: Mint = {
        bdType: bloodType,
        hashValue: agencyHashValue,
        imgUrl: mintImageURL,
        issuerId: memberId,
        ownerId: memberId,
        place: place.trim(),
        tokenId: agencyTokenId,
        nftType: NftType.AGENCY,
      };

      const hospitalPayload: Mint = {
        bdType: bloodType,
        hashValue: hospitalHashValue,
        imgUrl: mintImageURL,
        issuerId: memberId,
        ownerId: memberId,
        place: place.trim(),
        tokenId: hospitalTokenId,
        nftType: NftType.HOSPITAL,
      };

      const agencyNftMintResult = await mutation.mutateAsync(agencyPayload);
      const hospitalNftMintResult = await mutation.mutateAsync(hospitalPayload);

      setOpendLoadingModal(false);
      successMint();
    } catch (error) {
      let message;
      if (error instanceof Error) message = error.message;
      else message = String(error);
      errorHandler(message);
    }
  };

  const [email, setEmail] = useState<string>("");

  const findWallet = () => {
    MySwal.fire({
      title: "사용자 이메일을 입력해주세요",
      input: "email",
      inputPlaceholder: "xxxxxxxx@xxx.com",
      inputAttributes: {
        autocapitalize: "off",
      },
      width: "28rem",
      padding: "1rem",
      customClass: {
        title: "text-20 font-medium",
        input: "focus:border-red-1 focus:border-0",
        confirmButton: "w-120 rounded-10 bg-red-1",
      },
      confirmButtonText: "검색하기",
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      setEmail(result.value);
    });
  };

  const successFindWallet = (data: memberInfo) => {
    setInputs({
      ...inputs,
      wallet: data.walletAddress,
    });
    setMemberId(data.memberId);
  };
  const failFindWallet = () => {
    MySwal.fire({
      icon: "error",
      title: "지갑 주소를 찾을 수 없습니다",
      showConfirmButton: false,
      timer: 2000,
      customClass: {
        title: "text-20 font-medium",
        popup: "w-440 h-260",
      },
    });
  };
  const memberInfo = useSearchEmailQuery({
    email,
    successFindWallet,
    failFindWallet,
  });

  const [memberId, setMemberId] = useState<string>("");

  const successMint = () => {
    MySwal.fire({
      icon: "success",
      title: "헌혈증 NFT 발행 완료",

      showConfirmButton: false,
      timer: 1500,
    });
  };

  const failMint = () => {
    MySwal.fire({
      icon: "error",
      title: "헌혈증 NFT 발행 실패",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className="mx-auto mt-40 w-1000 text-center text-20 leading-50">
      <p className="text-24">헌혈증 NFT 발급</p>
      <div className="my-20 mx-auto mt-30 flex w-650 justify-between">
        <label htmlFor="name">이름</label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={onChangeValue}
          className="h-50 w-500 rounded-30 border-1 border-pen-0 px-30 text-18"
        />
      </div>
      <div className="my-20 mx-auto flex w-650 justify-between">
        <label htmlFor="sex" className="text-20 leading-50">
          성별
        </label>
        <div className="flex w-500 justify-start">
          <label htmlFor="male" className="ml-20 text-18">
            남
          </label>
          <input
            type="radio"
            value={GenderType.MALE}
            id="male"
            checked={sex === GenderType.MALE}
            name="sex"
            onChange={onChangeValue}
            className="m-10 mr-30 w-20"
          />
          <label htmlFor="female" className="text-18">
            여
          </label>
          <input
            type="radio"
            value={GenderType.FEMALE}
            id="female"
            checked={sex === GenderType.FEMALE}
            name="sex"
            onChange={onChangeValue}
            className="focus:ring-rounded-10 m-10 w-20 cursor-pointer rounded-full border before:text-pink-500 checked:text-pink-500"
          />
        </div>
      </div>
      <div className="my-20 mx-auto flex w-650 justify-between">
        <label htmlFor="bloodType">헌혈 종류</label>
        <div className="flex w-500 justify-start">
          <div>
            <input
              type="radio"
              value={BloodType.WHOLE}
              checked={bloodType === BloodType.WHOLE}
              id="whole"
              name="bloodType"
              className="peer hidden"
              onChange={onChangeValue}
            />
            <label
              htmlFor="whole"
              className="inline-block h-45 w-100 cursor-pointer border-3 border-[#FFBBC7] bg-red-1 text-18 font-light leading-40 text-white peer-checked:bg-red-2 peer-checked:font-medium"
            >
              전혈
            </label>
          </div>
          <div>
            <input
              type="radio"
              value={BloodType.PLASMA}
              checked={bloodType === BloodType.PLASMA}
              id="plasma"
              name="bloodType"
              className="peer hidden"
              onChange={onChangeValue}
            />
            <label
              htmlFor="plasma"
              className="inline-block h-45 w-100 cursor-pointer border-t-3 border-b-3 border-[#FFBBC7] bg-red-1 text-18 font-light leading-40 text-white peer-checked:bg-red-2 peer-checked:font-medium"
            >
              혈장
            </label>
          </div>
          <div>
            <input
              type="radio"
              value={BloodType.PLATELETS}
              checked={bloodType === BloodType.PLATELETS}
              id="platelets"
              className="peer hidden"
              name="bloodType"
              onChange={onChangeValue}
            />
            <label
              htmlFor="platelets"
              className="inline-block h-45 w-100 cursor-pointer border-3 border-[#FFBBC7] bg-red-1 text-18 font-light leading-40 text-white peer-checked:bg-red-2 peer-checked:font-medium"
            >
              혈소판
            </label>
          </div>
        </div>
      </div>
      <div className="my-20 mx-auto flex w-650 justify-between">
        <label htmlFor="blood" className="text-20 leading-50">
          혈액형
        </label>
        <div className="flex w-500 justify-start">
          <label htmlFor="A" className="ml-20 text-18">
            A
          </label>
          <input
            type="radio"
            value={Blood.A}
            id="A"
            checked={blood === Blood.A}
            name="blood"
            onChange={onChangeValue}
            className="m-10 mr-30 w-20"
          />
          <label htmlFor="B" className="ml-20 text-18">
            B
          </label>
          <input
            type="radio"
            value={Blood.B}
            id="B"
            checked={blood === Blood.B}
            name="blood"
            onChange={onChangeValue}
            className="m-10 mr-30 w-20"
          />
          <label htmlFor="O" className="ml-20 text-18">
            O
          </label>
          <input
            type="radio"
            value={Blood.O}
            id="O"
            checked={blood === Blood.O}
            name="blood"
            onChange={onChangeValue}
            className="m-10 mr-30 w-20"
          />
          <label htmlFor="AB" className="ml-20 text-18">
            AB
          </label>
          <input
            type="radio"
            value={Blood.AB}
            id="AB"
            checked={blood === Blood.AB}
            name="blood"
            onChange={onChangeValue}
            className="focus:ring-rounded-10 m-10 w-20 cursor-pointer rounded-full border before:text-pink-500 checked:text-pink-500"
          />
        </div>
      </div>
      <div className="my-20 mx-auto flex w-650 justify-between">
        <label htmlFor="rhType" className="text-20 leading-50">
          RH식 혈액형
        </label>
        <div className="flex w-500 justify-start">
          <label htmlFor="rhplus" className="ml-20 text-18">
            Rh+
          </label>
          <input
            type="radio"
            value={RhType.RHPLUS}
            id="rhplus"
            checked={rhType === RhType.RHPLUS}
            name="rhType"
            onChange={onChangeValue}
            className="m-10 mr-30 w-20"
          />
          <label htmlFor="rhminus" className="text-18">
            Rh-
          </label>
          <input
            type="radio"
            value={RhType.RHMINUS}
            id="rhminus"
            checked={rhType === RhType.RHMINUS}
            name="rhType"
            onChange={onChangeValue}
            className="focus:ring-rounded-10 m-10 w-20 cursor-pointer rounded-full border before:text-pink-500 checked:text-pink-500"
          />
        </div>
      </div>
      <div className="my-20 mx-auto mt-30 flex w-650 justify-between">
        <label htmlFor="bloodAmount">헌혈량</label>
        <input
          type="text"
          id="bloodAmount"
          name="bloodAmount"
          value={bloodAmount}
          onChange={onChangeValue}
          className="h-50 w-500 rounded-30 border-1 border-pen-0 px-30 text-18"
        />
      </div>
      <div className="my-20 mx-auto flex w-900 justify-between pl-125">
        <div className="flex w-650 justify-between">
          <label htmlFor="wallet">지갑 주소</label>
          <input
            type="text"
            id="wallet"
            name="wallet"
            value={wallet}
            onChange={onChangeValue}
            readOnly
            className="h-50 w-500 rounded-30 border-1 border-pen-0 px-30 text-18"
          />
        </div>
        <CommonBtn
          width={110}
          height={40}
          fontSize={16}
          children={"가져오기"}
          isDisabled={false}
          onClick={findWallet}
        />
      </div>
      <div className="my-20 mx-auto flex w-650 justify-between">
        <label htmlFor="birth">생년월일</label>
        <input
          type="date"
          id="birth"
          name="birth"
          value={birth}
          onChange={onChangeValue}
          className="h-50 w-500 rounded-30 border-1 border-pen-0 px-30 text-18"
        />
      </div>
      <div className="my-20 mx-auto flex w-650 justify-between">
        <label htmlFor="date">발행일</label>
        <input
          type="date"
          id="date"
          name="createdDate"
          value={createdDate}
          onChange={onChangeValue}
          className="h-50 w-500 rounded-30 border-1 border-pen-0 px-30 text-18"
        />
      </div>
      <div className="my-20 mx-auto mb-40 flex w-650 justify-between ">
        <label htmlFor="place">혈액원 명</label>
        <input
          type="text"
          id="place"
          name="place"
          value={place}
          onChange={onChangeValue}
          onKeyDown={handlePlaceInputKeyDown}
          className="h-50 w-500 rounded-30 border-1 border-pen-0 px-30 text-18"
        />
      </div>
      <CommonBtn
        width={350}
        height={60}
        fontSize={20}
        children={"NFT 발행하기"}
        isDisabled={!formValid}
        onClick={handleMint}
      />
      {opendLoadingModal && <RedCrossLoadingModal />}
    </div>
  );
}
