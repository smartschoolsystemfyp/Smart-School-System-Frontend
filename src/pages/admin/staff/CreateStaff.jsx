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
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          name="fatherName"
          placeholder="Father's Name"
          value={formData.fatherName}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="date"
          name="dob"
          placeholder="Date of Birth"
          value={formData.dob}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          name="phoneNumber"
          placeholder="Phone Number"
          value={formData.phoneNumber}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          name="cnicNumber"
          placeholder="CNIC Number"
          value={formData.cnicNumber}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="date"
          name="dateOfJoining"
          placeholder="Date of Joining"
          value={formData.dateOfJoining}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="date"
          name="dateOfSupernation"
          placeholder="Date of Supernation"
          value={formData.dateOfSupernation}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          name="designation"
          placeholder="Designation"
          value={formData.designation}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          name="bankName"
          placeholder="Bank Name"
          value={formData.bankName}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          name="bankBranchName"
          placeholder="Bank Branch Name"
          value={formData.bankBranchName}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          name="ibanNumber"
          placeholder="IBAN Number"
          value={formData.ibanNumber}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          name="accountNumber"
          placeholder="Account Number"
          value={formData.accountNumber}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

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

        {formData.role === "Teacher" && (
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
        )}

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          {loading ? "Creating..." : "Create"}
        </button>
      </form>
    </section>
  );
};

export default CreateStaff;
