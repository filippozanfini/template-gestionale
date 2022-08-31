import { CheckIcon } from "@heroicons/react/outline";
import React, { useEffect, useState } from "react";
import Combobox from "../ComboBox/Combobox";

const AutocompletePlaces = () => {
  const [places, setPlaces] = useState<any>([]);
  const [filter, setFilter] = useState<string>("");
  const [selectedPlace, setSelectedPlace] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    console.log(filter);
  }, [filter]);

  return (
    <div className="w-full">
      <script
        type="text/javascript"
        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyC62jJtoxOaAFu5umwjg-CCuimMOwklm20&libraries=places"
      />
      <span className="mb-1 block text-sm font-medium text-gray-700">Indirizzo</span>

      <Combobox
        listItems={places}
        onFilterChange={(filters) => setFilter(filters)}
        onSelectedChange={(value) => setSelectedPlace(value)}
        selectedName={selectedPlace ? selectedPlace?.nome + " " + selectedPlace?.cognome + ", " + selectedPlace?.indirizzo : filter}
        loading={isLoading}
        selected={selectedPlace}
      >
        {(item: any, selected, active) => (
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

export default AutocompletePlaces;
