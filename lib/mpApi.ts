import useSWR from "swr";
import { Customer } from "../models/Customer";
import { Installation } from "../models/Installation";
import { Package } from "../models/Package";
import { Quote } from "../models/Quote";
import { Service } from "../models/Service";
import { User } from "../models/User";
import Cookies from "./cookies";
import fetchJson from "./fetchJson";

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
          ...data,
        };
      },
    },
  },

  services: {
    routes: {
      item: (id: number) => (id < 1 ? `` : `/servizi/${id}`),
      list: (pageIndex: number = 1, limit: number = 10) => `/servizi?page=${pageIndex}&limit=${limit}`,
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

  packages: {
    routes: {
      item: (id: number) => (id < 1 ? `` : `/pacchetti/${id}`),
      list: (pageIndex: number = 1, limit: number = 10) => `/pacchetti?page=${pageIndex}&limit=${limit}`,
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

      itemFV: async (id: number) => {
        if (id < 1) {
          return null;
        }
        return fetchJson(`/pacchetti/${id}`);
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

  customers: {
    routes: {
      list: (pageIndex: number = 1, limit: number, query: string) => `/users?page=${pageIndex}&limit=${limit}&query=${query}`,
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

      delete: async (id: number) => {
        await fetchJson(`/users/${id}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        });
      },

      save: async (item: any) => {
        const itemForSave = {
          ...item,
          ruoli: [3],
        };
        return fetchJson(`/users/${item.id > 0 ? item.id : ""}`, {
          method: item.id > 0 ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(itemForSave),
        });
      },

      autocomplete: async (pageIndex: number = 1, limit: number, query: string) => {
        return fetchJson(`/users?page=${pageIndex}&limit=${limit}&query=${query}`);
      },
    },
  },

  quotes: {
    routes: {
      list: (pageIndex: number = 1, limit: number, query: string) => `/preventivi?page=${pageIndex}&limit=${limit}&query=${query}`,
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

      save: async (item: any) => {
        const itemMap = {
          costo: item.costo,
          idUtente: item.utente.id,
          descrizione: item.descrizione,
        };

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
      list: (pageIndex: number = 1, limit: number, query: string) => `/impianti?page=${pageIndex}&limit=${limit}&query=${query}`,
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
    },
  },

  collaborators: {
    routes: {
      list: (pageIndex: number = 1, limit: number, query: string) => `/users/ruoli/2?page=${pageIndex}&limit=${limit}&query=${query}`,
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

      save: async (item: any) => {
        const itemForSave = {
          ...item,
          ruoli: [2],
        };

        return fetchJson(`/users/${item.id > 0 ? item.id : ""}`, {
          method: item.id > 0 ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(itemForSave),
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

export const useCustomers = (pageIndex: number, limit: number, query: string) => {
  const { data, error } = useSWR(mpApi.customers.routes.list(pageIndex, limit, query), mpApi.customers.actions.listFetcher);
  return { data, error };
};

export const useQuotes = (pageIndex: number, limit: number, query: string) => {
  const { data, error } = useSWR(mpApi.quotes.routes.list(pageIndex, limit, query), mpApi.quotes.actions.listFetcher);
  return { data, error };
};

export const usePackages = () => {
  const { data, error } = useSWR(mpApi.packages.routes.list, mpApi.packages.actions.listFetcher);
  return { data, error };
};

export const useInstallations = (pageIndex: number, limit: number, query: string) => {
  const { data, error } = useSWR(mpApi.installations.routes.list(pageIndex, limit, query), mpApi.installations.actions.listFetcher);
  return { data, error };
};

export const useCollaborators = (pageIndex: number, limit: number, query: string) => {
  const { data, error } = useSWR(mpApi.collaborators.routes.list(pageIndex, limit, query), mpApi.collaborators.actions.listFetcher);
  return { data, error };
};
