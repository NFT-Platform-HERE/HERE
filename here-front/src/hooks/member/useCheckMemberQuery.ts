import { MEMBER_SERVER_URL } from "@/utils/urls";
import axios from "axios";
import { useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";
import { useRouter } from "next/router";

const fetcher = (walletAddress: string) =>
  axios
    .get(MEMBER_SERVER_URL + `/member/find/${walletAddress}`)
    .then(({ data }) => data);

const useCheckMemberQuery = (walletAddress: string) => {
  const router = useRouter();

  return useQuery(
    [queryKeys.MEMBER_CHECK, walletAddress],
    () => fetcher(walletAddress),
    {
      enabled: !!walletAddress,
      onSuccess: (data) => {
        if (data.status === "HERE_NOT_SUCCESS_FIND_MEMBER") {
          router.push("/member");
        }
      },
    },
  );
};

export default useCheckMemberQuery;