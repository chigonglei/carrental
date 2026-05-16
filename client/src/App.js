import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import CarDetails
from "./pages/CarDetails";

import MyBookings
from "./pages/MyBookings";


import Home
from "./pages/Home";

import Bookings
from "./pages/owner/Bookings";

import Login
from "./pages/Login";

import Register
from "./pages/Register";

import OwnerDashboard
from "./pages/owner/OwnerDashboard";

import AdminDashboard
from "./pages/admin/AdminDashboard";

import ProtectedRoute
from "./components/ProtectedRoute";

import RoleProtectedRoute
from "./components/RoleProtectedRoute";

import Profile
from "./pages/Profile";

import AddCar
from "./pages/owner/AddCar";

import Cars
from "./pages/Cars";

import MyCars
from "./pages/owner/MyCars";

import EditCar
from "./pages/owner/EditCar";

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
          path="/cars"
          element={<Cars />}
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>

              <Profile />

            </ProtectedRoute>
          }
        />

        {/* Owner Dashboard */}

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

        {/* Add Car */}

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

        {/* My Cars */}

        <Route
          path="/owner/my-cars"
          element={
            <RoleProtectedRoute
              allowedRoles={[
                "owner"
              ]}
            >

              <MyCars />

            </RoleProtectedRoute>
          }
        />

        {/* Admin */}

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
  path="/cars/:id"
  element={<CarDetails />}
/>
        <Route
          path="/owner/bookings"
          element={
            <RoleProtectedRoute
              allowedRoles={[
                "owner"
              ]}
            >

              <Bookings />

            </RoleProtectedRoute>
          }
        />

        <Route
  path="/owner/edit-car/:id"
  element={
    <RoleProtectedRoute
      allowedRoles={[
        "owner"
      ]}
    >
      <EditCar />
    </RoleProtectedRoute>
  }
/>

        <Route
  path="/my-bookings"
  element={
    <RoleProtectedRoute
      allowedRoles={[
        "renter"
      ]}
    >
      <MyBookings />
    </RoleProtectedRoute>
  }
/>

      </Routes>

    </BrowserRouter>

  );

}

export default App;