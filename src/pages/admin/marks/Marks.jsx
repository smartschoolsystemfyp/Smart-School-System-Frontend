import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import Loader from "../../../components/Loader";
import { getMarks } from "../../../services/result.service";
import { getAllSubjects } from "../../../services/subject.service";

const Marks = () => {
  const dispatch = useDispatch();
  const { marks, loading } = useSelector((state) => state.marks);
  const { subjects, loading: subjectLoading } = useSelector(
    (state) => state.subject
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedExamType, setSelectedExamType] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");

  const filteredMarks = marks.filter(
    (mark) =>
      mark.student.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedExamType ? mark.examType === selectedExamType : true)
  );

  useEffect(() => {
    dispatch(getAllSubjects(""));
  }, []);

  useEffect(() => {
    dispatch(getMarks({ selectedSubject, selectedExamType }));
  }, [selectedExamType, selectedSubject]);

  return (
    <section className="p-3 sm:p-4 rounded-lg w-full h-auto mt-[10px] sm:px-8">
      {(loading || subjectLoading) && <Loader />}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-0 justify-between px-2 py-4">
        <div className="flex justify-between sm:justify-center items-center gap-4 text-xl sm:text-[1.4rem] font-semibold">
          <div>
            <i className="fas fa-user-graduate mr-2 text-blue-500"></i>
            Marks
          </div>
        </div>

        <input
          type="search"
          placeholder="Search student by name"
          className="border border-gray-400 rounded-md p-2 text-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="my-3 flex gap-2">
        <button
          className={`text-sm border p-2 w-[180px] text-center rounded-2xl cursor-pointer ${
            selectedExamType === "" ? "border-blue-500" : ""
          }`}
          onClick={() => setSelectedExamType("")}
        >
          All Exams
        </button>
        <button
          className={`text-sm border p-2 w-[180px] text-center rounded-2xl cursor-pointer ${
            selectedExamType === "Mid" ? "border-blue-500" : ""
          }`}
          onClick={() => setSelectedExamType("Mid")}
        >
          Mid Exam
        </button>
        <button
          className={`text-sm border p-2 w-[180px] text-center rounded-2xl cursor-pointer ${
            selectedExamType === "Final" ? "border-blue-500" : ""
          }`}
          onClick={() => setSelectedExamType("Final")}
        >
          Final Exam
        </button>
      </div>

      <div className="my-3 flex gap-2">
        <button
          className={`text-sm border p-2 w-[180px] text-center rounded-2xl cursor-pointer ${
            selectedSubject === "" ? "border-blue-500" : ""
          }`}
          onClick={() => setSelectedSubject("")}
        >
          All
        </button>
        {subjects.map((subject) => (
          <>
            <button
              key={subject._id}
              className={`text-sm border p-2 w-[180px] text-center rounded-2xl cursor-pointer ${
                selectedSubject === subject._id ? "border-blue-500" : ""
              }`}
              onClick={() => setSelectedSubject(subject._id)}
            >
              {subject.subjectName}
            </button>
          </>
        ))}
      </div>

      <div id="overflow" className="overflow-x-auto ">
        <table className="min-w-full text-left table-auto border-collapse text-[0.83rem] whitespace-nowrap">
          <thead>
            <tr className="bg-[#212121] text-gray-100 text-primary">
              {[
                "SR#",
                "Student Name",
                "Email",
                "Subject",
                "Obtained",
                "Total Marks",
                "Exam Type",
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
            {filteredMarks.length > 0 &&
              filteredMarks.map((mark, index) => (
                <tr
                  key={mark._id}
                  className="odd:bg-gray-200 hover:bg-gray-300"
                >
                  <td className="py-3 px-4 border-b border-secondary">
                    {index + 1}
                  </td>
                  <td className="py-3 px-4 border-b border-secondary">
                    {mark.student.name}
                  </td>
                  <td className="py-3 px-4 border-b border-secondary">
                    {mark.student.email}
                  </td>
                  <td className="py-3 px-4 border-b border-secondary">
                    {mark.subject.subjectName}
                  </td>
                  <td className="py-3 px-4 border-b border-secondary">
                    {mark.marksObtained}
                  </td>
                  <td className="py-3 px-4 border-b border-secondary">
                    {mark.totalMarks}
                  </td>
                  <td className="py-3 px-4 border-b border-secondary">
                    {mark.examType}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        {filteredMarks.length === 0 && (
          <div className="h-[50vh] flex justify-center items-center text-sm">
            No Marks Found
          </div>
        )}
      </div>
    </section>
  );
};

export default Marks;
