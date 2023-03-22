import { MEMBER_SERVER_URL } from "@/utils/urls";
import axios from "axios";
import { useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";

const fetcher = (nickname: string) =>
  axios
    .get(MEMBER_SERVER_URL + `/member/check/nickname/${nickname}`)
    .then(({ data }) => data);

const useCheckMemberNicknameQuery = (nickname: string) => {
  return useQuery(
    [queryKeys.MEMBER_NICKNAME_CHECK, nickname],
    () => fetcher(nickname),
    {
      enabled: !!nickname,
      onSuccess: (data) => {
        console.log(data);
        // if (data.status === "HERE_NOT_SUCCESS_FIND_MEMBER") {

        // }
      },
      retry: false,
    },
  );
};

export default useCheckMemberNicknameQuery;
