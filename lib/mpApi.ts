import useSWR from 'swr'
import { User } from '../types/User'
import Cookies from './cookies'
import fetchJson from './fetchJson'

export const mpApi = {
  user: {
    routes: {
      me: '/users/me'
    },
    actions: {
      login: async (username: string, password: string) => {
        let data: any = await fetchJson('/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: username,
            password: password
          })
        })
        if (data?.token) {
          Cookies.set('token', data?.token)
        }
        return {
          ...data
        }
      }
    }
  },
  services: {
    routes: {
      item: (id: number) => (id < 1 ? `` : `/servizi/${id}`),
      list: (pageIndex: number = 1, limit: number = 10) =>
        `/servizi?page=${pageIndex}&limit=${limit}`
    },
    actions: {
      listFetcher: (input: RequestInfo, init?: RequestInit) =>
        fetchJson(input, init).then((data: any) =>
          data && data.content
            ? data.content.map((item: any) => {
                return {
                  title: item.nome,
                  description: item.descrizione,
                  id: item.id,
                  category: item.costo + '€'
                }
              })
            : []
        ),

      item: async (id: number) => {
        if (id < 1) {
          return null
        }
        return fetchJson(`/servizi/${id}`)
      },
      save: async (item: any) => {
        return fetchJson(`/servizi/${item.id > 0 ? item.id : ''}`, {
          method: item.id > 0 ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(item)
        })
      },
      delete: async (id: number) => {
        if (
          confirm(
            "Si conferma la rimozione del servizio? L'azione non può essere annullata."
          )
        ) {
          let data: any = await fetchJson(`/servizi/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
          })
        }
      }
    }
  },
  packages: {
    routes: {
      item: (id: number) => (id < 1 ? `` : `/pacchetti/${id}`),
      list: (pageIndex: number = 1, limit: number = 10) =>
        `/pacchetti?page=${pageIndex}&limit=${limit}`
    },
    itemFV: (id: number) => (id < 1 ? `` : `/pacchetti/fotovoltaico/${id}`),
    actions: {
      listFetcher: (input: RequestInfo, init?: RequestInit) =>
        fetchJson(input, init).then((data: any) =>
          data && data.content
            ? data.content.map((item: any) => {
                return {
                  title: item.nome,
                  description: item.descrizione,
                  id: item.id,
                  category: item.costo + '€'
                }
              })
            : []
        ),

      item: async (id: number) => {
        if (id < 1) {
          return null
        }
        return fetchJson(`/pacchetti/${id}`)
      },

      itemFV: async (id: number) => {
        if (id < 1) {
          return null
        }
        return fetchJson(`/pacchetti/${id}`)
      },

      save: async (item: any) => {
        return fetchJson(`/pacchetti/${item.id > 0 ? item.id : ''}`, {
          method: item.id > 0 ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(item)
        })
      },

      delete: async (id: number) => {
        if (
          confirm(
            "Si conferma la rimozione del pacchetto? L'azione non può essere annullata."
          )
        ) {
          let data: any = await fetchJson(`/pacchetti/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
          })
        }
      }
    }
  },
  installations: {
    routes: {
      item: (id: number) => (id < 1 ? `` : `/impianti/${id}`),
      list: (pageIndex: number = 1, limit: number = 10) =>
        `/impianti?page=${pageIndex}&limit=${limit}`
    },
    actions: {
      listFetcher: (input: RequestInfo, init?: RequestInit) =>
        fetchJson(input, init).then((data: any) =>
          data && data.content
            ? data.content.map((item: any) => {
                return {
                  title: item.nome,
                  description: item.descrizione,
                  id: item.id,
                  category: item.costo + '€'
                }
              })
            : []
        ),

      item: async (id: number) => {
        if (id < 1) {
          return null
        }
        return fetchJson(`/impianti/${id}`)
      },
      save: async (item: any) => {
        return fetchJson(`/impianti/${item.id > 0 ? item.id : ''}`, {
          method: item.id > 0 ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(item)
        })
      },
      delete: async (id: number) => {
        if (
          confirm(
            "Si conferma la rimozione del servizio? L'azione non può essere annullata."
          )
        ) {
          let data: any = await fetchJson(`/impianti/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
          })
        }
      }
    }
  }
}
