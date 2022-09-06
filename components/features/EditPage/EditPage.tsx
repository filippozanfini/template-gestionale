import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import {
  useForm,
  SubmitHandler,
  Path,
  UseFormRegister,
  FieldErrorsImpl,
  DeepRequired,
  UseFormSetValue,
  FieldValues,
} from "react-hook-form";
import renderError from "../../../lib/errorMessages";
import { SlugName } from "../../../models/types/SlugName";
import FourOFour from "../../FourOFour";
import { useAlert } from "../../notifications";
import Overlay from "../../shared/Overlay";

interface EditPageProps<T extends FieldValues> {
  children: (
    items: any,
    register: UseFormRegister<any>,
    renderError: (errorData: any) => string | undefined,
    errors: FieldErrorsImpl<DeepRequired<any>>
  ) => JSX.Element | React.ReactNode;
  defaultValues: T;
  slugName: SlugName;
  mpApiAction: any;
  onItemFromApi?: (item: T) => void;
  setValueForm?: (setValue: UseFormSetValue<T>) => void;
}

const EditPage = function <T extends FieldValues>({
  defaultValues,
  mpApiAction,
  slugName,
  children,
  onItemFromApi,
  setValueForm,
}: EditPageProps<T>) {
  const { push, query } = useRouter();
  const [item, setItem] = useState<T | null>(defaultValues);
  const [loading, setLoading] = useState(false);
  const alert = useAlert();

  const {
    register,
    handleSubmit,
    reset,
    setError,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<T>();

  const loadItem = async (ItemId: number) => {
    if (ItemId === 0) {
      reset(defaultValues);
      return null;
    } else {
      return mpApiAction.actions
        .item(String(ItemId))
        .then((data: any) => {
          setItem(data);
          reset(data);
        })
        .catch((data: any) => {
          setItem(null);
          reset(defaultValues);
        });
    }
  };

  const onSubmit: SubmitHandler<T> = async (formdata: T, e: any) => {
    e.preventDefault();

    setLoading(true);
    mpApiAction.actions
      .save(formdata)
      .then((response: any) => {
        alert({
          id: new Date().toISOString(),
          type: "success",
          title: "Salvataggio Risorsa",
          message: response.message,
          read: false,
          isAlert: true,
        });
        setLoading(false);
        const tempItem = item as any;
        push(`/${slugName}/edit/?id=` + (response.id | response.data?.id | tempItem.id | 0));
      })
      .catch((reason: any) => {
        alert({
          id: new Date().toISOString(),
          type: "error",
          title: "Salvataggio Risorsa",
          message: reason.message,
          read: false,
          isAlert: true,
        });
        setLoading(false);
        if (reason && reason.data && reason.data.errors) {
          Object.keys(reason?.data?.errors).forEach((field: any) => {
            setError(field as Path<T>, {
              type: "custom",
              message: reason.data.errors[field],
            });
          });
        }
      });
  };

  useEffect(() => {
    if (query.id) {
      const ItemId: number = Number(query.id);
      loadItem(ItemId);
    } else {
      reset(defaultValues);
      setItem(defaultValues);
    }
  }, [query]);

  useEffect(() => {
    if (onItemFromApi && item) {
      onItemFromApi(item);
    }
  }, [item]);

  useEffect(() => {
    if (setValueForm) {
      setValueForm(setValue);
    }
  }, [setValue]);

  return (
    <>
      {item ? (
        <form
          className="space-y-8 divide-y divide-gray-200"
          onSubmit={(e) => {
            clearErrors();
            handleSubmit(onSubmit)(e);
          }}
        >
          <div className="space-y-8 divide-y divide-gray-200">{children(item, register, renderError, errors)}</div>

          <div className="pt-5">
            <div className="flex justify-end">
              {/* <button
                type="button"
                className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                onClick={() => reset()}
              >
                Svuota campi
              </button> */}
              <button
                type="submit"
                className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-primary-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                Salva
              </button>
            </div>
          </div>
        </form>
      ) : (
        <FourOFour title="Risorsa non trovata" description="Il contenuto che hai richiesto è stato rimosso oppure non esiste." />
      )}

      <Overlay loading={loading} />
    </>
  );
};

export default EditPage;
