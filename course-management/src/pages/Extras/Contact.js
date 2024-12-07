import React, { useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatusMessage('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatusMessage('There was an error sending your message. Please try again.');
      }
    } catch (error) {
      setStatusMessage('There was an error sending your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Get in Touch
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Have questions? We're here to help!
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="flex flex-col items-center p-6 bg-indigo-50 rounded-lg">
            <Mail className="h-8 w-8 text-indigo-600" />
            <h3 className="mt-4 text-xl font-medium text-gray-900">Email</h3>
            <p className="mt-2 text-gray-500">support@edugrade.com</p>
          </div>

          <div className="flex flex-col items-center p-6 bg-indigo-50 rounded-lg">
            <Phone className="h-8 w-8 text-indigo-600" />
            <h3 className="mt-4 text-xl font-medium text-gray-900">Phone</h3>
            <p className="mt-2 text-gray-500">+1 (555) 123-4567</p>
          </div>

          <div className="flex flex-col items-center p-6 bg-indigo-50 rounded-lg">
            <MapPin className="h-8 w-8 text-indigo-600" />
            <h3 className="mt-4 text-xl font-medium text-gray-900">Address</h3>
            <p className="mt-2 text-gray-500">123 Education Ave, Learning City</p>
          </div>
        </div>

        <div className="mt-12 max-w-lg mx-auto">
          <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </form>
          {statusMessage && (
            <p className="mt-4 text-center text-lg text-gray-700">{statusMessage}</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Contact;
