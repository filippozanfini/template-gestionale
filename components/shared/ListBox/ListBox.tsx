import { Listbox as ListBoxUI, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/outline";
import React, { Fragment } from "react";

interface ListBoxProps {
  backgroundColor?: string;
  textColor?: string;
  selected: any;
  onChange: (value: any) => void;
  selectedName: string;
  listItems: any[];
}

const ListBox = ({ listItems, onChange, selected, selectedName, backgroundColor, textColor }: ListBoxProps) => {
  return (
    <ListBoxUI value={selected} onChange={onChange}>
      <div className="relative mt-1">
        <ListBoxUI.Button
          className={
            "relative w-full cursor-default rounded-lg border border-gray-200 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-300 sm:text-sm " +
            backgroundColor
          }
        >
          <span className={"block truncate " + textColor}>{selectedName}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <SelectorIcon className={"h-5 w-5 " + textColor ?? "text-gray-400"} aria-hidden="true" />
          </span>
        </ListBoxUI.Button>
        <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
          <ListBoxUI.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md border border-gray-200 bg-white py-1 text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {listItems.map((item, index) => (
              <ListBoxUI.Option
                key={item.id ?? index}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? "bg-primary-100 text-primary-900" : "text-gray-900"}`
                }
                value={item}
              >
                {({ selected }) => (
                  <>
                    <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>{item}</span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary-600">
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </ListBoxUI.Option>
            ))}
          </ListBoxUI.Options>
        </Transition>
      </div>
    </ListBoxUI>
  );
};

export default ListBox;
