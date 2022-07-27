import { useEffect, useState } from "react";
import Router from "next/router";
import { User } from "../types/User";
import useSWR, { mutate } from "swr";
import { mpApi } from "./mpApi";
import Cookies from "./cookies";
import fetchJson from "./fetchJson";

export default function useUser({ redirectTo = "", redirectIfFound = false } = {}) {
  const { data: userData, mutate: mutateUser } = useSWR<any>(mpApi.user.routes.me);
  const [user, setUser] = useState<User>();

  useEffect(() => {
    
    setUser(new User(userData));

    // if no redirect needed, just return (example: already on /dashboard)
    // if user data not yet there (fetch in progress, logged in or not) then don't do anything yet
    if (!redirectTo || !userData) return;
    if (
      // If redirectTo is set, redirect if the user was not found.
      (redirectTo && !redirectIfFound && userData?.id > 0) ||
      // If redirectIfFound is also set, redirect if the user was found
      (redirectIfFound && userData?.id > 0)
    ) {
      Router.push(redirectTo);
    }
  }, [userData, redirectIfFound, redirectTo]);

  return { user, mutateUser };
}
