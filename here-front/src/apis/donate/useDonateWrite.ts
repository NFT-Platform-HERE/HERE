import { DONATE_SERVER_URL } from "@/utils/urls";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import * as queryKeys from "@/constants/queryKeys";
import useExpUpdate from "../member/useExpUpdate";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import withReactContent from "sweetalert2-react-content";
import { AxiosError } from "axios";

const config = {
  headers: { "Content-Type": "multipart/form-data" },
};

const MySwal = withReactContent(Swal);

const fetcher = (formData: FormData) =>
  axios
    .post(DONATE_SERVER_URL + `/board`, formData, config)
    .then(({ data }) => data);

const useDonateWrite = () => {
  const queryClient = useQueryClient();
  const { mutate } = useExpUpdate();
  const { memberId } = useSelector((state: RootState) => state.member);
  return useMutation(fetcher, {
    onSuccess: () => {
      const payload = {
        memberId,
        exp: 5,
      };
      mutate(payload);
      return queryClient.invalidateQueries([
        queryKeys.DONATE_LIST,
        queryKeys.DONATE_DEADLINE_LIST,
      ]);
    },
    onError: (error) => {
      console.log("error", error);
      let message;
      if (error instanceof AxiosError) {
        message = error.message;
        MySwal.fire({
          icon: "error",
          title: error.response!.data.error.message,
          showConfirmButton: false,
          timer: 2000,
          customClass: {
            title: "text-20 font-medium",
            popup: "w-440 h-260",
          },
        });
      } else message = String(error);
      console.log("message", message);
    },
  });
};

export default useDonateWrite;
