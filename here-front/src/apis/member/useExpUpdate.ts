import { MEMBER_SERVER_URL } from "@/utils/urls";
import axios from "axios";
import { useMutation } from "react-query";

interface Payload {
  exp: number;
  memberId: string;
}
const fetcher = (payload: Payload) =>
  axios
    .patch(MEMBER_SERVER_URL + `/member/update/exp`, {
      exp: payload.exp,
      memberId: payload.memberId,
    })
    .then(({ data }) => data);

const useExpUpdate = () => {
  return useMutation(fetcher, {});
};

export default useExpUpdate;
