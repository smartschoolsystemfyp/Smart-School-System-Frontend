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
  {
    label: "Marks Management",
    path: "/admin/marks",
    icon: "fas fa-clipboard-list",
  },
  {
    label: "Mark Attendance",
    path: "/admin/attendance/mark",
    icon: "fas fa-chalkboard-teacher",
  },
  {
    label: "Check Attendance",
    path: "/admin/attendance/check",
    icon: "fas fa-chalkboard-teacher",
  },
  { label: "Funds Management", path: "/admin/funds", icon: "fas fa-coins" },
  {
    label: "Document Management",
    path: "/admin/documents",
    icon: "fas fa-file-alt",
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
      <div className="bg-gray-600 w-full h-[65px] fixed top-0 left-0 z-20 flex items-center px-5">
        {/* <h2 className="hidden text-lg font-semibold text-gray-300 items-center justify-center lg:flex mt-16">
          <img className="w-[200px]" src="/school.png" alt="school_logo" />
        </h2> */}

        <div className="cursor-pointer lg:hidden" onClick={toggleSidebar}>
          <i className="fa fa-bars text-white text-lg"></i>
        </div>

        <div className="ml-auto flex items-center gap-4">
          <div className="w-[40px] h-[40px] rounded-full bg-gray-400">
            <img
              className="w-full h-full rounded-full"
              src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQAlQMBIgACEQEDEQH/xAAbAAEAAwEBAQEAAAAAAAAAAAAAAwQFAgEHBv/EADIQAAICAAUCBAUDAwUAAAAAAAABAgMEERIhMUFRBRNxgSIyYaGxUpHCQlPBBiM0YpL/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAf/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/APuIAAAAAAR23QpWc5Zf5AkBnW+ISe1Ucl3fJVndZN/FOT9wNlzguZJe555tf9yP7mJ6gDdUk+GmemCm1w2vQmrxV1fE212e4GwClTj4SyVq0Pv0LkWpLNPNAegAAAAAAAAAAAUsditKddb+Lq+wDFYzy84Vby6vojPlJzk5SebfVngKgAWKsPtnZ7ICuMi+oqK2WR6BnguTphLfTk/oVrK3W9+OjA4JKb7KH8D26xIwBs4e+F0c4vfquqJTDrslVNTg919zXw90boKUfddiKlAAAAAAABDirvJqcuvC9THbzbb5fJZx9vmXuPSG3uVgAB4VFjC1552P0RZOYLKCS7HRFAAAOZxUotM6AFCUXGTT5PCbFLKaa6kJUCXC3eTcn/S9pEQA3U80elTw63XTpb3ht7FsigAAHNktEJS7I6K+OeWGn7IDJbcnm+XuACoAAC+uEekWHmpVpdVsSkUAAAAAVsV80fQgO7parG+nBwVAAAWfD56cQo9JLI1TEolpug/+yNtEUAAAq+I/8Z+qLRXx6zw0/Z/cDJABUAAB1XPRPUvdFuucZrNc9ikE2uGBoAqRvsXTUdO+z+3l+5FWCC+7mMPdkU7Zy+Z7djgAACoAAD2PzL1RumJStV0F3kjbIoAABxbHXXKHdZHYAwcmtnygWMdX5d8n0luiuVABbvLr2LVNGjee8vwFRV0SlvLZE8aYR6ZvuyQEAAAeNJrdJkUsPF/L8JMAKM65Q+ZejOS+0msms0VbqdHxRz0/goiAARYwENWIT6RWZrFTw6vTVrfM/wAFsigAAAACDF0+dU0vmW8TI65dTeKeIwqditjz1Xf6gV6KtK1yW74+hMAAAAAAAAAADy68AAU76/Lln/T+D3DVO61RXHLf0LWjzE49yzhqI0QyW7fL7gSxSSSXC2PQAAAAAAAAAILaesP2IGmuS8cSrjLlAVASyokvl3Immnk0wAAAAHUYSlxEDk9jBy2RNCj9T9iaKSWSA5rrUF9TsAAAAAAAAAAAAAGYAHmR6AOdEf0o88uH6V+x2APFGK4SR6MxmAAzGYAHmaPQAAAAAAAABzLZZgAU/D8RZicKrLMtTnNbLLibivsjnwrGWYujXYop6K5fCv1QTf3YAE2IvlXdhoRSyss0yz7aZP8AijzHXzoVDhl8d8IPNdG9wALCbyEZNsADJxviN9PjdOEho8qVebTW+eU3/Ffcx4f6gx8sJgbm688ThozktG0W3Fbf+nyABJT49jbZTi3XFf7SWUeNSi3z6snx/jWLoxeIpr8tRqxFdazju04ann7gAML45i7cZgKpRq04jH4rDzyi/lrjNxy35+FZn6VcIAD0AAAAB//Z"
              alt="profile"
            />
          </div>
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
        id="overflow"
        className="w-[260px] text-white h-screen p-3 fixed top-0 z-50  shadow-xl bg-gray-600 overflow-auto"
        initial={{ x: -260 }}
        animate={{ x: isOpen ? 0 : -260 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <h2 className="hidden text-lg font-semibold text-gray-300 items-center justify-center lg:flex">
          <img
            className="w-[200px] z-50 relative"
            src="/school.png"
            alt="school_logo"
          />
        </h2>

        <ul className="space-y-3">
          {menuItems.map((item, index) =>
            item.section ? (
              <p
                key={index}
                className="text-xs text-gray-300 font-semibold uppercase"
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
