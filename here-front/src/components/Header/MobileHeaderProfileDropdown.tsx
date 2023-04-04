import MobileAlarmModal from "@/features/Alarm/MobileAlarmModal";
import { closeMobileHeaderProfileDropdown } from "@/stores/header/mobileHeaderProfileDropdown";
import { deleteMemberInfo } from "@/stores/member/member";
import { RootState } from "@/stores/store";
import { unConnectWallet } from "@/utils/unConnectWallet";
import { useWeb3React } from "@web3-react/core";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export default function MobileHeaderProfileDropdown() {
  const dispatch = useDispatch();
  const { deactivate } = useWeb3React();

  const { nickname, characterImgUrl, memberId } = useSelector(
    (state: RootState) => state.member,
  );

  const Logout = () => {
    unConnectWallet({ memberId, deactivate });
    dispatch(deleteMemberInfo());
    dispatch(closeMobileHeaderProfileDropdown());
  };

  const [openAlarmModal, setOpenAlarmModal] = useState<boolean>(false);
  const openAlarm = () => {
    setOpenAlarmModal(!openAlarmModal);
  };
  return (
    <div className="flex h-250 w-full flex-col items-center justify-center bg-white shadow-sm">
      <div>
        <img
          src={characterImgUrl}
          className="mt-10 h-120 w-120 rounded-full"
        ></img>
      </div>
      <div className="mt-10 text-15">{nickname}</div>
      <div className="mt-10" onClick={openAlarm}>
        <img src="/icons/alarm.svg"></img>
      </div>
      {openAlarmModal && <MobileAlarmModal />}
      <div className="mt-10 text-15" onClick={Logout}>
        LOGOUT
      </div>
    </div>
  );
}
