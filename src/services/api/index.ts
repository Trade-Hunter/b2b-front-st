import axios from "axios";

const authHeader = () => {
  const obj = localStorage.getItem("auth");
  const auth = obj ? JSON.parse(obj) : undefined;
  return {
    "user-token": auth?.auth.token,
  };
};

const instance = axios.create({
  baseURL: "http://192.168.1.3:4024",
  //baseURL: "http://192.168.15.5:3921",
  //baseURL: "http://192.168.15.5:3921",
  //baseURL: import.meta.env.VITE_API_HOST,
  timeout: 30000,
  headers: authHeader(),
});

export default instance;
