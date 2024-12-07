import React from 'react';
import { Clock, CheckCircle, BarChart3, Shield } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <Clock className="h-6 w-6 text-indigo-600" />,
      title: 'Real-time Submission',
      description: 'Submit assignments instantly with automatic timestamp verification'
    },
    {
      icon: <CheckCircle className="h-6 w-6 text-indigo-600" />,
      title: 'Automated Grading',
      description: 'Efficient grading system with customizable rubrics and instant feedback'
    },
    {
      icon: <BarChart3 className="h-6 w-6 text-indigo-600" />,
      title: 'Progress Tracking',
      description: 'Comprehensive analytics and progress monitoring for both students and teachers'
    },
    {
      icon: <Shield className="h-6 w-6 text-indigo-600" />,
      title: 'Plagiarism Detection',
      description: 'Advanced plagiarism checking to maintain academic integrity'
    }
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Powerful Features for Modern Education
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Everything you need to manage assignments effectively
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="absolute -top-4 left-6 bg-white p-2 rounded-lg shadow-sm">
                {feature.icon}
              </div>
              <h3 className="mt-8 text-xl font-medium text-gray-900">{feature.title}</h3>
              <p className="mt-2 text-gray-500">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;