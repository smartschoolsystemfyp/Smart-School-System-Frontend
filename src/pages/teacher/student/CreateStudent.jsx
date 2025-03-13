import React, { useState } from "react";
import { createStudent } from "../../../services/student.service";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../components/Loader";

const CreateStudent = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.student);
  const { classes, loading: classLoading } = useSelector(
    (state) => state.classes
  );

  const [formData, setFormData] = useState({
    name: "",
    rollNumber: "",
    fatherName: "",
    motherName: "",
    dob: "",
    email: "",
    phoneNumber: "",
    bFormNumber: "",
    address: "",
    admissionDate: "",
    bloodGroup: "",
    religion: "",
    cast: "",
    classId: "",
    orphan: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createStudent(formData))
      .unwrap()
      .then(() =>
        setFormData({
          name: "",
          rollNumber: "",
          fatherName: "",
          motherName: "",
          dob: "",
          email: "",
          phoneNumber: "",
          bFormNumber: "",
          address: "",
          admissionDate: "",
          bloodGroup: "",
          religion: "",
          cast: "",
          classId: "",
          orphan: "",
        })
      )
      .catch((error) => {
        console.error("Error creating student:", error);
      });
  };

  

  return (
    <section className="p-4 max-w-lg mx-auto bg-white shadow-md rounded-md my-9">
      {classLoading && <Loader />}
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
          type="text"
          name="rollNumber"
          placeholder="Roll Number"
          value={formData.rollNumber}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          name="fatherName"
          placeholder="Father Name"
          value={formData.fatherName}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          name="motherName"
          placeholder="Mother Name"
          value={formData.motherName}
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
        <input
          type="text"
          name="bFormNumber"
          placeholder="B-Form Number"
          value={formData.bFormNumber}
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
          name="admissionDate"
          value={formData.admissionDate}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          name="bloodGroup"
          placeholder="Blood Group"
          value={formData.bloodGroup}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          name="religion"
          placeholder="Religion"
          value={formData.religion}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          name="cast"
          placeholder="Cast"
          value={formData.cast}
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
        <select
          name="orphan"
          value={formData.orphan}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        >
          <option value="">Orphan Status</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
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
