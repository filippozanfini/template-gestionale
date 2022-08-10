import React, { FC, Fragment, useState } from "react";
import { Combobox as ComboboxUI, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/outline";

interface ComboboxProps {
  selected?: any;
  selectedName: string;
  listItems: any[];
  loading?: boolean;
  placeholder?: string;
  children?: (item: any, selected: boolean, active: boolean) => React.ReactNode;
  onFilterChange: (filter: string) => void;
  onSelectedChange: (value: any) => void;
}

const Combobox: FC<ComboboxProps> = ({
  listItems,
  loading,
  selected,
  placeholder,
  selectedName,
  children,
  onSelectedChange,
  onFilterChange,
}) => {
  return (
    <div className="z-50 w-full">
      <ComboboxUI value={selected} onChange={onSelectedChange}>
        <div className="relative mt-1">
          <div className="relative block w-full overflow-hidden rounded-md border border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm">
            <ComboboxUI.Input
              className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
              displayValue={() => selectedName}
              onChange={(event) => onFilterChange(event.target.value)}
              placeholder={placeholder}
              autoComplete="off"
            />
            <ComboboxUI.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </ComboboxUI.Button>
          </div>

          <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
            <ComboboxUI.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {listItems.length === 0 ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">Nessun risultato.</div>
              ) : (
                listItems.map((item) => (
                  <ComboboxUI.Option
                    key={item.id}
                    className={({ active }) =>
                      `relative cursor-pointer select-none py-2 pl-10 pr-4 ${active ? "bg-primary-400/80 text-white" : "text-gray-900"}`
                    }
                    value={item}
                  >
                    {({ selected, active }) => <>{children && children(item, selected, active)}</>}
                  </ComboboxUI.Option>
                ))
              )}
            </ComboboxUI.Options>
          </Transition>
        </div>
      </ComboboxUI>
    </div>
  );
};

export default Combobox;
