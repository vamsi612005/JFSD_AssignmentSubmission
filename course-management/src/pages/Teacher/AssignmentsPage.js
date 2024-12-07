import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ClipboardList, Edit, CheckCircle } from 'lucide-react';

function AssignmentsPage() {
  const { courseId } = useParams(); // Get the courseId from the URL
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8080/api/courses/${courseId}/assignments`) // Fetch assignments for a specific course
      .then(response => response.json())
      .then(data => {
        setAssignments(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching assignments:', error);
        setLoading(false);
      });
  }, [courseId]);

  const handleGradeAssignment = (assignmentId) => {
    // Navigate to the page for grading assignments
    navigate(`/teacher/courses/${assignmentId}/grade`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="relative min-h-screen">
        <div className="pt-16 pb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
            Assignments for Course {courseId}
          </h1>
        </div>

        {/* Assignment List */}
        <div className="container mx-auto px-4 pb-16">
          {loading ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {assignments.map(assignment => (
                <div
                  key={assignment.id}
                  className="group relative bg-white/90 backdrop-blur-lg rounded-2xl p-6 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer border border-gray-100"
                >
                  <div className="relative">
                    <h2 className="text-xl font-bold text-gray-800 mb-2">{assignment.title}</h2>
                    <p className="text-gray-600">{assignment.description}</p>
                    <button
                      onClick={() => handleGradeAssignment(assignment.id)}
                      className="mt-4 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
                    >
                      Grade Assignment
                    </button>
                  </div>
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

export default AssignmentsPage;
