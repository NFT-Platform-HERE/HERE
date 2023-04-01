import { useMutation } from "react-query";
import { verifyNFT } from "../blockchain/contracts";

interface Iprops {
  tokenId: number;
  hash: string;
}
const fetcher = (payload: Iprops) =>
  verifyNFT(payload.tokenId, payload.hash).then((data) => data);

const useBlockChainNftVerity = () => {
  return useMutation(fetcher, {
    onSuccess: (data) => {
      console.log("성공!");
    },
    onError: () => {
      console.log("onERROR");
    },
  });
};

export default useBlockChainNftVerity;
