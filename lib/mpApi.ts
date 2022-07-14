import useSWR from 'swr'
import { User } from '../types/User'
import Cookies from './cookies';

import fetchJson from './fetchJson'

export const mpApi = {
  user: {
    me: '/users/me',
    login: async (username: string, password: string) =>{
      let data:any = await fetchJson('/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: username,
          password: password,
        }),
      });
      if( data?.token ){
        Cookies.set("token", data?.token);
      }
      return {
          ...data
      };
    },
  },
}
