package com.example.demo.controller;

import com.example.demo.entity.Student;
import com.example.demo.service.StudentService;
import jakarta.transaction.Transactional;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/students")
@CrossOrigin(origins = "http://localhost:3000") // Enable CORS for React app
@Transactional
public class StudentController {

    @Autowired
    private StudentService studentService;

    @PostMapping("/register")
    public Student registerStudent(@RequestBody Student student) {
        return studentService.registerStudent(student);
    }

    @PostMapping("/login")
    public Student loginStudent(@RequestBody Student student) {
        return studentService.loginStudent(student.getEmail(), student.getPassword());
    }
    
    @GetMapping("/name")
    public ResponseEntity<Map<String, String>> getStudentName(@RequestParam String email) {
        Student student = studentService.getStudentByEmail(email);
        if (student != null) {
            Map<String, String> response = new HashMap<>();
            response.put("name", student.getName());
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Collections.singletonMap("error", "Student not found"));
    }
    
    @GetMapping("/id")
    public ResponseEntity<Map<String, Long>> getStudentId(@RequestParam String email) {
        Student student = studentService.getStudentByEmail(email);
        if (student != null) {
            Map<String, Long> response = new HashMap<>();
            response.put("id", student.getId());  // The ID should be of type Long
            return ResponseEntity.ok(response);  // Return the map as a ResponseEntity
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Collections.singletonMap("error",0L));
    }

}
