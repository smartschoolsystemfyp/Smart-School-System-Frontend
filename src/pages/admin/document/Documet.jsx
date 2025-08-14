import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import Loader from "../../../components/Loader";
import { getAllDocuments } from "../../../services/document&fund.service";

const Document = () => {
  const dispatch = useDispatch();

  const { documents, loading } = useSelector((state) => state.combine);
  const [filter, setFillter] = useState("");

  useEffect(() => {
    dispatch(getAllDocuments(filter));
  }, [filter]);

  return (
    <section className="p-3 sm:p-4 rounded-lg w-full h-auto mt-[10px] sm:px-8">
      {loading && <Loader />}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-0 justify-between px-2 py-4">
        <div className="flex justify-between sm:justify-center items-center gap-4 text-xl sm:text-[1.4rem] font-semibold">
          <div>
            <i className="fas fa-user-graduate mr-2 text-blue-500"></i>
            Document Records
          </div>
          <Link to={"/admin/document/create"}>
            <div className="text-xs font-semibold pt-1 flex items-center text-green-500 hover:text-green-400">
              <p>Create document</p>
            </div>
          </Link>
        </div>
      </div>

      <div className="my-3 flex gap-2">
        <button
          className={`text-sm border p-2 w-[180px] text-center rounded-2xl cursor-pointer ${
            filter === "" ? "border-blue-500" : ""
          }`}
          onClick={() => setFillter("")}
        >
          All
        </button>
        {["Pending", "Recieved"].map((f, i) => (
          <>
            <button
              key={i}
              className={`text-sm border p-2 w-[180px] text-center rounded-2xl cursor-pointer ${
                filter === f ? "border-blue-500" : ""
              }`}
              onClick={() => setFillter(f)}
            >
              {f}
            </button>
          </>
        ))}
      </div>

      <div id="overflow" className="overflow-x-auto ">
        <table className="min-w-full text-left table-auto border-collapse text-[0.83rem] whitespace-nowrap">
          <thead>
            <tr className="bg-[#212121] text-gray-100 text-primary">
              {["SR#", "Name", "Class", "Status", "Actions"].map((header) => (
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
            {documents.length > 0 &&
              documents.map((doc, index) => (
                <tr key={doc._id} className="odd:bg-gray-200 hover:bg-gray-300">
                  <td className="py-3 px-4 border-b border-secondary">
                    {index + 1}
                  </td>
                  <td className="py-3 px-4 border-b border-secondary">
                    {doc.name}
                  </td>
                  <td className="py-3 px-4 border-b border-secondary">
                    {doc?.class?.className || "Not Exist"}
                  </td>
                  <td className="py-3 px-4 border-b border-secondary">
                    {doc.status}
                  </td>
                  <td className="py-3 pl-8 border-b border-secondary flex items-center space-x-2">
                    <Link to={`/admin/document/${doc._id}`}>
                      <button
                        className="text-green-500 hover:text-green-400"
                        title="Edit"
                      >
                        <i className="fa fa-edit"></i>
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        {documents.length === 0 && (
          <div className="h-[50vh] flex justify-center items-center text-sm">
            No Document Record Found
          </div>
        )}
      </div>
    </section>
  );
};

export default Document;
