import { NOTIFICATION_SERVER_URL } from "@/utils/urls";
import axios from "axios";
import { useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";

const fetcher = (memberId: string) =>
  axios
    .get(NOTIFICATION_SERVER_URL + `/notification/${memberId}`)
    .then(({ data }) => data.data);

const useAlarmQuery = (memberId: string) => {
  return useQuery([queryKeys.ALARM_LIST, memberId], () => fetcher(memberId), {
    enabled: !!memberId,
    onSuccess: (data) => {
      console.log("알람 리스트 성공", data);
    },
  });
};

export default useAlarmQuery;
