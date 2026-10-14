import { IReservation, IReservationRequest, metaData } from "@/types/interface";
import api from "../utils/request";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";

export const reservationService = {
  getAll: async (params?: {
    page?: number;
    size?: number;
  }): Promise<{
    data: IReservation[];
    meta: metaData;
  }> => {
    const res = await api.get("/api/reservation", { params });
    return res.data;
  },

  getById: async (id: string): Promise<IReservation> => {
    const res = await api.get(`/api/reservation/${id}`);
    return res.data;
  },

  // UPDATE
  update: async (
    id: string,
    data: IReservationRequest,
  ): Promise<IReservation> => {
    const res = await api.put(`/api/reservation/${id}`, data);
    return res.data;
  },
};

export const useReservations = (page = 0, size = 10) => {
  return useQuery({
    queryKey: ["reservations", { page, size }],
    queryFn: () => reservationService.getAll({ page, size }),
    placeholderData: (previousData) => previousData,
  });
};

export const useReservation = (id: string | undefined) => {
  return useQuery({
    queryKey: ["reservation", id],
    queryFn: () => reservationService.getById(id!),
    enabled: !!id,
  });
};

export const useUpdateReservation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: IReservationRequest }) =>
      reservationService.update(id, data),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["reservations"] });
      queryClient.invalidateQueries({
        queryKey: ["reservation", variables.id],
      });
    },
  });
};
