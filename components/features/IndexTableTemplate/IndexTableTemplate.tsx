import { SearchIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSWRConfig } from "swr";
import { SlugName } from "../../../models/types/SlugName";
import Pagination from "../../shared/Pagination/Pagination";

interface IndexTableTemplateProps {
  Table: React.ComponentType<any>;
  useFetch: any;
  title: string;
  slugName: SlugName;
  mpApiAction: any;
  isFilterable?: boolean;
}

const numberOfItemsPerPageList = [10, 20, 30, 40, 50];

const IndexTableTemplate = ({ title, isFilterable = false, mpApiAction, Table, slugName, useFetch }: IndexTableTemplateProps) => {
  /* TABLE RECORDS */
  const [items, setItems] = useState<any>([]);

  /* PAGINATE */
  const [pageIndex, setPageIndex] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(numberOfItemsPerPageList[0]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  /* FILTER */
  const [filter, setFilter] = useState("");

  const router = useRouter();
  const { mutate } = useSWRConfig();

  const { data, error } = useFetch(pageIndex, itemsPerPage, filter);

  // console.log(`Data from mpApi ${slugName}`, data);

  const handlePageChanged = (page: number) => {
    setPageIndex(page + 1);
  };

  useEffect(() => {
    if (data) {
      data.content ? setItems(data.content) : setItems([]);
      setTotalItems(data.totalItems);
      setTotalPages(data.totalPages);
    }
  }, [data]);

  return (
    <div className="space-y-8 px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
      </div>

      {isFilterable ? (
        <div className="relative flex w-80 items-center justify-between gap-2 rounded-md bg-white  text-sm peer-focus:border-primary-600">
          <input
            className="peer w-full rounded-md border border-gray-300 bg-transparent py-1.5 pl-3 pr-9 outline-none focus:border-primary-600"
            placeholder="Cerca un cliente"
            value={filter}
            onChange={(e: any) => setFilter(e.target.value)}
          />
          <SearchIcon className="absolute right-3 h-4 w-4 text-gray-500 peer-focus:text-primary-600" />
        </div>
      ) : null}

      {!items.length ? (
        <div className="h-60 w-full">
          <p className="m-auto"> Non sono presenti elementi. </p>
        </div>
      ) : (
        <>
          <Table
            items={items}
            onEditAction={(item: any) => router.push(`/${slugName}/edit?id=${item.id}`)}
            onDeleteAction={(item: any) =>
              mpApiAction.actions.delete(Number(item.id)).finally(() => mutate(mpApiAction.routes.list(pageIndex, itemsPerPage, filter)))
            }
          />

          <Pagination
            currentPage={pageIndex}
            numberOfItems={itemsPerPage}
            totalItems={totalItems}
            totalPage={totalPages}
            showTotalPage={true}
            numberOfItemsPerPageList={numberOfItemsPerPageList}
            onPageChange={(page: number) => handlePageChanged(page)}
            onNumberOfItemsChange={(numberOfItems: number) => setItemsPerPage(numberOfItems)}
          />
        </>
      )}
    </div>
  );
};

export default IndexTableTemplate;
