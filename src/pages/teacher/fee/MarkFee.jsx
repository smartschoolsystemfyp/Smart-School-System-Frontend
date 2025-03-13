import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllStudents } from "../../../services/student.service";
import { markFeePaid, getFeeStatus } from "../../../services/fee.service";

const MarkFeePaid = () => {
  const dispatch = useDispatch();
  const { students } = useSelector((state) => state.student);
  const { fees, loading } = useSelector((state) => state.fee);

  useEffect(() => {
    dispatch(getAllStudents());
    dispatch(getFeeStatus());
  }, []);

  const months = Array.from({ length: 12 }, (_, i) => {
    const date = new Date(2025, i);
    return {
      value: date.toISOString().slice(0, 7),
      label: date.toLocaleString("default", { month: "long", year: "numeric" }),
    };
  });

  const handleMarkPaid = (studentId, month) => {
    dispatch(markFeePaid({ studentId, month, isSubmitted: true }));
    dispatch(getFeeStatus());
  };

  const isFeePaid = (studentId, month) => {
    return fees.some(
      (fee) =>
        fee.student?._id === studentId &&
        fee.month.startsWith(month) &&
        fee.isSubmitted
    );
  };

  return (
    <section className="flex justify-center min-h-[88vh] p-4">
      <div className="w-full bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Mark Fee Paid</h2>
        <div id="overflow" className="overflow-x-auto">
          <table className="w-full border-collapse border">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-3 border">Student Name</th>
                {months.map((month) => (
                  <th
                    key={month.value}
                    className="p-3 border font-medium text-sm"
                  >
                    {month.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {students.length > 0 &&
                students.map((student) => (
                  <tr key={student._id} className="text-center">
                    <td className="p-3 border">{student.name}</td>
                    {months.map((month) => (
                      <td key={month.value} className="p-3 border">
                        <button
                          onClick={() =>
                            handleMarkPaid(student._id, month.value)
                          }
                          className={`px-3 py-1 rounded-md transition ${
                            isFeePaid(student._id, month.value)
                              ? "bg-gray-400 cursor-not-allowed"
                              : "bg-green-500 hover:bg-green-600 text-white"
                          }`}
                          disabled={
                            isFeePaid(student._id, month.value) || loading
                          }
                        >
                          {isFeePaid(student._id, month.value)
                            ? "Paid"
                            : "Mark Paid"}
                        </button>
                      </td>
                    ))}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default MarkFeePaid;
