import React, { useEffect, useRef, useState } from "react";
import GooglePlacesAutocomplete, { geocodeByAddress, geocodeByLatLng } from "react-google-places-autocomplete";

interface AutocompleteInputProps {
  latLng: { lat: number; lng: number } | null;
  onChangeLatLng: (location: google.maps.LatLng) => void;
}

const AutocompleteInput = ({ latLng, onChangeLatLng }: AutocompleteInputProps) => {
  const [place, setPlace] = useState<any>(null);

  useEffect(() => {
    if (place?.label) {
      geocodeByAddress(place?.label)
        .then((res) => {
          onChangeLatLng(res[0].geometry.location);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [place]);

  useEffect(() => {
    if (latLng) {
      geocodeByLatLng(latLng)
        .then((res) => {
          // setPlace(res[0]);
          console.log(res[0]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [latLng]);

  return (
    <div className="w-full">
      <span className="mb-1 block text-sm font-medium text-gray-700">Indirizzo</span>

      <GooglePlacesAutocomplete
        apiKey="AIzaSyC62jJtoxOaAFu5umwjg-CCuimMOwklm20"
        debounce={700}
        selectProps={{
          place,
          onChange: setPlace,
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
          placeholder: "",
        }}
        onLoadFailed={(error) => console.error("Could not inject Google script", error)}
      />
    </div>
  );
};

export default AutocompleteInput;
