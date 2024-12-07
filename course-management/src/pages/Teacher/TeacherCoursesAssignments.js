import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, BookOpen } from 'lucide-react';
import CourseCard from '../components/CourseCard';
import SearchBar from '../components/SearchBar';

function TeacherCoursesAssignments() {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    fetch('http://localhost:8080/api/courses/all') // Assuming an endpoint that returns courses for the teacher
      .then(response => response.json())
      .then(data => {
        setCourses(data);
        setFilteredCourses(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching courses:', error);
        setLoading(false);
      });
  }, []);

  const handleSearch = (query) => {
    const filtered = courses.filter(course =>
      course.name.toLowerCase().includes(query.toLowerCase()) ||
      course.description.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCourses(filtered);
  };

  const handleCourseClick = (courseId) => {
    // Navigate to the page where assignments can be viewed for the specific course
    navigate(`/teacher/courses/${courseId}/assignments`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="relative min-h-screen">
        <div className="pt-16 pb-8 text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <GraduationCap className="w-12 h-12 text-indigo-600" />
            <BookOpen className="w-8 h-8 text-purple-500 animate-pulse" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
            Your Courses
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto px-4">
            Manage and create courses for your students to explore and learn.
          </p>
        </div>

        <div className="px-4 mb-8 flex justify-center">
          <SearchBar onSearch={handleSearch} />
        </div>

        <div className="container mx-auto px-4 pb-16">
          {loading ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCourses.map(course => (
                <CourseCard
                  key={course.id}
                  course={course}
                  onClick={() => handleCourseClick(course.id)}
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

export default TeacherCoursesAssignments;
