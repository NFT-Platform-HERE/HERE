import { useEffect, useState } from "react";
import { Confirm } from "@/types/Confirm";

interface Iprops {
  confirmList: Confirm[];
}

export default function usePagination({ confirmList }: Iprops) {
  const [currentList, setCurrentList] = useState<Confirm[]>(confirmList);
  const [page, setPage] = useState<number>(1);

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const [postPerPage] = useState<number>(5);
  const indefOfLastPost = page * postPerPage;
  const indefOfFirstPost = indefOfLastPost - postPerPage;

  useEffect(() => {
    setCurrentList(confirmList?.slice(indefOfFirstPost, indefOfLastPost));
  }, [indefOfFirstPost, indefOfLastPost, page]);

  useEffect(() => {
    setPage(1);
  }, [confirmList]);

  return {
    page,
    currentList,
    postPerPage,
    handlePageChange,
  };
}
