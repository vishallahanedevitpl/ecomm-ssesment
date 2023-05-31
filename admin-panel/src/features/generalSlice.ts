import { createSlice } from "@reduxjs/toolkit";
import { UserModel } from "../models/data";
type GeneralSlice = {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  alertMessage: string;
  user: UserModel | null;
};
const initialState: GeneralSlice = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  alertMessage: "",
  user: null,
};
const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.isError = true;
      state.alertMessage = action.payload;
      state.isLoading = false;
    },
    setSuccess: (state, action) => {
      state.isSuccess = true;
      state.alertMessage = action.payload;
      state.isLoading = false;
    },
    setLoggedInUser: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    },
    resetAlert: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.alertMessage = "";
    },
  },
});

export const { setLoading, setError, setSuccess, setLoggedInUser, resetAlert } =
  generalSlice.actions;
export default generalSlice.reducer;
