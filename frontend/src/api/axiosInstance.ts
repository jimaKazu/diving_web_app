import Axios from "axios";

const axiosInstance = Axios.create({
  baseURL: "http://localhost:3001", // ベースURLを設定
  timeout: 10000, // タイムアウトの設定（必要に応じて変更）
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
