import { deleteMemberInfo } from "@/stores/member/member";
import { RootState } from "@/stores/store";
import { useWeb3React } from "@web3-react/core";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export default function useCheckLogin() {
  const { memberId } = useSelector((state: RootState) => state.member);
  const { account, active, activate, deactivate } = useWeb3React();

  useEffect(() => {
    if (memberId) {
      if (active && account) {
        return;
      } else {
        // dispatch(deleteMemberInfo);
      }
    }
  }, []);
}
