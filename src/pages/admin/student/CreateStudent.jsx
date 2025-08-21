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
    status: "",
    result: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData)

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
          status: "",
          result: "",
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
        <div className="flex flex-col">
          <label className="font-medium mb-1 text-sm">Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter student's full name"
            value={formData.name}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="font-medium mb-1 text-sm">Roll Number</label>
          <input
            type="text"
            name="rollNumber"
            placeholder="Enter roll number"
            value={formData.rollNumber}
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
          <label className="font-medium mb-1 text-sm">Mother's Name</label>
          <input
            type="text"
            name="motherName"
            placeholder="Enter mother's name"
            value={formData.motherName}
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
          <label className="font-medium mb-1 text-sm">B-Form Number</label>
          <input
            type="text"
            name="bFormNumber"
            placeholder="Enter B-Form number"
            value={formData.bFormNumber}
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

        <div className="flex flex-col">
          <label className="font-medium mb-1 text-sm">Admission Date</label>
          <input
            type="date"
            name="admissionDate"
            value={formData.admissionDate}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="font-medium mb-1 text-sm">Blood Group</label>
          <input
            type="text"
            name="bloodGroup"
            placeholder="Enter blood group (e.g., A+, B-, O+)"
            value={formData.bloodGroup}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="font-medium mb-1 text-sm">Religion</label>
          <input
            type="text"
            name="religion"
            placeholder="Enter religion"
            value={formData.religion}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="font-medium mb-1 text-sm">Cast</label>
          <input
            type="text"
            name="cast"
            placeholder="Enter cast"
            value={formData.cast}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="font-medium mb-1 text-sm">Class</label>
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
        </div>

        <div className="flex flex-col">
          <label className="font-medium mb-1 text-sm">Orphan Status</label>
          <select
            name="orphan"
            value={formData.orphan}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          >
            <option value="">Select Orphan Status</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
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

        <div className="flex flex-col">
          <label className="font-medium mb-1 text-sm">Result</label>
          <select
            name="status"
            value={formData.result}
            onChange={handleChange}
            className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Result</option>
            {["Pass", "Fail"].map((s, i) => (
              <option key={i} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 mt-4"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Student"}
        </button>
      </form>
    </section>
  );
};

export default CreateStudent;
