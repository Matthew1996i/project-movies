import axios from "axios";

function setupAPIClient() {
  const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
  });

  return api;
}

export const api = setupAPIClient();
