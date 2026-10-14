import {
  metaData,
  Product,
  ProductCreateRequest,
  Products,
} from "@/types/interface";
import api from "../utils/request";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";

export const productService = {
  getAll: async (params?: {
    page?: number;
    size?: number;
  }): Promise<{
    data: Products;
    meta: metaData;
  }> => {
    const res = await api.get("/api/product", { params });
    return res.data;
  },

  getById: async (id: string): Promise<Product> => {
    const res = await api.get(`/api/product/${id}`);
    return res.data;
  },

  // CREATE
  create: async (data: ProductCreateRequest): Promise<Product> => {
    const res = await api.post("/api/product", data);
    return res.data;
  },

  // UPDATE
  update: async (id: string, data: ProductCreateRequest): Promise<Product> => {
    const res = await api.put(`/api/product/${id}`, data);
    return res.data;
  },

  // DELETE
  delete: async (id: string): Promise<void> => {
    await api.delete(`/api/product/${id}`);
  },
};

export const useProducts = (page = 0, size = 10) => {
  return useQuery({
    queryKey: ["products", { page, size }],
    queryFn: () => productService.getAll({ page, size }),
    placeholderData: (previousData) => previousData,
  });
};

export const useProduct = (id: string) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => productService.getById(id),
    enabled: !!id,
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ProductCreateRequest) => productService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: ProductCreateRequest }) =>
      productService.update(id, data),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["product", variables.id] });
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => productService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};
