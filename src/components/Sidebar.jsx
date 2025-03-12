import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { logoutAdmin } from "../services/authentication.service";

const menuItems = [
  { label: "Dashboard Overview", path: "/admin", icon: "fas fa-chart-bar" },
  { section: "Management" },
  {
    label: "Students Management",
    path: "/admin/students",
    icon: "fas fa-user-graduate",
  },
  { label: "Staff Management", path: "/admin/staffs", icon: "fas fa-user-tie" },
  {
    label: "Subjects Management",
    path: "/admin/subjects",
    icon: "fas fa-book-open",
  },
  { label: "Classes Management", path: "/admin/class", icon: "fas fa-school" },
  { label: "Marks Management", path: "/admin/marks", icon: "fas fa-school" },
  {
    label: "Mark Attendance",
    path: "/admin/attendance/mark",
    icon: "fas fa-chalkboard-teacher",
  },
  { section: "Analytics" },
  { label: "Settings", path: "/admin/settings", icon: "fas fa-cogs" },
  { label: "Logout", action: "logout", icon: "fas fa-sign-out-alt" },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(window.innerWidth >= 1024);
  const dispatch = useDispatch();
  const location = useLocation();
  const admin = useSelector((state) => state.authentication.admin);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsOpen(window.matchMedia("(min-width: 1024px)").matches);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setIsOpen((prev) => !prev);

  return (
    <>
      <div className="bg-[#212121] w-full h-[65px] fixed top-0 left-0 z-50 flex items-center px-5">
        <h2 className="text-center text-lg font-semibold text-gray-300 hidden lg:block">
          <i class="fas fa-school mr-2"></i>
          School Management
        </h2>

        <div className="cursor-pointer lg:hidden" onClick={toggleSidebar}>
          <i className="fa fa-bars text-white text-lg"></i>
        </div>

        <div className="ml-auto flex items-center gap-4">
          <div className="w-[40px] h-[40px] rounded-full bg-gray-400"></div>
          <div className="text-gray-200 hidden sm:block">
            <p className="text-sm font-semibold">{admin?.name}</p>
            <p className="text-xs">{admin?.email}</p>
          </div>
        </div>
      </div>

      {isOpen && window.innerWidth < 1024 && (
        <div
          className="fixed inset-0 bg-gray-800 bg-opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      <motion.aside
        className="w-[260px] text-white h-screen p-3 fixed top-0 z-50 lg:z-10 shadow-xl bg-[#212121] pt-10"
        initial={{ x: -260 }}
        animate={{ x: isOpen ? 0 : -260 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <h2 className="text-center text-lg font-semibold text-gray-300 lg:hidden block">
          <i class="fas fa-school mr-2"></i>
          School Management
        </h2>

        <ul className="space-y-3 mt-10">
          {menuItems.map((item, index) =>
            item.section ? (
              <p
                key={index}
                className="text-xs text-gray-400 font-semibold uppercase"
              >
                {item.section}
              </p>
            ) : (
              <li key={index}>
                {item.action ? (
                  <div
                    onClick={() => {
                      if (window.confirm("Are you sure you want to logout?")) {
                        setLoading(true);
                        dispatch(logoutAdmin()).finally(() =>
                          setLoading(false)
                        );
                      }
                    }}
                    className="text-[0.9rem] p-2 rounded hover:bg-white hover:text-gray-800 cursor-pointer flex items-center transition-all duration-300"
                  >
                    {loading ? (
                      <i className="fa fa-spinner fa-spin mr-3"></i>
                    ) : (
                      <i className={`${item.icon} mr-3`}></i>
                    )}
                    {item.label}
                  </div>
                ) : (
                  <Link
                    to={item.path}
                    className={`text-[0.88rem] p-2 rounded hover:bg-white hover:text-gray-800 flex items-center transition-all duration-300 ${
                      location.pathname === item.path
                        ? "border-l-[6px] border-white"
                        : ""
                    }`}
                  >
                    <i className={`${item.icon} mr-3`}></i> {item.label}
                  </Link>
                )}
              </li>
            )
          )}
        </ul>

        {isOpen && window.innerWidth < 1024 && (
          <button
            onClick={toggleSidebar}
            className="absolute left-[270px] top-[15px] z-50 flex justify-center items-center cursor-pointer bg-white text-gray-800 rounded-full p-1 w-[25px] h-[25px]"
          >
            <i className="fa-solid fa-times text-xs"></i>
          </button>
        )}
      </motion.aside>
    </>
  );
};

export default Sidebar;
