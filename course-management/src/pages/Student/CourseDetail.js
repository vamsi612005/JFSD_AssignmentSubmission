import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  BookOpen, 
  Clock, 
  Users, 
  Star,
  CheckCircle,
  Send,
  ArrowLeft,
  Calendar,
  BookMarked
} from 'lucide-react';

function CourseDetail() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [files, setFiles] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const studentEmail = localStorage.getItem('studentEmail');
    setLoading(true);

    Promise.all([
      fetch(`http://localhost:8080/api/courses/${courseId}`),
      fetch(`http://localhost:8080/api/courses/${courseId}/assignments?studentEmail=${studentEmail}`)
    ])
    .then(([courseRes, assignmentsRes]) => Promise.all([courseRes.json(), assignmentsRes.json()]))
    .then(([courseData, assignmentsData]) => {
      setCourse(courseData);

      Promise.all(assignmentsData.map(assignment =>
        fetch(`http://localhost:8080/api/courses/${courseId}/assignments/${assignment.id}/submitted?studentEmail=${studentEmail}`)
          .then(res => res.json())
          .then(data => {
            assignment.isSubmitted = data.isSubmitted;
          })
      ))
      .then(() => {
        setAssignments(assignmentsData);
        setLoading(false);
      });
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      setLoading(false);
    });
  }, [courseId]);

  const handleFileChange = (assignmentId, file) => {
    setFiles(prev => ({ ...prev, [assignmentId]: file }));
  };

  const handleSubmit = (assignmentId) => {
    const studentEmail = localStorage.getItem('studentEmail');
    const formData = new FormData();
    formData.append('file', files[assignmentId]);
    formData.append('studentEmail', studentEmail);

    fetch(`http://localhost:8080/api/courses/${courseId}/assignments/${assignmentId}/submit`, {
      method: 'POST',
      body: formData,
    })
      .then(response => {
        if (response.ok) {
          setAssignments(prev =>
            prev.map(assignment =>
              assignment.id === assignmentId ? { ...assignment, isSubmitted: true } : assignment
            )
          );
          setFiles(prev => ({ ...prev, [assignmentId]: null }));
        }
      })
      .catch(error => console.error('Error submitting assignment:', error));
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
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                <Calendar className="w-6 h-6 mr-2 text-indigo-600" />
                Assignments
              </h2>

              {assignments.map(assignment => (
                <div
                  key={assignment.id}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg transition-all duration-300 hover:shadow-xl"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-gray-800">{assignment.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-6">{assignment.description}</p>

                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>
                      Last submission date: {new Date(assignment.lastSubmissionDate).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <div className="space-y-4">
                    <input
                      type="file"
                      className="w-full p-4 rounded-xl border border-gray-200 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition-all duration-300"
                      onChange={(e) => handleFileChange(assignment.id, e.target.files[0])}
                      disabled={assignment.isSubmitted}
                    />
                    <button
                      className={`w-full py-3 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 ${
                        assignment.isSubmitted
                          ? 'bg-green-500 text-white cursor-default'
                          : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg hover:shadow-xl'
                      }`}
                      onClick={() => handleSubmit(assignment.id)}
                      disabled={assignment.isSubmitted || !files[assignment.id]}
                    >
                      {assignment.isSubmitted ? (
                        <>
                          <CheckCircle className="w-5 h-5" />
                          Submitted
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Submit Assignment
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseDetail;
