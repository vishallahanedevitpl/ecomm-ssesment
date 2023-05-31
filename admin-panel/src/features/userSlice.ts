import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userList: [],
  singleUser: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserList: (state, action) => {
      state.userList = action.payload;
    },
    setSingleUser: (state, action) => {
      state.singleUser = action.payload;
    },
  },
});

export const { setUserList, setSingleUser } = userSlice.actions;
export default userSlice.reducer;
