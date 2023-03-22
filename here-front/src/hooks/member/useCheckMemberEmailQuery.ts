import { MEMBER_SERVER_URL } from "@/utils/urls";
import axios from "axios";
import { useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";

const fetcher = (email: string) =>
  axios
    .get(MEMBER_SERVER_URL + `/member/check/email/${email}`)
    .then(({ data }) => data);

const useCheckMemberEmailQuery = (email: string) => {
  return useQuery([queryKeys.MEMBER_EMAIL_CHECK, email], () => fetcher(email), {
    enabled: !!email,
    onSuccess: (data) => {
      console.log(data);
      // if (data.status === "HERE_NOT_SUCCESS_FIND_MEMBER") {

      // }
    },
  });
};

export default useCheckMemberEmailQuery;
