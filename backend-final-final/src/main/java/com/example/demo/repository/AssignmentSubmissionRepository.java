package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.demo.DTO.AssignmentSubmissionDTO;
import com.example.demo.entity.AssignmentSubmission;
import com.example.demo.entity.Course;

@Repository
public interface AssignmentSubmissionRepository extends JpaRepository<AssignmentSubmission, Long> {
    List<AssignmentSubmission> findByAssignmentId(Long assignmentId);
    List<AssignmentSubmission> findByStudentId(Long studentId);
    boolean existsByAssignmentIdAndStudentId(Long assignmentId, Long studentId);
    AssignmentSubmission findByAssignmentIdAndGradeIsNull(Long assignmentId);
    AssignmentSubmission findByAssignmentIdAndStudentId(Long assignmentId,Long studentId);
}
