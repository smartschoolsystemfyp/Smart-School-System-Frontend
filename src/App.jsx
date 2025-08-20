import useGetToken from "./hooks";
import Loader from "./components/Loader";
import Confirmation from "./pages/auth/Confirmation";
import ResetPassword from "./pages/auth/ResetPassword";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, Suspense, lazy } from "react";
import ForgetPassword from "./pages/auth/ForgetPassword";
import { getAllClasses } from "./services/class.service";
import { Routes, Route, Navigate } from "react-router-dom";

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
const TCreateStudent = lazy(() =>
  import("./pages/teacher/student/CreateStudent")
);
const Fund = lazy(() => import("./pages/admin/fund/Fund"));
const CreateFund = lazy(() => import("./pages/admin/fund/CreateFund"));
const UpdateFund = lazy(() => import("./pages/admin/fund/UpdateFund"));
const Documet = lazy(() => import("./pages/admin/document/Documet"));
const CreateDocument = lazy(() =>
  import("./pages/admin/document/CreateDocument")
);
const UpdateDocument = lazy(() =>
  import("./pages/admin/document/UpdateDocument")
);
const CheckAttendance = lazy(() =>
  import("./pages/admin/attendance/CheckAttendance")
);
const CheckStudentAttendance = lazy(() =>
  import("./pages/teacher/attendance/CheckAttendance")
);

const App = () => {
  const token = useGetToken();

  const { admin, teacher } = useSelector((state) => state.authentication);

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<AdminLogin />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/forget-password-confirm" element={<Confirmation />} />

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
              <Route path="attendance/check" element={<CheckAttendance />} />
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
              <Route path="funds" element={<Fund />} />
              <Route path="fund/create" element={<CreateFund />} />
              <Route path="fund/:id" element={<UpdateFund />} />
              <Route path="documents" element={<Documet />} />
              <Route path="document/create" element={<CreateDocument />} />
              <Route path="document/:id" element={<UpdateDocument />} />
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
          <Route path="attendance/check" element={<CheckStudentAttendance />} />
          <Route path="settings" element={<Setting />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
