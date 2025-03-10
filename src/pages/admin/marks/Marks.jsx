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
  const { classes, loading: classLoading } = useSelector(
    (state) => state.classes
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedExamType, setSelectedExamType] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedClass, setSelectedClass] = useState("");

  const filteredMarks = marks.filter(
    (mark) =>
      mark.student.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedExamType ? mark.examType === selectedExamType : true)
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(getAllSubjects(""));
  }, []);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  useEffect(() => {
    dispatch(getMarks({ selectedSubject, selectedExamType, selectedClass }));
  }, [selectedExamType, selectedSubject, selectedClass]);

  return (
    <section className="p-3 sm:p-4 rounded-lg w-full h-auto mt-[10px] sm:px-8">
      {(loading || subjectLoading || classLoading) && <Loader />}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-0 justify-between px-2">
        <div className="flex justify-between sm:justify-center items-center gap-4 text-xl sm:text-[1.4rem] font-semibold">
          <div>
            <i className="fas fa-user-graduate mr-2 text-blue-500"></i>
            Marks
          </div>
        </div>

        <div className="flex justify-between items-center px-2 py-4">
          <button
            onClick={toggleModal}
            className="bg-blue-500 text-white p-3 w-[100px] rounded-lg font-semibold"
          >
            Filter
          </button>
        </div>
      </div>

      <section className="p-3 sm:p-4 rounded-lg w-full h-auto sm:px-8">
        {(loading || subjectLoading || classLoading) && <Loader />}

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-80">
              <h3 className="text-lg font-semibold mb-4">Filter Marks</h3>
              <select
                value={selectedExamType}
                onChange={(e) => setSelectedExamType(e.target.value)}
                className="w-full p-2 border rounded mb-2"
              >
                <option value="">All Exam Types</option>
                <option value="Mid">Mid Exam</option>
                <option value="Final">Final Exam</option>
              </select>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full p-2 border rounded mb-2"
              >
                <option value="">All Classes</option>
                {classes.map((cls) => (
                  <option key={cls._id} value={cls._id}>
                    {cls.className}
                  </option>
                ))}
              </select>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full p-2 border rounded mb-2"
              >
                <option value="">All Subjects</option>
                {subjects.map((subject) => (
                  <option key={subject._id} value={subject._id}>
                    {subject.subjectName}
                  </option>
                ))}
              </select>
              <div className="flex justify-end mt-4">
                <button
                  onClick={toggleModal}
                  className="bg-gray-500 text-white p-2 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </section>

      <div id="overflow" className="overflow-x-auto ">
        <table className="min-w-full text-left table-auto border-collapse text-[0.83rem] whitespace-nowrap">
          <thead>
            <tr className="bg-[#212121] text-gray-100 text-primary">
              {[
                "SR#",
                "Student Name",
                "Email",
                "Subject",
                "Class",
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
                    {mark.student.class?.className}
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
