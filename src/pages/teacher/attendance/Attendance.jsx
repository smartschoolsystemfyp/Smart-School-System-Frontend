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
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [attendance, setAttendance] = useState({});
  const [hide, setHide] = useState(true);

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

  const toggleAttendance = (studentId, status) => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: status,
    }));
  };

  const handleSubmit = async () => {
    const attendanceRecords = Object.entries(attendance).map(
      ([studentId, status]) => ({
        date: selectedDate,
        studentId,
        status,
      })
    );
    dispatch(markStudentAttendance(attendanceRecords))
      .unwrap()
      .then(() => {
        setHide(false);
        navigate("/teacher/");
      })
      .catch((error) => {
        console.error("Error updating attendance:", error);
      });
  };

  function handleFromSubmit(e) {
    e.preventDefault();
    dispatch(getAllStudents(selectedClass));
    setHide(false);
  }


  return (
    <section className="p-6 max-w-[95%] mx-auto rounded-xl">
      <h2 className="text-xl font-semibold mb-4">Mark Attendance</h2>

      {hide && (
        <div className="h-[70vh] flex justify-center items-center">
          <form
            onSubmit={handleFromSubmit}
            className="bg-white p-6 rounded-lg w-full max-w-md"
          >
            <div className="mb-4">
              <label className="font-medium text-gray-600">Select Class:</label>
              <select
                className="ml-2 p-2 w-full border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
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

            <div className="mb-4">
              <label className="font-medium text-gray-600">Select Date:</label>
              <input
                className="border p-2 w-full rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition duration-300"
            >
              Get Sheet
            </button>
          </form>
        </div>
      )}

      {selectedClass && students.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-700 text-gray-100">
                <th className="border p-2">SR#</th>
                <th className="border p-2">Roll No</th>
                <th className="border p-2">Student Name</th>
                <th className="border p-2">Father Name</th>
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
                  <td className="border p-2">{student.rollNumber}</td>
                  <td className="border p-2">{student.name}</td>
                  <td className="border p-2">{student.fatherName}</td>
                  <td className="border p-2 text-center">
                    <div className="flex justify-center space-x-2">
                      <button
                        className={`px-3 py-1 rounded text-sm ${
                          attendance[student._id] === "Present"
                            ? "bg-green-500 text-white"
                            : "bg-gray-200"
                        }`}
                        onClick={() => toggleAttendance(student._id, "Present")}
                      >
                        Present
                      </button>
                      <button
                        className={`px-3 py-1 rounded text-sm ${
                          attendance[student._id] === "Absent"
                            ? "bg-red-500 text-white"
                            : "bg-gray-200"
                        }`}
                        onClick={() => toggleAttendance(student._id, "Absent")}
                      >
                        Absent
                      </button>
                      <button
                        className={`px-3 py-1 rounded text-sm ${
                          attendance[student._id] === "Leave"
                            ? "bg-yellow-500 text-white"
                            : "bg-gray-200"
                        }`}
                        onClick={() => toggleAttendance(student._id, "Leave")}
                      >
                        Leave
                      </button>
                    </div>
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
