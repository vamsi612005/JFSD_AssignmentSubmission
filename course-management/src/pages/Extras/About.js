import React from 'react';
import { CheckSquare, Users, Clock, Award } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-20 bg-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            About Our Platform
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            A comprehensive solution for managing academic assignments and evaluations
          </p>
        </div>

        <div className="mt-20">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            <div className="relative">
              <dt>
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-600 text-white">
                  <CheckSquare className="h-6 w-6" />
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                  Streamlined Submission Process
                </p>
              </dt>
              <dd className="mt-2 ml-16 text-base text-gray-500">
                Students can easily submit assignments through our intuitive interface, with automatic deadline tracking and submission confirmations.
              </dd>
            </div>

            <div className="relative">
              <dt>
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-600 text-white">
                  <Users className="h-6 w-6" />
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                  Collaborative Environment
                </p>
              </dt>
              <dd className="mt-2 ml-16 text-base text-gray-500">
                Teachers and students can interact through comments, feedback, and revision requests, creating a dynamic learning environment.
              </dd>
            </div>

            <div className="relative">
              <dt>
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-600 text-white">
                  <Clock className="h-6 w-6" />
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                  Time Management
                </p>
              </dt>
              <dd className="mt-2 ml-16 text-base text-gray-500">
                Automated deadline reminders and late submission tracking help students stay on schedule and teachers manage their grading workflow.
              </dd>
            </div>

            <div className="relative">
              <dt>
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-600 text-white">
                  <Award className="h-6 w-6" />
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                  Fair Assessment
                </p>
              </dt>
              <dd className="mt-2 ml-16 text-base text-gray-500">
                Standardized grading rubrics and plagiarism detection ensure fair and consistent evaluation of all submissions.
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
};

export default About;