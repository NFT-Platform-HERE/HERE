import { NFT_SERVER_URL } from "@/utils/urls";
import axios from "axios";
import { useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";

const fetcher = (memberId: string, organType: string) =>
  axios
    .get(NFT_SERVER_URL + `/nft/${memberId}/${organType}`)
    .then(({ data }) => data);

const useSubmitNFTListQuery = (memberId: string, organType: string) => {
  return useQuery(
    [queryKeys.SUBMIT_NFT_LIST, memberId, organType],
    () => fetcher(memberId, organType),
    {
      refetchOnWindowFocus: false,
    },
  );
};

export default useSubmitNFTListQuery;
