import { MEMBER_SERVER_URL } from "@/utils/urls";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import * as queryKeys from "@/constants/queryKeys";

interface Payload {
  memberId: string;
  notificationId: number;
}
const fetcher = (payload: Payload) =>
  axios
    .patch(MEMBER_SERVER_URL + `/notification`, {
      memberId: payload.memberId,
      notificationId: payload.notificationId,
    })
    .then(({ data }) => data);

const useAlarmReadUpdate = () => {
  const queryClient = useQueryClient();
  return useMutation(fetcher, {
    onSuccess: (data) => {
      console.log("성공", data);
      queryClient.invalidateQueries([queryKeys.ALARM_LIST]);
    },
  });
};

export default useAlarmReadUpdate;
