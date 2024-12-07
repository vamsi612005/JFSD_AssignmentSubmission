package com.example.demo.service;

import com.example.demo.entity.Teacher;
import com.example.demo.repository.TeacherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TeacherService {

    @Autowired
    private TeacherRepository teacherRepository;

    public Teacher registerTeacher(Teacher teacher) {
        // Save the teacher to the database
        return teacherRepository.save(teacher);
    }

    public boolean existsByEmail(String email) {
        return teacherRepository.existsByEmail(email);
    }

    public boolean authenticateTeacher(String email, String password) {
        Teacher teacher = teacherRepository.findByEmail(email);
        return teacher != null && teacher.getPassword().equals(password); // Simple password check
    }
}
