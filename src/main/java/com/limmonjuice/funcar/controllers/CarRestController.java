package com.limmonjuice.funcar.controllers;

import com.limmonjuice.funcar.DTO.CarDTO;
import com.limmonjuice.funcar.exceptions.ResourceNotFoundException;
import com.limmonjuice.funcar.models.Car;
import com.limmonjuice.funcar.repositories.CarRepo;
import com.limmonjuice.funcar.services.CarService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

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

    @PutMapping("/cars/{id}")
    public Car updateCar(@PathVariable int id, @Valid @RequestBody CarDTO car){
        Car updateCar = carService.findById(id);
        if (updateCar == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Car with ID "+ id + " not found.");
        }
        return carService.updateCar(id, car);
    }

    @DeleteMapping("/cars/{id}")
    public void deleteCar(@PathVariable int id){
        if(carService.findById(id) == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Car with ID "+ id + " not found.");
        }
        carService.deleteCar(id);
    }
}
