import { api } from "./axios";

interface SignupData {
  username: string;
  email: string;
  password: string;
  firstName: string;
  LastName: string;
}

export const signup = async (data: SignupData) => {
  const response = await api.post("/user/signup", data);

  return response.data;
};

interface SigninData {
  username: string;
  password: string;
}
export const signin = async (data: SigninData) => {
  const response = await api.post("/user/signin", data);

  return response.data;
};
