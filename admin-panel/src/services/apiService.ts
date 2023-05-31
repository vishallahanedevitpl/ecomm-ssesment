import { axiosInstance } from "../config/axiosConfig";
import { setLoading } from "../features/generalSlice";
import { store } from "../store";

const hitApi = async (
  method: string,
  url: string,
  payload: any = {},
  config: any = {}
) => {
  try {
    let response: any = {};
    switch (method.toUpperCase()) {
      case "GET":
        response = await axiosInstance.get(url);
        break;
      case "POST":
        response = await axiosInstance.post(url, payload, config);
        break;
      case "PATCH":
        response = await axiosInstance.patch(url, payload, config);
        break;
      case "DELETE":
        response = await axiosInstance.delete(url, payload);
        break;
      default:
        response.data = {
          status: "failure",
          message: "You have choose wrong method",
        };
        break;
    }

    return response.data;
  } catch (error: any) {
    store.dispatch(setLoading(false));
    return { status: "failure", message: error.message };
  }
};

export default hitApi;
