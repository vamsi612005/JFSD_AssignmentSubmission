package com.example.demo.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
public class AssignmentSubmission {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Lob
    private byte[] fileAnswer; // For storing PDF files as binary data
    
    private String fileName; // Name of the uploaded file
    
    @ManyToOne
    @JoinColumn(name = "assignment_id")
    private Assignment assignment;

    @ManyToOne
    @JoinColumn(name = "student_id")
    private Student student;

    private LocalDateTime submissionDate;
    
    private String grade;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public byte[] getFileAnswer() {
		return fileAnswer;
	}

	public void setFileAnswer(byte[] fileAnswer) {
		this.fileAnswer = fileAnswer;
	}

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public Assignment getAssignment() {
		return assignment;
	}

	public void setAssignment(Assignment assignment) {
		this.assignment = assignment;
	}

	public Student getStudent() {
		return student;
	}

	public void setStudent(Student student) {
		this.student = student;
	}

	public LocalDateTime getSubmissionDate() {
		return submissionDate;
	}

	public void setSubmissionDate(LocalDateTime submissionDate) {
		this.submissionDate = submissionDate;
	}

	public String getGrade() {
		return grade;
	}

	public void setGrade(String grade) {
		this.grade = grade;
	}

	public AssignmentSubmission(Long id, byte[] fileAnswer, String fileName, Assignment assignment, Student student,
			LocalDateTime submissionDate, String grade) {
		super();
		this.id = id;
		this.fileAnswer = fileAnswer;
		this.fileName = fileName;
		this.assignment = assignment;
		this.student = student;
		this.submissionDate = submissionDate;
		this.grade = grade;
	}

	public AssignmentSubmission() {
		super();
	}

    
}
