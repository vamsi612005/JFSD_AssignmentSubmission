import axios from 'axios';
import { Teacher, Student, Course } from '../types';

const API_URL = 'http://localhost:8080/api/admin';

// Simulated data in case API fails
const mockTeachers = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
];

const mockStudents = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com' },
  { id: 2, name: 'Bob Wilson', email: 'bob@example.com' },
];

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data;
  } catch (error) {
    // Mock successful login for demo
    if (email === 'admin@example.com' && password === 'admin123') {
      return { token: 'mock-token' };
    }
    throw error;
  }
};

// Teachers API calls
export const getTeachers = async () => {
  try {
    const response = await axios.get(`${API_URL}/teachers`);
    return response.data;
  } catch (error) {
    return mockTeachers;
  }
};

export const createTeacher = async (teacher) => {
  try {
    const response = await axios.post(`${API_URL}/teachers`, teacher);
    return response.data;
  } catch (error) {
    return { ...teacher, id: mockTeachers.length + 1 };
  }
};

export const updateTeacher = async (id, teacher) => {
  try {
    const response = await axios.put(`${API_URL}/teachers/${id}`, teacher);
    return response.data;
  } catch (error) {
    return { ...teacher, id };
  }
};

export const deleteTeacher = async (id) => {
  try {
    await axios.delete(`${API_URL}/teachers/${id}`);
    return true;
  } catch (error) {
    return true;
  }
};

// Students API calls
export const getStudents = async () => {
  try {
    const response = await axios.get(`${API_URL}/students`);
    return response.data;
  } catch (error) {
    return mockStudents;
  }
};

export const createStudent = async (student) => {
  try {
    const response = await axios.post(`${API_URL}/students`, student);
    return response.data;
  } catch (error) {
    return { ...student, id: mockStudents.length + 1 };
  }
};

export const updateStudent = async (id, student) => {
  try {
    const response = await axios.put(`${API_URL}/students/${id}`, student);
    return response.data;
  } catch (error) {
    return { ...student, id };
  }
};

export const deleteStudent = async (id) => {
  try {
    await axios.delete(`${API_URL}/students/${id}`);
    return true;
  } catch (error) {
    return true;
  }
};

// Courses API calls
export const getCourses = async () => {
  try {
    const response = await axios.get(`${API_URL}/courses`);
    return response.data;
  } catch (error) {
    // You can return empty array or mock data if you want for demonstration
    return [];
  }
};

export const createCourse = async (course) => {
  try {
    const response = await axios.post(`${API_URL}/courses`, course);
    return response.data;
  } catch (error) {
    // Mock course ID assignment if API fails
    return { ...course, id: new Date().getTime() };
  }
};

export const updateCourse = async (id, course) => {
  try {
    const response = await axios.put(`${API_URL}/courses/${id}`, course);
    return response.data;
  } catch (error) {
    return { ...course, id };
  }
};

export const deleteCourse = async (id) => {
  try {
    await axios.delete(`${API_URL}/courses/${id}`);
    return true;
  } catch (error) {
    return true;
  }
};
