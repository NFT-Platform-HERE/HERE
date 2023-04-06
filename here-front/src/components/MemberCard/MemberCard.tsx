import useMemberInfoQuery from "@/apis/blood/useMemberInfoQuery";

interface Iprops {
  senderId: string;
}

export default function MemberCard({ senderId }: Iprops) {
  const info = useMemberInfoQuery(senderId);
  console.log(info);
  return (
    <div className="fixed top-[50%] left-[50%] z-50 h-325 w-200 translate-y-[-50%] translate-x-[-50%]">
      <img
        src={info.data && info.data.characterImgUrl}
        alt=""
        className="h-325 w-200 object-cover"
      />
      <div className="absolute bottom-0 h-100 w-200 bg-white py-15 px-30">
        <p className="text-18 font-medium">{info.data && info.data.nickname}</p>
        <p className="text-12">Level. {info.data && info.data.level}</p>
      </div>
    </div>
  );
}
