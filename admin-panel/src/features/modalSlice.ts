import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  formModalShow: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setFormModalShow: (state, action) => {
      state.formModalShow = action.payload;
    },
  },
});

export const { setFormModalShow } = modalSlice.actions;
export default modalSlice.reducer;
