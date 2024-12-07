import React from 'react';
import { Book, Clock, Users, Star } from 'lucide-react';

const CourseCard = ({ course, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="group relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer"
    >
      {/* Course Image */}
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
        <img
          src={course.imageUrl || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800'}
          alt={course.name}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute bottom-4 left-4 right-4 z-20">
          <h3 className="text-xl font-bold text-white mb-1 group-hover:text-indigo-200 transition-colors">
            {course.name}
          </h3>
        </div>
      </div>

      {/* Course Details */}
      <div className="p-6">
        <p className="text-gray-600 mb-4 line-clamp-2">{course.description}</p>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center text-gray-500">
            <Clock className="w-4 h-4 mr-2" />
            <span className="text-sm">{course.duration || '8 weeks'}</span>
          </div>
          <div className="flex items-center text-gray-500">
            <Users className="w-4 h-4 mr-2" />
            <span className="text-sm">{course.enrolled || '250'} students</span>
          </div>
        </div>

        {/* Rating */}
        <div className="mt-4 flex items-center">
          <Star className="w-5 h-5 text-yellow-400 fill-current" />
          <span className="ml-2 text-gray-600">{course.rating || '4.8'}</span>
        </div>

        {/* Hover Effect Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/0 to-purple-600/0 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
      </div>
    </div>
  );
};

export default CourseCard;
