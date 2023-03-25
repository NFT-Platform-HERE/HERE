import { MEMBER_SERVER_URL } from "@/utils/urls";
import axios from "axios";
import { useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";

const fetcher = (email: string) =>
  axios
    .get(MEMBER_SERVER_URL + `/member/search/${email}`)
    .then(({ data }) => data);

const useSearchEmailQuery = (email: string) => {
  return useQuery(queryKeys.SEARCH_EMAIL, () => fetcher(email));
};

export default useSearchEmailQuery;
