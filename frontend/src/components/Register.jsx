// src/pages/Register.jsx
import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../features/authSlice";
import { useNavigate, Link } from "react-router-dom";
import SkySlideshow from "../components/SkySlideshow";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(form))
      .unwrap()
      .then(() => navigate("/login"))
      .catch((err) => alert(err?.error || "Registration failed"));
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4">
      {/* rotating background */}
      <SkySlideshow interval={5000} transition={1000} />

      {/* content */}
      <div className="relative z-10 w-full max-w-md">
        <div className="backdrop-blur-lg bg-white/15 border border-white/30 shadow-2xl rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-center text-white mb-6 drop-shadow">
            Create Your Account 🌍
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-white/90 mb-1">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                autoComplete="name"
                className="w-full px-4 py-2 rounded-lg bg-white/80 text-gray-900 placeholder-gray-600 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white/90 mb-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                autoComplete="username"
                className="w-full px-4 py-2 rounded-lg bg-white/80 text-gray-900 placeholder-gray-600 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white/90 mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="Create a password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                autoComplete="new-password"
                className="w-full px-4 py-2 rounded-lg bg-white/80 text-gray-900 placeholder-gray-600 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
            >
              Sign Up
            </button>
          </form>

          <p className="text-center text-sm text-white mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-yellow-300 font-medium hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
