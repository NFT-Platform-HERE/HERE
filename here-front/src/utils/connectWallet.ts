import { InjectedConnector } from "@web3-react/injected-connector";
import { AbstractConnector } from "@web3-react/abstract-connector";

interface Iprops {
  account: string | null | undefined;
  active: boolean;
  activate: (
    connector: AbstractConnector,
    onError?: (error: Error) => void,
    throwErrors?: boolean,
  ) => Promise<void>;
  deactivate: () => void;
}

export const connectWallet = ({
  account,
  active,
  activate,
  deactivate,
}: Iprops) => {
  const Injected = new InjectedConnector({});
  if ((window as any).ethereum === undefined) {
    // 지갑이 설치 안되어있으면 설치 페이지를 오픈한다. 일단 메타마스크만.
    window.open(
      `https://metamask.app.link/dapp/${window.location.host}`,
      "_blank",
    );
    return;
  }
  if (active && account) {
    deactivate();
    // 이미 연결되어있는 상태면 연결해제 함수 호출
  }
  activate(Injected);
  // activate 함수로, App에서 만든 Injected란 이름의 connector 인스턴스를 넘겨준다
};
