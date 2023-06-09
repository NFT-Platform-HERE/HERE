import { MEMBER_SERVER_URL } from "@/utils/urls";
import axios from "axios";
import { useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";

const fetcher = (memberId: string) =>
  axios
    .get(MEMBER_SERVER_URL + `/member/stamp/${memberId}`)
    .then(({ data }) => data.data);

const useStampQuery = (memberId: string) => {
  return useQuery([queryKeys.STAMP_INFO, memberId], () => fetcher(memberId), {
    enabled: !!memberId,
  });
};

export default useStampQuery;
