import useMemberInfoQuery from "@/apis/blood/useMemberInfoQuery";
import { RootState } from "@/stores/store";
import { useSelector } from "react-redux";

interface Iprops {
  senderId: string;
}

export default function MemberCard({ senderId }: Iprops) {
  const info = useMemberInfoQuery(senderId);

  return (
    <div className="fixed top-[50%] left-[50%] z-22 h-325 w-200 translate-y-[-50%] translate-x-[-50%]">
      <img
        src={info.data.characterImgUrl}
        alt=""
        className="h-325 w-200 object-cover"
      />
      <div className="absolute bottom-0 h-100 w-200 bg-white py-15 px-30">
        <p className="text-18 font-medium">{info.data.nickname}</p>
        <p className="text-12">Level. {info.data.level}</p>
      </div>
    </div>
  );
}
