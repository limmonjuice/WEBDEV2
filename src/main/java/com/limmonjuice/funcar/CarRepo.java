package com.limmonjuice.funcar;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CarRepo extends JpaRepository<Car, Integer> {
}

