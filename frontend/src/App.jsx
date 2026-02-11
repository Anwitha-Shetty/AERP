import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./utils/ProtectedRoute";
import MaterialGroups from "./pages/materials/MaterialGroups";
import MaterialTypes from "./pages/materials/MaterialTypes";
import MaterialCategories from "./pages/materials/MaterialCategories";
import VenderTypes from "./pages/vendors/VenderTypes";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/admin/home" element={<AdminDashboard />} />

        {/* Vendors */}
        <Route path="/admin/vender-types" element={<VenderTypes />} />

        {/* Materials */}
        <Route path="/admin/material-groups" element={<MaterialGroups />} />
        <Route
          path="/admin/material-categories"
          element={<MaterialCategories />}
        />
        <Route path="/admin/material-types" element={<MaterialTypes />} />
      </Route>
    </Routes>
  );
}

export default App;
