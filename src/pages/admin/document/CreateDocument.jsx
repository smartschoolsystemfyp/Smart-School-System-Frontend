import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../components/Loader";
import { createDocumet } from "../../../services/document&fund.service";

const CreateDocument = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    classId: "",
    status: "",
    collectedBy: "",
  });

  const { loading } = useSelector((state) => state.combine);

  const { classes, loading: classLoading } = useSelector(
    (state) => state.classes
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createDocumet(formData))
      .unwrap()
      .then(() =>
        setFormData({
          name: "",
          classId: "",
          status: "",
          collectedBy: "",
        })
      )
      .catch((error) => {
        console.error("Error creating document:", error);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-[88vh]">
      {classLoading && <Loader />}

      <section className="p-6 w-full max-w-md bg-white shadow-lg rounded-xl">
        <h2 className="text-xl font-semibold mb-4">Create Document Record</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Student Name"
            value={formData.name}
            onChange={handleChange}
            className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />

          <select
            name="classId"
            value={formData.classId}
            onChange={handleChange}
            className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Class</option>
            {classes.map((cls) => (
              <option key={cls._id} value={cls._id}>
                {cls.className}
              </option>
            ))}
          </select>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Type</option>
            {["Certificate", "Result Card"].map((s, i) => (
              <option key={i} value={s}>
                {s}
              </option>
            ))}
          </select>

          <input
            type="text"
            name="collectedBy"
            placeholder="Collected By"
            value={formData.collectedBy}
            onChange={handleChange}
            className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />

          <button
            type="submit"
            className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
          >
            {loading ? "Creating" : "Create Record"}
          </button>
        </form>
      </section>
    </div>
  );
};

export default CreateDocument;
