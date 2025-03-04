import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllStudents } from "../../../services/student.service";
import {
  markStaffAttendance,
  markStudentAttendance,
} from "../../../services/attendance.service";
import { useNavigate } from "react-router-dom";
import { getAllStaff } from "../../../services/staff.service";

const Attendance = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { staffs } = useSelector((state) => state.staff);
  const { loading } = useSelector((state) => state.attendance);

  const [selectedAuth, setSelectedAuth] = useState("");
  const [attendance, setAttendance] = useState({});

  const handleClassChange = (e) => {
    setSelectedAuth(e.target.value);
    setAttendance(
      staffs
        .filter((staff) => staff.classId === e.target.value)
        .reduce((acc, staff) => {
          acc[staff._id] = "Present";
          return acc;
        }, {})
    );
  };

  const toggleAttendance = (staffId) => {
    setAttendance((prev) => ({
      ...prev,
      [staffId]: prev[staffId] === "Present" ? "Absent" : "Present",
    }));
  };

  const handleSubmit = async () => {
    const attendanceRecords = Object.entries(attendance).map(
      ([staffId, status]) => ({
        date: new Date().toISOString().split("T")[0],
        staffId,
        status,
      })
    );
    dispatch(markStaffAttendance(attendanceRecords))
      .unwrap()
      .then(() => navigate("/admin"))
      .catch((error) => {
        console.error("Error updating attendance:", error);
      });
  };

  useEffect(() => {
    dispatch(getAllStaff(selectedAuth));
  }, [selectedAuth]);

  return (
    <section className="p-6 max-w-[95%] mx-auto rounded-xl">
      <h2 className="text-xl font-semibold mb-4">Mark Attendance</h2>

      <div className="mb-4">
        <label className="font-medium">Select Authority:</label>
        <select
          className="ml-2 p-2 border rounded-md"
          value={selectedAuth}
          onChange={handleClassChange}
        >
          <option value="">-- Select Authority --</option>
          <option value={"Teacher"}>Teacher</option>
          <option value={"Non-Teaching"}>Non Teaching</option>
        </select>
      </div>

      {selectedAuth && staffs.length === 0 && (
        <p className="text-red-500">No staffs available for this class.</p>
      )}

      {selectedAuth && staffs.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-700 text-gray-100">
                <th className="border p-2">SR#</th>
                <th className="border p-2">Staff Name</th>
                <th className="border p-2 text-center">Attendance</th>
              </tr>
            </thead>
            <tbody>
              {staffs.map((staff, index) => (
                <tr
                  key={staff._id}
                  className="odd:bg-gray-200 hover:bg-gray-300"
                >
                  <td className="border p-2 text-center">{index + 1}</td>
                  <td className="border p-2">{staff.name}</td>
                  <td className="border p-2 text-center">
                    <button
                      className={`px-4 py-1 rounded transition-all duration-300 ${
                        attendance[staff._id] === "Present"
                          ? "bg-green-500 text-white"
                          : "bg-red-500 text-white"
                      }`}
                      onClick={() => toggleAttendance(staff._id)}
                    >
                      {attendance[staff._id] || "Present"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedAuth && staffs.length > 0 && (
        <div className="text-center mt-6">
          <button
            onClick={handleSubmit}
            className="bg-blue-600 w-full text-white px-5 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            {loading ? "Submitting..." : "Submit Attendance"}
          </button>
        </div>
      )}
    </section>
  );
};

export default Attendance;
