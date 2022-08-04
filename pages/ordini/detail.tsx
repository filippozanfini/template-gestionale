import { useRouter } from "next/router";
import React, { useState, useEffect, FC, ReactElement } from "react";
import SidebarLayout from "../../layouts/SidebarLayout";
import { mpApi } from "../../lib/mpApi";
import { Order } from "../../models/Order";
import EditClienti from "../clienti/edit";
import { NextPageWithLayout } from "../_app";

const DetailPage: NextPageWithLayout = () => {
  const [item, setItem] = useState<Order | null>();
  const { push, query } = useRouter();

  const loadItem = async (ItemId: number) => {
    if (ItemId === 0) {
      return null;
    } else {
      return mpApi.orders.actions
        .item(ItemId)
        .then((data: any) => {
          setItem(data);
        })
        .catch((data: any) => {
          setItem(null);
        });
    }
  };

  useEffect(() => {
    if (query.id) {
      const ItemId: number = Number(query.id);
      loadItem(ItemId);
    }
  }, [query]);

  console.log("ORDER", item);

  return (
    <div className="">
      <div className="mt-5 rounded-xl bg-white p-20">
        {item && (
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            <div className="flex items-center gap-2">
              <span className="text-gray-600"> Ordine n. </span>
              <span className="text-xl font-semibold tracking-wide text-gray-900">{item.id}</span>
            </div>
          </h3>
        )}
      </div>
    </div>
  );
};

DetailPage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout title="Dettaglio ordine">{page}</SidebarLayout>;
};
export default DetailPage;
