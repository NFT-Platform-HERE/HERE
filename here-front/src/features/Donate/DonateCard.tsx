import tw from "twin.macro";

interface Iprops {
  title: string;
  nickname: string;
  expirationTime: Date;
  danatePercent: number;
  representativeImageUrl: string;
  isCompleted: boolean;
  onClick: () => void;
}

export default function DonateCard() {
  return (
    <>
      <div className="border-neutral-200 relative h-[440px] w-[300px] overflow-hidden rounded-[30px] border bg-white">
        <p className="absolute left-[223px] top-[25px] text-center text-sm text-[#655f5f]">
          3일 남음
        </p>
        <p className="absolute left-[27px] top-[273px] w-[258px] text-left text-lg font-bold text-[#443b3b]">
          <span className="w-[258px] text-left text-lg font-bold text-[#443b3b]">
            엄마 수술을 앞두고 헌혈증이{" "}
          </span>
          <br />
          <span className="w-[258px] text-left text-lg font-bold text-[#443b3b]">
            필요해요
          </span>
        </p>
        <div
          className="absolute left-[27px] top-[369px] h-10 w-[249px]"
          style={{ filter: "drop-shadow(0px 4px 4px rgba(0,0,0,0.25))" }}
        >
          <div className="absolute left-[-1px] top-[-1px] h-10 w-[249px] rounded-[20px] bg-white" />
          <div className="absolute left-[-1px] top-[-1px] h-10 w-[62.25px] rounded-tl-[20px] rounded-bl-[20px] bg-[#ff5050]" />
          <p className="absolute left-[62.25px] top-1 h-[31px] w-[43.57px] text-center text-xl font-bold text-[#ff5050]">
            25%
          </p>
        </div>
        <p className="absolute left-[30px] top-[325px] text-left text-base text-[#868e96]/80">
          닉네임
        </p>
        {/* <img
          src="image-2.png"
          className="absolute left-[35px] top-[71px] h-[171px] w-[231px] object-cover"
        /> */}
      </div>
      ;
    </>
  );
}
