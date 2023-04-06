import { DONATE_SERVER_URL } from "@/utils/urls";
import { useMutation } from "react-query";
import axios from "axios";
import { DonationBloodHistoryWrite } from "../../types/DonationBloodHistoryWrite";

const fetcher = (payload: DonationBloodHistoryWrite) =>
  axios
    .patch(DONATE_SERVER_URL + `/board/bd-history`, {
      boardId: payload.boardId,
      quantity: payload.quantity,
      senderId: payload.senderId,
    })
    .then(({ data }) => data);

const useDonateBloodHistoryWriteQuery = () => {
  return useMutation(fetcher, {});
};

export default useDonateBloodHistoryWriteQuery;
