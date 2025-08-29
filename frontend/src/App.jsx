import React, { Suspense, lazy, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import { useSelector } from "react-redux";
import Preferences from "./components/Preferences";

// Lazy load components
const Login = lazy(() => import("./components/Login"));
const Register = lazy(() => import("./components/Register"));
const Weather = lazy(() => import("./components/Weather"));

// Simple spinner component
const Loader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
  </div>
);


function App() {
  const theme = useSelector((state) => state.preferences.theme);

  useEffect(() => {
    console.log("Applying theme:", theme); // 👈 check
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/weather"
            element={
              <ProtectedRoute>
                <Weather />
              </ProtectedRoute>
            }
          />
          // App.jsx ke Routes me last me add karo
          <Route path="/dashboard" element={<Navigate to="/weather" replace />} />

          <Route
            path="/preferences"
            element={
              <ProtectedRoute>
                <Preferences />
              </ProtectedRoute>
            }
          />
        </Routes>

      </Suspense>
    </BrowserRouter>
  );
}

export default App;
