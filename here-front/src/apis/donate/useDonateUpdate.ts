import { DONATE_SERVER_URL } from "@/utils/urls";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import withReactContent from "sweetalert2-react-content";
import * as queryKeys from "@/constants/queryKeys";
import { AxiosError } from "axios";

const config = {
  headers: { "Content-Type": "multipart/form-data" },
};

const MySwal = withReactContent(Swal);

const fetcher = (formData: FormData) =>
  axios
    .patch(DONATE_SERVER_URL + `/board/update`, formData, config)
    .then(({ data }) => data);

const useDonateUpdate = () => {
  const queryClient = useQueryClient();

  return useMutation(fetcher, {
    onSuccess: (data) => {
      return queryClient.invalidateQueries(queryKeys.DONATE_DETAIL);
    },
    onError: (error) => {
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
    },
  });
};

export default useDonateUpdate;
