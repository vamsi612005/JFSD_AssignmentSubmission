package com.example.demo.repository;

import com.example.demo.entity.Student;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
@Transactional
public interface StudentRepository extends JpaRepository<Student, Long> {
    boolean existsByEmail(String email);
    Student findByEmail(String email);
}
