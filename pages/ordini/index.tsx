import { ReactElement, useState } from "react";
import InputFilterSearch from "../../components/core/InputFilterSearch";
import IndexTableTemplate from "../../components/features/IndexTableTemplate/IndexTableTemplate";
import TableOrders from "../../components/features/TableOrders";
import ListBox from "../../components/shared/ListBox/ListBox";
import SidebarLayout from "../../layouts/SidebarLayout";
import { mpApi, useOrders } from "../../lib/mpApi";
import { eOrderStatus, Order } from "../../models/Order";
import { NextPageWithLayout } from "../_app";

const IndiceOrdini: NextPageWithLayout = () => {
  /* FILTER BY STATUS */
  const [listFilterStatus, setListFilterStatus] = useState<any>(Order.getOrderStatus());
  const [filterStatusValue, setFilterStatusValue] = useState<string>("Vuoto");
  const [filterStatusSelectedKey, setFilterStatusSelectedKey] = useState<string>("");

  /* ORDER BY  */
  const [listOrderBy, setListOrderBy] = useState<any>(Order.getOrderBy());
  const [orderByValue, setOrderByValue] = useState<string>("Vuoto");
  const [orderBySelectedKey, setOrderBySelectedKey] = useState<string>("");

  const handleFilterOrderStatus = (value: string) => {
    const index = Object.values(listFilterStatus).indexOf(value);
    setFilterStatusValue(value);
    console.log(Object.keys(listFilterStatus)[index]);

    if (Object.keys(listFilterStatus)[index] === "vuoto") {
      setFilterStatusSelectedKey("");
    } else {
      setFilterStatusSelectedKey(Object.keys(listFilterStatus)[index]);
    }
  };

  const handleFilterOrderBy = (value: string) => {
    const index = Object.values(listOrderBy).indexOf(value);
    setOrderByValue(value);
    if (Object.keys(listOrderBy)[index] === "vuoto") {
      setOrderBySelectedKey("");
    } else {
      setOrderBySelectedKey(Object.keys(listOrderBy)[index]);
    }
  };

  return (
    <IndexTableTemplate
      title="Ordini"
      useFetch={useOrders}
      slugName="ordini"
      mpApiAction={mpApi.orders}
      Table={TableOrders}
      isFilterableByUser
      queryParams={{ status: filterStatusSelectedKey, orderBy: orderBySelectedKey }}
    >
      <div className="flex gap-16">
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-700">Filtra per stato:</span>
          <div className="z-50 w-48">
            <ListBox
              listItems={Object.values(listFilterStatus)}
              onChange={(value) => handleFilterOrderStatus(value)}
              selected={filterStatusValue}
              selectedName={filterStatusValue}
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-700">Ordina per:</span>
          <div className="z-50 w-48">
            <ListBox
              listItems={Object.values(listOrderBy)}
              onChange={(value) => handleFilterOrderBy(value)}
              selected={orderByValue}
              selectedName={orderByValue}
            />
          </div>
        </div>
      </div>
    </IndexTableTemplate>
  );
};

IndiceOrdini.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout title="Ordini">{page}</SidebarLayout>;
};

export default IndiceOrdini;
