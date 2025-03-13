import React, { useEffect, Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useGetToken from "./hooks";
import { getAllClasses } from "./services/class.service";
import Loader from "./components/Loader";

const AdminLogin = lazy(() => import("./pages/auth/AdminLogin"));
const AdminRegister = lazy(() => import("./pages/auth/AdminRegister"));
const AdminDashboard = lazy(() => import("./pages/admin/dashboard/Dashboard"));
const TeacherDashboard = lazy(() =>
  import("./pages/teacher/dashboard/Dashboard")
);
const Navbar = lazy(() => import("./components/Navbar"));
const Sidebar = lazy(() => import("./components/Sidebar"));
const Student = lazy(() => import("./pages/admin/student/Student"));
const CreateStudent = lazy(() => import("./pages/admin/student/CreateStudent"));
const UpdateStudent = lazy(() => import("./pages/admin/student/UpdateStudent"));
const Subject = lazy(() => import("./pages/admin/subject/Subject"));
const CreateSubject = lazy(() => import("./pages/admin/subject/CreateSubject"));
const UpdateSubject = lazy(() => import("./pages/admin/subject/UpdateSubject"));
const Fees = lazy(() => import("./pages/teacher/fee/Fees"));
const MarkFeePaid = lazy(() => import("./pages/teacher/fee/MarkFee"));
const UploadMarks = lazy(() => import("./pages/teacher/marks/UploadMarks"));
const Attendance = lazy(() => import("./pages/teacher/attendance/Attendance"));
const AdminAttendance = lazy(() =>
  import("./pages/admin/attendance/Attendance")
);
const Staff = lazy(() => import("./pages/admin/staff/Staff"));
const Setting = lazy(() => import("./pages/teacher/setting/Setting"));
const AdminSetting = lazy(() => import("./pages/admin/setting/Setting"));
const Class = lazy(() => import("./pages/admin/class/Class"));
const CreateClass = lazy(() => import("./pages/admin/class/CreateClass"));
const UpdateClass = lazy(() => import("./pages/admin/class/UpdateClass"));
const CreateStaff = lazy(() => import("./pages/admin/staff/CreateStaff"));
const Marks = lazy(() => import("./pages/admin/marks/Marks"));
const UpdateStaff = lazy(() => import("./pages/admin/staff/UpdateStaff"));
const TStudent = lazy(() => import("./pages/teacher/student/Student"));
const TCreateStudent = lazy(() => import("./pages/teacher/student/CreateStudent"));

const App = () => {
  const token = useGetToken();

  const { admin, teacher } = useSelector((state) => state.authentication);

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<AdminLogin />} />
        <Route path="/admin/register" element={<AdminRegister />} />
        <Route
          path="/admin/*"
          element={admin && token ? <AdminRoutes /> : <Navigate to="/" />}
        />
        <Route
          path="/teacher/*"
          element={
            teacher && token ? <TeacherRoutes /> : <Navigate to="/teacher" />
          }
        />
        <Route path="*" element={<Navigate to={"/"} />} />
      </Routes>
    </Suspense>
  );
};

const AdminRoutes = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllClasses({}));
  }, []);

  return (
    <>
      <div className="relative">
        <Sidebar />
        <main className="absolute right-0 w-full lg:w-[80%] p-1 mt-16">
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="" element={<AdminDashboard />} />
              <Route path="attendance/mark" element={<AdminAttendance />} />
              <Route path="staffs" element={<Staff />} />
              <Route path="staff/create" element={<CreateStaff />} />
              <Route path="staff/:id" element={<UpdateStaff />} />
              <Route path="students" element={<Student />} />
              <Route path="student/create" element={<CreateStudent />} />
              <Route path="student/:id" element={<UpdateStudent />} />
              <Route path="class" element={<Class />} />
              <Route path="marks" element={<Marks />} />
              <Route path="class/create" element={<CreateClass />} />
              <Route path="class/:id" element={<UpdateClass />} />
              <Route path="subjects" element={<Subject />} />
              <Route path="subject/create" element={<CreateSubject />} />
              <Route path="subject/:id" element={<UpdateSubject />} />
              <Route path="settings" element={<AdminSetting />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </>
  );
};

const TeacherRoutes = () => {
  const dispatch = useDispatch();
  const { teacher } = useSelector((state) => state.authentication);
  useEffect(() => {
    dispatch(getAllClasses({ teacher: teacher._id }));
  }, []);

  return (
    <>
      <Navbar />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="" element={<TeacherDashboard />} />
          <Route path="students" element={<TStudent />} />
          <Route path="student/create" element={<TCreateStudent />} />
          <Route path="fees" element={<Fees />} />
          <Route path="fee/mark" element={<MarkFeePaid />} />
          <Route path="marks" element={<UploadMarks />} />
          <Route path="attendance/mark" element={<Attendance />} />
          <Route path="settings" element={<Setting />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
