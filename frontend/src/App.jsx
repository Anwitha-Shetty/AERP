import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ProtectedRoute from "./utils/ProtectedRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import VenderTypes from "./pages/admin/vendors/VenderTypes";
import MaterialGroups from "./pages/admin/materials/MaterialGroups";
import MaterialCategories from "./pages/admin/materials/MaterialCategories";
import MaterialTypes from "./pages/admin/materials/MaterialTypes";
import MaterialMaster from "./pages/admin/materials/MaterialMaster";
import CreateUser from "./pages/admin/enterprisestructure/CreateUser";
import ViewUsers from "./pages/admin/enterprisestructure/ViewUsers";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/admin/home" element={<AdminDashboard />} />

        {/* Enterprise Structure */}
        <Route path="/admin/users/create" element={<CreateUser />} />
        <Route path="/admin/users/view" element={<ViewUsers />} />

        {/* Vendors */}
        <Route path="/admin/vender-types" element={<VenderTypes />} />

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
