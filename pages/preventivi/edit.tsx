import SidebarLayout from "../../layouts/SidebarLayout";
import { NextPageWithLayout } from "../_app";
import { ReactElement, SetStateAction, useEffect, useState } from "react";

import { eQuoteStatus, IQuote, Quote } from "../../models/Quote";
import EditPage from "../../components/features/EditPage/EditPage";
import { mpApi, useCustomers } from "../../lib/mpApi";
import FormInput from "../../components/FormInput";
import { Customer } from "../../models/Customer";
import Textarea from "../../components/TextArea";
import Combobox from "../../components/shared/ComboBox/Combobox";
import { CheckIcon } from "@heroicons/react/solid";
import moment from "moment";
import { OrderStatusMapper } from "../../utils/OrderStatusMapper";

import { EditorProps } from "react-draft-wysiwyg";
import { convertToRaw, EditorState, ContentState, convertFromHTML } from "draft-js";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import dynamic from "next/dynamic";
import { UseFormSetValue } from "react-hook-form";
import Button from "../../components/core/Button";
import { useRouter } from "next/router";

const Editor = dynamic<EditorProps>(() => import("react-draft-wysiwyg").then((mod) => mod.Editor), { ssr: false });

const defaultValues: IQuote = {
  id: 0,
  costo: 0,
  dataScadenza: new Date(),
  descrizione: "",
  statoPreventivo: eQuoteStatus.none,
  utente: {
    id: 0,
    nome: "",
    cognome: "",
    email: "",
    numeroDiTelefono: "",
    indirizzo: "",
    latitudine: 0,
    longitudine: 0,
    privacyAccettata: false,
    ruolo: "",
  },
};

