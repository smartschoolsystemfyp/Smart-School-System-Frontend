import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getFeeStatus } from "../../../services/fee.service";
import { useDispatch, useSelector } from "react-redux";

const Fees = () => {
  const dispatch = useDispatch();
  const { fees } = useSelector((state) => state.fee);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("All");

  // Get unique months and years from the fees data
  const months = [
    "All",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const formatMonthDisplay = (monthValue) => {
    if (monthValue === "All") return "All";

    if (monthValue.includes("-")) {
      const monthNum = parseInt(monthValue.split("-")[1]);
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      return monthNames[monthNum - 1] || monthValue;
    }

    return monthValue;
  };

  const currentYear = new Date().getFullYear();
  const years = [
    "All",
    ...Array.from({ length: 5 }, (_, i) => currentYear - i),
  ];

  const filteredFees = fees.filter((fee) => {
    const matchesSearch = fee.student?.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesMonth =
      selectedMonth === "All" ||
      formatMonthDisplay(fee.month) === selectedMonth;

    return matchesSearch && matchesMonth;
  });

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

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="search"
            placeholder="Search by student name"
            className="border border-gray-400 rounded-md p-2 text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <div className="flex gap-2">
            <select
              className="border border-gray-400 rounded-md p-2 text-sm"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
            >
              {months.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Filter summary */}
      <div className="mb-4 px-2 text-sm text-gray-600">
        Showing {filteredFees.length} records{" "}
        {selectedMonth !== "All" && (
          <span>
            for {selectedMonth !== "All" && <span>{selectedMonth}</span>}
            {selectedMonth !== "All" && <span> </span>}
          </span>
        )}
        {searchTerm && <span> matching "{searchTerm}"</span>}
      </div>

      <div id="overflow" className="overflow-x-auto">
        <table className="min-w-full text-left table-auto border-collapse text-[0.83rem] whitespace-nowrap">
          <thead>
            <tr className="bg-gray-700 text-gray-100 text-primary">
              {[
                "SR#",
                "Roll No",
                "Student Name",
                "Father Name",
                "Month",
                // "Year",
                // "Marked By",
                "Fee Paid",
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
            {filteredFees.length > 0 ? (
              filteredFees.map((fee, index) => (
                <tr key={fee._id} className="odd:bg-gray-200 hover:bg-gray-300">
                  <td className="py-3 px-4 border-b border-secondary">
                    {index + 1}
                  </td>
                  <td className="py-3 px-4 border-b border-secondary">
                    {fee.student?.rollNumber}
                  </td>
                  <td className="py-3 px-4 border-b border-secondary">
                    {fee.student?.name}
                  </td>
                  <td className="py-3 px-4 border-b border-secondary">
                    {fee.student?.fatherName}
                  </td>
                  {/* <td className="py-3 px-4 border-b border-secondary">
                    {fee.student.class?.className}
                  </td> */}
                  <td className="py-3 px-4 border-b border-secondary">
                    {fee.month}
                  </td>
                  {/* <td className="py-3 px-4 border-b border-secondary">
                    {fee.year || new Date(fee.createdAt).getFullYear()}
                  </td> */}
                  {/* <td className="py-3 px-4 border-b border-secondary">
                    {fee.markedBy?.name || "Unknown"}
                  </td> */}
                  <td className="py-3 px-4 border-b border-secondary">
                    <span
                      className={`font-semibold ${
                        fee.isSubmitted ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {fee.isSubmitted ? "Paid" : "Not Paid"}
                    </span>
                  </td>
                  <td className="py-3 px-4 border-b border-secondary">
                    <button
                      onClick={() => handleDelete(fee._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="py-6 text-center text-gray-500">
                  No fees records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Fees;
