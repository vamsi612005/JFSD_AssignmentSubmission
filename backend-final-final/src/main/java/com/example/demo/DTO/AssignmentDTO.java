package com.example.demo.DTO;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AssignmentDTO {
    private Long id;
    private String title;
    private String description;
    private LocalDateTime lastSubmissionDate;
    
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
	public LocalDateTime getLastSubmissionDate() {
		return lastSubmissionDate;
	}
	public void setLastSubmissionDate(LocalDateTime lastSubmissionDate) {
		this.lastSubmissionDate = lastSubmissionDate;
	}
	public AssignmentDTO(Long id, String title, String description, LocalDateTime lastSubmissionDate) {
		super();
		this.id = id;
		this.title = title;
		this.description = description;
		this.lastSubmissionDate = lastSubmissionDate;
	}
	public AssignmentDTO() {
		super();
	}
    
}
