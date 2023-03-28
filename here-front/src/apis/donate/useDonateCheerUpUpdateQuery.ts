import { DONATE_SERVER_URL } from "@/utils/urls";
import { useMutation } from "react-query";
import axios from "axios";
import { DonationCheerUpUpdate } from "@/types/DonationCheerUpUpdate";

const fetcher = (payload: DonationCheerUpUpdate) =>
  axios
    .patch(DONATE_SERVER_URL + `/board/msg`, {
      boardId: payload.boardId,
      cheeringMsgId: payload.cheeringMsgId,
      memberId: payload.memberId,
    })
    .then(({ data }) => data);

const useDonateCheerUpUpdateQuery = () => {
  return useMutation(fetcher, {
    onSuccess: (data) => {
      console.log("성공!");
    },
    onError: () => {
      console.log("onERROR");
    },
  });
};

export default useDonateCheerUpUpdateQuery;
