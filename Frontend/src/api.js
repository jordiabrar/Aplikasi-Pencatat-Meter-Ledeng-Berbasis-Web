import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE || "http://localhost:5000";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

export { API_BASE_URL };

export async function uploadReading(formData) {
  // expected backend endpoint: POST /api/readings
  return api.post("/api/readings", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}

export default api;
