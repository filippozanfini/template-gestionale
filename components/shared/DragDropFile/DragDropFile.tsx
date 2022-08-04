import { DocumentTextIcon } from "@heroicons/react/outline";
import React, { useEffect } from "react";

interface DragDropFileProps {
  onFileChange: (file: File) => void;
  label: string;
  validTaypes: string[];
  emptyFile?: boolean;
}

const DragDropFile = ({ label, validTaypes, emptyFile, onFileChange }: DragDropFileProps) => {
  const [dragActive, setDragActive] = React.useState(false);
  const [file, setFile] = React.useState<File | null>(null);
  const inputRef: any = React.useRef(null);

  const handleDrag = function (e: React.DragEvent<HTMLDivElement | HTMLFormElement>) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = function (e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (checkFileType(file)) {
        setFile(file);
      } else {
        alert("File non supportato");
      }
    }
  };

  const handleChange = function (e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (checkFileType(file)) {
        setFile(file);
      } else {
        alert("File non supportato");
      }
    }
  };

  const onButtonClick = () => {
    inputRef.current && inputRef.current.click();
  };

  const checkFileType = (file: File) => {
    const fileType = file.type;
    const validFileTypes = [...validTaypes];
    return validFileTypes.includes(fileType);
  };

  useEffect(() => {
    if (file) {
      onFileChange(file);
    }
  }, [file]);

  useEffect(() => {
    if (emptyFile) {
      setFile(null);
    }
  }, [emptyFile]);

  return (
    <form
      id="form-file-upload"
      className="relative h-full w-full  text-center"
      onDragEnter={handleDrag}
      onSubmit={(e) => e.preventDefault()}
    >
      <input ref={inputRef} type="file" id="input-file-upload" className="hidden" multiple={true} onChange={handleChange} />
      <label
        id="label-file-upload"
        htmlFor="input-file-upload"
        className={[
          "flex h-full cursor-pointer items-center justify-center rounded-md border-2 border-dashed border-primary-400",
          dragActive ? "bg-primary-200" : " bg-primary-100",
        ].join(" ")}
      >
        <div className="space-y-4">
          {file ? (
            <div className="space-y-1">
              <DocumentTextIcon className="mx-auto h-20 w-20 text-primary-400" />
              <p className="mx-auto mb-1 text-2xl font-medium text-primary-400">{file.name}</p>
            </div>
          ) : (
            <p className="font-medium text-primary-800">{label}</p>
          )}

          {/* <button className="rounded-md bg-primary-50 px-4 py-2 font-medium text-primary-800 hover:underline" onClick={onButtonClick}>
            Carica file
          </button> */}
        </div>
      </label>

      {dragActive && (
        <div
          id="drag-file-element"
          className="absolute inset-0 h-full w-full rounded-md"
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        ></div>
      )}
    </form>
  );
};

export default DragDropFile;
