import { NFT_SERVER_URL } from "@/utils/urls";
import axios from "axios";
import { useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";

const fetcher = (organ: string, memberId: string, status: string) =>
  axios
    .get(NFT_SERVER_URL + `/organ/${organ}/${memberId}/${status}`)
    .then(({ data }) => data);

const useOrganizationNFTListQuery = (
  organ: string,
  memberId: string,
  status: string,
) => {
  return useQuery([queryKeys.ORGANIZATION_NFT_LIST, memberId], () =>
    fetcher(organ, memberId, status),
  );
};

export default useOrganizationNFTListQuery;
