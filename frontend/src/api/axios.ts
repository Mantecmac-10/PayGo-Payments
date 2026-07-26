import axios from "axios";
import { BACKEND_URL } from "../config/constants";

export const api = axios.create({
  baseURL: `${BACKEND_URL}/api/v1`,
  withCredentials: true,
});
