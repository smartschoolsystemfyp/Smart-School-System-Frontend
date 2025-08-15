import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { markStaffAttendance } from "../../../services/attendance.service";
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
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleClassChange = (e) => {
    setSelectedAuth(e.target.value);
  };

  const toggleAttendance = (staffId, status) => {
    setAttendance((prev) => ({
      ...prev,
      [staffId]: status,
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
        navigate("/admin");
        setHide(true);
        setFormSubmitted(false);
      })
      .catch((error) => {
        console.error("Error updating attendance:", error);
      });
  };

  function handleFromSubmit(e) {
    e.preventDefault();
    dispatch(getAllStaff(selectedAuth))
      .unwrap()
      .then((staffData) => {
        const defaultAttendance = staffData.reduce((acc, staff) => {
          acc[staff._id] = "Present";
          return acc;
        }, {});
        setAttendance(defaultAttendance);
        setFormSubmitted(true);
        setHide(false);
      });
  }

  return (
    <section className="p-4 max-w-[95%] mx-auto rounded-xl">
      {loading && <Loader />}
      <h2 className="text-xl font-semibold mb-4">Mark Attendance</h2>

      {hide && (
        <div className="h-[70vh] flex justify-center items-center">
          <form
            onSubmit={handleFromSubmit}
            className="bg-white p-6 rounded-lg w-full max-w-md"
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

      {formSubmitted && staffs.length > 0 && (
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
                    <div className="flex justify-center space-x-2">
                      <button
                        className={`px-3 py-1 rounded ${
                          attendance[staff._id] === "Present"
                            ? "bg-green-500 text-white"
                            : "bg-gray-200"
                        }`}
                        onClick={() => toggleAttendance(staff._id, "Present")}
                      >
                        Present
                      </button>
                      <button
                        className={`px-3 py-1 rounded ${
                          attendance[staff._id] === "Absent"
                            ? "bg-red-500 text-white"
                            : "bg-gray-200"
                        }`}
                        onClick={() => toggleAttendance(staff._id, "Absent")}
                      >
                        Absent
                      </button>
                      <button
                        className={`px-3 py-1 rounded ${
                          attendance[staff._id] === "Leave"
                            ? "bg-yellow-500 text-white"
                            : "bg-gray-200"
                        }`}
                        onClick={() => toggleAttendance(staff._id, "Leave")}
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

      {formSubmitted && staffs.length > 0 && (
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