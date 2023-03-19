import CommonBtn from "@/components/Button/CommonBtn";
import { useState } from "react";
import Swal from "sweetalert2";

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

  const { name, sex, bloodType, wallet, birth, createdDate, place } = inputs;

  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const publishNFT = () => {
    console.log("발행하기");
  };

  const findWallet = () => {
    const title = "사용자 이메일을 입력해주세요";
    Swal.fire({
      title: <span className="text-10 font-semibold">${title}</span>,
      input: "email",
      inputAttributes: {
        autocapitalize: "off",
        inputBoxColor: "#FF8BA1",
      },
      width: "28rem",
      padding: "1rem",
      customClass: {
        title: "text-10",
        input: "w-100 h-100 border-2 border-black bg-red-2", // 안써짐.....
      },
      confirmButtonColor: "#FF8BA1",
      confirmButtonText: "검색하기",
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      console.log("result.value가 내가 아까 입력한 값", result.value);
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
          className="h-50 w-500 rounded-30 border-1 border-pen-0 px-30 text-18"
        />
      </div>
      <CommonBtn
        width={350}
        height={60}
        fontSize={20}
        children={"NFT 발행하기"}
        isDisabled={false}
        onClick={publishNFT}
      />
    </div>
  );
}
