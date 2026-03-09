import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import sidebarReducer from "./slices/sidebarSlice";
import userReducer from "./slices/userSlice";
import companyReducer from "./slices/companySlice";
import vendorTypesReducer from "./slices/vendorTypesSlice";
import vendorReducer from "./slices/vendorSlice";
import vendorMaterialReducer from "./slices/vendorMaterialSlice";
import vendorDeclarationReducer from "./slices/vendorDeclarationSlice";
import vendorQuotationReducer from "./slices/vendorQuotationSlice";
import vendorKYCStatusReducer from "./slices/vendorKYCStatusSlice";
import vendorKYCReducer from "./slices/vendorKYCSlice";
import currencyReducer from "./slices/currencySlice";
import countryReducer from "./slices/countrySlice";
import stateReducer from "./slices/stateSlice";
import languagesReducer from "./slices/languageSlice";
import companystatusesReducer from "./slices/companystatusSlice";
import userstatusesReducer from "./slices/userstatusSlice";
import citiesReducer from "./slices/citySlice";
import usertypesReducer from "./slices/usertypeSlice";
import positionsReducer from "./slices/positionSlice";
import businessareasReducer from "./slices/businessareaSlice";
import businesssectorsReducer from "./slices/businesssectorSlice";
import warehousetypesReducer from "./slices/warehousetypeSlice";
import warehouseReducer from "./slices/warehouseSlice";
import storagelocationtypesReducer from "./slices/storagelocationtypeSlice";
import materialmovementsReducer from "./slices/materialmovementSlice";
import transactionstatusesReducer from "./slices/transactionstatusSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    sidebar: sidebarReducer,
    users: userReducer,
    companies: companyReducer,
    vendortypes: vendorTypesReducer,
    vendors: vendorReducer,
    vendorMaterials: vendorMaterialReducer,
    vendorDeclarations: vendorDeclarationReducer,
    vendorQuotations: vendorQuotationReducer,
    vendorKYCStatus: vendorKYCStatusReducer,
    vendorKYC: vendorKYCReducer,
    currencies: currencyReducer,
    countries: countryReducer,
    states: stateReducer,
    languages: languagesReducer,
    companystatuses: companystatusesReducer,
    userstatuses: userstatusesReducer,
    cities: citiesReducer,
    usertypes: usertypesReducer,
    positions: positionsReducer,
    businessareas: businessareasReducer,
    businesssectors: businesssectorsReducer,
    warehousetypes: warehousetypesReducer,
    warehouses: warehouseReducer,
    storagelocationtypes: storagelocationtypesReducer,
    materialmovements: materialmovementsReducer,
    transactionstatuses: transactionstatusesReducer,
  },
});

export default store;
