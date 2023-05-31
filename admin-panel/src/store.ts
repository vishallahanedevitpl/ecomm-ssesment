import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";
import generalReducer from "./features/generalSlice";
import categoryReducer from "./features/categorySlice";
import modalReducer from "./features/modalSlice";
import dynamicDataReducer from "./features/dynamicDataSlice";
import userReducer from "./features/userSlice";
import productSlice from "./features/productSlice";
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["general"],
};

const rootReducer = combineReducers({
  general: generalReducer,
  category: categoryReducer,
  modal: modalReducer,
  dynamicData: dynamicDataReducer,
  user: userReducer,
  product: productSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store);
