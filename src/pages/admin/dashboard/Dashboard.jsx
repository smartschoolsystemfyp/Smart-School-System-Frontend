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
      bgColor: "bg-blue-500",
      icon: <FaUserGraduate size={20} />,
    },
    {
      title: "Total Teachers",
      value: insights?.totalTeachers || 0,
      bgColor: "bg-green-500",
      icon: <FaChalkboardTeacher size={20} />,
    },
    {
      title: "Total Non teaching",
      value: insights?.totalNonTeaching || 0,
      bgColor: "bg-yellow-500",
      icon: <FaBookOpen size={20} />,
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
    <section className="p-3 space-y-6">
      {/* Reports Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reports.map((report, index) => (
          <div
            key={index}
            className={`flex flex-col items-center justify-center h-32 ${report.bgColor} text-white rounded-lg shadow-lg p-6 space-y-2`}
          >
            <p>{report.icon}</p>
            <h2 className="text-lg font-semibold">{report.title}</h2>
            <p className="text-2xl font-bold">{report.value}</p>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
