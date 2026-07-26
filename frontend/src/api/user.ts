import { api } from "./axios";

export const getUser = async (filter: string) => {
  const response = await api.get(
    `/user/bulk/?filter=${encodeURIComponent(filter)}`,
  );
  return response.data;
};

interface updateDate {
  oldPassword: string;
  newPassword: string;
  firstName: string;
  LastName: string;
}
export const updateUser = async (data: updateDate) => {
  const token = localStorage.getItem("token");

  const response = await api.patch("/user/update", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const verifyUser = async (password: string) => {
  const token = localStorage.getItem("token");

  const { data } = await api.post(
    "/user/verify-pass",
    {
      password,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return data;
};
