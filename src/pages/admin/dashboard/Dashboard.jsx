import React, { useEffect, useState } from "react";
import { Doughnut, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement,
  Filler,
} from "chart.js";
import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaBookOpen,
  FaMoneyBillWave,
} from "react-icons/fa";
import { getInsights } from "../../../services/insight.service";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement,
  Filler
);

const Dashboard = () => {
  const [insights, setInsights] = useState(null);

  const fetchInsights = async () => {
    const insight = await getInsights();
    setInsights(insight);
  };

  useEffect(() => {
    fetchInsights();
  }, []);

  const reports = [
    {
      title: "Total Students",
      value: insights?.totalStudents || 0,
      bgColor: "bg-gradient-to-r from-blue-500 to-blue-700",
      icon: <FaUserGraduate size={60} />,
    },
    {
      title: "Total Teachers",
      value: insights?.totalTeachers || 0,
      bgColor: "bg-gradient-to-r from-green-500 to-green-700",
      icon: <FaChalkboardTeacher size={60} />,
    },
    {
      title: "Total Non-Teaching",
      value: insights?.totalNonTeaching || 0,
      bgColor: "bg-gradient-to-r from-yellow-500 to-yellow-700",
      icon: <FaBookOpen size={60} />,
    },
    {
      title: "Total Expenses",
      value: insights?.totalExpenses || 0,
      bgColor: "bg-gradient-to-r from-red-500 to-red-700",
      icon: <FaMoneyBillWave size={60} />,
    },
  ];

  const lineData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Attendance Percentage",
        data: [95, 92, 90, 93, 96, 94],
        borderColor: "#42A5F5",
        backgroundColor: "rgba(66, 165, 245, 0.4)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const doughnutData = {
    labels:
      (insights && insights.subjectsName.map((item) => item.subjectName)) || [],
    datasets: [
      {
        data: [300, 250, 200],
        backgroundColor: ["#4CAF50", "#FF9800", "#2196F3", "#E91E63"],
      },
    ],
  };

  return (
    <section className="p-3 space-y-4 bg-slate-50">
      {/* Reports Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {reports.map((report, index) => (
          <div
            key={index}
            className={`flex items-center justify-around h-32 ${report.bgColor} text-white rounded-lg shadow-lg p-6 space-y-2`}
          >
            <p>{report.icon}</p>
            <div className="flex flex-col justify-center items-center">
              <h2 className="text-xl font-extrabold pb-2">{report.title}</h2>
              <p className="text-xl font-bold">{report.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {/* Doughnut Chart - Subject Enrollment */}
        <div className="bg-white border border-gray-300 rounded-lg p-6 flex flex-col items-center">
          <h3 className="text-lg font-semibold text-center mb-4">
            Subject Enrollment
          </h3>
          <div className="w-72 h-72">
            <Doughnut data={doughnutData} />
          </div>
        </div>

        {/* Line Chart - Attendance Trend */}
        <div className="bg-white border border-gray-300 rounded-lg p-6 flex flex-col items-center">
          <h3 className="text-lg font-semibold text-center mb-4">
            Attendance Trend
          </h3>
          <div className="w-full pt-16">
            <Line data={lineData} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
