package com.example.demo.entity;

import java.time.LocalDateTime;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Assignment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String title;
    private String description;

    @ManyToOne
    @JoinColumn(name = "course_id")
    private Course course;

    @OneToMany(mappedBy = "assignment", cascade = CascadeType.ALL)
    private List<AssignmentSubmission> submissions;
    
    private LocalDateTime lastSubmissionDate; // Last date for submission

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Course getCourse() {
		return course;
	}

	public void setCourse(Course course) {
		this.course = course;
	}

	public List<AssignmentSubmission> getSubmissions() {
		return submissions;
	}

	public void setSubmissions(List<AssignmentSubmission> submissions) {
		this.submissions = submissions;
	}

	public LocalDateTime getLastSubmissionDate() {
		return lastSubmissionDate;
	}

	public void setLastSubmissionDate(LocalDateTime lastSubmissionDate) {
		this.lastSubmissionDate = lastSubmissionDate;
	}

	public Assignment(Long id, String title, String description, Course course, List<AssignmentSubmission> submissions,
			LocalDateTime lastSubmissionDate) {
		super();
		this.id = id;
		this.title = title;
		this.description = description;
		this.course = course;
		this.submissions = submissions;
		this.lastSubmissionDate = lastSubmissionDate;
	}

	public Assignment() {
		super();
	}

	
}
