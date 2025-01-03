/// <reference types="vite/client" />

import axios, { AxiosInstance } from "axios";

const Instance_YT: AxiosInstance = axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청마다 API 키를 추가하는 인터셉터 설정
Instance_YT.interceptors.request.use((config) => {
  config.params = {
    ...config.params, // 기존 params 유지
    part: "snippet",
    key: import.meta.env.VITE_YT_DATA_API_KEY, // API 키 추가
  };
  return config;
});

export default Instance_YT;
