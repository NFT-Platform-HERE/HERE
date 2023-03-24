import { AbstractConnector } from "@web3-react/abstract-connector";

interface Iprops {
  account: string | null | undefined;
  active: boolean;
  deactivate: () => void;
}

export const unConnectWallet = ({ account, active, deactivate }: Iprops) => {
  if (active && account) {
    // 이미 연결되어있는 상태면 연결해제 함수 호출
    try {
      console.log("hi");
      deactivate();
      console.log("hello");
    } catch (e) {
      console.log(e);
    }
  }
};
