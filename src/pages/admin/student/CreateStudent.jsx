import React, { useState } from "react";
import { createStudent } from "../../../services/student.service";
import { useDispatch, useSelector } from "react-redux";

const CreateStudent = () => {
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.student);

  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    email: "",
    phoneNumber: "",
    address: {
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
    },
    classId: "",
  });

  const { classes } = useSelector(state => state.classes);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("address.")) {
      const addressField = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        address: { ...prev.address, [addressField]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(createStudent(formData))
      .unwrap()
      .then(() =>
        setFormData({
          name: "",
          dob: "",
          email: "",
          phoneNumber: "",
          address: {
            street: "",
            city: "",
            state: "",
            postalCode: "",
            country: "",
          },
          classId: "",
        })
      )
      .catch((error) => {
        console.error("Error creating student:", error);
      });
  };

  return (
    <section className="p-4 max-w-lg mx-auto bg-white shadow-md rounded-md my-9">
      <h2 className="text-xl font-semibold mb-4">Create Student</h2>
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
          type="date"
          name="dob"
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
        <select
          name="classId"
          value={formData.classId}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        >
          <option value="">Select Class</option>
          {classes.map((cl) => (
            <option key={cl._id} value={cl._id}>
              {cl.className}
            </option>
          ))}
        </select>

        <h3 className="font-medium">Address</h3>
        <input
          type="text"
          name="address.street"
          placeholder="Street"
          value={formData.address.street}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          name="address.city"
          placeholder="City"
          value={formData.address.city}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          name="address.state"
          placeholder="State"
          value={formData.address.state}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          name="address.postalCode"
          placeholder="Postal Code"
          value={formData.address.postalCode}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          name="address.country"
          placeholder="Country"
          value={formData.address.country}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

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

export default CreateStudent;
