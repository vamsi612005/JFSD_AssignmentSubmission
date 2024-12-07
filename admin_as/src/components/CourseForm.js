import React, { useState, useEffect } from 'react';

const CourseForm = ({ course, teachers, onSave, onCancel }) => {
  const [formData, setFormData] = useState(course);

  useEffect(() => {
    setFormData(course);
  }, [course]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    // Add logic to save course (either create or update)
    onSave();
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-2xl font-semibold mb-4">{course.id ? 'Edit' : 'Add'} Course</h3>
      <div className="space-y-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Course Name"
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Course Description"
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <input
          type="text"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          placeholder="Image URL"
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <input
          type="text"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          placeholder="Course Duration"
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <input
          type="number"
          name="enrolled"
          value={formData.enrolled}
          onChange={handleChange}
          placeholder="Enrolled Students"
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <input
          type="number"
          name="rating"
          value={formData.rating}
          onChange={handleChange}
          placeholder="Rating"
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <div className="space-x-2">
          <button onClick={handleSave} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Save</button>
          <button onClick={onCancel} className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default CourseForm;
