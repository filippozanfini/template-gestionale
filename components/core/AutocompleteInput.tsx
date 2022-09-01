import { ClipboardCopyIcon } from "@heroicons/react/outline";
import React, { useEffect, useRef, useState } from "react";
import GooglePlacesAutocomplete, { geocodeByAddress, geocodeByLatLng, geocodeByPlaceId, getLatLng } from "react-google-places-autocomplete";
import { LatLng } from "react-google-places-autocomplete/build/GooglePlacesAutocomplete.types";

const apiKey = process.env.GOOGLE_MAPS_API_KEY;

console.log(apiKey);
interface AutocompleteInputProps {
  // apiKey: string;
  latLng?: LatLng;
  disabled?: boolean;
  placeholder?: string;
  onChangeLatLng?: (place: LatLng) => void;
  onChangeAddress?: (place: string) => void;
}

const AutocompleteInput = ({ latLng, disabled, placeholder, onChangeLatLng, onChangeAddress }: AutocompleteInputProps) => {
  const [selectedPlace, setSelectedPlace] = useState<any>(null);
  const [defaultAddress, setDefaultAddress] = useState<string>("");
  const mapRef = useRef<any>(null);

  useEffect(() => {
    if (selectedPlace) {
      geocodeByPlaceId(selectedPlace?.value?.place_id)
        .then((results) => getLatLng(results[0]))
        .then(({ lat, lng }) => {
          onChangeLatLng && onChangeLatLng({ lat, lng });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [selectedPlace]);

  useEffect(() => {
    if (latLng && mapRef.current.getSessionToken()) {
      geocodeByLatLng(latLng)
        .then((results) => {
          onChangeAddress && onChangeAddress(results[0]?.formatted_address);
          setDefaultAddress(results[0]?.formatted_address);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [latLng, mapRef]);

  return (
    <div className="relative w-full">
      <GooglePlacesAutocomplete
        ref={mapRef}
        apiKey={"AIzaSyC62jJtoxOaAFu5umwjg-CCuimMOwklm20"}
        debounce={700}
        selectProps={{
          selectedPlace,
          onChange: setSelectedPlace,
          styles: {
            input: (provided: any) => ({
              ...provided,
              boxShadow: "none",
            }),
            option: (provided: any) => ({
              ...provided,
            }),
            singleValue: (provided: any) => ({
              ...provided,
            }),
            container: (provided: any) => ({
              ...provided,
              width: "100%",
              outline: "",
            }),
            control: (provided: any) => ({
              ...provided,
              borderRadius: 6,
            }),
            valueContainer: (provided: any) => ({
              ...provided,
            }),
            indicatorsContainer: (provided: any) => ({
              ...provided,
            }),
            placeholder: (provided: any) => ({
              ...provided,
            }),
          },
          placeholder: defaultAddress || placeholder || "Cerca un indirizzo",
        }}
        onLoadFailed={(error) => console.error("Could not inject Google script", error)}
      />

      {/* {disabled && <div className="absolute inset-0 rounded-md bg-gray-500/10" />} */}
    </div>
  );
};

export default AutocompleteInput;
