import Home from "./pages/Home";
import User from "./pages/User";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Authentication/Login/Login";
import TopNav from "./components/General/TopNav";
import Register from "./pages/Authentication/Register/Register";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import UserRoutes from "./components/routes/UserRoutes";
import InstructorRoute from "./components/routes/InstructorRoute";
import CourseCreate from "./pages/instructor/course/CourseCreate";
import BecomeInstructor from "./pages/User/become-instructor";
import BecomeInstructorRedirect from "./pages/Redirections/BecomeInstructorRedirect";
import InstructorIndex from "./pages/instructor/InstructorIndex";
import CourseView from "./pages/instructor/course/view/CourseView";
import CourseEdit from "./pages/instructor/course/update/CourseEdit";
import AddLesson from "./pages/instructor/lesson/AddLesson";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      dispatch({ type: "LOAD_LOGIN" });
    }
  }, [dispatch]);

  return (
    <div>
      <TopNav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<div>Not found</div>} />
        <Route path="/user">
          <Route
            index
            element={
              <UserRoutes>
                <User />
              </UserRoutes>
            }
          />
          <Route path="become-instructor" element={<BecomeInstructor />} />
        </Route>
        <Route path="/instructor">
          <Route
            index
            element={
              <InstructorRoute>
                <InstructorIndex />
              </InstructorRoute>
            }
          />
          <Route
            path="course/view/:slug"
            element={
              <InstructorRoute>
                <CourseView />
              </InstructorRoute>
            }
          />

          <Route
            path="course/update/:slug"
            element={
              <InstructorRoute>
                <CourseEdit />
              </InstructorRoute>
            }
          />

          <Route
            path="course/create"
            element={
              <InstructorRoute>
                <CourseCreate />
              </InstructorRoute>
            }
          />
          <Route
            path="course/update/:slug/lesson/add"
            element={
              <InstructorRoute>
                <AddLesson />
              </InstructorRoute>
            }
          />
        </Route>
        <Route path="/processing">
          <Route path="callback" element={<BecomeInstructorRedirect />} />
        </Route>
        {/* Instructor routes with subroutes */}
      </Routes>
    </div>
  );
}

export default App;
