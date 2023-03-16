import CommonBtn from "@/components/Button/CommonBtn";

// 헤더 닫았다고 말하기
export default function RedCrossPublishPage() {
  const publishNFT = () => {
    console.log("발행하기");
  };

  return (
    <div className="mx-auto mt-50 w-1000 text-center text-20 leading-50">
      <p className="text-24">헌혈증 NFT 발급</p>
      <div className="mx-auto mt-30 mb-40 w-650">
        <div className="my-20 flex justify-between">
          <label htmlFor="name">이름</label>
          <input
            type="text"
            id="name"
            className="h-50 w-500 rounded-30 border-1 border-pen-0 px-30 text-18"
          />
        </div>
        <div className="my-20 flex justify-between ">
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
              className="m-10 w-20"
            />
          </div>
        </div>
        <div className="my-20 flex justify-between">
          <label htmlFor="bloodType">헌혈 종류</label>
          <div className="flex w-500 justify-start">
            <input
              type="radio"
              value="whole"
              id="whole"
              name="bloodType"
              className="hidden"
            />
            <label
              htmlFor="whole"
              className="inline-block h-45 w-100 border-3 border-[#FFBBC7] bg-red-1 text-18 font-light leading-40 text-white"
            >
              전혈
            </label>
            <input
              type="radio"
              value="plasma"
              id="plasma"
              name="bloodType"
              className="hidden"
            />
            <label
              htmlFor="plasma"
              className="inline-block h-45 w-100 border-t-3 border-b-3 border-[#FFBBC7] bg-red-1 text-18 font-light leading-40 text-white"
            >
              혈장
            </label>
            <input
              type="radio"
              value="platelets"
              id="platelets"
              className="hidden"
              name="bloodType"
            />
            <label
              htmlFor="platelets"
              className="inline-block h-45 w-100 border-3 border-[#FFBBC7] bg-red-1 text-18 font-light leading-40 text-white"
            >
              혈소판
            </label>
          </div>
        </div>
        <div className="my-20 flex justify-between ">
          <label htmlFor="wallet">지갑 주소</label>
          <input
            type="text"
            id="wallet"
            className="h-50 w-500 rounded-30 border-1 border-pen-0 px-30 text-18"
          />
        </div>
        <div className="my-20 flex justify-between ">
          <label htmlFor="birth">생년월일</label>
          <input
            type="date"
            id="birth"
            className="h-50 w-500 rounded-30 border-1 border-pen-0 px-30 text-18"
          />
        </div>
        <div className="my-20 flex justify-between ">
          <label htmlFor="date">발행일</label>
          <input
            type="date"
            id="date"
            className="h-50 w-500 rounded-30 border-1 border-pen-0 px-30 text-18"
          />
        </div>
        <div className="my-20 flex justify-between ">
          <label htmlFor="place">혈액원 명</label>
          <input
            type="text"
            id="place"
            className="h-50 w-500 rounded-30 border-1 border-pen-0 px-30 text-18"
          />
        </div>
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
