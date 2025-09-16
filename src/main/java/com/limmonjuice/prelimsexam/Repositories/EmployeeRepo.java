package com.limmonjuice.prelimsexam.Repositories;

import com.limmonjuice.prelimsexam.Models.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EmployeeRepo extends JpaRepository<Employee, Integer>{
    Optional<Employee> findByEmail(String email);
}
