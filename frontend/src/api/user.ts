import { api } from "./axios";

export const getUser = async (filter: string) => {
  const response = await api.get(`/user/bulk/?filter=${encodeURIComponent(filter)}`);
  return response.data
};
