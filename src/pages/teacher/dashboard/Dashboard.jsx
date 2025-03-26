import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const links = [
    {
      to: "/teacher/attendance/mark",
      icon: "fas fa-chalkboard-teacher",
      label: "Attendance",
    },
    { to: "/teacher/marks", icon: "fas fa-pen-alt", label: "Marks" },
    { to: "/teacher/fees", icon: "fas fa-dollar-sign", label: "Fees" },
    { to: "/teacher/settings", icon: "fas fa-cogs", label: "Settings" },
  ];

  return (
    <section className="h-auto lg:h-[83vh] w-full flex justify-center items-center">
      <div className="my-10 px-5 flex justify-around gap-2 items-center flex-wrap">
        {links.map((link, index) => (
          <Link
            key={index}
            to={link.to}
            className="flex-grow w-[97%] sm:w-[400px] h-[180px] rounded-4xl border border-gray-300 flex flex-col items-center justify-center text-center bg-white hover:bg-blue-100 hover:border-blue-500 hover:ring-2 hover:ring-blue-500 transition duration-300 ease-in-out"
          >
            <i className={`${link.icon} text-4xl text-green-500`}></i>
            <h3 className="mt-2 text-lg font-semibold text-blue-500">
              {link.label}
            </h3>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Dashboard;
