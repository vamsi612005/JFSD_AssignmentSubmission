package com.example.demo.service;

import com.example.demo.entity.Student;
import com.example.demo.repository.StudentRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    public Student registerStudent(Student student) {
        // Check if the email already exists
        if (studentRepository.existsByEmail(student.getEmail())) {
            throw new RuntimeException("Email is already registered");
        }
        // Save the student
        return studentRepository.save(student);
    }

    public Student loginStudent(String email, String password) {
        Student student = studentRepository.findByEmail(email);
        if (student != null && student.getPassword().equals(password)) {
            return student; // Successful login
        }
        throw new RuntimeException("Invalid email or password");
    }
    
    public Student getStudentByEmail(String email) {
        return studentRepository.findByEmail(email);
    }
    
}
