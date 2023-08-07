import useSWR from "swr";
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
          ...(data.utente || {}),
        };
      },
    },
    logout: () => {
      Cookies.del("token");
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
};

export const useUser = () => {
  const { data: user, error } = useSWR(mpApi.user.routes.me, mpApi.user.actions.login);
  return { user, error };
};
