import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, BookOpen } from 'lucide-react';
import CourseCard from '../components/CourseCard';
import SearchBar from '../components/SearchBar';

function StudentGrades() {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:8080/api/courses/all')
      .then((response) => response.json())
      .then((data) => {
        setCourses(data);
        setFilteredCourses(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching courses:', error);
        setLoading(false);
        // Fallback data for demo
        const demoData = [
          {
            id: '1',
            name: 'Web Development Fundamentals',
            description: 'Learn the basics of web development including HTML, CSS, and JavaScript.',
            duration: '12 weeks',
            enrolled: 350,
            imageUrl: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?q=80&w=800',
          },
          {
            id: '2',
            name: 'Data Science Essentials',
            description: 'Master the fundamentals of data science and machine learning.',
            duration: '10 weeks',
            enrolled: 275,
            imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800',
          },
        ];
        setCourses(demoData);
        setFilteredCourses(demoData);
      });
  }, []);

  const handleSearch = (query) => {
    const filtered = courses.filter(
      (course) =>
        course.name.toLowerCase().includes(query.toLowerCase()) ||
        course.description.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCourses(filtered);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
      </div>

      <div className="relative min-h-screen">
        {/* Header */}
        <div className="pt-16 pb-8 text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <GraduationCap className="w-12 h-12 text-blue-600" />
            <BookOpen className="w-8 h-8 text-green-500 animate-pulse" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-green-600">
            View Your Grades
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto px-4">
            Select a course to check your grades for assignments and exams
          </p>
        </div>

        {/* Search Bar */}
        <div className="px-4 mb-8 flex justify-center">
          <SearchBar onSearch={handleSearch} />
        </div>

        {/* Course Grid */}
        <div className="container mx-auto px-4 pb-16">
          {loading ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  onClick={() => navigate(`/student/grades/${course.id}`)} // Navigate to grades for the selected course
                />
              ))}
            </div>
          )}

          {!loading && filteredCourses.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No courses found matching your search criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default StudentGrades;
