import Pagination from "react-js-pagination";
import {
  AiFillBackward,
  AiFillForward,
  AiFillCaretLeft,
  AiFillCaretRight,
} from "react-icons/ai";

interface Iprops {
  totalCount: number;
  postPerPage: number;
  pageRangeDisplayed: number;
  page: number;
  handlePageChange: (newPage: number) => void;
}

export default function Paging({
  totalCount,
  postPerPage,
  pageRangeDisplayed,
  page,
  handlePageChange,
}: Iprops) {
  return (
    <Pagination
      activePage={page}
      itemsCountPerPage={postPerPage}
      totalItemsCount={totalCount ? totalCount : 0}
      pageRangeDisplayed={pageRangeDisplayed}
      prevPageText={<AiFillCaretLeft className="inline-block text-22" />}
      nextPageText={<AiFillCaretRight className="inline-block text-22" />}
      firstPageText={<AiFillBackward className="inline-block text-26" />}
      lastPageText={<AiFillForward className="inline-block text-26" />}
      innerClass="mt-8 mx-auto h-40 leading-40 text-18 text-red-1 rounded-10 text-center" // ul 태그
      itemClass="inline-block w-50 border-1 border-pink-1 bg-pink-0" // 모든 li 태그
      activeClass="text-red-2 font-bold" // 현재 페이지 li 태그
      itemClassLast="rounded-r-10"
      itemClassFirst="rounded-l-10"
      onChange={(newPage: number) => handlePageChange(newPage)}
    />
  );
}
