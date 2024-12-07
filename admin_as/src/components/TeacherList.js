import React, { useState, useEffect } from 'react';
import { getTeachers, deleteTeacher } from '../services/api';
import { Pencil, Trash2 } from 'lucide-react';
import TeacherForm from './TeacherForm';
import toast from 'react-hot-toast';

const TeacherList = () => {
  const [teachers, setTeachers] = useState([]);
  const [editingTeacher, setEditingTeacher] = useState(null);

  useEffect(() => {
    loadTeachers();
  }, []);

  const loadTeachers = async () => {
    const data = await getTeachers();
    setTeachers(data);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this teacher?')) {
      await deleteTeacher(id);
      toast.success('Teacher deleted successfully');
      loadTeachers();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Teachers</h2>
        <button
          onClick={() => setEditingTeacher({ name: '', email: '' })}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Add Teacher
        </button>
      </div>

      {editingTeacher && (
        <TeacherForm
          teacher={editingTeacher}
          onSave={() => {
            setEditingTeacher(null);
            loadTeachers();
          }}
          onCancel={() => setEditingTeacher(null)}
        />
      )}

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {teachers.map((teacher) => (
              <tr key={teacher.id}>
                <td className="px-6 py-4 whitespace-nowrap">{teacher.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{teacher.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <button
                    onClick={() => setEditingTeacher(teacher)}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    <Pencil className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => teacher.id && handleDelete(teacher.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeacherList;
