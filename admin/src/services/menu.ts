import {
  metaData,
  Menu,
  MenuRequest,
  Menus,
} from "@/types/interface";
import api from "../utils/request";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";

export const menuService = {
  getAll: async (params?: {
    page?: number;
    size?: number;
  }): Promise<{
    data: Menus;
    meta: metaData;
  }> => {
    const res = await api.get("/api/menu", { params });
    return res.data;
  },

  getById: async (id: string): Promise<Menu> => {
    const res = await api.get(`/api/menu/${id}`);
    return res.data;
  },

  // CREATE
  create: async (data: MenuRequest): Promise<void> => {
    await api.post("/api/menu", data);
  },

  // UPDATE
  update: async (id: string, data: MenuRequest): Promise<Menu> => {
    const res = await api.put(`/api/menu/${id}`, data);
    return res.data;
  },

  // DELETE
  delete: async (id: string): Promise<void> => {
    await api.delete(`/api/menu/${id}`);
  },
};

export const useMenus = () => {
  return useQuery({
    queryKey: ["menus", { page: 1, size: 1000 }],
    queryFn: () => menuService.getAll(),
  });
};

export const useMenu = (id: string) => {
  return useQuery({
    queryKey: ["menu", id],
    queryFn: () => menuService.getById(id),
    enabled: !!id,
  });
};

export const useCreateMenu = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: MenuRequest) => menuService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["menus"] });
    },
  });
};

export const useUpdateMenu = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: MenuRequest }) =>
      menuService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["menus"] });
    },
  });
};

export const useDeleteMenu = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => menuService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["menus"] });
    },
  });
};
