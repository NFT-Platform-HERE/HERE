import CommonBtn from "@/components/Button/CommonBtn";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import withReactContent from "sweetalert2-react-content";
import { randomFromZeroToN, makeJsonMetaData } from "../../utils/utils";
import { NFT_IMAGE_URL_LIST } from "../../constants/blockchain";
import { sendIpfs } from "../../apis/blockchain/ipfs";
import { mintBloodNFT } from "../../apis/blockchain/contracts";
import RedCrossLoadingModal from "./../../features/RedCross/RedCrossLoadingModal";

const MySwal = withReactContent(Swal);

export default function RedCrossPublishPage() {
  const [inputs, setInputs] = useState({
    name: "",
    sex: "",
    bloodType: "",
    wallet: "",
    birth: "",
    createdDate: new Date().toISOString().substring(0, 10),
    place: "",
  });

  const [formValid, setFormValid] = useState(false);
  const [opendLoadingModal, setOpendLoadingModal] = useState<boolean>(false);

  const { name, sex, bloodType, wallet, birth, createdDate, place } = inputs;

  const validateForm = () => {
    if (
      name.length > 0 &&
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

    const metaInfo = {
      name: name.trim(),
      gender: sex,
      type: bloodType,
      walletAddress: wallet.trim(),
      birth: birth,
      createdDate: createdDate,
      place: place.trim(),
      imageURL: mintImageURL,
    };

    const jsonMetaData = makeJsonMetaData(metaInfo);


    try {
      const ipfsResult = await sendIpfs(jsonMetaData);
 
      setOpendLoadingModal(true);

      mintBloodNFT(wallet, ipfsResult).then((data) => {
        setOpendLoadingModal(false);
        successMint();
      });
    } catch (error) {
      let message;
      if (error instanceof Error) message = error.message;
      else message = String(error);
      errorHandler(message);
    }
  };

  const findWallet = () => {
    const title = "사용자 이메일을 입력해주세요";
    MySwal.fire({
      title: <span className="text-20 font-medium">{title}</span>,
      input: "email",
      inputAttributes: {
        autocapitalize: "off",
      },
      width: "28rem",
      padding: "1rem",
      customClass: {
        container: "p-4 bg-gray-100 rounded-lg",
        title: "", // 얘는 왜 될까....
        input: "bg-red-1 text-white font-bold", // 안써짐.....
        confirmButton: "rounded-50 bg-red-1",
      },
      // confirmButtonColor: "#FF8BA1",
      confirmButtonText: "검색하기",
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      console.log("result.value가 내가 아까 입력한 값", result.value);
    });
  };

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
    <div className="mx-auto mt-50 w-1000 text-center text-20 leading-50">
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
            value="male"
            id="male"
            name="sex"
            onChange={onChangeValue}
            className="m-10 mr-30 w-20"
          />
          <label htmlFor="female" className="text-18">
            여
          </label>
          <input
            type="radio"
            value="female"
            id="female"
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
              value="whole"
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
              value="plasma"
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
              value="platelets"
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
      <div className="my-20 mx-auto flex w-900 justify-between pl-125">
        <div className="flex w-650 justify-between">
          <label htmlFor="wallet">지갑 주소</label>
          <input
            type="text"
            id="wallet"
            name="wallet"
            value={wallet}
            onChange={onChangeValue}
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
