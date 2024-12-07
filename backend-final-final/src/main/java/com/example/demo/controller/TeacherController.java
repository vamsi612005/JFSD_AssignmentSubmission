package com.example.demo.controller;

import com.example.demo.entity.Teacher;
import com.example.demo.service.TeacherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/teachers")
@CrossOrigin(origins = "http://localhost:3000") // Enable CORS for React app
public class TeacherController {

    @Autowired
    private TeacherService teacherService;

    @PostMapping("/register")
    public ResponseEntity<?> registerTeacher(@RequestBody Teacher teacher) {
        // Check if the email already exists
        if (teacherService.existsByEmail(teacher.getEmail())) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                .body("Email already in use. Please use a different email.");
        }
        // Register the teacher
        Teacher registeredTeacher = teacherService.registerTeacher(teacher);
        return ResponseEntity.ok(registeredTeacher);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginTeacher(@RequestBody Teacher teacher) {
        boolean isAuthenticated = teacherService.authenticateTeacher(teacher.getEmail(), teacher.getPassword());

        if (isAuthenticated) {
            return ResponseEntity.ok("Login successful");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body("Invalid email or password");
        }
    }
}
