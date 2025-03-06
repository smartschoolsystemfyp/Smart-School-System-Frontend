import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminLogin from "./pages/auth/AdminLogin";
import AdminRegister from "./pages/auth/AdminRegister";
import AdminDashboard from "./pages/admin/dashboard/Dashboard";
import TeacherDashboard from "./pages/teacher/dashboard/Dashboard";
import Navbar from "./components/Navbar";
import AdminNavbar from "./components/AdminNavbar";
import Student from "./pages/admin/student/Student";
import CreateStudent from "./pages/admin/student/CreateStudent";
import UpdateStudent from "./pages/admin/student/UpdateStudent";
import Subject from "./pages/admin/subject/Subject";
import CreateSubject from "./pages/admin/subject/CreateSubject";
import UpdateSubject from "./pages/admin/subject/UpdateSubject";
import Fees from "./pages/teacher/fee/Fees";
import MarkFeePaid from "./pages/teacher/fee/MarkFee";
import UploadMarks from "./pages/teacher/marks/UploadMarks";
import Attendance from "./pages/teacher/attendance/Attendance";
import AdminAttendance from "./pages/admin/attendance/Attendance";
import Staff from "./pages/admin/staff/Staff";
import Setting from "./pages/teacher/setting/Setting";
import AdminSetting from "./pages/admin/setting/Setting";
import useGetToken from "./hooks";
import { getAllClasses } from "./services/class.service";
import { useDispatch, useSelector } from "react-redux";
import Class from "./pages/admin/class/Class";
import CreateClass from "./pages/admin/class/CreateClass";
import Sidebar from "./components/Sidebar";
import CreateStaff from "./pages/admin/staff/CreateStaff";
import UpdateClass from "./pages/admin/class/UpdateClass";

const App = () => {
  const token = useGetToken();
  const dispatch = useDispatch();

  const { teacher, admin } = useSelector((state) => state.authentication);

  useEffect(() => {
    if (token) {
      dispatch(getAllClasses());
    }
  }, [token]);

  return (
    <Routes>
      {/* Admin Routes */}
      <Route path="/" element={<AdminLogin />} />
      <Route path="/admin/register" element={<AdminRegister />} />
      <Route
        path="/admin/*"
        element={admin && token ? <AdminRoutes /> : <Navigate to="/" />}
      />

      {/* Teacher Routes */}
      <Route
        path="/teacher/*"
        element={token ? <TeacherRoutes /> : <Navigate to="/teacher" />}
      />
      <Route path="*" element={<Navigate to={"/"} />} />
    </Routes>
  );
};

// Admin Protected Routes
const AdminRoutes = () => {
  return (
    <>
      {/* <AdminNavbar /> */}
      <div className="relative">
        <Sidebar />
        <main className="absolute right-0 w-full lg:w-[80%] p-1 mt-16">
          <Routes>
            <Route path="" element={<AdminDashboard />} />
            <Route path="attendance/mark" element={<AdminAttendance />} />
            <Route path="staffs" element={<Staff />} />
            <Route path="staff/create" element={<CreateStaff />} />
            <Route path="students" element={<Student />} />
            <Route path="student/create" element={<CreateStudent />} />
            <Route path="student/:id" element={<UpdateStudent />} />
            <Route path="class" element={<Class />} />
            <Route path="class/create" element={<CreateClass />} />
            <Route path="class/:id" element={<UpdateClass />} />
            <Route path="subjects" element={<Subject />} />
            <Route path="subject/create" element={<CreateSubject />} />
            <Route path="subject/:id" element={<UpdateSubject />} />
            <Route path="settings" element={<AdminSetting />} />
          </Routes>
        </main>
      </div>
    </>
  );
};

// Teacher Protected Routes
const TeacherRoutes = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="" element={<TeacherDashboard />} />
        <Route path="fees" element={<Fees />} />
        <Route path="fee/mark" element={<MarkFeePaid />} />
        <Route path="marks" element={<UploadMarks />} />
        <Route path="attendance/mark" element={<Attendance />} />
        <Route path="settings" element={<Setting />} />
      </Routes>
    </>
  );
};

export default App;
