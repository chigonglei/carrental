import {BrowserRouter, Routes, Route, } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import OwnerDashboard from "./pages/owner/OwnerDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import RoleProtectedRoute from "./components/RoleProtectedRoute";
import Profile from "./pages/Profile";
import AddCar from "./pages/owner/AddCar";

function App() {

  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

<Route
  path="/owner/dashboard"
  element={
    <RoleProtectedRoute
      allowedRoles={[
        "owner"
      ]}
    >
      <OwnerDashboard />
    </RoleProtectedRoute>
  }
/>

<Route
  path="/admin/dashboard"
  element={
    <RoleProtectedRoute
      allowedRoles={[
        "admin"
      ]}
    >
      <AdminDashboard />
    </RoleProtectedRoute>
  }
/>


<Route
  path="/profile"
  element={
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  }
/>

<Route
  path="/owner/add-car"
  element={
    <RoleProtectedRoute
      allowedRoles={[
        "owner"
      ]}
    >
      <AddCar />
    </RoleProtectedRoute>
  }
/>

      </Routes>

    </BrowserRouter>
  );
}

export default App;