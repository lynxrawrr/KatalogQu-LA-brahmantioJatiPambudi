import { useEffect, useMemo, useState } from "react";
import { authApi } from "../api/auth.api.js";

function getInitialAuth() {
  const token = localStorage.getItem("token") || "";
  const username = localStorage.getItem("username") || "";
  return { token, username };
}

export default function useAuth() {
  const [auth, setAuth] = useState(getInitialAuth);

  const isAuthed = useMemo(() => Boolean(auth.token), [auth.token]);

  useEffect(() => {
    if (auth.token) localStorage.setItem("token", auth.token);
    else localStorage.removeItem("token");

    if (auth.username) localStorage.setItem("username", auth.username);
    else localStorage.removeItem("username");
  }, [auth.token, auth.username]);

  async function login({ username, password }) {
    const res = await authApi.login({ username, password });
    const token = res?.token || "";
    if (!token) throw new Error("Login gagal: token tidak ditemukan.");
    setAuth({ token, username: String(username || "").trim() });
    return token;
  }

  function logout() {
    setAuth({ token: "", username: "" });
  }

  return { ...auth, isAuthed, login, logout, setAuth };
}
