import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/solid";
import React from "react";
import ReactPaginate from "react-paginate";

interface PaginationProps {
  totalPage: number;
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, itemsPerPage, totalPage, totalItems, onPageChange }: PaginationProps) => {
  return (
    <ReactPaginate
      previousLabel={
        <button
          disabled={currentPage === 1}
          className={["cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"].join(" ")}
        >
          <ArrowLeftIcon className="h-7 w-7" />
        </button>
      }
      previousLinkClassName={`h-10 w-10 flex justify-center items-center rounded-full hover:scale-125 transition-all duration-300`}
      nextLabel={
        <button
          disabled={currentPage === totalPage}
          className={["cursor-pointer disabled:cursor-not-allowed disabled:opacity-60 "].join(" ")}
        >
          <ArrowRightIcon className="h-7 w-7 " />
        </button>
      }
      nextLinkClassName={`h-10 w-10 flex justify-center items-center rounded-full hover:scale-125 transition-all duration-300`}
      breakLabel={"..."}
      breakLinkClassName={"h-10 w-5 flex justify-center items-center rounded-full"}
      pageCount={totalPage}
      containerClassName="flex"
      className={["flex gap-1 rounded-full text-center text-xl font-semibold transition-all duration-300 "].join(" ")}
      onPageChange={({ selected }) => onPageChange(selected)}
      pageRangeDisplayed={3}
      marginPagesDisplayed={1}
      activeClassName={`cursor-default bg-opacity-20 `}
      pageClassName={
        "h-10 w-10 flex justify-center items-center rounded-full text-center text-xl font-semibold transition-all duration-300 "
      }
    />
  );
};

export default Pagination;
