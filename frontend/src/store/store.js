import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import sidebarReducer from "./slices/sidebarSlice";
import userReducer from "./slices/userSlice";
import companyReducer from "./slices/companySlice";
import vendorReducer from "./slices/venderSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    sidebar: sidebarReducer,
    users: userReducer,
    companies: companyReducer,
    vendortypes: vendorReducer,
  },
});

export default store;
