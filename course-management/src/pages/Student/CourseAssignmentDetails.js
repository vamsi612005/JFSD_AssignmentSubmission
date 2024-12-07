import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FileText, CheckCircle, XCircle } from 'lucide-react';

function CourseAssignmentDetails() {
  const { courseId, assignmentId } = useParams(); // Get courseId and assignmentId from URL
  const [assignmentDetails, setAssignmentDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedStudentId = localStorage.getItem('studentId');
    console.log(storedStudentId);
    // Fetch assignment details including file and grade
    fetch(`http://localhost:8080/api/courses/${assignmentId}/assignment-grade/${storedStudentId}`)
      .then((response) => response.json())
      .then((data) => {
        setAssignmentDetails(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching assignment details:', error);
        setLoading(false);
      });
  }, [courseId, assignmentId]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="relative min-h-screen">
        {/* Header */}
        <div className="pt-16 pb-8 text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <FileText className="w-12 h-12 text-blue-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-green-600">
            Assignment Details
          </h1>
        </div>

        {/* Loading / Assignment Details */}
        <div className="container mx-auto px-4 pb-16">
          {loading ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600" />
            </div>
          ) : assignmentDetails ? (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-blue-600">{assignmentDetails.title}</h2>
              <p className="mt-2 text-gray-600">{assignmentDetails.description}</p>

              <div className="mt-4">
                <p className="text-lg">Grade: {assignmentDetails.grade || 'Not Graded'}</p>
                <div className="mt-2">
                  {assignmentDetails.grade ? (
                    <CheckCircle className="text-green-600" />
                  ) : (
                    <XCircle className="text-red-600" />
                  )}
                </div>
              </div>

              {/* Display PDF file */}
              <div className="mt-6">
                <h3 className="font-semibold text-blue-600">Submitted File:</h3>
                {assignmentDetails.answer ? (
                  <embed
                    src={`data:application/pdf;base64,${assignmentDetails.answer}`}
                    width="100%"
                    height="600px"
                    type="application/pdf"
                  />
                ) : (
                  <p className="text-gray-600">No file found</p>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">Assignment not found or no submission available.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CourseAssignmentDetails;
