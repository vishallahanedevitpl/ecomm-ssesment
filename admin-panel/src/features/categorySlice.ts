import { createSlice } from "@reduxjs/toolkit";

// type CategorySlice = {}
const initialState = {
  categories: [],
  category: {
    id: null,
    catName: null,
    catImage: null,
  },
  subCategories: [],
  subCategory: {
    id: null,
    categoryId: null,
    subCatName: null,
    subCatImage: null,
  },
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setSubCategory: (state, action) => {
      state.subCategory = action.payload;
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setSubCategories: (state, action) => {
      state.subCategories = action.payload;
    },
  },
});

export const { setCategory, setSubCategory, setCategories, setSubCategories } =
  categorySlice.actions;

export default categorySlice.reducer;
