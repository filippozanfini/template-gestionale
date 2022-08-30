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
        forcePage={currentPage - 1}
        previousLabel={
          <button disabled={currentPage === 1} className={["cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"].join(" ")}>
            <ChevronLeftIcon className="h-6 w-6" />
          </button>
        }
        previousLinkClassName={`h-10 w-10 flex justify-center  border-gray-300 items-center hover:bg-gray-100 hover:rounded-l-md `}
        nextLabel={
          <button
            disabled={currentPage === totalPage}
            className={["cursor-pointer disabled:cursor-not-allowed disabled:opacity-60 "].join(" ")}
          >
            <ChevronRightIcon className="h-6 w-6 " />
          </button>
        }
        nextLinkClassName={`h-10 w-10 flex justify-center items-center hover:bg-gray-100 hover:rounded-r-md `}
        breakLabel={"..."}
        breakLinkClassName={"h-10 w-5 flex justify-center items-center rounded-full"}
        pageCount={totalPage}
        containerClassName="flex"
        className={["flex rounded-md border border-gray-300 bg-white text-center text-base font-semibold text-slate-600 shadow-lg"].join(
          " "
        )}
        onPageChange={({ selected }) => onPageChange(selected)}
        pageRangeDisplayed={3}
        marginPagesDisplayed={1}
        activeClassName={`bg-gray-800 hover:bg-gray-800 cursor-pointer text-white hover:bg-primary-700`}
        pageClassName={
          "w-10 h-10 flex justify-center border-x hover:bg-gray-100 cursor-pointer border-gray-300 items-center hover text-center text-base font-semibold  "
        }
        pageLinkClassName="w-full h-full flex items-center justify-center"
      />
    </div>
  );
};

export default Pagination;
