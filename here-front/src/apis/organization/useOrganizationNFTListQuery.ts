import { NFT_SERVER_URL } from "@/utils/urls";
import axios from "axios";
import { useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";

const fetcher = (memberId: string, status: string) =>
  axios
    .get(NFT_SERVER_URL + `/organ/agency/${memberId}/${status}`)
    .then(({ data }) => data);

const useOrganizationNFTListQuery = (memberId: string, status: string) => {
  return useQuery(queryKeys.ORGANIZATION_NFT_LIST, () =>
    fetcher(memberId, status),
  );
};

export default useOrganizationNFTListQuery;
