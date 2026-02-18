import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import sidebarReducer from "./slices/sidebarSlice";
import userReducer from "./slices/userSlice";
import companyReducer from "./slices/companySlice";
import vendorTypesReducer from "./slices/vendorTypesSlice";
import vendorReducer from "./slices/vendorSlice";
import vendorMaterialReducer from "./slices/vendorMaterialSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    sidebar: sidebarReducer,
    users: userReducer,
    companies: companyReducer,
    vendortypes: vendorTypesReducer,
    vendors: vendorReducer,
    vendormaterials: vendorMaterialReducer,
  },
});

export default store;
