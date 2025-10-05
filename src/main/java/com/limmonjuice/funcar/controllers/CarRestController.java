package com.limmonjuice.funcar.controllers;

import com.limmonjuice.funcar.DTO.CarDTO;
import com.limmonjuice.funcar.exceptions.ResourceNotFoundException;
import com.limmonjuice.funcar.models.Car;
import com.limmonjuice.funcar.repositories.CarRepo;
import com.limmonjuice.funcar.services.CarService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class CarRestController {

    private final CarService carService;
    private final CarRepo carRepository;

    public CarRestController(CarService carService, CarRepo carRepository) {
        this.carService = carService;
        this.carRepository = carRepository;
    }

    @GetMapping("/cars")
    public List<Car> findAll() {
        return carService.findAll();
    }

    @PostMapping("/cars")
    public Car createCar(@Valid @RequestBody CarDTO car) {
        return carService.save(car);
    }

    @PutMapping("cars/{id}")
    public Car updateCar(@PathVariable int id, @RequestBody CarDTO carDetails) {
        return carService.save(carDetails);
    }

    @DeleteMapping("cars/{id}")
    public void deleteCar(@PathVariable int id) {
        if (!carRepository.existsById(id)){
            throw new ResourceNotFoundException("Car not found",id);
        }
        carService.deleteCar(id);
    }
}
