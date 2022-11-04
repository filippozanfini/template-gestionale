import useSWR from "swr";
import { Category } from "../models/Category";
import { Customer } from "../models/Customer";
import { Installation } from "../models/Installation";
import { Order } from "../models/Order";
import { Package } from "../models/Package";
import { Quote } from "../models/Quote";
import { Service } from "../models/Service";
import { User } from "../models/User";
import { CategoryMapper } from "../utils/CategoryMapper";
import Cookies from "./cookies";
import fetchJson from "./fetchJson";
import { PageLimitQuery, PageLimitQueryStatusOrderCollab } from "./interfaces/Queries";

export const mpApi = {
  user: {
    routes: {
      me: "/users/me",
    },
    actions: {
      login: async (username: string, password: string) => {
        let data: any = await fetchJson("/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: username,
            password: password,
          }),
        });
        if (data?.token) {
          Cookies.set("token", data?.token);
        }
        return {
          ...(data.utente || {}),
        };
      },
    },
    logout: () => {
      Cookies.del("token");
    },
  },

  services: {
    routes: {
      item: (id: number) => (id < 1 ? `` : `/servizi/${id}`),
      list: (page: number = 1, limit: number = 10) => `/servizi?page=${page}&limit=${limit}`,
    },
    actions: {
      listFetcher: (input: RequestInfo, init?: RequestInit) =>
        fetchJson(input, init).then((data: any) => {
          if (data && data.content) {
            return {
              content: data.content.map((item: Customer) => {
                return new Service(item);
              }),
              totalItems: data.totalElements,
              totalPages: data.totalPages,
              currentPage: data.number + 1,
            };
          } else {
            return {
              content: [],
              totalItems: 0,
              totalPages: 0,
              currentPage: 0,
            };
          }
        }),

      item: async (id: number) => {
        if (id < 1) {
          return null;
        }
        return fetchJson(`/servizi/${id}`);
      },
      items: async (page: number = 1, limit: number = 10) => {
        return fetchJson(`/servizi?page=${page}&limit=${limit}`);
      },

      itemsFilteredByIdUser: async (idUser: number) => {
        if (idUser < 1) {
          return null;
        }
        return fetchJson(`/servizi/utente/${idUser}`);
      },

      save: async (item: any) => {
        return fetchJson(`/servizi/${item.id > 0 ? item.id : ""}`, {
          method: item.id > 0 ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(item),
        });
      },
      delete: async (id: number) => {
        let data: any = await fetchJson(`/servizi/${id}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        });
      },
    },
  },

  manutenzione: {
    routes: {
      item: (id: number) => (id < 1 ? `` : `/pacchetti/${id}`),
      list: (page: number = 1, limit: number = 10) => `/pacchetti?page=${page}&limit=${limit}`,
    },
    actions: {
      listFetcher: (input: RequestInfo, init?: RequestInit) =>
        fetchJson(input, init).then((data: any) => {
          if (data && data.content) {
            return {
              content: data.content.map((item: Customer) => {
                return new Service(item);
              }),
              totalItems: data.totalElements,
              totalPages: data.totalPages,
              currentPage: data.number + 1,
            };
          } else {
            return {
              content: [],
              totalItems: 0,
              totalPages: 0,
              currentPage: 0,
            };
          }
        }),

      item: async (id: number) => {
        if (id < 1) {
          return null;
        }
        return fetchJson(`/pacchetti/${id}`);
      },
      items: async (page: number = 1, limit: number = 10) => {
        return fetchJson(`/pacchetti?page=${page}&limit=${limit}`);
      },

      save: async (item: any) => {
        return fetchJson(`/pacchetti/${item.id > 0 ? item.id : ""}`, {
          method: item.id > 0 ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(item),
        });
      },
      delete: async (id: number) => {
        let data: any = await fetchJson(`/pacchetti/${id}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        });
      },
    },
  },

  packages: {
    routes: {
      item: (id: number) => (id < 1 ? `` : `/pacchetti/${id}`),
      list: (page: number = 1, limit: number = 10) => `/pacchetti?page=${page}&limit=${limit}`,
    },
    itemFV: (id: number) => (id < 1 ? `` : `/pacchetti/fotovoltaico/${id}`),
    actions: {
      listFetcher: (input: RequestInfo, init?: RequestInit) =>
        fetchJson(input, init).then((data: any) => {
          if (data && data.content) {
            return {
              content: data.content.map((item: Package) => {
                return new Package(item);
              }),
              totalItems: data.totalElements,
              totalPages: data.totalPages,
              currentPage: data.number + 1,
            };
          } else {
            return {
              content: [],
              totalItems: 0,
              totalPages: 0,
              currentPage: 0,
            };
          }
        }),

      item: async (id: number) => {
        if (id < 1) {
          return null;
        }
        return fetchJson(`/pacchetti/${id}`);
      },
      items: async (page: number = 1, limit: number = 10) => {
        return fetchJson(`/pacchetti?page=${page}&limit=${limit}`);
      },

      itemFV: async (id: number) => {
        if (id < 1) {
          return null;
        }
        return fetchJson(`/pacchetti/${id}`);
      },

      itemsFilteredByIdUser: async (idUser: number) => {
        if (idUser < 1) {
          return null;
        }
        return fetchJson(`/pacchetti/utente/filtrati/${idUser}`);
      },

      save: async (item: any) => {
        return fetchJson(`/pacchetti/${item.id > 0 ? item.id : ""}`, {
          method: item.id > 0 ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(item),
        });
      },
      saveFotovoltaico: async (item: any) => {
        return fetchJson(`/pacchetti/fotovoltaico/${item.id > 0 ? item.id : ""}`, {
          method: item.id > 0 ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(item),
        });
      },
      delete: async (id: number) => {
        let data: any = await fetchJson(`/pacchetti/${id}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        });
      },
    },
  },

  customers: {
    routes: {
      list: (page: number = 1, limit: number, query: string) =>
        `/users?page=${page}&limit=${limit}&query=${query}&ruolo=cliente&orderBy=ID`,
    },
    actions: {
      listFetcher: (input: RequestInfo, init?: RequestInit) =>
        fetchJson(input, init).then((data: any) => {
          if (data && data.content) {
            return {
              content: data.content.map((item: Customer) => {
                return new Customer(item);
              }),
              totalItems: data.totalElements,
              totalPages: data.totalPages,
              currentPage: data.number + 1,
            };
          } else {
            return {
              content: [],
              totalItems: 0,
              totalPages: 0,
              currentPage: 0,
            };
          }
        }),

      item: async (id: string) => {
        return fetchJson(`/users/${id}`);
      },
      items: async (page: number = 1, limit: number = 10, query: string = "") => {
        return fetchJson(`/users?page=${page}&limit=${limit}&query=${query}&ruolo=cliente&orderBy=ID`);
      },

      delete: async (id: number) => {
        await fetchJson(`/users/${id}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        });
      },

      serviziAttivi: async (id: number) => {
        return fetchJson(`/servizi/utente/validi/${id}`);
      },

      pacchettiAttivi: async (id: number) => {
        return fetchJson(`/pacchetti/utente/validi/${id}`);
      },

      save: async (item: any) => {
        return fetchJson(`/users/${item.id > 0 ? item.id : ""}`, {
          method: item.id > 0 ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...item, ruolo: "3" }),
        });
      },

      autocomplete: async (page: number = 1, limit: number, query: string) => {
        return fetchJson(`/users?page=${page}&limit=${limit}&query=${query}`);
      },

      uploadFile: async (file: File) => {
        const formData = new FormData();
        formData.append("file", file);
        return fetchJson(`/users/carica`, {
          method: "POST",
          body: formData,
        });
      },

      resetPassword: async (id: number) => {
        return fetchJson(`/users/genera/${id}`);
      },
    },
  },

  quotes: {
    routes: {
      list: (page: number = 1, limit: number, query: string) => `/preventivi?page=${page}&limit=${limit}&query=${query}`,
      item: (id: number) => (id < 1 ? `` : `/preventivi/${id}`),
    },
    actions: {
      listFetcher: (input: RequestInfo, init?: RequestInit) =>
        fetchJson(input, init).then((data: any) => {
          if (data && data.content) {
            return {
              content: data.content.map((item: Quote) => {
                return new Quote(item);
              }),
              totalItems: data.totalElements,
              totalPages: data.totalPages,
              currentPage: data.number + 1,
            };
          } else {
            return {
              content: [],
              totalItems: 0,
              totalPages: 0,
              currentPage: 0,
            };
          }
        }),

      item: async (id: number) => {
        if (id < 1) {
          return null;
        }
        return fetchJson(`/preventivi/${id}`);
      },
      items: async (page: number = 1, limit: number = 10, query: string = "") => {
        return fetchJson(`/preventivi?page=${page}&limit=${limit}&query=${query}`);
      },

      currentQuotesPerUser: async (idUser: number) => {
        return fetchJson(`/preventivi/utente/validi/${idUser}`);
      },

      save: async (item: any) => {
        const itemMap = Quote.factoryResponse(item);

        return fetchJson(`/preventivi/${item.id > 0 ? item.id : ""}`, {
          method: item.id > 0 ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(itemMap),
        });
      },

      delete: async (id: number) => {
        let data: any = await fetchJson(`/preventivi/${id}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        });
      },
    },
  },

  installations: {
    routes: {
      list: (page: number = 1, limit: number, query: string) => `/impianti?page=${page}&limit=${limit}&query=${query}`,
      item: (id: number) => (id < 1 ? `` : `/impianti/${id}`),
    },
    actions: {
      listFetcher: (input: RequestInfo, init?: RequestInit) =>
        fetchJson(input, init).then((data: any) => {
          if (data && data.content) {
            return {
              content: data.content.map((item: Installation) => {
                return new Installation(item);
              }),
              totalItems: data.totalElements,
              totalPages: data.totalPages,
              currentPage: data.number + 1,
            };
          } else {
            return {
              content: [],
              totalItems: 0,
              totalPages: 0,
              currentPage: 0,
            };
          }
        }),

      item: async (id: number) => {
        if (id < 1) {
          return null;
        }
        return fetchJson(`/impianti/${id}`);
      },
      items: async (page: number = 1, limit: number = 10, query: string = "") => {
        return fetchJson(`/impianti?page=${page}&limit=${limit}&query=${query}`);
      },
      itemsFilteredByIdUser: async (idUser: number) => {
        if (idUser < 1) {
          return null;
        }
        return fetchJson(`/impianti/utente/${idUser}`);
      },

      save: async (item: any) => {
        return fetchJson(`/impianti/${item.id > 0 ? item.id : ""}`, {
          method: item.id > 0 ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(item),
        });
      },
      delete: async (id: number) => {
        let data: any = await fetchJson(`/impianti/${id}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        });
      },

      saveBoiler: async (item: any) => {
        console.log("item", item);
        return fetchJson(`/impianti/caldaia/${item.id > 0 ? item.id : ""}`, {
          method: item.id > 0 ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(item),
        });
      },
      savePhotovoltaic: async (item: any) => {
        return fetchJson(`/impianti/impiantoFV/${item.id > 0 ? item.id : ""}`, {
          method: item.id > 0 ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(item),
        });
      },
      saveSolarThermal: async (item: any) => {
        return fetchJson(`/impianti/impiantoST/${item.id > 0 ? item.id : ""}`, {
          method: item.id > 0 ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(item),
        });
      },
      savePump: async (item: any) => {
        return fetchJson(`/impianti/pompaDC/${item.id > 0 ? item.id : ""}`, {
          method: item.id > 0 ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(item),
        });
      },
      saveAirConditioning: async (item: any) => {
        return fetchJson(`/impianti/condizionatore/${item.id > 0 ? item.id : ""}`, {
          method: item.id > 0 ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(item),
        });
      },
    },
  },

  categories: {
    routes: {
      list: (page: number = 1, limit: number, query: string) => `/impianti/tipologia?page=${page}&limit=${limit}&query=${query}`,
    },
    actions: {
      listFetcher: (input: RequestInfo, init?: RequestInit) =>
        fetchJson(input, init).then((data: any) => {
          if (data && data.content) {
            return {
              content: data.content.map((item: Category) => {
                console.log("ITEM", item);
                return new Category(item);
              }),
              totalItems: data.totalElements,
              totalPages: data.totalPages,
              currentPage: data.number + 1,
            };
          } else {
            return {
              content: [],
              totalItems: 0,
              totalPages: 0,
              currentPage: 0,
            };
          }
        }),

      items: async (page: number = 1, limit: number = 10, query: string = "") => {
        return fetchJson(`/impianti/tipologia?page=${page}&limit=${limit}&query=${query}`);
      },
    },
  },

  collaborators: {
    routes: {
      list: (page: number = 1, limit: number, query: string) =>
        `/users/?page=${page}&limit=${limit}&query=${query}&ruolo=gestore&orderBy=ID`,
      item: (id: number) => (id < 1 ? `` : `/users/${id}`),
    },
    actions: {
      listFetcher: (input: RequestInfo, init?: RequestInit) =>
        fetchJson(input, init).then((data: any) => {
          if (data && data.content) {
            return {
              content: data.content.map((item: Customer) => {
                return new Customer(item);
              }),
              totalItems: data.totalElements,
              totalPages: data.totalPages,
              currentPage: data.number + 1,
            };
          }
          return {
            content: [],
            totalItems: 0,
            totalPages: 0,
            currentPage: 0,
          };
        }),

      item: async (id: string) => {
        return fetchJson(`/users/${id}`);
      },
      items: async (page: number = 1, limit: number = 10, query: string = "") => {
        return fetchJson(`/users/?page=${page}&limit=${limit}&query=${query}&ruolo=gestore&orderBy=ID`);
      },

      save: async (item: any) => {
        return fetchJson(`/users/${item.id > 0 ? item.id : ""}`, {
          method: item.id > 0 ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...item, ruolo: "2" }),
        });
      },

      delete: async (id: number) => {
        let data: any = await fetchJson(`/users/${id}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        });
      },
    },
  },

  orders: {
    routes: {
      list: (page: number = 1, limit: number, query: string, status: string, orderBy: string, collaborator: string) =>
        `/ordini?page=${page}&limit=${limit}&query=${query}&orderBy=${orderBy}&stato=${status}&collaborator=${collaborator}`,
      item: (id: number) => (id < 1 ? `` : `/ordini/${id}`),
    },
    actions: {
      listFetcher: (input: RequestInfo, init?: RequestInit) =>
        fetchJson(input, init).then((data: any) => {
          if (data && data.content) {
            return {
              content: data.content.map((item: Order) => {
                return new Order(item);
              }),
              totalItems: data.totalElements,
              totalPages: data.totalPages,
              currentPage: data.number + 1,
            };
          }
          return {
            content: [],
            totalItems: 0,
            totalPages: 0,
            currentPage: 0,
          };
        }),

      item: async (id: number) => {
        if (id < 1) {
          return null;
        }
        return fetchJson(`/ordini/${id}`);
      },
      items: async (
        page: number = 1,
        limit: number = 10,
        query: string = "",
        status: string = "",
        orderBy: string = "",
        collaborator: string = ""
      ) => {
        return fetchJson(
          `/ordini?page=${page}&limit=${limit}&query=${query}&orderBy=${orderBy}&stato=${status}&collaborator=${collaborator}`
        );
      },

      save: async (item: any, status: string) => {
        return fetchJson(`/ordini/stato/${item.id > 0 ? item.id : ""}?nome=${status}`, {
          method: item.id > 0 ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
        });
      },

      delete: async (id: number) => {
        let data: any = await fetchJson(`/ordini/${id}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        });
      },

      newOrderQuote: async (item: any, pagamento: string) => {
        return fetchJson(`/ordini/nuovo/preventivo?pagamento=${pagamento}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(item),
        });
      },

      newOrderService: async (item: any, pagamento: string) => {
        return fetchJson(`/ordini/nuovo/servizio?pagamento=${pagamento}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(item),
        });
      },

      newOrderPackage: async (item: any, pagamento: string) => {
        return fetchJson(`/ordini/nuovo/pacchetto?pagamento=${pagamento}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(item),
        });
      },

      newOrderMaintenance: async (item: any, pagamento: string) => {
        return fetchJson(`/ordini/nuovo/intervento?pagamento=${pagamento}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(item),
        });
      },

      assignCollabAtOrder: async (id: number, idCollab: number) => {
        return fetchJson(`/ordini/collaborator/${idCollab}/?idOrdine=${id}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });
      },
    },
  },

  resetPassword: {
    routes: {
      sendEmail: (email: string) => `/users/reset_password`,
      resetPassword: (token: string, password: string) => `/users/reset_password?token=${token}`,
    },
    actions: {
      sendEmail: async (email: string) => {
        let data: any = await fetchJson(`/users/reset_password`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });

        return data;
      },
      resetPassword: async (token: string, password: string) => {
        let data: any = await fetchJson(`/users/confirm_reset?token=${token}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ hashcode: token, password_new: password }),
        });

        return data;
      },
    },
  },

  settings: {
    routes: {},
    actions: {
      coordinates: async () => {
        return fetchJson(`/coordinate`);
      },
      saveCoordinates: async (item: any) => {
        return fetchJson(`/coordinate`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(item),
        });
      },
    },
  },
};

