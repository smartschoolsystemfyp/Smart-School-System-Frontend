import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { deleteStaff, getAllStaff } from "../../../services/staff.service";

const Student = () => {
  const dispatch = useDispatch();

  const { staffs } = useSelector((state) => state.staff);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredStaffs = staffs.filter((staff) =>
    staff.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(id) {
    dispatch(deleteStaff(id));
  }

  useEffect(() => {
    dispatch(getAllStaff(""));
  }, []);

  return (
    <section className="p-3 sm:p-4 rounded-lg w-full h-auto mt-[10px] sm:px-8">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-0 justify-between px-2 py-4">
        <div className="flex justify-between sm:justify-center items-center gap-4 text-xl sm:text-[1.4rem] font-semibold">
          <div>
            <i className="fas fa-user-graduate mr-2 text-blue-500"></i>
            Staffs
          </div>
          <Link to={"/admin/staff/create"}>
            <div className="text-xs font-semibold pt-1 flex items-center text-green-500 hover:text-green-400">
              <p>Create staff</p>
            </div>
          </Link>
        </div>

        <input
          type="search"
          placeholder="Search Student by name"
          className="border border-gray-400 rounded-md p-2 text-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div id="overflow" className="overflow-x-auto ">
        <table className="min-w-full text-left table-auto border-collapse text-[0.83rem] whitespace-nowrap">
          <thead>
            <tr className="bg-gray-700 text-gray-100 text-primary">
              {["SR#", "Name", "Email", "Phone no", "Role", "Actions"].map(
                (header) => (
                  <th
                    key={header}
                    className="text-[0.92rem] py-3 px-4 border-b border-secondary"
                  >
                    {header}
                  </th>
                )
              )}
            </tr>
          </thead>

          <tbody>
            {filteredStaffs.length > 0 &&
              filteredStaffs.map((staff, index) => (
                <tr
                  key={staff._id}
                  className="odd:bg-gray-200 hover:bg-gray-300"
                >
                  <td className="py-3 px-4 border-b border-secondary">
                    {index + 1}
                  </td>
                  <td className="py-3 px-4 border-b border-secondary">
                    {staff.name}
                  </td>
                  <td className="py-3 px-4 border-b border-secondary">
                    {staff.email}
                  </td>
                  <td className="py-3 px-4border-b border-secondary">
                    {staff.phoneNumber}
                  </td>
                  <td className="py-3 px-4 border-b border-secondary">
                    {staff.role}
                  </td>

                  <td className="py-3 pl-8 border-b border-secondary flex items-center space-x-2">
                    <Link to={`/admin/staff/${staff._id}`}>
                      <button
                        className="text-green-500 hover:text-green-400"
                        title="Edit"
                      >
                        <i className="fa fa-edit"></i>
                      </button>
                    </Link>

                    {/* <button
                      onClick={() => handleDelete(staff._id)}
                      className="text-red-500 hover:text-red-400"
                      title="Delete"
                    >
                      <i className="fa fa-trash"></i>
                    </button> */}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        {filteredStaffs.length === 0 && (
          <div className="h-[50vh] flex justify-center items-center text-sm">
            No Student Found
          </div>
        )}
      </div>
    </section>
  );
};

export default Student;
