import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function GradeAssignmentPage() {
  const { assignmentId } = useParams(); // Assignment ID from URL
  const navigate = useNavigate();
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/api/courses/${assignmentId}/as_answers`)
      .then((response) => response.json())
      .then((data) => {
        setSubmissions(data);
        console.log(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching submissions:', error);
        setError('Failed to load submissions');
        setLoading(false);
      });
  }, [assignmentId]);

  const handleGradeChange = (id, grade) => {
    setSubmissions((prev) =>
      prev.map((submission) =>
        submission.id === id ? { ...submission, grade } : submission
      )
    );
  };

  const submitGrade = (id, grade, studentId) => {
    const gradeUpdateRequest = {
      grade,
      assignmentId,
      studentId,
    };

    fetch(`http://localhost:8080/api/courses/${id}/grade`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(gradeUpdateRequest),
    })
      .then((response) => {
        if (response.ok) {
          alert('Grade submitted successfully');
        } else {
          alert('Failed to submit grade');
        }
      })
      .catch((error) => {
        console.error('Error grading submission:', error);
        alert('Error grading submission');
      });
  };

  const downloadFile = (base64String, fileName) => {
    const byteCharacters = atob(base64String);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, Math.min(offset + 512, byteCharacters.length));
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold mb-6">Grade Submissions</h1>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-4 text-left">Student ID</th>
              <th className="border p-4 text-left">Student Name</th>
              <th className="border p-4 text-left">Answer</th>
              <th className="border p-4 text-left">Submission Date</th>
              <th className="border p-4 text-left">Grade</th>
              <th className="border p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((submission) => (
              <tr key={submission.id} className="hover:bg-gray-100">
                <td className="border p-4">{submission.studentId || 'N/A'}</td>
                <td className="border p-4">{submission.studentName || 'N/A'}</td>
                <td className="border p-4">
                  <button
                    onClick={() => downloadFile(submission.answer, submission.fileName)}
                    className="text-blue-600"
                  >
                    Download Answer
                  </button>
                </td>
                <td className="border p-4">{new Date(submission.submissionDate).toLocaleString()}</td>
                <td className="border p-4">
                  {submission.grade ? (
                    <span>{submission.grade}</span>
                  ) : (
                    <input
                      type="text"
                      value={submission.grade || ''}
                      onChange={(e) =>
                        handleGradeChange(submission.id, e.target.value)
                      }
                      className="w-full border p-2 rounded"
                    />
                  )}
                </td>
                <td className="border p-4">
                  {!submission.grade && (
                    <button
                      onClick={() =>
                        submitGrade(submission.id, submission.grade, submission.studentId)
                      }
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Submit Grade
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          onClick={() => navigate(-1)}
          className="mt-6 px-6 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
        >
          Back to Courses
        </button>
      </div>
    </div>
  );
}

export default GradeAssignmentPage;
