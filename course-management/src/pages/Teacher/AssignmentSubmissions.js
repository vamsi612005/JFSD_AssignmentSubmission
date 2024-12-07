import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function AssignmentSubmissions() {
  const { assignmentId } = useParams();
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:8080/api/assignments/${assignmentId}/submissions`)
      .then(response => response.json())
      .then(data => {
        setSubmissions(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching submissions:', error);
        setLoading(false);
      });
  }, [assignmentId]);

  if (loading) return <div>Loading submissions...</div>;

  return (
    <div className="container mx-auto px-4 py-12">
      <button onClick={() => navigate(-1)} className="text-indigo-600 mb-4">Go Back</button>
      <h2 className="text-2xl font-bold mb-4">Submissions for Assignment {assignmentId}</h2>
      {submissions.length === 0 ? (
        <p>No submissions yet.</p>
      ) : (
        submissions.map(submission => (
          <div key={submission.id} className="p-4 border border-gray-200 rounded mb-4">
            <h3 className="font-semibold">Student: {submission.studentName}</h3>
            <p>Content: {submission.content}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default AssignmentSubmissions;
