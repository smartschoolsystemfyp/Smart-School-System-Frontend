import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../services/authentication.service";

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    auth: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const { loading } = useSelector((state) => state.authentication);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData))
      .unwrap()
      .then(() => navigate(formData.auth === "admin" ? "/admin" : "/teacher"))
      .catch((error) => {
        console.error("Error login admin:", error);
      });
  };

  return (
    <div
      id="bg"
      className="min-h-screen flex justify-center items-center bg-gray-100"
    >
      <div className="w-[95%] sm:max-w-md bg-white pb-8 px-8 pt-2 rounded-3xl shadow-lg">
        <div className="text-xl pb-3 sm:pb-0 font-extrabold text-gray-700 flex sm:flex-row flex-col items-center justify-center">
          <img className="w-[250px]" src="/school.png" alt="school_logo" />
          
        </div>
        <form onSubmit={handleSubmit}>
          {/* Authority Selection */}
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium mb-2">
              Authority
            </label>
            <div className="relative">
              <i className="fas fa-user-tag absolute left-3 top-3 text-gray-500 text-sm"></i>
              <select
                name="auth"
                value={formData.auth}
                onChange={handleChange}
                className="w-full p-2.5 pl-10 text-sm text-center border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">__Select Authority__</option>
                <option value="admin">Admin</option>
                <option value="teacher">Teacher</option>
              </select>
            </div>
          </div>

          {/* Email Input */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-600 text-sm font-medium mb-2"
            >
              Email
            </label>
            <div className="relative">
              <i className="fas fa-envelope absolute left-3 top-3 text-gray-500 text-sm"></i>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
                className="w-full p-2.5 pl-10 text-sm border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-600 text-sm font-medium mb-2 "
            >
              Password
            </label>
            <div className="relative">
              <i className="fas fa-lock absolute left-3 top-3 text-gray-500 text-sm"></i>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Enter your password"
                className="w-full p-2.5 pl-10 pr-10 text-sm border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-500"
              >
                <i
                  className={showPassword ? "fas fa-eye-slash" : "fas fa-eye"}
                ></i>
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-3xl font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {loading ? (
              <i className="fas fa-spinner fa-spin text-xs"></i>
            ) : (
              "Login"
            )}
          </button>
        </form>

        {/* Forgot Password Link */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Forget Password?
            <Link
              to="/admin/forget-password"
              className="text-blue-600 hover:underline pl-1"
            >
              Click here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
