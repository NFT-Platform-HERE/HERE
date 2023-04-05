import useMemberInfoQuery from "@/apis/blood/useMemberInfoQuery";
import Lottie from "react-lottie-player";

interface Iprops {
  nftHistoryList: string[];
  memberId: string;
}

export default function DonateListModal({ nftHistoryList, memberId }: Iprops) {
  const info = useMemberInfoQuery(memberId);
  return (
    <div className="fixed left-[calc(50%-500px)] z-35 flex h-525 w-1000 items-center justify-center gap-50 rounded-20 bg-pink-0">
      <div className="relative flex h-276 w-170 flex-col">
        <img
          src={info.data && info.data.characterImgUrl}
          alt=""
          className="h-276 w-170 object-cover"
        />
        <div className="absolute bottom-0 h-80 w-170 bg-white py-15 px-30">
          <p className="text-16 font-medium">
            {info.data && info.data.nickname}
          </p>
          <p className="text-11">Level. {info.data && info.data.level}</p>
        </div>
      </div>
      <Lottie
        loop
        path="/lottieJson/arrow-right.json"
        play
        style={{ width: 100, height: 50 }}
      />
      <div className="relative flex h-276 w-170 flex-col">
        <img
          src={info.data && info.data.characterImgUrl}
          alt=""
          className="h-276 w-170 object-cover"
        />
        <div className="absolute bottom-0 h-80 w-170 bg-white py-15 px-30">
          <p className="text-16 font-medium">
            {info.data && info.data.nickname}
          </p>
          <p className="text-11">Level. {info.data && info.data.level}</p>
        </div>
      </div>
      <Lottie
        loop
        path="/lottieJson/arrow-right.json"
        play
        style={{ width: 100, height: 50 }}
      />
      <img src="/icons/hospital.png" className="h-150 w-150" />
    </div>
  );
}
