import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createStaff } from "../../../services/staff.service";

const CreateStaff = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.staff);

  const [formData, setFormData] = useState({
    name: "",
    fatherName: "",
    dob: "",
    email: "",
    phoneNumber: "",
    cnicNumber: "",
    address: "",
    dateOfJoining: "",
    dateOfSupernation: "",
    designation: "",
    bankName: "",
    bankBranchName: "",
    ibanNumber: "",
    accountNumber: "",
    role: "",
    password: "",
    status: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createStaff(formData))
      .unwrap()
      .then(() =>
        setFormData({
          name: "",
          fatherName: "",
          dob: "",
          email: "",
          phoneNumber: "",
          cnicNumber: "",
          address: "",
          dateOfJoining: "",
          dateOfSupernation: "",
          designation: "",
          bankName: "",
          bankBranchName: "",
          ibanNumber: "",
          accountNumber: "",
          role: "",
          password: "",
          status: "",
        })
      )
      .catch((error) => {
        console.error("Error creating staff:", error);
      });
  };

  return (
    <section className="p-4 max-w-lg mx-auto bg-white shadow-md rounded-md my-9">
      <h2 className="text-xl font-semibold mb-4">Create Staff</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <h1 className="font-bold text-lg border-b pb-2">Personal Details</h1>

        <div className="flex flex-col">
          <label className="font-medium mb-1 text-sm">Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter full name"
            value={formData.name}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="font-medium mb-1 text-sm">Father's Name</label>
          <input
            type="text"
            name="fatherName"
            placeholder="Enter father's name"
            value={formData.fatherName}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="font-medium mb-1 text-sm">Date of Birth</label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="font-medium mb-1 text-sm">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter email address"
            value={formData.email}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="font-medium mb-1 text-sm">Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            placeholder="Enter phone number"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="font-medium mb-1 text-sm">CNIC Number</label>
          <input
            type="text"
            name="cnicNumber"
            placeholder="Enter CNIC number (e.g., 12345-6789012-3)"
            value={formData.cnicNumber}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="font-medium mb-1 text-sm">Address</label>
          <input
            type="text"
            name="address"
            placeholder="Enter complete address"
            value={formData.address}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
        </div>

        <h1 className="font-bold text-lg border-b pb-2 mt-4">
          Workplace Details
        </h1>

        <div className="flex flex-col">
          <label className="font-medium mb-1 text-sm">Date of Joining</label>
          <input
            type="date"
            name="dateOfJoining"
            value={formData.dateOfJoining}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="font-medium mb-1 text-sm">Designation</label>
          <input
            type="text"
            name="designation"
            placeholder="Enter designation/position"
            value={formData.designation}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="font-medium mb-1 text-sm">
            Date of Superannuation
          </label>
          <input
            type="date"
            name="dateOfSupernation"
            value={formData.dateOfSupernation}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />

          <div className="flex flex-col">
            <label className="font-medium mb-1 text-sm">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            >
              <option value="">Select Role</option>
              <option value="Teacher">Teaching</option>
              <option value="Non-Teaching">Non-Teaching</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="font-medium mb-1 text-sm">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Status</option>
              {["Active", "InActive"].map((s, i) => (
                <option key={i} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {formData.role === "Teacher" && (
            <div className="flex flex-col">
              <label className="font-medium mb-1 text-sm">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Create password for teacher login"
                value={formData.password}
                onChange={handleChange}
                className="border p-2 rounded"
                required
              />
            </div>
          )}
        </div>

        <h1 className="font-bold text-lg border-b pb-2 mt-4">Bank Details</h1>

        <div className="flex flex-col">
          <label className="font-medium mb-1 text-sm">Bank Name</label>
          <input
            type="text"
            name="bankName"
            placeholder="Enter bank name"
            value={formData.bankName}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="font-medium mb-1 text-sm">Bank Branch Name</label>
          <input
            type="text"
            name="bankBranchName"
            placeholder="Enter branch name"
            value={formData.bankBranchName}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="font-medium mb-1 text-sm">IBAN Number</label>
          <input
            type="text"
            name="ibanNumber"
            placeholder="Enter IBAN number"
            value={formData.ibanNumber}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="font-medium mb-1 text-sm">Account Number</label>
          <input
            type="text"
            name="accountNumber"
            placeholder="Enter account number"
            value={formData.accountNumber}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 mt-4"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Staff"}
        </button>
      </form>
    </section>
  );
};

export default CreateStaff;
