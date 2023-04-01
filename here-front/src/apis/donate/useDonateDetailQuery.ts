import { DONATE_SERVER_URL } from "@/utils/urls";
import axios from "axios";
import { useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";

const fetcher = (boardId: number) =>
  axios.get(DONATE_SERVER_URL + `/board/${boardId}`).then(({ data }) => {
    const response = data.data;
    return response;
  });

const useDonateDetailQuery = (boardId: number) => {
  return useQuery([queryKeys.DONATE_DETAIL, boardId], () => fetcher(boardId), {
    suspense: true,
  });
};

export default useDonateDetailQuery;
