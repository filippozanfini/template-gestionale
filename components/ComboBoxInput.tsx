import React, { ForwardRefRenderFunction, Fragment, InputHTMLAttributes } from "react";
import { Listbox as ListBoxUI, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/outline";

export interface ComboBoxElement {
  value: string[];
  label: string;
}

interface ComboBoxInputProps extends InputHTMLAttributes<HTMLSelectElement> {
  aria: string;
  name: string;
  label: string;
  elements: ComboBoxElement[];
  selectedOptions: string[];
  onChange: (e: any) => void;
}

const ComboBox: ForwardRefRenderFunction<HTMLSelectElement, ComboBoxInputProps> = (
  { name, label, aria, value, selectedOptions, elements, onChange, ...otherProps },
  ref
) => {
  return (
    <ListBoxUI value={value} onChange={onChange} multiple>
      <div className="relative z-50 flex w-full flex-col gap-1 sm:col-span-2">
        <p className="text-sm">{label}</p>
        <ListBoxUI.Button
          className={
            "relative w-full cursor-default rounded-lg border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-300 sm:text-sm "
          }
        >
          <span className={"block truncate "}>
            {selectedOptions.length > 0 ? `${selectedOptions.length} elementi selezionati` : "Seleziona categoria"}
          </span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <SelectorIcon className={"h-5 w-5 text-gray-400"} aria-hidden="true" />
          </span>
        </ListBoxUI.Button>
        <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
          <ListBoxUI.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {elements.map((item, index) => (
              <ListBoxUI.Option
                key={String(item.value) ?? index}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? "bg-primary-100 text-primary-900" : "text-gray-900"}`
                }
                value={item.value}
              >
                {({ selected }) => (
                  <>
                    <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>{item.label}</span>
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

const ComboBoxInput = React.forwardRef(ComboBox);

export default ComboBoxInput;
