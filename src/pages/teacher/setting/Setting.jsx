import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { updateTeacherPassword } from "../../../services/authentication.service";

const Setting = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.authentication);

  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPassword.length < 6) {
      toast.error("New password must be at least 6 characters.");
      return;
    }

    if (formData.newPassword == formData.oldPassword) {
      toast.error("Old passwird not use as new password");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("New password and confirm password do not match.");
      return;
    }

    dispatch(
      updateTeacherPassword({
        oldPassword: formData.oldPassword,
        newPassword: formData.newPassword,
      })
    );

    setFormData({
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  return (
    <section className="flex justify-center items-center h-[88vh]">
      <section className="p-6 max-w-md mx-auto bg-white shadow-lg rounded-xl">
        <h2 className="text-xl font-semibold mb-4">Update Password</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            name="oldPassword"
            placeholder="Old Password"
            className="w-full p-3 border border-gray-300 rounded-md"
            value={formData.oldPassword}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            className="w-full p-3 border border-gray-300 rounded-md"
            value={formData.newPassword}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className="w-full p-3 border border-gray-300 rounded-md"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </section>
    </section>
  );
};

export default Setting;
