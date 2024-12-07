package com.example.demo.service;

import com.example.demo.entity.AssignmentSubmission;
import com.example.demo.repository.AssignmentSubmissionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AssignmentSubmissionService {

    @Autowired
    private AssignmentSubmissionRepository assignmentSubmissionRepository;

    public boolean updateGrade(Long Id, String grade, Long assignmentId, Long studentId) {
        AssignmentSubmission submission = assignmentSubmissionRepository.findByAssignmentIdAndStudentId(assignmentId,studentId);
        System.out.println(grade);
        if (submission != null) {
            submission.setGrade(grade);  // Set the grade
            assignmentSubmissionRepository.save(submission);  // Save the updated submission
            return true;
        }
        return false;  // Return false if the submission is not found
    }
}
