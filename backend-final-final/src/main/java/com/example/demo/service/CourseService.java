package com.example.demo.service;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.DTO.AssignmentDTO;
import com.example.demo.DTO.AssignmentSubmissionDTO;
import com.example.demo.entity.Assignment;
import com.example.demo.entity.AssignmentSubmission;
import com.example.demo.entity.Course;
import com.example.demo.entity.Student;
import com.example.demo.repository.AssignmentRepository;
import com.example.demo.repository.AssignmentSubmissionRepository;
import com.example.demo.repository.CourseRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class CourseService {
    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private AssignmentRepository assignmentRepository;
    
    @Autowired
    private AssignmentSubmissionRepository assignmentSubmissionRepository;
    
    
    
 // Check if the student has already submitted an assignment
    public boolean isAssignmentSubmitted(Long courseId, Long assignmentId, Long studentId) {
        return assignmentSubmissionRepository.existsByAssignmentIdAndStudentId(assignmentId, studentId);
    }
    
    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    public Course getCourse(Long courseId) {
        return courseRepository.findById(courseId).orElseThrow(() -> new EntityNotFoundException("Course not found"));
    }

    public List<Assignment> getAssignments(Long courseId) {
        return assignmentRepository.findByCourseId(courseId);
    }
    
    public List<AssignmentSubmission> getAssignmentSubmissions(Long courseId) {
        return assignmentSubmissionRepository.findByAssignmentId(courseId);
    }

    public void submitAssignmentAnswer(Long courseId, Long assignmentId, MultipartFile file, Student student) {
        if (!"application/pdf".equals(file.getContentType())) {
            throw new IllegalArgumentException("Only PDF files are allowed.");
        }
        if (file.getSize() > 5 * 1024 * 1024) {
            throw new IllegalArgumentException("File size exceeds the 5MB limit.");
        }

        Assignment assignment = assignmentRepository.findById(assignmentId)
            .orElseThrow(() -> new EntityNotFoundException("Assignment not found"));

        AssignmentSubmission submission = new AssignmentSubmission();
        try {
            submission.setFileAnswer(file.getBytes()); // Save the PDF file as binary data
        } catch (IOException e) {
            throw new RuntimeException("Failed to read file content", e);
        }
        submission.setFileName(file.getOriginalFilename()); // Save the file name
        submission.setAssignment(assignment);
        submission.setStudent(student);
        submission.setSubmissionDate(LocalDateTime.now());

        // Add the submission to the assignment and save
        assignment.getSubmissions().add(submission);
        assignmentRepository.save(assignment);
    }

    
 // Inside CourseService class
    public void addAssignment(Long courseId, AssignmentDTO assignmentDTO) {
        Course course = getCourse(courseId); // Retrieve course by ID
        Assignment newAssignment = new Assignment();
        newAssignment.setTitle(assignmentDTO.getTitle());
        newAssignment.setDescription(assignmentDTO.getDescription());
        newAssignment.setLastSubmissionDate(assignmentDTO.getLastSubmissionDate());
        newAssignment.setCourse(course); // Set the course for the new assignment
        
        // Assuming assignmentRepository is a repository for Assignment entity
        assignmentRepository.save(newAssignment);
    }

    public List<AssignmentSubmission> getSubmissionsByAssignmentId(Long assignmentId) {
        return assignmentSubmissionRepository.findByAssignmentId(assignmentId);
    }
    

    public CourseService(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }
    
    public Course createCourse(Course course) {
        return courseRepository.save(course);
    }

    // Get a course by ID
    public Optional<Course> getCourseById(Long id) {
        return courseRepository.findById(id);
    }

    // Update a course
    public Course updateCourse(Long id, Course course) {
        if (courseRepository.existsById(id)) {
            course.setId(id);  // Ensure the ID is retained during update
            return courseRepository.save(course);
        }
        return null;
    }

    // Delete a course
    public void deleteCourse(Long id) {
        courseRepository.deleteById(id);
    }
//    public boolean isAnswerSubmitted(Long courseId, Long assignmentId, String studentEmail) {
//        return AssignmentSubmissionRepository.existsByCourseIdAndAssignmentIdAndStudentEmail(courseId, assignmentId, studentEmail);
//    }
}
