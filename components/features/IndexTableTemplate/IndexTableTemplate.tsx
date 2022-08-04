import { SearchIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import { Input } from "postcss";
import React, { FC, useEffect, useState } from "react";
import { useSWRConfig } from "swr";
import { Installation } from "../../../models/Installation";
import { SlugName } from "../../../models/types/SlugName";
import { ImpiantiMapper } from "../../../utils/ImpiantiMapper";
import InputFilterSearch from "../../core/InputFilterSearch";
import Loader from "../../core/Loader";
import Pagination from "../../shared/Pagination/Pagination";

interface IndexTableTemplateProps {
  Table: React.ComponentType<any>;
  useFetch: any;
  title: string;
  slugName: SlugName;
  mpApiAction: any;
  isFilterableByUser?: boolean;
  queryParams?: any;
  children?: React.ReactNode;
}

const numberOfItemsPerPageList = [10, 20, 30, 40, 50];

const IndexTableTemplate: FC<IndexTableTemplateProps> = ({
  title,
  isFilterableByUser = false,
  mpApiAction,
  Table,
  slugName,
  useFetch,
  queryParams,
  children,
}) => {
  /* TABLE RECORDS */
  const [items, setItems] = useState<any>([]);

  /* PAGINATE */
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(numberOfItemsPerPageList[0]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  /* FILTER */
  const [filter, setFilter] = useState("");

  const router = useRouter();
  const { mutate } = useSWRConfig();

  const { data, error } = useFetch({ page, limit: itemsPerPage, query: filter, ...queryParams });

  // console.log(`Data from mpApi ${slugName}`, data);

  const handlePageChanged = (page: number) => {
    setPage(page + 1);
  };

  useEffect(() => {
    if (data) {
      data.content ? setItems(data.content) : setItems([]);
      setTotalItems(data.totalItems);
      setTotalPages(data.totalPages);
    }
    console.log("data", data);
  }, [data]);

  const onEdit = (item: any) => {
    if (item instanceof Installation) {
      const type = item.categoriaImpianto.nome;
      console.log("type", type);
      if (type) {
        router.push(`/${slugName}/${ImpiantiMapper[type]}/edit?id=${item.id}`);
      }
    } else {
      router.push(`/${slugName}/edit?id=${item.id}`);
    }
  };

  return (
    <div className="space-y-8 px-4 sm:px-6 lg:px-8">
      <div className="h-10 gap-4 sm:flex sm:items-center">
        <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
        {!data && <Loader className="h-8 w-8" />}
      </div>

      {isFilterableByUser ? (
        <InputFilterSearch onChange={(e: any) => setFilter(e.target.value)} value={filter} placeholder="Filtra per Nome e Cognome" />
      ) : null}

      {/* FOR OTHER FILTERS */}
      {children}

      {!items.length && data ? (
        <div className="h-60 w-full">
          <p className="m-auto"> Non sono presenti elementi. </p>
        </div>
      ) : (
        <>
          <Table
            items={items}
            onEditAction={(item: any) => onEdit(item)}
            onDeleteAction={(item: any) =>
              mpApiAction.actions.delete(Number(item.id)).finally(() => mutate(mpApiAction.routes.list(page, itemsPerPage, filter)))
            }
          />

          <Pagination
            currentPage={page}
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
