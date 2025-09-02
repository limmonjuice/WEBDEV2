package com.limmonjuice.funcar.repositories;

import com.limmonjuice.funcar.models.Car;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CarRepo extends JpaRepository<Car, Integer> {
}

