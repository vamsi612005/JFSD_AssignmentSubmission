import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';

import ChoicePage from './pages/Extras/LandingPage';
import Login from './pages/Teacher/Login';
import Register from './pages/Teacher/Register';
import StudentLogin from './pages/Student/StudentLogin';
import StudentRegister from './pages/Student/StudentRegister';
import Home from './pages/Teacher/Home';
import StudentHome from './pages/Student/StudentHome';
import StudentCourses from './pages/Student/StudentCourses';
import CourseDetail from './pages/Student/CourseDetail';
import TeacherCourses from './pages/Teacher/TeachcerCourses';
import TeacherCourseDetailTeacher from './pages/Teacher/TeacherCourseDetail';
import AssignmentSubmissions from './pages/Teacher/AssignmentSubmissions';
import TeacherCoursesAssignments from './pages/Teacher/TeacherCoursesAssignments';
import AssignmentsPage from './pages/Teacher/AssignmentsPage';
import GradeAssignmentPage from './pages/Teacher/GradeAssignmentPage';
import StudentGrades from './pages/Student/StudentGrades';
import CourseAssignments from './pages/Student/CourseAssignments';

import SessionTimeout from './pages/components/SessionTimeout';
import CourseAssignmentDetails from './pages/Student/CourseAssignmentDetails';

function App() {
  return (
    <Provider store={store}>
      <Router>
        {/* <SessionTimeout /> */}
        <Routes>
          <Route path="/" element={<ChoicePage />} />
          <Route path="/teacher/login" element={<Login />} />
          <Route path="/teacher/register" element={<Register />} />
          <Route path="/teacher/home" element={<Home />} />
          <Route path="/teacher/courses" element={<TeacherCourses />} />
          <Route path="/teacher/courses/:courseId" element={<TeacherCourseDetailTeacher />} />
          <Route path="/teacher/view-submissions" element={<TeacherCoursesAssignments />} />
          <Route path="/teacher/courses/:courseId/assignments" element={<AssignmentsPage />} />
          <Route path="/teacher/courses/:assignmentId/grade" element={<GradeAssignmentPage />} />
          <Route path="/assignments/:assignmentId/submissions" element={<AssignmentSubmissions />} />
          <Route path="/student/login" element={<StudentLogin />} />
          <Route path="/student/register" element={<StudentRegister />} />
          <Route path="/student/home" element={<StudentHome />} />
          <Route path="/student/courses" element={<StudentCourses />} />
          <Route path="/student/courses/:courseId" element={<CourseDetail />} />
          <Route path="/student/grades" element={<StudentGrades/>} />
          <Route path="/student/grades/:courseId" element={<CourseAssignments />} />
          <Route path="/student/assignments/:assignmentId" element={<CourseAssignmentDetails/>} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
