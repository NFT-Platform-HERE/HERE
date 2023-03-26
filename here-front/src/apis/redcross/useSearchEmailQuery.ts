import { MEMBER_SERVER_URL } from "@/utils/urls";
import axios from "axios";
import { useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";

interface memberInfo {
  memberId: string;
  walletAddress: string;
}

interface Iprops {
  email: string;
  successFindWallet: (data: memberInfo) => void;
  failFindWallet: () => void;
}

const fetcher = (email: string) =>
  axios
    .get(MEMBER_SERVER_URL + `/member/search/${email}`)
    .then(({ data }) => data);

const useSearchEmailQuery = ({
  email,
  successFindWallet,
  failFindWallet,
}: Iprops) => {
  return useQuery(queryKeys.SEARCH_EMAIL, () => fetcher(email), {
    enabled: !!email,
    onSuccess: (data) => {
      successFindWallet(data.data);
    },
    onError: () => {
      failFindWallet();
    },
  });
};

export default useSearchEmailQuery;
