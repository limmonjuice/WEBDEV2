package com.limmonjuice.prelimsexam.Repositories;

import com.limmonjuice.prelimsexam.Models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepo extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
}