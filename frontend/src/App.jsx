import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ProtectedRoute from "./utils/ProtectedRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import MaterialGroups from "./pages/admin/materials/MaterialGroups";
import MaterialCategories from "./pages/admin/materials/MaterialCategories";
import MaterialTypes from "./pages/admin/materials/MaterialTypes";
import MaterialMaster from "./pages/admin/materials/MaterialMaster";
import CreateUser from "./pages/admin/enterprisestructure/CreateUser";
import ViewUsers from "./pages/admin/enterprisestructure/ViewUsers";
import CreateCompany from "./pages/admin/enterprisestructure/CreateCompany";
import ViewCompany from "./pages/admin/enterprisestructure/ViewCompany";
import ViewVenderTypes from "./pages/admin/vendors/ViewVenderTypes";
import CreateVenderType from "./pages/admin/vendors/CreateVenderType";
import CreateVendor from "./pages/admin/vendors/CreateVendor";
import ViewVendors from "./pages/admin/vendors/ViewVendors";
import CreateVendorMaterial from "./pages/admin/vendors/CreateVendorMaterial";
import ViewVendorMaterials from "./pages/admin/vendors/ViewVendorMaterials";
import CreateVendorDeclaration from "./pages/admin/vendors/CreateVendorDeclaration";
import ViewVendorDeclarations from "./pages/admin/vendors/ViewVendorDeclarations";
import CreateVendorQuotation from "./pages/admin/vendors/CreateVendorQuotation";
import ViewVendorQuotations from "./pages/admin/vendors/ViewVendorQuotations";
import CreateVendorKYCStatus from "./pages/admin/vendors/CreateVendorKYCStatus";
import ViewVendorKYCStatus from "./pages/admin/vendors/ViewVendorKYCStatus";
import CreateVendorKYC from "./pages/admin/vendors/CreateVendorKYC";
import ViewVendorKYC from "./pages/admin/vendors/ViewVendorKYC";
import VendorMaster from "./pages/admin/vendors/VendorMaster";
import CreateCurrency from "./pages/admin/basicsettings/CreateCurrency";
import ViewCurrency from "./pages/admin/basicsettings/ViewCurrency";
import CreateCountry from "./pages/admin/basicsettings/CreateCountry";
import ViewCountry from "./pages/admin/basicsettings/ViewCountry";
import CreateState from "./pages/admin/basicsettings/CreateState";
import ViewState from "./pages/admin/basicsettings/ViewState";
import CreateLanguage from "./pages/admin/basicsettings/CreateLanguage";
import ViewLanguage from "./pages/admin/basicsettings/ViewLanguage";
import CreateCompanystatus from "./pages/admin/basicsettings/CreateCompanystatus";
import ViewCompanyStatus from "./pages/admin/basicsettings/ViewCompanystatus";
import CreateUserStatus from "./pages/admin/basicsettings/CreateUserStatus";
import ViewUserStatus from "./pages/admin/basicsettings/ViewUserStatus";
import CreateCity from "./pages/admin/basicsettings/CreateCity";
import ViewCity from "./pages/admin/basicsettings/ViewCity";
import CreateUsertype from "./pages/admin/basicsettings/CreateUsertype";
import ViewUsertype from "./pages/admin/basicsettings/ViewUsertype";
import CreatePosition from "./pages/admin/basicsettings/CreatePosition";
import ViewPosition from "./pages/admin/basicsettings/ViewPosition";
import CreateBusinessarea from "./pages/admin/basicsettings/CreateBusinessarea";
import ViewBusinessarea from "./pages/admin/basicsettings/ViewBusinessarea";
import CreateBusinesssector from "./pages/admin/basicsettings/CreateBusinesssector";
import ViewBusinesssector from "./pages/admin/basicsettings/ViewBusinesssector";
import CreateWarehousetype from "./pages/admin/warehouse/CreateWarehousetype";
import ViewWarehousetypes from "./pages/admin/warehouse/ViewWarehousetypes";
import WarehouseMaster from "./pages/admin/warehouse/WarehouseMaster";
import CreateStoragelocationtype from "./pages/admin/warehouse/CreateStoragelocationtype";
import ViewStoragelocationtype from "./pages/admin/warehouse/ViewStoragelocationtype";
import CreateMaterialmovement from "./pages/admin/warehouse/CreateMaterialmovement";
import ViewMaterialmovements from "./pages/admin/warehouse/ViewMaterialmovement";
import CreateTransactionstatus from "./pages/admin/warehouse/CreateTransactionstatus";
import VendorProfile from "./pages/admin/vendors/VendorProfile";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/admin/home" element={<AdminDashboard />} />

        {/* Basic Settings */}
        <Route path="/admin/currency/create" element={<CreateCurrency />} />
        <Route path="/admin/currency/view" element={<ViewCurrency />} />
        <Route path="/admin/country/create" element={<CreateCountry />} />
        <Route path="/admin/country/view" element={<ViewCountry />} />
        <Route path="/admin/state/create" element={<CreateState />} />
        <Route path="/admin/state/view" element={<ViewState />} />
        <Route path="/admin/language/create" element={<CreateLanguage />} />
        <Route path="/admin/language/view" element={<ViewLanguage />} />
        <Route
          path="/admin/company_status/create"
          element={<CreateCompanystatus />}
        />
        <Route
          path="/admin/company_status/view"
          element={<ViewCompanyStatus />}
        />
        <Route
          path="/admin/user_status/create"
          element={<CreateUserStatus />}
        />
        <Route path="/admin/user_status/view" element={<ViewUserStatus />} />
        <Route path="/admin/city/create" element={<CreateCity />} />
        <Route path="/admin/city/view" element={<ViewCity />} />
        <Route path="/admin/user_type/create" element={<CreateUsertype />} />
        <Route path="/admin/user_type/view" element={<ViewUsertype />} />
        <Route path="/admin/position/create" element={<CreatePosition />} />
        <Route path="/admin/position/view" element={<ViewPosition />} />
        <Route
          path="/admin/business_area/create"
          element={<CreateBusinessarea />}
        />
        <Route
          path="/admin/business_area/view"
          element={<ViewBusinessarea />}
        />
        <Route
          path="/admin/business_sector/create"
          element={<CreateBusinesssector />}
        />
        <Route
          path="/admin/business_sector/view"
          element={<ViewBusinesssector />}
        />

        {/* Enterprise Structure */}
        <Route path="/admin/users/create" element={<CreateUser />} />
        <Route path="/admin/users/view" element={<ViewUsers />} />
        <Route path="/admin/company/create" element={<CreateCompany />} />
        <Route path="/admin/company/view" element={<ViewCompany />} />
        {/* Vendors */}
        <Route
          path="/admin/vendor-types/create"
          element={<CreateVenderType />}
        />
        <Route path="/admin/vendor-types/view" element={<ViewVenderTypes />} />
        <Route path="/admin/vendor/create" element={<CreateVendor />} />
        <Route path="/admin/vendors/view" element={<ViewVendors />} />
        <Route
          path="/admin/vendor-material/create"
          element={<CreateVendorMaterial />}
        />
        <Route
          path="/admin/vendor-materials/view"
          element={<ViewVendorMaterials />}
        />
        <Route
          path="/admin/vendor-declaration/create"
          element={<CreateVendorDeclaration />}
        />
        <Route
          path="/admin/vendor-declarations/view"
          element={<ViewVendorDeclarations />}
        />
        <Route
          path="/admin/vendor-quotation/create"
          element={<CreateVendorQuotation />}
        />
        <Route
          path="/admin/vendor-quotations/view"
          element={<ViewVendorQuotations />}
        />
        <Route
          path="/admin/vendor-kyc-status/create"
          element={<CreateVendorKYCStatus />}
        />
        <Route
          path="/admin/vendor-kyc-status/view"
          element={<ViewVendorKYCStatus />}
        />
        <Route path="/admin/vendor-kyc/create" element={<CreateVendorKYC />} />
        <Route path="/admin/vendor-kyc/view" element={<ViewVendorKYC />} />
        <Route path="/admin/vendor-master" element={<VendorMaster />} />
        <Route path="/admin/vendors/profile/:id" element={<VendorProfile />} />

        {/* Materials */}
        <Route path="/admin/material-groups" element={<MaterialGroups />} />
        <Route
          path="/admin/material-categories"
          element={<MaterialCategories />}
        />
        <Route path="/admin/material-types" element={<MaterialTypes />} />
        <Route path="/admin/materials" element={<MaterialMaster />} />

        {/*Warehouse */}
        <Route
          path="/admin/warehouse_type/create"
          element={<CreateWarehousetype />}
        />
        <Route
          path="/admin/warehouse_type/view"
          element={<ViewWarehousetypes />}
        />
        <Route path="/admin/warehouse-master" element={<WarehouseMaster />} />
        <Route
          path="/admin/storage_location_type/create"
          element={<CreateStoragelocationtype />}
        />
        <Route
          path="/admin/storage_location_type/view"
          element={<ViewStoragelocationtype />}
        />
        <Route
          path="/admin/material_movement/create"
          element={<CreateMaterialmovement />}
        />
        <Route
          path="/admin/material_movement/view"
          element={<ViewMaterialmovements />}
        />
      </Route>
      <Route
        path="/admin/transaction_status/create"
        element={<CreateTransactionstatus />}
      />
    </Routes>
  );
}

export default App;
