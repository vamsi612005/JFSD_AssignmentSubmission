import React, { useState, useEffect } from 'react';
import { getCourses, deleteCourse } from '../services/api';
import { Pencil, Trash2, BookOpen } from 'lucide-react';
import CourseForm from './CourseForm';
import toast from 'react-hot-toast';

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [editingCourse, setEditingCourse] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const coursesData = await getCourses();
    setCourses(Array.isArray(coursesData) ? coursesData : []); // Ensure coursesData is an array
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      await deleteCourse(id);
      toast.success('Course deleted successfully');
      loadData();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Courses</h2>
        <button
          onClick={() => setEditingCourse({
            name: '',
            description: '',
            imageUrl: '',
            duration: '',
            enrolled: 0,
            rating: 0,
          })}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Add Course
        </button>
      </div>

      {editingCourse && (
        <CourseForm
          course={editingCourse}
          onSave={() => {
            setEditingCourse(null);
            loadData();
          }}
          onCancel={() => setEditingCourse(null)}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={course.imageUrl}
              alt={course.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{course.name}</h3>
              <p className="text-gray-600 mb-4">{course.description}</p>
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-500">
                  <BookOpen className="w-4 h-4 inline mr-1" />
                  {course.duration}
                </span>
                <span className="text-sm text-gray-500">
                  {course.enrolled} students
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-yellow-400">★</span>
                  <span className="ml-1">{course.rating.toFixed(1)}</span>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setEditingCourse(course)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    <Pencil className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => course.id && handleDelete(course.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
              {/* Removed Teacher's Section as it's not part of the Course entity */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseList;