const EditPreventivi: NextPageWithLayout = () => {
  /* ITEM */
  const [itemFromApi, setItemFromApi] = useState<IQuote>({});
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [listCustomers, setListCustomers] = useState<Customer[]>([]);

  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const [editorContent, setEditorContent] = useState<any>(null);
  const [draftToHtmlContent, setDraftToHtmlContent] = useState("");

  const [descriptionForInnerHtml, setDescriptionForInnerHtml] = useState("");

  const [setValueForm, setValueFormState] = useState<UseFormSetValue<Quote>>(() => {});

  const [showEditor, setShowEditor] = useState(false);

  /* FILTER */
  const [filter, setFilter] = useState<string>("");

  /* UTILS */
  const [loading, setLoading] = useState<boolean>(false);

  const { pathname } = useRouter();

  const handleSetValueFormChange = (setValue: UseFormSetValue<IQuote>) => {
    if (setValueFormState !== setValue) {
      setValueFormState(() => setValue);
    }
  };

  const handleFormItemChange = (item: IQuote) => {
    setItemFromApi(item);
  };

  const handleEditorContentChange = (content: any) => {
    // setEditorContent(content);
    const contentWithHtml = draftToHtml(content);
    setDraftToHtmlContent(contentWithHtml);
  };

  const handleEditorStateChange = (state: EditorState) => {
    setEditorState(state);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res: any = await mpApi.customers.actions.autocomplete(1, 25, filter);

      const resCustomer = res.content;

      setListCustomers(resCustomer);
      setLoading(false);
    };

    fetchData();
  }, [filter]);

  useEffect(() => {
    if (itemFromApi.descrizione) {
      setShowEditor(false);

      const contentBlocks = convertFromHTML(itemFromApi.descrizione);
      const contentState = ContentState.createFromBlockArray(contentBlocks as any);
      const raw = convertToRaw(contentState);
      setEditorContent(raw);

      setDescriptionForInnerHtml(itemFromApi.descrizione);
    } else {
      setShowEditor(true);
    }
  }, [itemFromApi]);

  useEffect(() => {
    if (setValueForm) {
      setValueForm("descrizione", draftToHtmlContent);
    }
  }, [draftToHtmlContent, setValueForm]);

  useEffect(() => {
    if (pathname.includes("new")) {
      setCustomer(null);
      setEditorContent(null);
      setDraftToHtmlContent("");
    }
  }, [pathname]);

  if (typeof window === "undefined") {
    return null;
  }

  return (
    <EditPage<IQuote>
      defaultValues={defaultValues}
      mpApiAction={mpApi.quotes}
      slugName="preventivi"
      setValueForm={handleSetValueFormChange}
      onItemFromApi={handleFormItemChange}
    >
      {(item: Quote, register, renderError, errors) => {
        return item ? (
          <div>
            <div>
              <h3 className="text-4xl font-bold leading-6 text-gray-900">
                {item.id === 0 ? (
                  "Nuovo Preventivo"
                ) : (
                  <>
                    <div className="flex items-center gap-2">
                      <span className=""> Preventivo: </span>
                      <span className="text-4xl font-semibold tracking-wide text-gray-900">
                        {item.utente?.nome + " " + item.utente?.cognome}
                      </span>
                      <span className="mt-1 text-xl font-semibold tracking-wide text-gray-500">{item.dataScadenza.toString()}</span>
                    </div>
                  </>
                )}
              </h3>
              <div className="mt-1 text-sm text-gray-500"></div>
            </div>

            <div className="mt-10 flex justify-between gap-4">
              {/* SE SI STA CREANDO UN PREVENTIVO  */}
              {item.id == 0 ? (
                <div className="flex w-full flex-col items-start">
                  <span className="block text-sm font-medium text-gray-700">Cerca Utente</span>
                  <Combobox
                    listItems={listCustomers}
                    onFilterChange={(filter) => setFilter(filter)}
                    onSelectedChange={(value) => setCustomer(value)}
                    selectedName={customer ? customer?.nome + " " + customer?.cognome + "     " + customer?.indirizzo : ""}
                    loading={loading}
                  >
                    {(item: Customer, selected, active) => (
                      <div className="flex items-center gap-4">
                        <span className={`block w-1/4 truncate ${selected ? "font-medium" : "font-normal"}`}>
                          {item.nome + " " + item.cognome}
                        </span>
                        <span className="w-1/3">{item.indirizzo}</span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? "text-white" : "text-primary-600"}`}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </div>
                    )}
                  </Combobox>
                </div>
              ) : null}

              {customer?.id && <input type="hidden" value={customer?.id} {...register("idUtente")} />}
              <FormInput
                className="sm:col-span-6"
                {...register("costo", { required: true })}
                errorMessage={renderError(errors["costo"])}
                autoComplete="costo"
                aria="Modifica il Costo"
                label="Costo (iva inclusa €)"
                defaultValue={item?.costo ?? ""}
                type="number"
              />
              {item.id !== 0 && (
                <FormInput
                  className="sm:col-span-6"
                  aria="Modifica il Costo"
                  label="Stato Preventivo"
                  value={OrderStatusMapper[item.statoPreventivo]}
                  type="text"
                  name="stato"
                  disabled
                />
              )}
              {item.id !== 0 && (
                <FormInput
                  className="sm:col-span-6"
                  aria="Modifica Data di Scadenza"
                  label="Data di Scadenza"
                  value={item.dataScadenza.toString()}
                  type="text"
                  name="data-di-scadenza"
                  disabled
                />
              )}
            </div>

            <div className="mb-10 mt-10 flex h-fit min-h-[300px] flex-col gap-1">
              <input type="hidden" value={item?.id} {...register("id")} />
              <h2 className="block text-sm font-medium text-gray-700">Descrizione</h2>
              <Editor
                editorState={editorState}
                toolbarClassName="w-full rounded-xl shadow"
                wrapperClassName="w-full col-span-6 rounded-md"
                editorClassName="w-full border border-gray-100 rounded-md shadow-md bg-white min-h-[280px] px-5 py-1"
                onEditorStateChange={(state) => handleEditorStateChange(state)}
                onContentStateChange={(content) => handleEditorContentChange(content)}
                spellCheck
                contentState={editorContent}
              />

              {/* {descriptionForInnerHtml && !showEditor ? (
                <>
                  <div className="h-full w-full flex-grow">
                    <h2 className="my-1 block text-sm font-medium text-gray-700">Descrizione</h2>
                    <div className="h-full rounded-md border border-gray-200 bg-white p-3">
                      <div dangerouslySetInnerHTML={{ __html: descriptionForInnerHtml }} />
                    </div>
                  </div>

                  <div className="flex w-full justify-end">
                    <Button
                      title="Modifica descrizione"
                      className="w-fit rounded-md px-4 py-3"
                      aria="modifica descrizione"
                      onClick={() => setShowEditor(true)}
                    />
                  </div>
                </>
              ) : null} */}
            </div>
          </div>
        ) : null;
      }}
    </EditPage>
  );
};
EditPreventivi.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout title="Preventivi">{page}</SidebarLayout>;
};
export default EditPreventivi;
