import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllStudents } from "../../../services/student.service";
import { getAllSubjects } from "../../../services/subject.service";
import { bulkUploadMarks } from "../../../services/result.service";
import { useNavigate } from "react-router-dom";

const UploadMarks = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [marksData, setMarksData] = useState([]);
  const [examType, setExamType] = useState("Mid");
  const [selectedClass, setSelectedClass] = useState("");

  const { students } = useSelector((state) => state.student);
  const { classes } = useSelector((state) => state.classes);
  const { subjects } = useSelector((state) => state.subject);
  const { loading } = useSelector((state) => state.marks);

  useEffect(() => {
    if (selectedClass) {
      dispatch(getAllStudents(selectedClass));
      dispatch(getAllSubjects(selectedClass));
    }
  }, [selectedClass]);

  const handleMarksChange = (student, subject, field, value) => {
    // console.log("first", student, subject);
    setMarksData((prevData) => {
      const updatedData = [...prevData];
      const existingEntry = updatedData.find(
        (entry) => entry.student === student && entry.subject === subject
      );

      if (existingEntry) {
        existingEntry[field] = value;
      } else {
        updatedData.push({ student, subject, [field]: value });
      }

      return updatedData;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedData = {
      examType,
      marksData: marksData.map((entry) => ({
        student: entry.student,
        subject: entry.subject,
        marksObtained: parseInt(entry.marksObtained) || 0,
        totalMarks: parseInt(entry.totalMarks) || 100,
      })),
    };
    dispatch(bulkUploadMarks(formattedData));
    navigate("/teacher/dashboard");
  };

  return (
    <section className="flex justify-center items-center h-[88vh] text-sm">
      <section className="p-6 w-[90%] h-[90%] rounded-xl text-center">
        <h2 className="text-left text-xl font-semibold mb-4">Upload Marks</h2>

        <div className="mb-4">
          <label className="font-medium">Select Class:</label>
          <select
            className="ml-2 p-2 border rounded-md"
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
          >
            <option value="">-- Select Class --</option>
            {classes.map((cls) => (
              <option key={cls._id} value={cls._id}>
                {cls.className}
              </option>
            ))}
          </select>
        </div>

        {selectedClass && (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <select
              value={examType}
              onChange={(e) => setExamType(e.target.value)}
              className="border p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500 mx-auto"
              required
            >
              <option value="Mid">Mid Exam</option>
              <option value="Final">Final Exam</option>
            </select>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300 mx-auto">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-3">Student Name</th>
                    {subjects.map((subject) => (
                      <th key={subject._id} className="border p-3">
                        {subject.subjectName}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student._id} className="border">
                      <td className="border p-3 font-medium">{student.name}</td>
                      {subjects.map((subject) => (
                        <td key={subject._id} className="border p-3">
                          <input
                            type="number"
                            placeholder="Marks"
                            className="border p-2 rounded w-20 text-center"
                            onChange={(e) =>
                              handleMarksChange(
                                student._id,
                                subject._id,
                                "marksObtained",
                                e.target.value
                              )
                            }
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition mx-auto w-40"
            >
              {loading ? "Submitting..." : " Submit Marks"}
            </button>
          </form>
        )}
      </section>
    </section>
  );
};

export default UploadMarks;
