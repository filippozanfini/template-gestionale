import { CheckIcon } from "@heroicons/react/outline";
import React, { useEffect, useState } from "react";
import { mpApi } from "../../../../lib/mpApi";
import { Customer } from "../../../../models/Customer";
import Combobox from "../Combobox";

interface ComboBoxCollaboratoriProps {
  defaultValue?: Customer | null;
  label?: string;
  onSelectedChange: (value: any) => void;
}

const ComboBoxCollaboratori = ({ defaultValue, label = "Assegna Collaboratore", onSelectedChange }: ComboBoxCollaboratoriProps) => {
  const [listItem, setListItem] = useState<Customer[]>([]);
  const [selectedItem, setSelectedItem] = useState<Customer | null | undefined>(null);

  const [filter, setFilter] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const res: any = await mpApi.collaborators.actions.items(1, 25, filter);

      const resCustomer = res.content;

      setListItem(resCustomer);
      setIsLoading(false);
    };

    if (filter) {
      const timeout = setTimeout(() => fetchData(), 400);

      return () => clearTimeout(timeout);
    } else {
      setListItem([]);
      setSelectedItem(null);
    }
  }, [filter]);

  useEffect(() => {
    // setSelectedItem(defaultValue);
  }, [defaultValue]);

  useEffect(() => {
    onSelectedChange(selectedItem);
  }, [selectedItem]);

  const chooseSelectedName = () => {
    if (defaultValue) {
      return defaultValue?.nome + " " + defaultValue?.cognome + ", " + defaultValue?.indirizzo;
    } else if (selectedItem) {
      return selectedItem?.nome + " " + selectedItem?.cognome + ", " + selectedItem?.indirizzo;
    } else {
      return filter;
    }
  };

  return (
    <div>
      <div className="flex items-center gap-2">
        <span className="block text-sm font-medium text-gray-700">{label}</span>
      </div>

      <Combobox
        listItems={listItem}
        onFilterChange={(filters: any) => setFilter(filters)}
        onSelectedChange={(value: any) => setSelectedItem(value)}
        selectedName={chooseSelectedName()}
        loading={isLoading}
        selected={selectedItem}
        placeholder="Nome Cognome, Indirizzo"
      >
        {(item: Customer, selected, active) => (
          <div className="flex items-center gap-4">
            <span className={`block w-1/4 truncate ${selected ? "font-medium" : "font-normal"}`}>{item.nome + " " + item.cognome}</span>
            <span className="w-1/3">{item.indirizzo}</span>
            {selected ? (
              <span className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? "text-white" : "text-primary-600"}`}>
                <CheckIcon className="h-5 w-5" aria-hidden="true" />
              </span>
            ) : null}
          </div>
        )}
      </Combobox>
    </div>
  );
};

export default ComboBoxCollaboratori;
