import React, { useEffect, useState } from "react";
import {
  getSubjectById,
  updateSubject,
} from "../../../services/subject.service";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const CreateSubject = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { subject, loading } = useSelector((state) => state.subject);

  const [formData, setFormData] = useState({
    subjectName: "",
    classId: "",
  });

  const { classes } = useSelector((state) => state.classes);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateSubject({ _id: id, subject: formData }))
      .unwrap()
      .then(() => navigate("/teacher/subjects"))
      .catch((error) => {
        console.error("Error updating subject:", error);
      });
  };

  useEffect(() => {
    if (subject) {
      setFormData({
        subjectName: subject.subjectName || "",
        classId: subject.class || "",
      });
    }
  }, [subject]);

  useEffect(() => {
    dispatch(getSubjectById(id));
  }, [id]);

  return (
    <div className="flex items-center justify-center min-h-[88vh]">
      <section className="p-6 w-full max-w-md bg-white shadow-lg rounded-xl">
        <h2 className="text-xl font-semibold mb-4">Update Subject</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="subjectName"
            placeholder="Subject Name"
            value={formData.subjectName}
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

          <button
            type="submit"
            className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
          >
            {loading ? " Updating..." : " Update Subject"}
          </button>
        </form>
      </section>
    </div>
  );
};

export default CreateSubject;
