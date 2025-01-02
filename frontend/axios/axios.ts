/// <reference types="vite/client" />

import axios, { AxiosInstance } from "axios";

// AXIOS 인스턴스 생성

const Instance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true, // 쿠키 포함
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const refreshAccessToken = async (): Promise<string | null> => {
  try {
    const res = await Instance.post("/auth/refresh", {
      withCredentials: true,
    });
    const { accessToken } = res.data;
    return accessToken;
  } catch (error) {
    console.error(`Access Token 갱신 실패 ${error}`);
    return null;
  }
};

export default Instance;
