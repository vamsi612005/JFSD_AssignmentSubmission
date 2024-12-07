import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ClipboardList, 
  FilePlus, 
  UserCheck, 
  BookMarked, 
  GraduationCap, 
  LogOut 
} from 'lucide-react';

function TeacherHome() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('teacherEmail');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gray-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-16">
        {/* Header Section */}
        <div className="text-center max-w-3xl mb-12">
          <div className="flex items-center justify-center mb-6">
            <GraduationCap className="w-12 h-12 text-blue-600 mr-4" />
          </div>
          <h1 className="text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-green-600">
            Welcome, Teacher
          </h1>
          <p className="text-gray-600 text-lg">Manage your courses and assignments efficiently</p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl mb-12">
          {[
            { icon: ClipboardList, title: 'View Courses', desc: 'Overview of all your courses', path: '/teacher/courses' },
            // { icon: FilePlus, title: 'Add Assignment', desc: 'Create and distribute assignments', path: '/teacher/add-assignment' },
            { icon: UserCheck, title: 'Student Submissions', desc: 'Review and grade assignments', path: '/teacher/view-submissions' },
            { icon: BookMarked, title: 'Resources', desc: 'Manage course materials', path: '/teacher/resources' },
          ].map((item, index) => (
            <div
              key={index}
              onClick={() => navigate(item.path)}
              className="group relative bg-white/90 backdrop-blur-lg rounded-2xl p-6 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer border border-gray-100"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <div className="w-12 h-12 mb-4 rounded-full bg-blue-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <item.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h2>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="group relative px-8 py-3 rounded-full bg-gradient-to-r from-blue-600 to-green-600 text-white font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
        >
          <span className="flex items-center">
            <LogOut className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
            Logout
          </span>
        </button>
      </div>
    </div>
  );
}

export default TeacherHome;
