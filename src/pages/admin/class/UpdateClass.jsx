import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllStaff } from "../../../services/staff.service";
import {
  createClass,
  getClassById,
  updateClass,
} from "../../../services/class.service";
import { useNavigate, useParams } from "react-router-dom";

const UpdateClass = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [className, setClassName] = useState("");
  const [teacherId, setTeacherId] = useState("");
  const [status, setStatus] = useState("");

  const { staffs: teachers } = useSelector((state) => state.staff);
  const { loading, class: oneClass } = useSelector((state) => state.classes);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateClass({
        _id: id,
        classData: { className, teacher: teacherId, status },
      })
    )
      .unwrap()
      .then(() => navigate("/admin/class"))
      .catch((error) => {
        console.error("Error updating class:", error);
      });
  };

  useEffect(() => {
    if (oneClass) {
      setClassName(oneClass.className || "");
      setTeacherId(oneClass.teacher?._id);
      setStatus(oneClass.status || "");
    }
  }, [oneClass]);

  useEffect(() => {
    dispatch(getClassById(id));
  }, [id]);

  useEffect(() => {
    dispatch(getAllStaff("Teacher"));
  }, []);

  return (
    <section className="w-full h-[88vh] flex justify-center items-center">
      <div className="w-[95%] sm:w-[400px] mt-10 p-6 bg-white rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Update Class</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              placeholder="Enter class name"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <select
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              value={teacherId}
              onChange={(e) => setTeacherId(e.target.value)}
              required
            >
              <option value="">Select a teacher</option>
              {teachers.map((teacher) => (
                <option key={teacher._id} value={teacher._id}>
                  {teacher.name}
                </option>
              ))}
            </select>
          </div>

          <select
            name="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border p-2 mb-4 rounded-lg focus:ring-2 focus:ring-blue-500 w-full"
            required
          >
            <option value="">Select Status</option>
            {["Active", "InActive"].map((s, i) => (
              <option key={i} value={s}>
                {s}
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
          >
            {loading ? "Updating..." : "Update Class"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default UpdateClass;
