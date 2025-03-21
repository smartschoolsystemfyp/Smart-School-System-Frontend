import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteSubject,
  getAllSubjects,
} from "../../../services/subject.service";
import Loader from "../../../components/Loader";

const Subject = () => {
  const dispatch = useDispatch();

  const { subjects, loading } = useSelector((state) => state.subject);
  const [selectedClass, setSelectedClass] = useState("");
  const { classes, loading: classLoading } = useSelector(
    (state) => state.classes
  );

  const [searchTerm, setSearchTerm] = useState("");

  const filteredSubjects = subjects.filter((student) =>
    student.subjectName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(id) {
    if (window.confirm("Are you sure you want to delete?")) {
      dispatch(deleteSubject(id));
    }
  }

  useEffect(() => {
    dispatch(getAllSubjects(selectedClass));
  }, [selectedClass]);

  return (
    <section className="p-3 sm:p-4 rounded-lg w-full h-auto mt-[10px] sm:px-8">
      {(loading || classLoading) && <Loader />}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-0 justify-between px-2 py-4">
        <div className="flex justify-between sm:justify-center items-center gap-4 text-xl sm:text-[1.4rem] font-semibold">
          <div>
            <i className="fas fa-user-graduate mr-2 text-blue-500"></i>
            Subjects
          </div>
          <Link to={"/admin/subject/create"}>
            <div className="text-xs font-semibold pt-1 flex items-center text-green-500 hover:text-green-400">
              <p>Create subject</p>
            </div>
          </Link>
        </div>

        <input
          type="search"
          placeholder="Search subject by name"
          className="border border-gray-400 rounded-md p-2 text-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="my-3 flex gap-2">
        <button
          className={`text-sm border p-2 w-[180px] text-center rounded-2xl cursor-pointer ${
            selectedClass === "" ? "border-blue-500" : ""
          }`}
          onClick={() => setSelectedClass("")}
        >
          All
        </button>
        {classes.map((cls) => (
          <>
            <button
              key={cls._id}
              className={`text-sm border p-2 w-[180px] text-center rounded-2xl cursor-pointer ${
                selectedClass === cls._id ? "border-blue-500" : ""
              }`}
              onClick={() => setSelectedClass(cls._id)}
            >
              {cls.className}
            </button>
          </>
        ))}
      </div>

      <div id="overflow" className="overflow-x-auto ">
        <table className="min-w-full text-left table-auto border-collapse text-[0.83rem] whitespace-nowrap">
          <thead>
            <tr className="bg-[#212121] text-gray-100 text-primary">
              {["SR#", "Subject Name", "Class Name", "Actions"].map(
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
            {filteredSubjects.length > 0 &&
              filteredSubjects.map((subject, index) => (
                <tr
                  key={subject._id}
                  className="odd:bg-gray-200 hover:bg-gray-300"
                >
                  <td className="py-3 px-4 border-b border-secondary">
                    {index + 1}
                  </td>
                  <td className="py-3 px-4 border-b border-secondary">
                    {subject.subjectName}
                  </td>
                  <td className="py-3 px-4 border-b border-secondary">
                    {subject.class?.className || "Not Assigned"}
                  </td>

                  <td className="py-3 pl-8 border-b border-secondary flex items-center space-x-2">
                    <Link to={`/admin/subject/${subject._id}`}>
                      <button
                        className="text-green-500 hover:text-green-400"
                        title="Edit"
                      >
                        <i className="fa fa-edit"></i>
                      </button>
                    </Link>

                    <button
                      onClick={() => handleDelete(subject._id)}
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

        {filteredSubjects.length === 0 && (
          <div className="h-[50vh] flex justify-center items-center text-sm">
            No subject Found
          </div>
        )}
      </div>
    </section>
  );
};

export default Subject;
