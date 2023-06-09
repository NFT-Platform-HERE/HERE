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
import router from "next/router";

export default function Header() {
  const dispatch = useDispatch();
  const memberId = useSelector((state: RootState) => state.member.memberId);
  const [walletAddress, setWalletAddress] = useState<string>("");
  const { account, active, activate, deactivate } = useWeb3React();

  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  const handleConnect = () => {
    connectWallet({ account, active, activate, deactivate });
  };

  useCheckMemberQuery(walletAddress);

  useEffect(() => {
    if (memberId) {
      if (active && account) {
        return;
      } else {
        connectWallet({ account, active, activate, deactivate });
      }
    }
  }, [active, account]);

  // useEffect(() => {
  //   if (memberId) {
  //     setWalletAddress("");
  //   }
  // }, [memberId]);

  useEffect(() => {
    if (account) {
      setWalletAddress(account);
      dispatch(getWalletAddress(account));
    }
  }, [account]);

  useEffect(() => {
    setIsDisabled(
      !(
        router.asPath !== "/organization" &&
        router.asPath !== "/redcross" &&
        router.asPath !== "/redcross/publish"
      ),
    );
  }, [router.asPath]);

  return (
    <div>
      {!isDisabled && (
        <div className="mobile:hidden">
          <WebHeader handleConnect={handleConnect} />
        </div>
      )}
      <div className="hidden mobile:block">
        <MobileHeader handleConnect={handleConnect} />
      </div>
    </div>
  );
}
