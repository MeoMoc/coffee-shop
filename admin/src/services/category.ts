import {
  metaData,
  Category,
  CategoryRequest,
  Categories,
} from "@/types/interface";
import api from "../utils/request";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";

export const categoryService = {
  getAll: async (): Promise<Categories> => {
    const res = await api.get("/api/category");
    return res.data;
  },

  getById: async (id: string): Promise<Category> => {
    const res = await api.get(`/api/category/${id}`);
    return res.data;
  },

  // CREATE
  create: async (data: CategoryRequest): Promise<void> => {
    await api.post("/api/category", data);
  },

  // UPDATE
  update: async (id: string, data: CategoryRequest): Promise<Category> => {
    const res = await api.put(`/api/category/${id}`, data);
    return res.data;
  },

  // DELETE
  delete: async (id: string): Promise<void> => {
    await api.delete(`/api/category/${id}`);
  },
};

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => categoryService.getAll(),
  });
};

export const useCategory = (id: string) => {
  return useQuery({
    queryKey: ["category", id],
    queryFn: () => categoryService.getById(id),
    enabled: !!id,
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CategoryRequest) => categoryService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: CategoryRequest }) =>
      categoryService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => categoryService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};
