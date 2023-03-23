import { MEMBER_SERVER_URL } from "@/utils/urls";
import axios from "axios";
import { useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";

const fetcher = () =>
  axios.get(MEMBER_SERVER_URL + `/character`).then(({ data }) => data.data);

const useCharacterQuery = () => {
  return useQuery(queryKeys.MEMBER_STARTING_CHARACTER, () => fetcher());
};

export default useCharacterQuery;
