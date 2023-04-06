import { NOTIFICATION_SERVER_URL } from "@/utils/urls";
import axios from "axios";
import { useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";

const fetcher = (memberId: string) =>
  axios
    .get(NOTIFICATION_SERVER_URL + `/notification/${memberId}`)
    .then(({ data }) => data.data);

const useAlarmQuery = (memberId: string, openAlarmModal: boolean) => {
  return useQuery(
    [queryKeys.ALARM_LIST, memberId, openAlarmModal],
    () => fetcher(memberId),
    {
      enabled: !!memberId && !!openAlarmModal,
      refetchOnWindowFocus: false,
    },
  );
};

export default useAlarmQuery;
