import { NFT_SERVER_URL } from "@/utils/urls";
import axios from "axios";
import { useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";

const fetcher = () =>
  axios.get(NFT_SERVER_URL + `/organ/redcross`).then(({ data }) => data.data);

const useRedCrossNFTListQuery = () => {
  return useQuery(queryKeys.ORGANIZATION_NFT_LIST, () => fetcher(), {
    suspense: true,
  });
};

export default useRedCrossNFTListQuery;
