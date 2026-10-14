import api from "./api";
import { useQuery, useMutation } from "@tanstack/react-query";

export const categoryService = {
  getAll: async () => {
    const res = await api.get("/api/category");
    return res.data;
  },

  getById: async (id) => {
    const res = await api.get(`/api/category/${id}`);
    return res.data;
  },
};

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => categoryService.getAll(),
  });
};

export const useCategory = (id) => {
  return useQuery({
    queryKey: ["category", id],
    queryFn: () => categoryService.getById(id),
    enabled: !!id,
  });
};

export const menuService = {
  getAll: async () => {
    const res = await api.get("/api/menu", { params: { page: 1, size: 1000 } });
    return res.data;
  },

  getById: async (id) => {
    const res = await api.get(`/api/menu/${id}`);
    return res.data;
  },
};

export const useMenus = () => {
  return useQuery({
    queryKey: ["menus", { page: 1, size: 1000 }],
    queryFn: () => menuService.getAll(),
  });
};

export const useMenu = (id) => {
  return useQuery({
    queryKey: ["menu", id],
    queryFn: () => menuService.getById(id),
    enabled: !!id,
  });
};

export const productService = {
  getAll: async () => {
    const res = await api.get("/api/product", {
      params: { page: 0, size: 1000 },
    });
    return res.data;
  },

  getById: async (id) => {
    const res = await api.get(`/api/product/${id}`);
    return res.data;
  },
};

export const useProducts = () => {
  return useQuery({
    queryKey: ["products", { page: 1, size: 1000 }],
    queryFn: () => productService.getAll(),
  });
};

export const useProduct = (id) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => productService.getById(id),
    enabled: !!id,
  });
};

export const reservationService = {
  create: async (data) => {
    const res = await api.post("/api/reservation", data);
    return res.data;
  },
};

export const useCreateReservation = () => {
  return useMutation({
    mutationFn: (data) => reservationService.create(data),
  });
};
