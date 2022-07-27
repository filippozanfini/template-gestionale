import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import React, { useMemo } from "react";
import ReactPaginate from "react-paginate";
import ListBox from "../ListBox/ListBox";

interface PaginationProps {
  totalPage: number;
  totalItems: number;
  numberOfItems: number;
  currentPage: number;
  showTotalPage?: boolean;
  numberOfItemsPerPageList: number[];
  onPageChange: (page: number) => void;
  onNumberOfItemsChange: (itemsPerPage: number) => void;
}

const Pagination = ({
  currentPage,
  numberOfItems,
  showTotalPage = false,
  totalPage,
  totalItems,
  numberOfItemsPerPageList,
  onPageChange,
  onNumberOfItemsChange,
}: PaginationProps) => {
  return (
    <div className="flex items-center justify-between">
      {showTotalPage || onNumberOfItemsChange ? (
        <div className="flex items-center gap-4">
          {showTotalPage ? (
            <div className="mt-1 flex gap-4">
              <div className="flex items-center">
                <span className="text-sm">
                  Pagina {currentPage} di {totalPage}
                </span>
              </div>

              <div className="flex items-center">
                <span className="text-sm">Risultati totali {totalItems}</span>
              </div>
            </div>
          ) : null}

          {onNumberOfItemsChange ? (
            <ListBox
              listItems={numberOfItemsPerPageList}
              onChange={onNumberOfItemsChange}
              selected={numberOfItems}
              selectedName={`Mostra ${String(numberOfItems)}`}
            />
          ) : null}
        </div>
      ) : null}

      <ReactPaginate
        previousLabel={
          <button
            disabled={currentPage === 1}
            className={["cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"].join(" ")}
          >
            <ChevronLeftIcon className="h-6 w-6" />
          </button>
        }
        previousLinkClassName={`h-10 w-10 flex justify-center border-r border-gray-300 items-center hover:bg-gray-100 hover:rounded-l-md transition-all duration-300`}
        nextLabel={
          <button
            disabled={currentPage === totalPage}
            className={["cursor-pointer disabled:cursor-not-allowed disabled:opacity-60 "].join(" ")}
          >
            <ChevronRightIcon className="h-6 w-6 " />
          </button>
        }
        nextLinkClassName={`h-10 w-10 flex justify-center items-center hover:bg-gray-100 hover:rounded-r-md transition-all duration-300`}
        breakLabel={"..."}
        breakLinkClassName={"h-10 w-5 flex justify-center items-center rounded-full"}
        pageCount={totalPage}
        containerClassName="flex"
        className={[
          "flex  rounded-md border border-gray-300 bg-white text-center  text-base font-semibold text-slate-600 shadow transition-all duration-300 ",
        ].join(" ")}
        onPageChange={({ selected }) => onPageChange(selected)}
        pageRangeDisplayed={3}
        marginPagesDisplayed={1}
        activeClassName={`cursor-default bg-primary-800 text-white hover:bg-primary-700`}
        pageClassName={
          "h-10 w-10 flex justify-center border-r hover:bg-gray-100 border-gray-300 items-center hover  text-center text-base font-semibold transition-all duration-300 "
        }
      />
    </div>
  );
};

export default Pagination;
