import { RadioGroup } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/solid";
import React, { useEffect, useState } from "react";
import { mpApi } from "../../../lib/mpApi";
import { ICustomer } from "../../../models/Customer";

interface PackageProps {
  items: any;
  onValueIdImpiantoAndPacchetto: ({ idImpianto, idItem }: { idImpianto: string; idItem: string }) => void;
}

const mapCategories = (categories: any, id: any) => {
  const category = categories.find((c: any) => c.id === id);
  return category ? category.nome : "";
};

const Package = ({ items, onValueIdImpiantoAndPacchetto }: PackageProps) => {
  const [categories, setCategories] = useState<any>([]);

  const [selectedPackage, setSelectedPackage] = useState<any>(null);

  useEffect(() => {
    mpApi.categories.actions
      .items()
      .then((res: any) => {
        setCategories(res.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    console.log("items", items);
  }, [items]);

  useEffect(() => {
    if (selectedPackage) {
      const idImpianto = selectedPackage.split("-")[0];
      const idPacchetto = selectedPackage.split("-")[1];
      onValueIdImpiantoAndPacchetto({ idImpianto, idItem: idPacchetto });
    }
  }, [selectedPackage]);

  return items ? (
    <div className="flex flex-wrap gap-4">
      {items.map((item: any) => {
        return (
          <RadioGroup value={selectedPackage} onChange={setSelectedPackage}>
            <div key={item.impianto.id} className="rounded-md p-2 ">
              <RadioGroup.Label>
                <h2 className="text-xl font-semibold">{mapCategories(categories, item.impianto.categoriaImpianto)}</h2>
                <span className="text-sm text-gray-600">
                  Data Installazione: <strong> {item.impianto.dataInstallazione} </strong>
                </span>
              </RadioGroup.Label>
              <div className="my-4 grid grid-cols-2 gap-4">
                {item.listaPacchetti.map((p: any, index: number) => {
                  return (
                    <RadioGroup.Option
                      key={item.impianto.id + p.id}
                      value={item.impianto.id + "-" + p.id}
                      className="col-span-1 cursor-pointer"
                    >
                      {({ checked }) => (
                        <div
                          className={[
                            "flex h-full flex-col justify-between gap-4 rounded-md border-4 bg-white p-4 shadow-md transition-all duration-300 hover:-translate-y-1  hover:shadow-lg",
                            checked ? " border-primary-400 opacity-100" : "border-transparent opacity-80 ",
                          ].join(" ")}
                        >
                          <div className="space-y-4">
                            <div className="flex w-full items-center justify-between">
                              <h3 className="text-lg font-medium">{p.nome}</h3>
                              {p.novita ? <span className="rounded-full bg-primary-600 px-3 py-1 text-xs text-white">Novità </span> : null}
                            </div>
                            <p>{p.descrizione}</p>
                          </div>

                          <div className="flex h-10 items-center justify-between">
                            <p className="text-lg">
                              <strong>Costo:</strong> {p.costo}€
                            </p>

                            {checked ? <CheckCircleIcon className="h-10 w-10 text-primary-400" /> : null}
                          </div>
                        </div>
                      )}
                    </RadioGroup.Option>
                  );
                })}
              </div>
            </div>
          </RadioGroup>
        );
      })}
    </div>
  ) : null;
};

export default Package;
