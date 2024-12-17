/// <reference types="vite/client" />

import axios, { AxiosInstance } from "axios";

// AXIOS 인스턴스 생성

const Instance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5173/api",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default Instance;
