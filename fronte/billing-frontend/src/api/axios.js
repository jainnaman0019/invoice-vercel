import axios from "axios";

const api = axios.create({
  baseURL: "https://invoice-vercel-lqj5.vercel.app/api",
  withCredentials: true,
});

export default api;