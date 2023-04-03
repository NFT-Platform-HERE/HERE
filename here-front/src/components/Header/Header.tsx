import useCheckMemberQuery from "@/apis/member/useCheckMemberQuery";
import { getWalletAddress } from "@/stores/member/member";
import { RootState } from "@/stores/store";
import { connectWallet } from "@/utils/connectWallet";
import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import MobileHeader from "./MobileHeader";
import WebHeader from "./WebHeader";

export default function Header() {
  const dispatch = useDispatch();
  const memberId = useSelector((state: RootState) => state.member.memberId);
  const [walletAddress, setWalletAddress] = useState<string>("");
  const { account, active, activate, deactivate } = useWeb3React();

  useEffect(() => {
    if (memberId) {
      if (active && account) {
        return;
      } else {
        connectWallet({ account, active, activate, deactivate });
      }
    }
  }, []);

  const handleConnect = () => {
    connectWallet({ account, active, activate, deactivate });
  };

  useCheckMemberQuery(walletAddress);

  useEffect(() => {
    if (memberId) {
      setWalletAddress("");
    }
  }, [memberId]);

  useEffect(() => {
    if (account) {
      setWalletAddress(account);
      dispatch(getWalletAddress(account));
    }
  }, [account]);

  return (
    <div>
      <div className="mobile:hidden">
        <WebHeader handleConnect={handleConnect} />
      </div>
      <div className="hidden mobile:block">
        <MobileHeader handleConnect={handleConnect} />
      </div>
    </div>
  );
}
