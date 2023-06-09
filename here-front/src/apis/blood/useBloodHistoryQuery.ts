import { MEMBER_SERVER_URL } from "@/utils/urls";
import axios from "axios";
import { useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";

const fetcher = (memberId: string) =>
  axios
    .get(MEMBER_SERVER_URL + `/bd/history/${memberId}`)
    .then(({ data }) => data.data);

const useBloodHistoryQuery = (memberId: string) => {
  return useQuery(
    [queryKeys.BLOOD_HISTORY, memberId],
    () => fetcher(memberId),
    {
      enabled: !!memberId,
    },
  );
};

export default useBloodHistoryQuery;
