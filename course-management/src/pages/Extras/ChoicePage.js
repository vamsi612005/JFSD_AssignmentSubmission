import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function ChoicePage() {
  const navigate = useNavigate();

  const handleTeacherLogin = () => {
    navigate('/teacher/login');
  };

  const handleStudentLogin = () => {
    navigate('/student/login');
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">
          Course Platform
        </a>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a className="nav-link" href="#about">About</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#contact">Contact</a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Main Section */}
      <div className="container text-center" style={{ marginTop: '50px' }}>
        <h2>Login as</h2>
        <div className="row justify-content-center" style={{ marginTop: '30px' }}>
          <div className="col-md-6">
            <button
              className="btn btn-primary btn-lg btn-block"
              onClick={handleTeacherLogin}
            >
              Teacher
            </button>
          </div>
          <div className="col-md-6">
            <button
              className="btn btn-secondary btn-lg btn-block"
              onClick={handleStudentLogin}
            >
              Student
            </button>
          </div>
        </div>
      </div>

      {/* About Section */}
      <section id="about" className="container" style={{ marginTop: '100px' }}>
        <div className="row">
          <div className="col text-center">
            <h2>About Our Platform</h2>
            <p>
              Our platform connects students and teachers for seamless online learning.
              Teachers can manage their courses and students can easily access learning materials.
              We aim to enhance the learning experience by making it more accessible and effective.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="container" style={{ marginTop: '50px', marginBottom: '50px' }}>
        <div className="row">
          <div className="col text-center">
            <h2>Contact Us</h2>
            <p>For inquiries, please reach out to us:</p>
            <ul className="list-unstyled">
              <li>Email: support@courseplatform.com</li>
              <li>Phone: +123 456 7890</li>
              <li>Address: 123 Learning Street, Education City, EC 10101</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ChoicePage;
