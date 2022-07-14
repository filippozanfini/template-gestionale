import useSWR from 'swr'
import { User } from '../types/User'
import Cookies from './cookies';

import fetchJson from './fetchJson'

export const mpApi = {
  user: {
    me: '/user/me',
    login: async (username: string, password: string) =>{
      let data:any = await fetchJson('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      if( data?.access_token ){
        Cookies.set("token", data?.access_token);
      }
      return {
          ...data.user,
          abilities: data.abilities,
          roles: data.roles
      };
    },
  },
}
