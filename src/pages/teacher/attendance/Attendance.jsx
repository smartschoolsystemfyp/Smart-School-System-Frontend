import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllStudents } from "../../../services/student.service";
import { markStudentAttendance } from "../../../services/attendance.service";
import { useNavigate } from "react-router-dom";

const Attendance = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { classes } = useSelector((state) => state.classes);
  const { students } = useSelector((state) => state.student);
  const { loading } = useSelector((state) => state.attendance);

  const [selectedClass, setSelectedClass] = useState("");
  const [attendance, setAttendance] = useState({});

  const handleClassChange = (e) => {
    setSelectedClass(e.target.value);
    setAttendance(
      students
        .filter((student) => student.classId === e.target.value)
        .reduce((acc, student) => {
          acc[student._id] = "Present";
          return acc;
        }, {})
    );
  };

  const toggleAttendance = (studentId) => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: prev[studentId] === "Present" ? "Absent" : "Present",
    }));
  };

  const handleSubmit = async () => {
    const attendanceRecords = Object.entries(attendance).map(
      ([studentId, status]) => ({
        date: new Date().toISOString().split("T")[0],
        studentId,
        status,
      })
    );
    dispatch(markStudentAttendance(attendanceRecords))
      .unwrap()
      .then(() => navigate("/teacher/dashboard"))
      .catch((error) => {
        console.error("Error updating attendance:", error);
      });
  };

  useEffect(() => {
    dispatch(getAllStudents(selectedClass));
  }, [selectedClass]);

  return (
    <section className="p-6 max-w-[95%] mx-auto rounded-xl">
      <h2 className="text-xl font-semibold mb-4">Mark Attendance</h2>

      <div className="mb-4">
        <label className="font-medium">Select Class:</label>
        <select
          className="ml-2 p-2 border rounded-md"
          value={selectedClass}
          onChange={handleClassChange}
        >
          <option value="">-- Select Class --</option>
          {classes.map((cls) => (
            <option key={cls._id} value={cls._id}>
              {cls.className}
            </option>
          ))}
        </select>
      </div>

      {selectedClass && students.length === 0 && (
        <p className="text-red-500">No students available for this class.</p>
      )}

      {selectedClass && students.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-700 text-gray-100">
                <th className="border p-2">SR#</th>
                <th className="border p-2">Student Name</th>
                <th className="border p-2 text-center">Attendance</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr
                  key={student._id}
                  className="odd:bg-gray-200 hover:bg-gray-300"
                >
                  <td className="border p-2 text-center">{index + 1}</td>
                  <td className="border p-2">{student.name}</td>
                  <td className="border p-2 text-center">
                    <button
                      className={`px-4 py-1 rounded transition-all duration-300 ${
                        attendance[student._id] === "Present"
                          ? "bg-green-500 text-white"
                          : "bg-red-500 text-white"
                      }`}
                      onClick={() => toggleAttendance(student._id)}
                    >
                      {attendance[student._id] || "Present"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedClass && students.length > 0 && (
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