import useMemberInfoQuery from "@/apis/blood/useMemberInfoQuery";
import MemberCard from "@/components/MemberCard/MemberCard";
import { useEffect, useState } from "react";
import Lottie from "react-lottie-player";

interface Iprops {
  nftHistoryList: string[];
  memberId: string;
}

export default function DonateListModal({ nftHistoryList, memberId }: Iprops) {
  const [otherMembers, setOtherMembers] = useState<string[]>([]);
  const [otherMembersModal, setOtherMembersModal] = useState<boolean>(false);
  const [otherIndex, setOtherIndex] = useState<number>(0);
  const info = useMemberInfoQuery(memberId);
  const last_info = useMemberInfoQuery(
    nftHistoryList?.[nftHistoryList?.length - 1],
  );
  const otherInfo = useMemberInfoQuery(otherMembers?.[otherIndex]);

  const over3 = nftHistoryList.length >= 3;

  const onClickIndex = () => {
    if (otherIndex >= otherMembers.length - 1) {
      setOtherIndex(0);
    } else {
      setOtherIndex(otherIndex + 1);
    }
  };

  useEffect(() => {
    if (over3) {
      nftHistoryList?.map((item, index) => {
        if (index !== 0 && index !== nftHistoryList.length - 1) {
          setOtherMembers([...otherMembers, item]);
        }
      });
    }
  }, [over3]);

  return (
    <div className="fixed left-[calc(50%-650px)] top-[calc(50%-260px)] z-35 flex h-525 w-1300 items-center justify-center gap-40 rounded-20 bg-pink-0">
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
      {over3 && (
        <>
          <div className="relative">
            <div className="absolute top-10 left-10 h-30 w-150 rounded-10 bg-white text-center font-medium leading-30 text-red-2">
              기부 경로 추적
            </div>
            <Lottie
              loop
              path="/lottieJson/find-people.json"
              play
              style={{ width: 170, height: 276 }}
              className="cursor-pointer bg-pink-1"
              onClick={() => {
                setOtherMembersModal(!otherMembersModal);
                if (!otherMembersModal) onClickIndex();
              }}
            />
            <div
              className={
                (otherMembersModal
                  ? "visible translate-y-50 opacity-100 transition duration-500 "
                  : "invisible opacity-0 ") +
                "absolute top-0 -left-15 z-30 h-325 w-200"
              }
            >
              <img
                src={otherInfo?.data && otherInfo?.data.characterImgUrl}
                alt=""
                className="h-325 w-200 object-cover"
              />
              <div className="absolute bottom-0 h-100 w-200 bg-white py-15 px-30">
                <p className="text-18 font-medium">
                  {otherInfo?.data && otherInfo?.data.nickname}
                </p>
                <p className="text-12">
                  Level. {otherInfo?.data && otherInfo?.data.level}
                </p>
              </div>
            </div>
          </div>
          <Lottie
            loop
            path="/lottieJson/arrow-right.json"
            play
            style={{ width: 100, height: 50 }}
          />
        </>
      )}
      <div className="relative flex h-276 w-170 flex-col">
        <img
          src={last_info.data && last_info.data.characterImgUrl}
          alt=""
          className="h-276 w-170 object-cover"
        />
        <div className="absolute bottom-0 h-80 w-170 bg-white py-15 px-30">
          <p className="text-16 font-medium">
            {last_info.data && last_info.data.nickname}
          </p>
          <p className="text-11">
            Level. {last_info.data && last_info.data.level}
          </p>
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
