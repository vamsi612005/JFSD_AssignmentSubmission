package com.example.demo.DTO;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AssignmentSubmissionDTO {
    public AssignmentSubmissionDTO(Long id2, Long id3, Long id4, String name, String fileName2, String grade2,
			LocalDateTime submissionDate2, Object object) {
		// TODO Auto-generated constructor stub
	}
	private Long id; // Include the ID to uniquely identify the submission
    private Long assignmentId; // Assignment's ID
    private Long studentId; // Student's ID
    private String studentName; // Student's Name
    private String fileName; // File name of the submission
    private String grade; // Grade given to the submission
    private LocalDateTime submissionDate; // Submission timestamp
    private String answer; // Base64 encoded answer file (if needed)
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Long getAssignmentId() {
		return assignmentId;
	}
	public void setAssignmentId(Long assignmentId) {
		this.assignmentId = assignmentId;
	}
	public Long getStudentId() {
		return studentId;
	}
	public void setStudentId(Long studentId) {
		this.studentId = studentId;
	}
	public String getStudentName() {
		return studentName;
	}
	public void setStudentName(String studentName) {
		this.studentName = studentName;
	}
	public String getFileName() {
		return fileName;
	}
	public void setFileName(String fileName) {
		this.fileName = fileName;
	}
	public String getGrade() {
		return grade;
	}
	public void setGrade(String grade) {
		this.grade = grade;
	}
	public LocalDateTime getSubmissionDate() {
		return submissionDate;
	}
	public void setSubmissionDate(LocalDateTime submissionDate) {
		this.submissionDate = submissionDate;
	}
	public String getAnswer() {
		return answer;
	}
	public void setAnswer(String answer) {
		this.answer = answer;
	}
	public AssignmentSubmissionDTO(Long id, Long assignmentId, Long studentId, String studentName, String fileName,
			String grade, LocalDateTime submissionDate, String answer) {
		super();
		this.id = id;
		this.assignmentId = assignmentId;
		this.studentId = studentId;
		this.studentName = studentName;
		this.fileName = fileName;
		this.grade = grade;
		this.submissionDate = submissionDate;
		this.answer = answer;
	}
	public AssignmentSubmissionDTO() {
		
	}
    
    
}
