package com.example.demo.controller;

import java.util.Base64;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.DTO.AssignmentDTO;
import com.example.demo.DTO.AssignmentSubmissionDTO;
import com.example.demo.DTO.CourseDTO;
import com.example.demo.entity.Assignment;
import com.example.demo.entity.AssignmentSubmission;
import com.example.demo.entity.Course;
import com.example.demo.entity.Student;
import com.example.demo.repository.AssignmentSubmissionRepository;
import com.example.demo.repository.StudentRepository;
import com.example.demo.service.AssignmentSubmissionService;
import com.example.demo.service.CourseService;
import com.example.demo.service.StudentService;

@RestController
@RequestMapping("/api/courses")
@CrossOrigin(origins = "http://localhost:3000") // Enable CORS for React app
public class CourseController {

    @Autowired
    private CourseService courseService;
    
    @Autowired
    private StudentService studentService;
    
    @Autowired
    private StudentRepository studentRepository;
    
    @Autowired
    private AssignmentSubmissionService assignmentSubmissionService;
    
    @Autowired
    private AssignmentSubmissionRepository assignmentSubmissionRepository;
    
    @GetMapping("/{assignmentId}/assignment-grade/{studentId}")
    public ResponseEntity<AssignmentSubmissionDTO> getAssignmentDetails(
            @PathVariable Long assignmentId,
            @PathVariable Long studentId) {
        
        // Find the student by studentId
        Optional<Student> studentOptional = studentRepository.findById(studentId);
        if (!studentOptional.isPresent()) {
            return ResponseEntity.notFound().build(); // Return 404 if student is not found
        }
        
        Student student = studentOptional.get();
        
        // Retrieve the assignment submission for the given courseId, assignmentId, and studentId
        AssignmentSubmission assignmentSubmissionOptional = assignmentSubmissionRepository.findByAssignmentIdAndStudentId(assignmentId, studentId);
        
        if (assignmentSubmissionOptional == null) {
            return ResponseEntity.notFound().build(); // Return 404 if submission not found
        }

        AssignmentSubmission submission = assignmentSubmissionOptional;
        
        // Create DTO for response
        AssignmentSubmissionDTO dto = new AssignmentSubmissionDTO();
        dto.setId(submission.getId());
        dto.setAssignmentId(submission.getAssignment().getId());
        dto.setStudentId(submission.getStudent().getId());
        dto.setFileName(submission.getFileName());
        dto.setGrade(submission.getGrade());
        dto.setSubmissionDate(submission.getSubmissionDate());
        
        // Base64 encode the fileAnswer (if present)
        String encodedAnswer = submission.getFileAnswer() != null
                                ? new String(Base64.getEncoder().encode(submission.getFileAnswer()))
                                : null;
        dto.setAnswer(encodedAnswer); // Add encoded file answer to DTO
        
        dto.setStudentName(submission.getStudent().getName()); // Include student name
        
        // Return the response with assignment details
        return ResponseEntity.ok(dto);
    }

    @GetMapping("/all")
    public List<CourseDTO> getAllCourses() {
        return courseService.getAllCourses().stream()
            .map(course -> new CourseDTO(
                course.getId(),
                course.getName(),
                course.getDescription(),
                course.getImageUrl(), 
                course.getDuration(), 
                course.getEnrolled(), 
                course.getRating()))
            .collect(Collectors.toList());
    }
    
    @PutMapping("/{assignmentId}/grade")
    public ResponseEntity<String> updateGrade(@PathVariable Long assignmentId, @RequestBody GradeUpdateRequest gradeUpdateRequest) {
        boolean isUpdated = assignmentSubmissionService.updateGrade(assignmentId, gradeUpdateRequest.getGrade(),gradeUpdateRequest.getAssignmentId(),gradeUpdateRequest.getStudentId());
        System.out.println(gradeUpdateRequest.getGrade());

        if (isUpdated) {
            return ResponseEntity.ok("Grade updated successfully");
        } else {
            return ResponseEntity.status(400).body("Failed to update grade");
        }
    }
    
