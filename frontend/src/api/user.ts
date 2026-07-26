import { api } from "./axios";

export const getUser = async (filter: string) => {
  const response = await api.get(
    `/user/bulk/?filter=${encodeURIComponent(filter)}`,
  );
  return response.data;
};

interface UpdateData {
  password: string;
  firstName: string;
  LastName: string;
}
export const updateUser = async (data: UpdateData) => {
  const token = localStorage.getItem("token");

  const response = await api.patch("/user/update", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const verifyUser = async (currPassword: string) => {
  const token = localStorage.getItem("token");

  const { data } = await api.post(
    "/user/verify-pass",
    {
      currPassword,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return data;
};
