package com.example.demo.controller;

import com.example.demo.entity.Admin;
import com.example.demo.entity.Student;
import com.example.demo.entity.Teacher;
import com.example.demo.entity.Course;  // Import Course entity
import com.example.demo.service.AdminService;
import com.example.demo.service.CourseService;  // Import CourseService
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:3001") // Enable CORS for React app
public class AdminController {

    @Autowired
    private AdminService adminService;

    @Autowired
    private CourseService courseService;  // Inject CourseService

    // Admin Login
    @PostMapping("/login")
    public Admin login(@RequestParam String email, @RequestParam String password) {
        return adminService.login(email, password);
    }

    // Teacher CRUD operations
    @GetMapping("/teachers")
    public List<Teacher> getTeachers() {
        return adminService.getAllTeachers();
    }

    @PostMapping("/teachers")
    public Teacher createTeacher(@RequestBody Teacher teacher) {
        return adminService.createTeacher(teacher);
    }

    @PutMapping("/teachers/{id}")
    public Teacher updateTeacher(@PathVariable Long id, @RequestBody Teacher teacher) {
        return adminService.updateTeacher(id, teacher);
    }

    @DeleteMapping("/teachers/{id}")
    public void deleteTeacher(@PathVariable Long id) {
        adminService.deleteTeacher(id);
    }

    // Student CRUD operations
    @GetMapping("/students")
    public List<Student> getStudents() {
        return adminService.getAllStudents();
    }

    @PostMapping("/students")
    public Student createStudent(@RequestBody Student student) {
        return adminService.createStudent(student);
    }

    @PutMapping("/students/{id}")
    public Student updateStudent(@PathVariable Long id, @RequestBody Student student) {
        return adminService.updateStudent(id, student);
    }

    @DeleteMapping("/students/{id}")
    public void deleteStudent(@PathVariable Long id) {
        adminService.deleteStudent(id);
    }

    // Course CRUD operations
    @GetMapping("/courses")
    public List<Course> getCourses() {
        return courseService.getAllCourses();  // Get all courses
    }

    @PostMapping("/courses")
    public Course createCourse(@RequestBody Course course) {
        return courseService.createCourse(course);  // Create a new course
    }

    @GetMapping("/courses/{id}")
    public Course getCourseById(@PathVariable Long id) {
        Optional<Course> course = courseService.getCourseById(id);  // Get course by ID
        return course.orElse(null);  // Return course if found, otherwise null
    }

    @PutMapping("/courses/{id}")
    public Course updateCourse(@PathVariable Long id, @RequestBody Course course) {
        return courseService.updateCourse(id, course);  // Update course
    }

    @DeleteMapping("/courses/{id}")
    public void deleteCourse(@PathVariable Long id) {
        courseService.deleteCourse(id);  // Delete course by ID
    }
}
