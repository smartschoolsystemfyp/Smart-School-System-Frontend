import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  updateAdminPassword,
  updateProfile,
} from "../../../services/authentication.service";

const Setting = () => {
  const dispatch = useDispatch();
  const { loading, admin } = useSelector((state) => state.authentication);

  const [activeTab, setActiveTab] = useState("profile"); // 'profile' or 'security'
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [profile, setProfile] = useState({
    name: admin.name,
    email: admin.email,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPassword.length < 6) {
      toast.error("New password must be at least 6 characters.");
      return;
    }

    if (formData.newPassword == formData.oldPassword) {
      toast.error("Old password cannot be used as new password");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("New password and confirm password do not match.");
      return;
    }

    dispatch(
      updateAdminPassword({
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

  async function handleProfileSubmit(e) {
    e.preventDefault();
    dispatch(updateProfile(profile));
  }

  return (
    <section className="flex justify-center items-center h-[88vh]">
      <div className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden">
        {/* Tab Navigation */}
        <div className="flex border-b">
          <button
            className={`px-6 py-3 font-medium text-sm focus:outline-none ${
              activeTab === "profile"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-blue-500"
            }`}
            onClick={() => setActiveTab("profile")}
          >
            Profile
          </button>
          <button
            className={`px-6 py-3 font-medium text-sm focus:outline-none ${
              activeTab === "security"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-blue-500"
            }`}
            onClick={() => setActiveTab("security")}
          >
            Security
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === "profile" ? (
            <>
              <h2 className="text-xl font-semibold mb-4">Update Profile</h2>
              <form onSubmit={handleProfileSubmit} className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  className="w-full p-3 border border-gray-300 rounded-md"
                  value={profile.name}
                  onChange={handleProfileChange}
                  required
                />
                <input
                  type="text"
                  name="email"
                  placeholder="Email"
                  className="w-full p-3 border border-gray-300 rounded-md"
                  value={profile.email}
                  onChange={handleProfileChange}
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
                >
                  {loading ? "Updating..." : "Update Profile"}
                </button>
              </form>
            </>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Setting;
