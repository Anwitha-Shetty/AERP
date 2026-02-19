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

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/admin/home" element={<AdminDashboard />} />

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

        {/* Materials */}
        <Route path="/admin/material-groups" element={<MaterialGroups />} />
        <Route
          path="/admin/material-categories"
          element={<MaterialCategories />}
        />
        <Route path="/admin/material-types" element={<MaterialTypes />} />
        <Route path="/admin/materials" element={<MaterialMaster />} />
      </Route>
    </Routes>
  );
}

export default App;
