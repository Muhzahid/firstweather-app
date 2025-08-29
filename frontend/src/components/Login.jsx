import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../features/authSlice.js";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(loginUser(form)).unwrap(); // ✅ unwrap ensures proper error handling
      navigate("/weather"); // ✅ navigate only after success
    } catch (err) {
      alert(err?.error || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Side - Background / Illustration */}
      <div className="hidden md:flex w-1/2 bg-blue-300 dark:bg-gray-500 items-center justify-center">
        <h1 className="text-white text-4xl font-bold px-8 text-center leading-snug">
          Welcome to <br /> Weather App 🌦️ <br />
          <span className="text-lg font-light">
            Track weather updates in real time
          </span>
        </h1>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex w-full md:w-1/2 items-center justify-center bg-gray-50 dark:bg-gray-700 px-6 py-10">
        <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-2xl p-8 w-full max-w-md">
          {/* Heading */}
          <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">
            Login to Weather App
          </h2>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5 ">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1 dark:text-white">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1 dark:text-white">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                value={form.password}
                autoComplete="current-password"
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
            >
              Login
            </button>

          </form>

          {/* Extra Links */}
          <p className="text-center text-sm text-gray-600 mt-6 dark:text-white">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-blue-600 font-medium hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
