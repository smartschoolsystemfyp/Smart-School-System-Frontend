import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutTeacher } from "../services/authentication.service";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const teacher = useSelector((state) => state.authentication.teacher);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      dispatch(logoutTeacher())
        .unwrap()
        .then(() => navigate("/"))
        .catch((error) => {
          console.error("Error logout teacher:", error);
        });
    }
  };

  const links = [
    { label: "Attendance", to: "/teacher/attendance/mark" },
    { label: "Students", to: "/teacher/students" },
    { label: "Marks", to: "/teacher/marks" },
    { label: "Fees", to: "/teacher/fees" },
    { label: "Settings", to: "/teacher/settings" },
  ];

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 h-[100px]">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between px-10 mx-auto p-4">
        <Link
          to="/teacher"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img src="/school.png" className="h-[80px] w-[100px]" alt="Logo" />
        </Link>

        {/* Hamburger Icon */}
        <button
          onClick={handleMenuToggle}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded={isMenuOpen ? "true" : "false"}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        {/* Menu */}
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } w-full md:block md:w-auto`}
          id="navbar-default"
        >
          <ul className="text-sm flex justify-center items-center flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link
                to="/teacher"
                className="block py-2 px-3 text-white  rounded-sm md:bg-transparent0 md:p-0 dark:text-white"
                aria-current="page"
              >
                Home
              </Link>
            </li>

            {/* Dynamically created links */}
            {links.map((link, index) => (
              <li key={index}>
                <Link
                  to={link.to}
                  className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  {link.label}
                </Link>
              </li>
            ))}

            {/* Logout Button */}
            <li>
              <button
                onClick={handleLogout}
                className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Logout
              </button>
            </li>

            <div className="ml-auto hidden sm:flex items-center gap-4">
              <div className="w-[40px] h-[40px] rounded-full bg-gray-400">
                <img
                  className="w-full h-full rounded-full"
                  src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQAlQMBIgACEQEDEQH/xAAbAAEAAwEBAQEAAAAAAAAAAAAAAwQFAgEHBv/EADIQAAICAAUCBAUDAwUAAAAAAAABAgMEERIhMUFRBRNxgSIyYaGxUpHCQlPBBiM0YpL/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAf/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/APuIAAAAAAR23QpWc5Zf5AkBnW+ISe1Ucl3fJVndZN/FOT9wNlzguZJe555tf9yP7mJ6gDdUk+GmemCm1w2vQmrxV1fE212e4GwClTj4SyVq0Pv0LkWpLNPNAegAAAAAAAAAAAUsditKddb+Lq+wDFYzy84Vby6vojPlJzk5SebfVngKgAWKsPtnZ7ICuMi+oqK2WR6BnguTphLfTk/oVrK3W9+OjA4JKb7KH8D26xIwBs4e+F0c4vfquqJTDrslVNTg919zXw90boKUfddiKlAAAAAAABDirvJqcuvC9THbzbb5fJZx9vmXuPSG3uVgAB4VFjC1552P0RZOYLKCS7HRFAAAOZxUotM6AFCUXGTT5PCbFLKaa6kJUCXC3eTcn/S9pEQA3U80elTw63XTpb3ht7FsigAAHNktEJS7I6K+OeWGn7IDJbcnm+XuACoAAC+uEekWHmpVpdVsSkUAAAAAVsV80fQgO7parG+nBwVAAAWfD56cQo9JLI1TEolpug/+yNtEUAAAq+I/8Z+qLRXx6zw0/Z/cDJABUAAB1XPRPUvdFuucZrNc9ikE2uGBoAqRvsXTUdO+z+3l+5FWCC+7mMPdkU7Zy+Z7djgAACoAAD2PzL1RumJStV0F3kjbIoAABxbHXXKHdZHYAwcmtnygWMdX5d8n0luiuVABbvLr2LVNGjee8vwFRV0SlvLZE8aYR6ZvuyQEAAAeNJrdJkUsPF/L8JMAKM65Q+ZejOS+0msms0VbqdHxRz0/goiAARYwENWIT6RWZrFTw6vTVrfM/wAFsigAAAACDF0+dU0vmW8TI65dTeKeIwqditjz1Xf6gV6KtK1yW74+hMAAAAAAAAAADy68AAU76/Lln/T+D3DVO61RXHLf0LWjzE49yzhqI0QyW7fL7gSxSSSXC2PQAAAAAAAAAILaesP2IGmuS8cSrjLlAVASyokvl3Immnk0wAAAAHUYSlxEDk9jBy2RNCj9T9iaKSWSA5rrUF9TsAAAAAAAAAAAAAGYAHmR6AOdEf0o88uH6V+x2APFGK4SR6MxmAAzGYAHmaPQAAAAAAAABzLZZgAU/D8RZicKrLMtTnNbLLibivsjnwrGWYujXYop6K5fCv1QTf3YAE2IvlXdhoRSyss0yz7aZP8AijzHXzoVDhl8d8IPNdG9wALCbyEZNsADJxviN9PjdOEho8qVebTW+eU3/Ffcx4f6gx8sJgbm688ThozktG0W3Fbf+nyABJT49jbZTi3XFf7SWUeNSi3z6snx/jWLoxeIpr8tRqxFdazju04ann7gAML45i7cZgKpRq04jH4rDzyi/lrjNxy35+FZn6VcIAD0AAAAB//Z"
                  alt="profile"
                />
              </div>
              <div className="text-gray-200 hidden sm:block">
                <p className="text-sm font-semibold">{teacher?.name}</p>
                <p className="text-xs">{teacher?.email}</p>
              </div>
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
