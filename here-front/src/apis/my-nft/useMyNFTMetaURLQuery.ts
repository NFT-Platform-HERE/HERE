import { useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";
import { callTokenURI } from "../blockchain/contracts";

const fetcher = (tokenId: number) =>
  callTokenURI(tokenId.toString()).then((data) => data);

const useMyNFTMetaURLQuery = (tokenId: number) => {
  return useQuery([queryKeys.MYNFT_META_URL, tokenId], () => fetcher(tokenId), {
    enabled: !!tokenId,
  });
};

export default useMyNFTMetaURLQuery;
