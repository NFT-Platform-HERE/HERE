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
  return useMutation(fetcher, {});
};

export default useBlockChainNftDonate;
