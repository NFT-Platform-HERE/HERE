import { DONATE_SERVER_URL } from "@/utils/urls";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { DonationCheerUpUpdate } from "@/types/DonationCheerUpUpdate";
import * as queryKeys from "@/constants/queryKeys";

const fetcher = (payload: DonationCheerUpUpdate) =>
  axios
    .patch(DONATE_SERVER_URL + `/board/msg`, {
      boardId: payload.boardId,
      cheeringMsgId: payload.cheeringMsgId,
      memberId: payload.memberId,
    })
    .then(({ data }) => console.log(data));

const useDonateCheerUpUpdateQuery = () => {
  const queryClient = useQueryClient();
  return useMutation(fetcher, {
    onSuccess: (data) => {
      console.log("성공!", data);
      return queryClient.invalidateQueries(queryKeys.DONATE_CHEER_UP_LIST);
    },
    onError: () => {
      console.log("onERROR");
    },
  });
};

export default useDonateCheerUpUpdateQuery;
