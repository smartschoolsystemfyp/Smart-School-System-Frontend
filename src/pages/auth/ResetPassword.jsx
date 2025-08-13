import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../services/authentication.service";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const id = searchParams.get("id");

  const { loading } = useSelector((state) => state.authentication);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token || !id) {
      navigate("/forget-password");
    }
  }, [token, id, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      resetPassword({
        adminId: id,
        forgetPasswordToken: token,
        newPassword,
        confirmPassword,
      })
    )
      .unwrap()
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error("Error resetting password:", error);
      });
  };

  return (
    <div
      id="bg"
      className="min-h-screen flex justify-center items-center bg-gray-100"
    >
      <div className="w-[95%] sm:max-w-md bg-white pb-8 px-8 pt-2 rounded-3xl shadow-lg">
        <div className="text-xl pb-3 sm:pb-0 font-extrabold text-gray-700 flex sm:flex-row flex-col items-center justify-center">
          <img className="w-[200px]" src="/school.png" alt="school_logo" />
        </div>
        <h2 className="text-2xl font-bold text-center mb-6">Reset Password</h2>

        <form onSubmit={handleSubmit}>
          {/* New Password Input */}
          <div className="mb-4">
            <label
              htmlFor="newPassword"
              className="block text-gray-600 text-sm font-medium mb-2"
            >
              New Password
            </label>
            <div className="relative">
              <i className="fas fa-lock absolute left-3 top-3 text-gray-500 text-sm"></i>
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                minLength="6"
                placeholder="Enter new password"
                className="w-full p-2.5 pl-10 text-sm border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Confirm Password Input */}
          <div className="mb-6">
            <label
              htmlFor="confirmPassword"
              className="block text-gray-600 text-sm font-medium mb-2"
            >
              Confirm Password
            </label>
            <div className="relative">
              <i className="fas fa-lock absolute left-3 top-3 text-gray-500 text-sm"></i>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength="6"
                placeholder="Confirm new password"
                className="w-full p-2.5 pl-10 text-sm border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-3xl font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          >
            {loading ? (
              <i className="fas fa-spinner fa-spin text-xs"></i>
            ) : (
              "Reset Password"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
