import Background from "@/components/Background/Background";
import CommonBtn from "@/components/Button/CommonBtn";

interface Iprops {
  onClick: () => void;
}

export default function SubmitOrganizationModal({ onClick }: Iprops) {
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
            className="h-54 w-full pl-10 focus:outline-none "
          />
        </div>
        <div className="h-182 w-full"></div>
        <div className="text-20">인증 사유</div>
        <input
          placeholder="인증 사유를 입력하세요."
          className="mb-10 h-54 w-full items-center rounded-10 border-2 border-red-2 pl-15 focus:outline-none"
        />
        <CommonBtn
          width={544}
          height={60}
          fontSize={18}
          onClick={() => console.log("submit!")}
          isDisabled={false}
        >
          제출하기
        </CommonBtn>
      </div>
    </div>
  );
}
