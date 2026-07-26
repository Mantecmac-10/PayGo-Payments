import { api } from "./axios";

export const getBalance = async () => {
  const token = localStorage.getItem("token");

  const { data } = await api.get("/user/balance", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const doTransfer = async (amount: number, username: string) => {
  const token = localStorage.getItem("token");

  const { data } = await api.post(
    "/user/transfer",
    {
      amount,
      to: username,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return data;
};
