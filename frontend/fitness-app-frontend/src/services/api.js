import axios from "axios";

const API_URL = "http://127.0.0.1:8080/api";

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const id = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  if (id) {
    config.headers["x-user-id"] = id;
  }
  return config;
});

export const getActivities = () => api.get("/activities");
export const addActivity = (activity) => api.post("/activities", activity);
export const getActivityDetail = (id) =>
  api.get(`/recommendation/activity/${id}`);
