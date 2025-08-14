import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import {
  getFundById,
  updateFund,
} from "../../../services/document&fund.service";

const UpdateFund = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { fund, loading } = useSelector((state) => state.combine);

  const [formData, setFormData] = useState({
    date: "",
    amount: "",
    type: "",
    detail: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateFund({ id, fund: formData }))
      .unwrap()
      .then(() => navigate("/admin/funds"))
      .catch((error) => {
        console.error("Error updating fund:", error);
      });
  };

  useEffect(() => {
    if (fund) {
      setFormData({
        date: fund.date ? new Date(fund.date).toISOString().split("T")[0] : "",
        amount: fund.amount || "",
        type: fund.type || "",
        detail: fund.detail || "",
      });
    }
  }, [fund]);

  useEffect(() => {
    dispatch(getFundById(id));
  }, [id]);

  return (
    <div className="flex items-center justify-center min-h-[88vh]">
      <section className="p-6 w-full max-w-md bg-white shadow-lg rounded-xl">
        <h2 className="text-xl font-semibold mb-4">Update Fund</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="number"
            name="amount"
            placeholder="Enter amount (pkr)"
            value={formData.amount}
            onChange={handleChange}
            className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
            min={0}
            required
          />

          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select type</option>
            {["NSB", "FTF"].map((s, i) => (
              <option key={i} value={s}>
                {s}
              </option>
            ))}
          </select>

          <input
            type="text"
            name="detail"
            placeholder="Enter Detail"
            value={formData.detail}
            onChange={handleChange}
            className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />

          <button
            type="submit"
            className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
          >
            {loading ? " Updating..." : " Update Record"}
          </button>
        </form>
      </section>
    </div>
  );
};

export default UpdateFund;
