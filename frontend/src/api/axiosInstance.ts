import Axios from "axios";

const axiosInstance = Axios.create({
  // baseURL: "http://54.64.196.21:3001", // ベースURLを設定
  baseURL: process.env.REACT_APP_API_BASE_URL || "http://localhost:3001", // ベースURLを設定
  timeout: 30000, // タイムアウトの設定（必要に応じて変更）
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
