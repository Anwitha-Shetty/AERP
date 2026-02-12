import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  openMenus: {},
  searchCode: "",
  codeMap: {},
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    toggleMenu: (state, action) => {
      const id = action.payload;
      state.openMenus[id] = !state.openMenus[id];
    },
    setSearchCode: (state, action) => {
      state.searchCode = action.payload;
    },
    clearSearchCode: (state) => {
      state.searchCode = "";
    },
    setOpenMenus: (state, action) => {
      state.openMenus = action.payload;
    },
    setCodeMap: (state, action) => {
      state.codeMap = action.payload;
    },
  },
});

export const {
  toggleMenu,
  setSearchCode,
  clearSearchCode,
  setOpenMenus,
  setCodeMap,
} = sidebarSlice.actions;

export default sidebarSlice.reducer;
