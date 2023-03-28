import { DONATE_SERVER_URL } from "@/utils/urls";
import { useMutation } from "react-query";
import axios from "axios";
import { DonationWrite } from "@/types/DonationWrite";

const fetcher = (payload: DonationWrite) =>
  axios
    .post(DONATE_SERVER_URL + `/board`, {
      memberId: payload.memberId,
      title: payload.title,
      content: payload.content,
      deadline: payload.deadline,
      goalQuantity: payload.goalQuantity,
      imgUrlList: payload.imgUrlList,
    })
    .then(({ data }) => data);

const useDonateWriteQuery = () => {
  return useMutation(fetcher, {
    onSuccess: (data) => {
      console.log("성공!");
    },
    onError: () => {
      console.log("onERROR");
    },
  });
};

export default useDonateWriteQuery;
