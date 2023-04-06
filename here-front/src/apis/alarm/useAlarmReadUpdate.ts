import { NOTIFICATION_SERVER_URL } from "@/utils/urls";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import * as queryKeys from "@/constants/queryKeys";

interface Payload {
  memberId: string;
  notificationId: number;
}
const fetcher = (payload: Payload) =>
  axios
    .patch(NOTIFICATION_SERVER_URL + `/notification`, {
      memberId: payload.memberId,
      notificationId: payload.notificationId,
    })
    .then(({ data }) => data);

const useAlarmReadUpdate = () => {
  return useMutation(fetcher, {});
};

export default useAlarmReadUpdate;
