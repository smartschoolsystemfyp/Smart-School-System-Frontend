import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import {
  deleteStudent,
  getAllStudents,
} from "../../../services/student.service";
import Loader from "../../../components/Loader";

const Student = () => {
  const dispatch = useDispatch();

  const { students, loading } = useSelector((state) => state.student);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(id) {
    if (window.confirm("Are you sure you want to delete?")) {
      dispatch(deleteStudent(id));
    }
  }

  useEffect(() => {
    dispatch(getAllStudents());
  }, []);

  return (
    <section className="p-3 sm:p-4 rounded-lg w-full h-auto mt-[10px] sm:px-8">
      {loading && <Loader />}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-0 justify-between px-2 py-4">
        <div className="flex justify-between sm:justify-center items-center gap-4 text-xl sm:text-[1.4rem] font-semibold">
          <div>
            <i className="fas fa-user-graduate mr-2 text-blue-500"></i>
            Students
          </div>
          <Link to={"/admin/student/create"}>
            <div className="text-xs font-semibold pt-1 flex items-center text-green-500 hover:text-green-400">
              <p>Create student</p>
            </div>
          </Link>
        </div>

        <input
          type="search"
          placeholder="Search student by name"
          className="border border-gray-400 rounded-md p-2 text-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div id="overflow" className="overflow-x-auto ">
        <table className="min-w-full text-left table-auto border-collapse text-[0.83rem] whitespace-nowrap">
          <thead>
            <tr className="bg-[#212121] text-gray-100 text-primary">
              {[
                "SR#",
                "Name",
                "DOB",
                "Email",
                "Class",
                "Att %",
                "Phone",
                "Address",
                "Actions",
              ].map((header) => (
                <th
                  key={header}
                  className="text-[0.92rem] py-3 px-4 border-b border-secondary"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {filteredStudents.length > 0 &&
              filteredStudents.map((student, index) => (
                <tr
                  key={student._id}
                  className="odd:bg-gray-200 hover:bg-gray-300"
                >
                  <td className="py-3 px-4 border-b border-secondary">
                    {index + 1}
                  </td>
                  <td className="py-3 px-4 border-b border-secondary">
                    {student.name}
                  </td>
                  <td className="py-3 px-4 border-b border-secondary">
                    {new Date(student.dob).toISOString().split("T")[0]}
                  </td>
                  <td className="py-3 px-4border-b border-secondary">
                    {student.email}
                  </td>
                  <td className="py-3 px-4 border-b border-secondary">
                    {student.class?.className || "Not Assigned"}
                  </td>
                  <td className="py-3 px-4 border-b border-secondary">
                    {student?.attendancePercentage || "Not Yet"} %
                  </td>

                  <td className="py-3 px-4 border-b border-secondary">
                    {student.phoneNumber}
                  </td>
                  <td className="py-3 px-4 border-b border-secondary">
                    {student.address.street}
                  </td>

                  <td className="py-3 pl-8 border-b border-secondary flex items-center space-x-2">
                    <Link to={`/admin/student/${student._id}`}>
                      <button
                        className="text-green-500 hover:text-green-400"
                        title="Edit"
                      >
                        <i className="fa fa-edit"></i>
                      </button>
                    </Link>

                    <button
                      onClick={() => handleDelete(student._id)}
                      className="text-red-500 hover:text-red-400"
                      title="Delete"
                    >
                      <i className="fa fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        {filteredStudents.length === 0 && (
          <div className="h-[50vh] flex justify-center items-center text-sm">
            No Student Found
          </div>
        )}
      </div>
    </section>
  );
};

export default Student;
