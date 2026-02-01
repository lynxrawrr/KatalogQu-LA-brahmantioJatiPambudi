import { http } from "./http";

export const authApi = {
  login: async ({ username, password }) =>
    (await http.post("/auth/login", { username, password })).data,
};
