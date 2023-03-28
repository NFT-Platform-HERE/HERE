import { DONATE_SERVER_URL } from "@/utils/urls";
import { useMutation } from "react-query";
import axios from "axios";
import { DonateBloodHistoryWrite } from "./../../types/DonateBloodHistoryWrite";

const fetcher = (payload: DonateBloodHistoryWrite) =>
  axios
    .patch(DONATE_SERVER_URL + `/board/bd-history`, {
      boardId: payload.boardId,
      quantity: payload.quantity,
      senderId: payload.senderId,
    })
    .then(({ data }) => data);

const useDonateBloodHistoryWriteQuery = () => {
  return useMutation(fetcher, {
    onSuccess: (data) => {
      console.log("성공!");
    },
    onError: () => {
      console.log("onERROR");
    },
  });
};

export default useDonateBloodHistoryWriteQuery;
