import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rolePermissions: [],
  singleRole: {},
  roleList: [],
  bulkPermissionList: [],
};

const dynamicData = createSlice({
  name: "dynamicData",
  initialState,
  reducers: {
    setPermissions: (state, action) => {
      state.rolePermissions = action.payload;
    },
    setSingleRole: (state, action) => {
      state.singleRole = action.payload;
    },
    setRoleList: (state, action) => {
      state.roleList = action.payload;
    },
    setBulkPermissionList: (state, action) => {
      state.bulkPermissionList = action.payload;
    },
  },
});

export const {
  setPermissions,
  setSingleRole,
  setRoleList,
  setBulkPermissionList,
} = dynamicData.actions;
export default dynamicData.reducer;
