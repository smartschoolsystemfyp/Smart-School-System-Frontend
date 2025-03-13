import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getFeeStatus } from "../../../services/fee.service";
import { useDispatch, useSelector } from "react-redux";

const Fees = () => {
  const dispatch = useDispatch();
  const { fees } = useSelector((state) => state.fee);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredFees = fees.filter((fee) =>
    fee.student?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(id) {}

  useEffect(() => {
    dispatch(getFeeStatus());
  }, []);

  return (
    <section className="p-3 sm:p-4 rounded-lg w-full h-auto mt-[10px] sm:px-8">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-0 justify-between px-2 py-4">
        <div className="flex justify-between sm:justify-center items-center gap-4 text-xl sm:text-[1.4rem] font-semibold">
          <div>
            <i className="fas fa-user-graduate mr-2 text-blue-500"></i>
            Paid Fees
          </div>
          <Link to={"/teacher/fee/mark"}>
            <div className="text-xs font-semibold pt-1 flex items-center text-green-500 hover:text-green-400">
              <p>Mark Fee Paid</p>
            </div>
          </Link>
        </div>

        <input
          type="search"
          placeholder="Search fee by student name"
          className="border border-gray-400 rounded-md p-2 text-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div id="overflow" className="overflow-x-auto ">
        <table className="min-w-full text-left table-auto border-collapse text-[0.83rem] whitespace-nowrap">
          <thead>
            <tr className="bg-gray-700 text-gray-100 text-primary">
              {[
                "SR#",
                "Student Name",
                "Class Name",
                "Month",
                "Marked By",
                "Fee Paid",
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
            {filteredFees.length > 0 &&
              filteredFees.map((fee, index) => (
                <tr key={fee._id} className="odd:bg-gray-200 hover:bg-gray-300">
                  <td className="py-3 px-4 border-b border-secondary">
                    {index + 1}
                  </td>
                  <td className="py-3 px-4 border-b border-secondary">
                    {fee.student?.name}
                  </td>
                  <td className="py-3 px-4 border-b border-secondary">
                    {fee.student.class?.className}
                  </td>
                  <td className="py-3 px-4 border-b border-secondary">
                    {fee.month}
                  </td>
                  <td className="py-3 px-4 border-b border-secondary">
                    {fee.markedBy?.name || "Unknown"}
                  </td>
                  <td className="py-3 px-4 border-b border-secondary text-green-500 font-semibold">
                    {fee.isSubmitted ? "Paid" : "Not Paid"}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        {filteredFees.length === 0 && (
          <div className="h-[50vh] flex justify-center items-center text-sm">
            No Student Found
          </div>
        )}
      </div>
    </section>
  );
};

export default Fees;
