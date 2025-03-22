import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllStudents } from "../../../services/student.service";
import {
  markStaffAttendance,
  markStudentAttendance,
} from "../../../services/attendance.service";
import { useNavigate } from "react-router-dom";
import { getAllStaff } from "../../../services/staff.service";
import Loader from "../../../components/Loader";

const Attendance = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { staffs } = useSelector((state) => state.staff);
  const { loading } = useSelector((state) => state.attendance);

  const [selectedAuth, setSelectedAuth] = useState("");
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [attendance, setAttendance] = useState({});
  const [hide, setHide] = useState(true);

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
        date: selectedDate,
        staffId,
        status,
      })
    );
    dispatch(markStaffAttendance(attendanceRecords))
      .unwrap()
      .then(() => {
        navigate("/dms/");
        setHide(true);
      })
      .catch((error) => {
        console.error("Error updating attendance:", error);
      });
  };

  function handleFromSubmit(e) {
    e.preventDefault();
    dispatch(getAllStaff(selectedAuth));
    setHide(false);
  }

  return (
    <section className="p-4 max-w-[95%] mx-auto rounded-xl">
      {loading && <Loader />}
      <h2 className="text-xl font-semibold mb-4">Mark Attendance</h2>

      {hide && (
        <div className="h-[70vh] flex justify-center items-center">
          <form
            onSubmit={handleFromSubmit}
            className="bg-white p-6 rounded-lg  w-full max-w-md"
          >
            <div className="mb-4">
              <label className="font-medium text-gray-600">
                Select Authority:
              </label>
              <select
                className="ml-2 p-2 w-full border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={selectedAuth}
                onChange={handleClassChange}
                required
              >
                <option value="">-- Select Authority --</option>
                <option value="Teacher">Teacher</option>
                <option value="Non-Teaching">Non-Teaching</option>
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

      {selectedAuth && staffs.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-gray-700 text-gray-100">
                <th className="border p-2">SR#</th>
                <th className="border p-2 text-center">Staff Name</th>
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
                  <td className="border p-2 text-center">{staff.name}</td>
                  <td className="border p-2 text-center">
                    <label
                      className="inline-flex items-center cursor-pointer"
                      htmlFor={`toggle-${staff._id}`}
                    >
                      <span className="mr-2 text-gray-700"></span>
                      <input
                        type="checkbox"
                        id={`toggle-${staff._id}`}
                        className="toggle-input hidden"
                        checked={attendance[staff._id] === "Present"}
                        onChange={() => toggleAttendance(staff._id)}
                      />
                      <span className="toggle-slider"></span>
                    </label>
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
