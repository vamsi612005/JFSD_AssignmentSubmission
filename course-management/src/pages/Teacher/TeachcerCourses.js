import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, BookOpen } from 'lucide-react';
import CourseCard from '../components/CourseCard';
import SearchBar from '../components/SearchBar';

function TeacherCourses() {
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
        // Fallback data for demo
        const demoData = [
          {
            id: '1',
            name: 'Advanced Web Development',
            description: 'In-depth exploration of modern web technologies and frameworks.',
            duration: '16 weeks',
            enrolled: 180,
            rating: 4.7,
            imageUrl: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?q=80&w=800'
          },
          {
            id: '2',
            name: 'Machine Learning Basics',
            description: 'Learn the foundations of machine learning and its practical applications.',
            duration: '14 weeks',
            enrolled: 150,
            rating: 4.9,
            imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800'
          },
          {
            id: '3',
            name: 'Intro to Mobile Development',
            description: 'Build mobile apps using Flutter and React Native.',
            duration: '12 weeks',
            enrolled: 130,
            rating: 4.6,
            imageUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800'
          }
        ];
        setCourses(demoData);
        setFilteredCourses(demoData);
      });
  }, []);

  const handleSearch = (query) => {
    const filtered = courses.filter(course =>
      course.name.toLowerCase().includes(query.toLowerCase()) ||
      course.description.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCourses(filtered);
  };

  const handleCreateCourse = () => {
    // Redirect to the page for creating a new course (you'll implement this page)
    navigate('/teacher/courses/create');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
      </div>

      <div className="relative min-h-screen">
        {/* Header */}
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

        {/* Search Bar */}
        <div className="px-4 mb-8 flex justify-center">
          <SearchBar onSearch={handleSearch} />
        </div>

        {/* Create Course Button
        <div className="px-4 mb-8 flex justify-center">
          <button
            onClick={handleCreateCourse}
            className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
          >
            Create New Course
          </button>
        </div> */}

        {/* Course Grid */}
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
                  onClick={() => navigate(`/teacher/courses/${course.id}`)}
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

export default TeacherCourses;
