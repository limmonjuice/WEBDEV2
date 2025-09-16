package com.limmonjuice.prelimsexam.Repositories;

import com.limmonjuice.prelimsexam.Models.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepo extends JpaRepository<Employee, Integer>{
}
