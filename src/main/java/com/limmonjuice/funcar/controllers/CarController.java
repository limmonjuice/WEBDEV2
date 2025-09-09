package com.limmonjuice.funcar.controllers;

import com.limmonjuice.funcar.DTO.CarDTO;
import com.limmonjuice.funcar.models.Car;
import com.limmonjuice.funcar.repositories.CarRepo;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/")
public class CarController {

    private final CarRepo carRepository;

    @Autowired
    public CarController(CarRepo carRepository) {
        this.carRepository = carRepository;
    }

    @GetMapping
    public String listCars(Model model) {
        List<Car> cars = carRepository.findAll();
        model.addAttribute("cars", cars);
        return "car"; // car.html
    }

    @GetMapping("/add")
    public String showAddForm(Model model) {
        model.addAttribute("car", new CarDTO());
        return "new"; // new.html
    }

    @PostMapping("/save")
    public String saveCar(
            @Valid @ModelAttribute("car") CarDTO carDTO,
            BindingResult result) {

        if (result.hasErrors()) {
            return "new";
        }

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

        carRepository.save(newCar);

        return "redirect:/";
    }

    @GetMapping("/edit/{id}")
    public String showEditForm(@PathVariable int id, Model model) {
        Car car = carRepository.findById(id).orElse(null);

        if (car == null) {
            model.addAttribute("message", "Sorry, we couldn't find the car you're looking for!");
            return "error/error";
        }

        CarDTO carDTO = new CarDTO();
        carDTO.setId(car.getId());
        carDTO.setLicensePlate(car.getLicensePlate());
        carDTO.setMake(car.getMake());
        carDTO.setModel(car.getModel());
        carDTO.setYear(car.getYear());
        carDTO.setColor(car.getColor());
        carDTO.setBodyType(car.getBodyType());
        carDTO.setEngineType(car.getEngineType());
        carDTO.setTransmission(car.getTransmission());

        model.addAttribute("car", carDTO);
        return "edit";
    }

    @PostMapping("/update")
    public String updateCar(
            @Valid @ModelAttribute("car") CarDTO carDTO,
            BindingResult result) {

        if (result.hasErrors()) {
            return "edit";
        }

        Car existingCar = carRepository.findById(carDTO.getId())
                .orElseThrow(() -> new RuntimeException("Car not found"));

        existingCar.setLicensePlate(carDTO.getLicensePlate());
        existingCar.setMake(carDTO.getMake());
        existingCar.setModel(carDTO.getModel());
        existingCar.setYear(carDTO.getYear());
        existingCar.setColor(carDTO.getColor());
        existingCar.setBodyType(carDTO.getBodyType());
        existingCar.setEngineType(carDTO.getEngineType());
        existingCar.setTransmission(carDTO.getTransmission());

        carRepository.save(existingCar);

        return "redirect:/";
    }

    @GetMapping("/delete/{id}")
    public String deleteCar(@PathVariable int id) {
        carRepository.deleteById(id);
        return "redirect:/";
    }
}
