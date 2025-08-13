import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { forgetPassword } from "../../services/authentication.service";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");

  const { loading } = useSelector((state) => state.authentication);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(forgetPassword({ email }))
      .unwrap()
      .then(() => navigate("/forget-password-confirm"))
      .catch((error) => {
        console.error("Error forget password admin:", error);
      });
  };

  return (
    <div
      id="bg"
      className="min-h-screen flex justify-center items-center bg-gray-100"
    >
      <div className="w-[95%] sm:max-w-md bg-white pb-8 px-8 pt-2 rounded-3xl shadow-lg">
        <div className="text-xl font-extrabold text-gray-700 flex sm:flex-row flex-col items-center justify-center">
          <img className="w-[200px]" src="/school.png" alt="school_logo" />
        </div>

        <h2 className="text-2xl font-bold text-center mb-6">Forget Password</h2>

        <form onSubmit={handleSubmit}>
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
                className="w-full p-2.5 pl-10 text-sm border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
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
              "Submit"
            )}
          </button>
        </form>

        {/* Forgot Password Link */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Go Back?
            <Link to="/" className="text-blue-600 hover:underline pl-1">
              Click here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
