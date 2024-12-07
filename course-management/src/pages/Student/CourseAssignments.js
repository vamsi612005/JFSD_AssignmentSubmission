import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FileText } from 'lucide-react';

function CourseAssignments() {
  const { courseId } = useParams(); // Get course ID from URL
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch assignments for the specific course
    fetch(`http://localhost:8080/api/courses/${courseId}/assignments`)
      .then((response) => response.json())
      .then((data) => {
        setAssignments(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching assignments:', error);
        setLoading(false);
      });
  }, [courseId]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="relative min-h-screen">
        {/* Header */}
        <div className="pt-16 pb-8 text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <FileText className="w-12 h-12 text-blue-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-green-600">
            Assignments for Course
          </h1>
        </div>

        {/* Loading / Assignments List */}
        <div className="container mx-auto px-4 pb-16">
          {loading ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {assignments.map((assignment) => (
                <div key={assignment.id} className="bg-white p-4 rounded-lg shadow-md">
                  <h2 className="text-xl font-semibold text-blue-600">{assignment.title}</h2>
                  <p className="text-gray-600">{assignment.description}</p>
                  <p className="mt-2 text-sm text-gray-500">Due: {new Date(assignment.lastSubmissionDate).toLocaleDateString()}</p>
                  <button
                    className="mt-4 text-blue-500 hover:text-blue-700"
                    onClick={() => navigate(`/student/assignments/${assignment.id}`)} // Navigate to assignment details
                  >
                    View Assignment
                  </button>
                </div>
              ))}
            </div>
          )}

          {!loading && assignments.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No assignments found for this course.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CourseAssignments;
