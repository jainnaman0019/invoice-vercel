import axios from "axios";

const api = axios.create({
  baseURL: "https://invoice-vercel-thcc.vercel.app/api",
  withCredentials: true,
});

export default api;