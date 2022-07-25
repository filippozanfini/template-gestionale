import useSWR from "swr";
import { Customer } from "../types/Customer";
import Cookies from "./cookies";
import fetchJson from "./fetchJson";

export const mpApi = {
<<<<<<< HEAD
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
			list: (pageIndex: number = 1, limit: number = 10) =>
				`/servizi?page=${pageIndex}&limit=${limit}`,
		},
		actions: {
			listFetcher: (input: RequestInfo, init?: RequestInit) =>
				fetchJson(input, init).then((data: any) =>
					data.map((item: any) => {
						return {
							title: item.nome,
							description: item.descrizione,
							id: item.id,
							category: item.costo + "€",
						};
					})
				),

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
				if (
					confirm(
						"Si conferma la rimozione del servizio? L'azione non può essere annullata."
					)
				) {
					let data: any = await fetchJson(`/servizi/${id}`, {
						method: "DELETE",
						headers: { "Content-Type": "application/json" },
					});
				}
			},
		},
	},

	customers: {
		routes: {
			list: (pageIndex: number = 1) => `/users?page=${pageIndex}`,
		},
		actions: {
			listFetcher: (input: RequestInfo, init?: RequestInit) =>
				fetchJson(input, init).then((data: any) =>
					data.content.map((item: Customer) => {
						return new Customer(item);
					})
				),
		},
	},
};

export const useUser = () => {
	const { data: user, error } = useSWR(
		mpApi.user.routes.me,
		mpApi.user.actions.login
	);
	return { user, error };
};

export const useServices = () => {
	const { data: services, error } = useSWR(
		mpApi.services.routes.list,
		mpApi.services.actions.listFetcher
	);
	return { services, error };
};

export const useService = (id: number) => {
	const { data: service, error } = useSWR(
		mpApi.services.routes.item(id),
		mpApi.services.actions.item
	);
	return { service, error };
};
=======
  user: {
    routes: {
      me: '/users/me',
    },
    actions: {
      login: async (username: string, password: string) => {
        let data: any = await fetchJson('/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: username,
            password: password,
          }),
        })
        if (data?.token) {
          Cookies.set('token', data?.token)
        }
        return {
          ...data,
        }
      },
    },
  },
  services: {
    routes: {
      item: (id: number) => (id < 1 ? `` : `/servizi/${id}`),
      list: (pageIndex: number = 1, limit: number = 10) =>
        `/servizi?page=${pageIndex}&limit=${limit}`,
    },
    actions: {
      listFetcher: (input: RequestInfo, init?: RequestInit) =>
        fetchJson(input, init).then((data: any) =>
          (data && data.content) ? data.content.map((item: any) => {
            return {
              title: item.nome,
              description: item.descrizione,
              id: item.id,
              category: item.costo + '€',
            }
          }) : [],
        ),
>>>>>>> dev

export const useCustomers = (pageIndex: number) => {
	const { data: customers, error } = useSWR(
		mpApi.customers.routes.list(pageIndex),
		mpApi.customers.actions.listFetcher
	);
	return { customers, error };
};