export const useUser = () => {
  const { data: user, error } = useSWR(mpApi.user.routes.me, mpApi.user.actions.login);
  return { user, error };
};

export const useServices = () => {
  const { data, error } = useSWR(mpApi.services.routes.list, mpApi.services.actions.listFetcher);
  return { data, error };
};

export const useService = (id: number) => {
  const { data, error } = useSWR(mpApi.services.routes.item(id), mpApi.services.actions.item);
  return { data, error };
};

export const useCustomers = ({ page, limit, query }: PageLimitQuery) => {
  const { data, error } = useSWR(mpApi.customers.routes.list(page, limit, query), mpApi.customers.actions.listFetcher);
  console.log("DATA", data);
  return { data, error };
};

export const useQuotes = ({ page, limit, query }: PageLimitQuery) => {
  const { data, error } = useSWR(mpApi.quotes.routes.list(page, limit, query), mpApi.quotes.actions.listFetcher);
  return { data, error };
};

export const usePackages = ({ page, limit }: PageLimitQuery) => {
  const { data, error } = useSWR(mpApi.packages.routes.list(page, limit), mpApi.packages.actions.listFetcher);
  return { data, error };
};

export const useInstallations = ({ page, limit, query }: PageLimitQuery) => {
  const { data, error } = useSWR(mpApi.installations.routes.list(page, limit, query), mpApi.installations.actions.listFetcher);
  return { data, error };
};

export const useCategories = ({ page, limit, query }: PageLimitQuery) => {
  const { data, error } = useSWR(mpApi.categories.routes.list(page, limit, query), mpApi.categories.actions.listFetcher);
  return { data, error };
};

export const useCollaborators = ({ page, limit, query }: PageLimitQuery) => {
  const { data, error } = useSWR(mpApi.collaborators.routes.list(page, limit, query), mpApi.collaborators.actions.listFetcher);
  return { data, error };
};

export const useOrders = ({ page, limit, query, status, orderBy, collaborator }: PageLimitQueryStatusOrderCollab) => {
  const { data, error } = useSWR(
    mpApi.orders.routes.list(page, limit, query, status, orderBy, collaborator),
    mpApi.orders.actions.listFetcher
  );
  return { data, error };
};
