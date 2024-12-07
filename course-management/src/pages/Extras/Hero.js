import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Users } from 'lucide-react';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section id="home" className="pt-20 bg-gradient-to-b from-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">Modern Assignment</span>
            <span className="block text-indigo-600">Management System</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Streamline your academic workflow with our comprehensive assignment submission and grading platform.
          </p>
          <div className="mt-10 flex justify-center gap-6">
            <button
              onClick={() => navigate('/teacher/login')}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <BookOpen className="mr-2 h-5 w-5" />
              Teacher Login
            </button>
            <button
              onClick={() => navigate('/student/login')}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 border-indigo-600"
            >
              <Users className="mr-2 h-5 w-5" />
              Student Login
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;