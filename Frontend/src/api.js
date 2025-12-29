import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || "",
});

export async function uploadReading(formData) {
  // expected backend endpoint: POST /api/readings
  return api.post("/api/readings", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}

export default api;
