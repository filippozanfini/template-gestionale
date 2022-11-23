import { Transition, Dialog as DialogUI } from "@headlessui/react";
import React, { FC, Fragment } from "react";

interface DialogProps {
  title: string | React.ReactNode;
  isOpen: boolean;
  children?: React.ReactNode;
  onClose: () => void;
}

const Dialog: FC<DialogProps> = ({ isOpen, title, children, onClose }) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <DialogUI as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogUI.Panel className="w-full max-w-md transform overflow-hidden rounded-xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <DialogUI.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                  {title}
                </DialogUI.Title>
                {children}
              </DialogUI.Panel>
            </Transition.Child>
          </div>
        </div>
      </DialogUI>
    </Transition>
  );
};

export default Dialog;
