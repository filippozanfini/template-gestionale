import React, { ReactElement } from "react";
import Button from "../../components/core/Button";
import Loader from "../../components/core/Loader";
import { useAlert, useNotify } from "../../components/notifications";
import DragDropFile from "../../components/shared/DragDropFile/DragDropFile";
import SidebarLayout from "../../layouts/SidebarLayout";
import { mpApi } from "../../lib/mpApi";
import { NextPageWithLayout } from "../_app";

const ImportClienti: NextPageWithLayout = () => {
  const [file, setFile] = React.useState<File | null>(null);
  const [loadingUpload, setLoadingUplaod] = React.useState(false);
  const [emptyFile, setEmptyFile] = React.useState(false);

  const notify = useNotify();
  const alert = useAlert();

  const handleFileChange = (file: File) => {
    setFile(file);
  };

  const uploadFile = () => {
    if (file) {
      setEmptyFile(false);
      setLoadingUplaod(true);

      // chiamata all'api
      mpApi.customers.actions
        .uploadFile(file)
        .then((response: any) => {
          alert({
            id: new Date().toISOString(),
            type: "success",
            title: "Caricamento utenti da CSV",
            message: response.message,
            read: false,
            isAlert: true,
          });
          setLoadingUplaod(false);
          setEmptyFile(true);

          // console.log(response);
        })
        .catch((err) => {
          setLoadingUplaod(false);
          console.error(err);
        });
    }
  };

  return (
    <div>
      <h1 className="text-xl">
        Importa Clienti: File <strong> CSV </strong>
      </h1>

      <div className="my-10 flex  flex-col gap-8">
        <div className="relative h-96">
          <DragDropFile
            label="Trascina qui il file CSV o clicca per caricare"
            validTaypes={["text/csv"]}
            onFileChange={(file) => handleFileChange(file)}
            emptyFile={emptyFile}
          />

          {loadingUpload && (
            <div className="absolute inset-0 flex items-center justify-center rounded-md backdrop-blur-sm ">
              <Loader className="h-16 w-16" />
            </div>
          )}
        </div>
        <div className="ml-auto w-44">
          <Button aria="upload" title="Carica File" onClick={() => uploadFile()}>
            Carica File
          </Button>
        </div>
      </div>
    </div>
  );
};

ImportClienti.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout title="Clienti">{page}</SidebarLayout>;
};

export default ImportClienti;
