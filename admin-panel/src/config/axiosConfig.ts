import axios from "axios";
import { useDispatch } from "react-redux";
import { setLoading, setLoggedInUser } from "../features/generalSlice";
import { history } from "../helpers/common";
import { store } from "../store";

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = JSON.parse(localStorage.getItem("user") || "{}")?.accessToken;

    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use((response) => {
  if (response.data.status === 401) {
    localStorage.removeItem("user");
    store.dispatch(setLoading(false));
    store.dispatch(setLoggedInUser(null));
    history.navigate("/login");
    return response;
  }
  return response;
});
