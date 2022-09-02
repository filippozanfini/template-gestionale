import { CheckIcon, ClipboardCopyIcon } from "@heroicons/react/outline";
import React, { useCallback, useEffect, useState } from "react";
import { LatLng } from "react-google-places-autocomplete/build/GooglePlacesAutocomplete.types";
import { FieldValues, Path, UseFormSetValue } from "react-hook-form";
import { Customer } from "../../../models/Customer";
import AutocompleteInput from "../../core/AutocompleteInput";
import CheckboxInput from "../../core/Checkbox";

interface AutocompleteAdvancedProps<T extends FieldValues> {
  customer: Customer | null;
  item?: any;
  showCheckbox?: boolean;
  showCopyButton?: boolean;
  saveAddress?: boolean;
  setValue: UseFormSetValue<T>;
}

const AutocompleteAdvanced = function <T extends FieldValues>({
  customer,
  item,
  showCheckbox,
  showCopyButton,
  saveAddress,
  setValue,
}: AutocompleteAdvancedProps<T>) {
  const [latLng, setLanLng] = useState<LatLng | null>(null);
  const [address, setAddress] = useState<string>("");

  const [defaultCoords, setDefaultCoords] = useState<boolean>(false);
  const [copyAddressClipBoardActive, setCopyAddressClipBoardActive] = useState<boolean>(false);

  const onChangeLatLng = useCallback((latLng: LatLng) => {
    setLanLng(latLng);
  }, []);

  const onChangeAddress = useCallback((address: string) => {
    console.log("address", address);
    setAddress(address);
  }, []);

  const onCopyAddressToClipBoard = () => {
    setCopyAddressClipBoardActive(true);

    if (defaultCoords) {
      navigator.clipboard.writeText(customer?.indirizzo || "");
    } else {
      navigator.clipboard.writeText(address);
    }

    setTimeout(() => {
      setCopyAddressClipBoardActive(false);
    }, 4000);
  };

  const matchCoords = useCallback((latLng: any, item: any) => {
    if (latLng && item) {
      return latLng.lat === item.latitudine && latLng.lng === item.longitudine;
    }
    return false;
  }, []);

  useEffect(() => {
    if (customer && defaultCoords) {
      setLanLng({ lat: customer.latitudine, lng: customer.longitudine });
    } else if (!defaultCoords) {
      matchCoords(latLng, item) ? setLanLng(null) : setLanLng({ lat: item?.latitudine, lng: item?.longitudine });
    }
  }, [customer, defaultCoords]);

  useEffect(() => {
    customer && item && setDefaultCoords(matchCoords({ lat: item.latitudine, lng: item.longitudine }, customer));
  }, [customer, item]);

  useEffect(() => {
    if (latLng?.lat && latLng?.lng && address) {
      setValue("latitudine" as Path<T>, latLng.lat as any);
      setValue("longitudine" as Path<T>, latLng.lng as any);
      saveAddress && setValue("indirizzo" as Path<T>, address as any);
    }
  }, [latLng, address]);

  return (
    <>
      <div className="w-full">
        <span className="mb-1 block text-sm font-medium text-gray-700">Indirizzo</span>
        <div className="flex w-full items-center gap-2">
          {defaultCoords ? (
            <input
              type={"text"}
              className={["my-auto h-[38px] w-full rounded-md border border-gray-300", !defaultCoords ? "hidden" : ""].join(" ")}
              value={customer?.indirizzo}
              disabled
            />
          ) : (
            <div className={["w-full", defaultCoords ? "hidden" : ""].join(" ")}>
              <AutocompleteInput
                latLng={latLng ? latLng : undefined}
                onChangeLatLng={(value) => onChangeLatLng(value)}
                onChangeAddress={(value) => onChangeAddress(value)}
                disabled={defaultCoords}
              />
            </div>
          )}

          {showCopyButton ? (
            <button
              type="button"
              className="h-7 w-7 transition-all duration-100 "
              title="copia indirizzo"
              onClick={() => onCopyAddressToClipBoard()}
              disabled={copyAddressClipBoardActive}
            >
              {!copyAddressClipBoardActive ? (
                <ClipboardCopyIcon className="text-gray-500 hover:opacity-70 active:scale-95" />
              ) : (
                <CheckIcon className="text-green-700" />
              )}
            </button>
          ) : null}
        </div>
      </div>

      {showCheckbox ? (
        <CheckboxInput
          aria="Coordinate dell'utente"
          label="Usa coordinate utente"
          name="calcolo-automatico"
          checked={defaultCoords}
          onChange={(e) => setDefaultCoords(e.target.checked)}
          className="mt-5 flex items-center whitespace-nowrap"
        />
      ) : null}
    </>
  );
};

export default AutocompleteAdvanced;
