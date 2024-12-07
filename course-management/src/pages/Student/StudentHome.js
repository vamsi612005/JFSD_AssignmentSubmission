import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BookOpen, 
  UserCircle, 
  Bell, 
  BookMarked, 
  HeadphonesIcon, 
  LogOut,
  Sparkles,
  GraduationCap
} from 'lucide-react';

function StudentHome() {
  const navigate = useNavigate();
  const [studentName, setStudentName] = useState('');

  useEffect(() => {
    const studentEmail = localStorage.getItem('studentEmail'); // Assuming you store the email in localStorage
    
    const fetchStudentName = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/students/name?email=${studentEmail}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json(); // Expecting { name: "John Doe" }
        console.log(data);
        setStudentName(data.name); // Update the student name state

      } catch (error) {
        console.error('Error fetching student name:', error);
      }

      try {
        const response = await fetch(`http://localhost:8080/api/students/id?email=${studentEmail}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json(); // Expecting { name: "John Doe" }
        console.log(data);
        localStorage.setItem('studentId',data.id); // Update the student name state

      } catch (error) {
        console.error('Error fetching student id:', error);
      }
    };

    fetchStudentName();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('studentEmail');
    localStorage.removeItem('studentName'); // Optionally clear name on logout
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-16">
        {/* Header Section */}
        <div className="text-center max-w-3xl mb-12">
          <div className="flex items-center justify-center mb-6">
            <GraduationCap className="w-12 h-12 text-indigo-600 mr-4" />
            <Sparkles className="w-8 h-8 text-purple-500 animate-pulse" />
          </div>
          <h1 className="text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
            Welcome Back{studentName ? `, ${studentName}!` : ", Student!"}
          </h1>
          <p className="text-gray-600 text-lg">Your learning journey continues here</p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl mb-12">
          {[ 
            { icon: BookOpen, title: 'View Courses', desc: 'Browse and enroll in available courses', path: '/student/courses' },
            { icon: UserCircle, title: 'View Profile', desc: 'Manage your personal information', path: '/student/profile' },
            { icon: Bell, title: 'Notifications', desc: 'Stay updated with latest announcements', path: '/student/notifications' },
            { icon: BookMarked, title: 'Study Resources', desc: 'Access learning materials and guides', path: '/student/resources' },
            { icon: GraduationCap, title: 'View Grades', desc: 'Check your assignment grades', path: '/student/grades' }
          ].map((item, index) => (
            <div
              key={index}
              onClick={() => navigate(item.path)}
              className="group relative bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer border border-gray-100"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <div className="w-12 h-12 mb-4 rounded-full bg-indigo-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <item.icon className="w-6 h-6 text-indigo-600" />
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
          className="group relative px-8 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
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

export default StudentHome;
