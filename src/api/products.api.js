import { http } from "./http";

export const productsApi = {
  list: async () => (await http.get("/products")).data,
  categories: async () => (await http.get("/products/categories")).data,
  create: async (payload) => (await http.post("/products", payload)).data,
  update: async (id, payload) => (await http.put(`/products/${id}`, payload)).data,
  remove: async (id) => (await http.delete(`/products/${id}`)).data,
};
