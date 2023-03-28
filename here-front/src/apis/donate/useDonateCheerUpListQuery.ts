import { DONATE_SERVER_URL } from "@/utils/urls";
import axios from "axios";
import { useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";

interface Iprops {
  boardId: number;
  memberId: string;
}

const fetcher = (boardId: number, memberId: string) =>
  axios
    .get(DONATE_SERVER_URL + `/board/msg/${boardId}/${memberId}`)
    .then(({ data }) => {
      const response = data.data;
      return response;
    });

const useDonateCheerUpListQuery = ({ boardId, memberId }: Iprops) => {
  return useQuery(
    queryKeys.DONATE_CHEER_UP_LIST,
    () => fetcher(boardId, memberId),
    {
      suspense: true,
    },
  );
};

export default useDonateCheerUpListQuery;
