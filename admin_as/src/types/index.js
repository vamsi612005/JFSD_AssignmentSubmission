// Teacher object structure
const Teacher = {
    id: undefined, // Optional
    name: '',
    email: '',
    password: undefined, // Optional
    courses: [] // Optional
  };
  
  // Student object structure
  const Student = {
    id: undefined, // Optional
    email: '',
    name: '',
    password: undefined, // Optional
    submissions: [] // Optional
  };
  
  // Course object structure
  const Course = {
    id: undefined, // Optional
    name: '',
    description: '',
    imageUrl: '',
    duration: '',
    enrolled: 0,
    rating: 0,
  };
  
  // AssignmentSubmission object structure
  const AssignmentSubmission = {
    id: 0,
    studentId: 0,
    assignmentId: 0
  };
  