    @GetMapping("/{courseId}/assignments/{assignmentId}/submitted")
    public ResponseEntity<Map<String, Boolean>> checkIfSubmitted(
        @PathVariable Long courseId, 
        @PathVariable Long assignmentId, 
        @RequestParam String studentEmail) {

        Student student = studentRepository.findByEmail(studentEmail);

        boolean isSubmitted = courseService.isAssignmentSubmitted(courseId, assignmentId, student.getId());
        return ResponseEntity.ok(Collections.singletonMap("isSubmitted", isSubmitted));
    }


    @GetMapping("/{courseId}")
    public CourseDTO getCourse(@PathVariable Long courseId) {
        Course course = courseService.getCourse(courseId);
        return new CourseDTO(
                course.getId(),
                course.getName(),
                course.getDescription(),
                course.getImageUrl(), 
                course.getDuration(), 
                course.getEnrolled(), 
                course.getRating());
    }

    @GetMapping("/{courseId}/assignments")
    public List<AssignmentDTO> getAssignments(@PathVariable Long courseId) {
        List<Assignment> assignments = courseService.getAssignments(courseId);
        return assignments.stream()
            .map(assignment -> new AssignmentDTO(assignment.getId(), assignment.getTitle(), assignment.getDescription(), assignment.getLastSubmissionDate()))
            .collect(Collectors.toList());
    }
    
    @GetMapping("/{courseId}/as_answers")
    public List<AssignmentSubmissionDTO> getAssignmentSubmission(@PathVariable Long courseId) {
        // Retrieve the list of AssignmentSubmissions based on courseId
        List<AssignmentSubmission> submissions = courseService.getAssignmentSubmissions(courseId);
        // Map the AssignmentSubmission entities to AssignmentSubmissionDTO
        return submissions.stream()
            .map(submission -> {
                // Create a new AssignmentSubmissionDTO
                AssignmentSubmissionDTO dto = new AssignmentSubmissionDTO();

                // Set values using setters instead of constructor
                dto.setId(submission.getId()); // AssignmentSubmission ID
                dto.setAssignmentId(submission.getAssignment().getId()); // Assignment ID
                dto.setStudentId(submission.getStudent().getId()); // Student ID
                dto.setFileName(submission.getFileName()); // File name
                dto.setGrade(submission.getGrade()); // Grade
                dto.setSubmissionDate(submission.getSubmissionDate()); // Submission Date
                
                // Base64 encode fileAnswer if it's not null
                String encodedAnswer = submission.getFileAnswer() != null 
                                        ? new String(Base64.getEncoder().encode(submission.getFileAnswer())) 
                                        : null;
                dto.setAnswer(encodedAnswer); // File answer

                // Set student name
                // Note: If you want to send the student name separately, you should not include this in DTO.
                // If you still want to keep it here, you can set it in the DTO like this.
                dto.setStudentName(submission.getStudent().getName()); // Student's Name

                return dto;
            })
            .collect(Collectors.toList());
    }



    
    @PostMapping("/{courseId}/assignments/{assignmentId}/submit")
    public ResponseEntity<String> submitAssignmentAnswer(
            @PathVariable Long courseId,
            @PathVariable Long assignmentId,
            @RequestParam("file") MultipartFile file,
            @RequestParam String studentEmail
    ) {
        Student student = studentService.getStudentByEmail(studentEmail);
        
        courseService.submitAssignmentAnswer(courseId, assignmentId, file, student);
        
        return ResponseEntity.ok("Assignment submitted successfully");
    }

    
    @PostMapping("/{courseId}/addassignments")
    public ResponseEntity<String> addAssignment(
        @PathVariable Long courseId,
        @RequestBody AssignmentDTO assignmentDTO
    ) {
        courseService.addAssignment(courseId, assignmentDTO);
        return ResponseEntity.ok("Assignment added successfully");
    }
    
}
