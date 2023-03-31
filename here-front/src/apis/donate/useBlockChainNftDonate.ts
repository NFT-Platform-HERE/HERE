import { DonationNftList } from "@/types/DonationNftList";
import { useMutation } from "react-query";
import { donateNFTList } from "../blockchain/contracts";

const fetcher = (payload: DonationNftList) =>
  donateNFTList(
    payload.myAccount,
    payload.sendAccount,
    payload.tokenIdList,
  ).then((data) => data);

const useBlockChainNftDonate = () => {
  return useMutation(fetcher, {
    onSuccess: (data) => {
      console.log("성공!");
    },
    onError: () => {
      console.log("onERROR");
    },
  });
};

export default useBlockChainNftDonate;
