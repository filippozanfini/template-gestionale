import { useRouter } from "next/router";
import React, { ReactElement, useEffect } from "react";
import Button from "../../components/core/Button";
import Loader from "../../components/core/Loader";
import { useAlert } from "../../components/notifications";
import Dialog from "../../components/shared/Dialog/Dialog";
import DragDropFile from "../../components/shared/DragDropFile/DragDropFile";
import SidebarLayout from "../../layouts/SidebarLayout";
import { mpApi } from "../../lib/mpApi";
import { NextPageWithLayout } from "../_app";

const ImportClienti: NextPageWithLayout = () => {
  const [file, setFile] = React.useState<File | null>(null);
  const [loadingUpload, setLoadingUplaod] = React.useState(false);
  const [emptyFile, setEmptyFile] = React.useState(false);

  const [res, setRes] = React.useState<any>();

  const router = useRouter();

  const alert = useAlert();

  const handleFileChange = (file: File) => {
    setFile(file);
  };

  const handleError = (message: string) => {
    alert({
      id: new Date().toISOString(),
      type: "error",
      title: "Errore caricamento file",
      message: message,
      read: false,
      isAlert: true,
    });
  };

  const uploadFile = () => {
    if (file) {
      setEmptyFile(false);
      setLoadingUplaod(true);

      // chiamata all'api
      mpApi.customers.actions
        .uploadFile(file)
        .then((response: any) => {
          setRes(response);
          setLoadingUplaod(false);
          setEmptyFile(true);
        })
        .catch((err) => {
          setLoadingUplaod(false);
          handleError(err.message);
        });
    }
  };

  const onCloseDialog = () => {
    router.reload();
    setRes(null);
  };

  useEffect(() => {
    if (emptyFile) {
      setFile(null);
    }
  }, [emptyFile]);

  return (
    <div>
      <h1 className="text-4xl font-bold">
        Importa Clienti: <span className="text-gray-500">File CSV</span>
      </h1>

      <div className="my-10 flex  flex-col gap-8">
        <div className="relative h-96">
          <DragDropFile
            label="Trascina qui il file CSV o clicca per caricare"
            validTaypes={["text/csv"]}
            onFileChange={(file) => handleFileChange(file)}
            onError={handleError}
            emptyFile={emptyFile}
          />

          {loadingUpload && (
            <div className="absolute inset-0 flex items-center justify-center rounded-md backdrop-blur-sm ">
              <Loader className="h-16 w-16" />
            </div>
          )}
        </div>

        <div className="ml-auto w-44">
          <Button aria="upload" title="Carica File" onClick={() => uploadFile()} disabled={!file} />
        </div>
      </div>

      <Dialog isOpen={Boolean(res)} onClose={() => onCloseDialog()} title={res?.message}>
        <div className="mt-4 space-y-1">
          <p>Utenti caricati con successo: {res?.utentiCaricatiCorrettamente}</p>
          <p>Utenti non caricati: {res?.utentiCaricamentoFallito}</p>
        </div>
      </Dialog>
    </div>
  );
};

ImportClienti.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout title="Importa Clienti">{page}</SidebarLayout>;
};

export default ImportClienti;
