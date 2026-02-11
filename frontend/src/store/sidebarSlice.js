import { createSlice } from "@reduxjs/toolkit";
import mainConfig from "../config/mainConfig";

const flattenConfig = (config) => {
  let map = {};
  config.forEach((menu) => {
    if (menu.code) map[menu.code] = menu.path;
    if (menu.subMenu)
      menu.subMenu.forEach((sub) => {
        if (sub.code) map[sub.code] = sub.path;
      });
  });
  return map;
};

const codeMap = flattenConfig(mainConfig);

const initialState = {
  openMenus: {},
  searchCode: "",
  codeMap,
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
  },
});

export const { toggleMenu, setSearchCode, clearSearchCode, setOpenMenus } =
  sidebarSlice.actions;

export default sidebarSlice.reducer;
