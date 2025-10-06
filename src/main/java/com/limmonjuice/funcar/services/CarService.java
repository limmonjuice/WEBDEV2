package com.limmonjuice.funcar.services;

import com.limmonjuice.funcar.DTO.CarDTO;
import com.limmonjuice.funcar.models.Car;
import com.limmonjuice.funcar.repositories.CarRepo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CarService {
    final CarRepo carRepository;

    public CarService(CarRepo carRepository) {
        this.carRepository = carRepository;
    }

    public List<Car> findAll() {
        return carRepository.findAll();
    }

    public Car findById(int id){
        return carRepository.findById(id).orElse(null);
    }

    public Car save(CarDTO carDTO) {
        Car newCar = new Car();
        newCar.setId(carDTO.getId());
        newCar.setLicensePlate(carDTO.getLicensePlate());
        newCar.setMake(carDTO.getMake());
        newCar.setModel(carDTO.getModel());
        newCar.setYear(carDTO.getYear());
        newCar.setColor(carDTO.getColor());
        newCar.setBodyType(carDTO.getBodyType());
        newCar.setEngineType(carDTO.getEngineType());
        newCar.setTransmission(carDTO.getTransmission());

        return carRepository.save(newCar);
    }

    public Car updateCar(int id, CarDTO carDTO){
        Car existingCar = carRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Car not found"));

        existingCar.setLicensePlate(carDTO.getLicensePlate());
        existingCar.setMake(carDTO.getMake());
        existingCar.setModel(carDTO.getModel());
        existingCar.setYear(carDTO.getYear());
        existingCar.setColor(carDTO.getColor());
        existingCar.setBodyType(carDTO.getBodyType());
        existingCar.setEngineType(carDTO.getEngineType());
        existingCar.setTransmission(carDTO.getTransmission());
        return carRepository.save(existingCar);
    }

    public void deleteCar(int id) {
        carRepository.deleteById(id);
    }
}