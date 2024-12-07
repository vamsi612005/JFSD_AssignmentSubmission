import React, { useState } from 'react';
import { createTeacher, updateTeacher } from '../services/api';
import toast from 'react-hot-toast';

const TeacherForm = ({ teacher, onSave, onCancel }) => {
  const [formData, setFormData] = useState(teacher);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (teacher.id) {
        await updateTeacher(teacher.id, formData);
        toast.success('Teacher updated successfully');
      } else {
        await createTeacher(formData);
        toast.success('Teacher created successfully');
      }
      onSave();
    } catch (error) {
      toast.error('An error occurred');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Name
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full p-2 border rounded-md"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Email
        </label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full p-2 border rounded-md"
          required
        />
      </div>
      {!teacher.id && (
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            value={formData.password || ''}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
      )}
      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-gray-600 hover:text-gray-800"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          {teacher.id ? 'Update' : 'Create'}
        </button>
      </div>
    </form>
  );
};

export default TeacherForm;
