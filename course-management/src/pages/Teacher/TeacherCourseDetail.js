import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  BookOpen,
  Clock,
  Users,
  Star,
  PlusCircle,
  ArrowLeft,
  Calendar,
  BookMarked,
  Eye,
} from 'lucide-react';

function TeacherCourseDetailTeacher() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [newAssignment, setNewAssignment] = useState({
    title: '',
    description: '',
    lastSubmissionDate: '',
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch(`http://localhost:8080/api/courses/${courseId}`),
      fetch(`http://localhost:8080/api/courses/${courseId}/assignments`),
    ])
      .then(([courseRes, assignmentsRes]) =>
        Promise.all([courseRes.json(), assignmentsRes.json()])
      )
      .then(([courseData, assignmentsData]) => {
        setCourse(courseData);
        setAssignments(Array.isArray(assignmentsData) ? assignmentsData : []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, [courseId]);

  const handleInputChange = (field, value) => {
    setNewAssignment(prev => ({ ...prev, [field]: value }));
  };

  const handleAddAssignment = () => {
    fetch(`http://localhost:8080/api/courses/${courseId}/addassignments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newAssignment),
    })
      .then(response => response.json())
      .then(addedAssignment => {
        setAssignments(prev => [...prev, addedAssignment]);
        setNewAssignment({ title: '', description: '', lastSubmissionDate: '' });
      })
      .catch(error => console.error('Error adding assignment:', error));
      window.location.reload();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600" />
      </div>
    );
  }

  if (!course) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="relative">
        <div className="relative h-64 bg-gradient-to-r from-indigo-600 to-purple-600">
          <div className="absolute inset-0">
            <img
              src={course.imageUrl}
              alt={course.name}
              className="w-full h-full object-cover opacity-20"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/90 to-purple-600/90" />
          <div className="relative container mx-auto px-4 h-full flex items-center">
            <button
              onClick={() => navigate(-1)}
              className="absolute top-4 left-4 text-white hover:text-indigo-200 transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div className="max-w-4xl">
              <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">{course.name}</h1>
              <div className="flex flex-wrap gap-6 text-white/90">
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  <span>{course.enrolled} students</span>
                </div>
                <div className="flex items-center">
                  <Star className="w-5 h-5 mr-2 text-yellow-400 fill-current" />
                  <span>{course.rating}</span>
                </div>
                {course.instructor && (
                  <div className="flex items-center">
                    <BookOpen className="w-5 h-5 mr-2" />
                    <span>{course.instructor}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <BookMarked className="w-6 h-6 mr-2 text-indigo-600" />
                Add New Assignment
              </h2>
              <div className="space-y-4">
                <input
                  type="text"
                  className="w-full p-3 rounded-xl border border-gray-200 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition-all duration-300"
                  placeholder="Title"
                  value={newAssignment.title}
                  onChange={e => handleInputChange('title', e.target.value)}
                />
                <textarea
                  className="w-full p-3 rounded-xl border border-gray-200 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition-all duration-300"
                  placeholder="Description"
                  value={newAssignment.description}
                  onChange={e => handleInputChange('description', e.target.value)}
                  rows={4}
                />
                <input
                  type="datetime-local"
                  className="w-full p-3 rounded-xl border border-gray-200 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition-all duration-300"
                  value={newAssignment.lastSubmissionDate}
                  onChange={e => handleInputChange('lastSubmissionDate', e.target.value)}
                />
                <button
                  onClick={handleAddAssignment}
                  className="w-full py-3 px-6 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
                >
                  <div className="flex items-center">
                    <PlusCircle className="w-5 h-5 mr-2" />
                    <span>Add Assignment</span>
                  </div>
                </button>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                <Calendar className="w-6 h-6 mr-2 text-indigo-600" />
                Existing Assignments
              </h2>

              {assignments.length === 0 ? (
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg text-center">
                  <p className="text-gray-600">No assignments available for this course yet.</p>
                </div>
              ) : (
                assignments.map(assignment => (
                  <div
                    key={assignment.id}
                    className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg transition-all duration-300 hover:shadow-xl"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold text-gray-800">{assignment.title}</h3>
                      {assignment.lastSubmissionDate && (
                        <span className="text-sm text-gray-500 flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          Last Submission: {new Date(assignment.lastSubmissionDate).toLocaleString()}
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 mb-6">{assignment.description}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeacherCourseDetailTeacher;
