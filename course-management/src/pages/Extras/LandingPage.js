import React from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import Features from './Features';
import About from './About';
import Contact from './Contact';
import 'bootstrap/dist/css/bootstrap.min.css';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <About />
        <Contact />
      </main>
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm">© {new Date().getFullYear()} EduGrade. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;