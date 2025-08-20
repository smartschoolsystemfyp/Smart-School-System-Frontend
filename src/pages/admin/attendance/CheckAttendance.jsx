import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStaffAttendanceById } from "../../../services/attendance.service";
import { getAllStaff } from "../../../services/staff.service";
import Loader from "../../../components/Loader";

const CheckAttendance = () => {
  const dispatch = useDispatch();
  const { loading, staffAttendance } = useSelector((state) => state.attendance);
  const { staffs, loading: staffLoading } = useSelector((state) => state.staff);
  const activeStaffs = staffs.filter((staff) => staff.status === "Active");

  const [hide, setHide] = useState(true);
  const [selectedId, setSelectedId] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(getStaffAttendanceById(selectedId))
      .unwrap()
      .then(() => {
        setHide(false);
        setFormSubmitted(true);
      })
      .catch((error) => {
        console.error("Error geting attendance:", error);
      });
  };

  useEffect(() => {
    dispatch(getAllStaff("teacher"));
  }, []);

  return (
    <section className="p-4 max-w-[95%] mx-auto rounded-xl">
      {(loading || staffLoading) && <Loader />}
      <h2 className="text-xl font-semibold mb-4">Check Attendance</h2>

      {hide && (
        <div className="h-[70vh] flex justify-center items-center">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-lg w-full max-w-md"
          >
            <div className="mb-4">
              <label className="font-medium text-gray-600">Select Staff:</label>
              <select
                className="ml-2 p-2 w-full border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={selectedId}
                onChange={(e) => setSelectedId(e.target.value)}
                required
              >
                <option value="">-- Select Staff --</option>
                {activeStaffs.map((stf) => (
                  <option value={stf._id}>{stf.name}</option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition duration-300"
            >
              Check
            </button>
          </form>
        </div>
      )}

      {formSubmitted && (
        <div className="overflow-x-auto">
          <table className="min-w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-gray-700 text-gray-100">
                <th className="border p-2 ">SR#</th>
                <th className="border p-2 text-center">Staff Name</th>
                <th className="border p-2 text-center">Designation</th>
                <th className="border p-2 text-center">Date</th>
                <th className="border p-2 text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {staffAttendance.length > 0 &&
                staffAttendance.map((atr, index) => (
                  <tr
                    key={atr._id}
                    className="odd:bg-gray-200 hover:bg-gray-300"
                  >
                    <td className="border p-2 py-3 text-center">{index + 1}</td>
                    <td className="border p-2 py-3 text-center">
                      {atr.referenceId.name}
                    </td>
                    <td className="border p-2 py-3 text-center">
                      {atr.referenceId.designation}
                    </td>
                    <td className="border p-2 py-3 text-center">
                      {new Date(atr.date).toISOString().split("T")[0]}
                    </td>
                    <td
                      className={`border p-2 py-3 text-center ${
                        atr.status === "Present"
                          ? "text-green-500"
                          : atr.status === "Leave"
                          ? "text-yellow-500"
                          : "text-red-500"
                      }`}
                    >
                      {atr.status}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default CheckAttendance;
