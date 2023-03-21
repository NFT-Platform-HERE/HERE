import { MEMBER_SERVER_URL } from "@/utils/urls";
import axios from "axios";
import { useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";

const fetcher = (walletAddress: string) =>
  axios
    .get(MEMBER_SERVER_URL + `/member/find/${walletAddress}`)
    .then(({ data }) => data);

const useCheckMemberQuery = (walletAddress: string) => {
  console.log("쿼리안", walletAddress);
  return useQuery(
    [queryKeys.MEMBER_CHECK, walletAddress],
    () => fetcher(walletAddress),
    { enabled: !!walletAddress },
  );
};

export default useCheckMemberQuery;
