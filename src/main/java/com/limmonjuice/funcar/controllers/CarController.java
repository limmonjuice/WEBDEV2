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

    // Show all cars
    @GetMapping
    public String listCars(Model model) {
        List<Car> cars = carRepository.findAll();
        model.addAttribute("cars", cars); // use plural name for clarity
        return "car"; // car.html (list view)
    }

    // Show form to add a car
    @GetMapping("/add")
    public String showAddForm(Model model) {
        model.addAttribute("car", new CarDTO()); // ✅ use CarDTO, not Car
        return "new"; // new.html
    }

    // Handle saving a new car
    @PostMapping("/save")
    public String saveCar(
            @Valid @ModelAttribute("car") CarDTO carDTO,
            BindingResult result,
            Model model) {

        // If validation fails, stay on the form
        if (result.hasErrors()) {
            return "new"; // ✅ Keep user input + error messages
        }

        // Convert DTO → Entity
        Car newCar = new Car();
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

    // Delete car by ID
    @GetMapping("/delete/{id}")
    public String deleteCar(@PathVariable int id) {
        carRepository.deleteById(id);
        return "redirect:/";
    }

    // Show edit form
    @GetMapping("/edit/{id}")
    public String showEditForm(@PathVariable int id, Model model) {
        Car car = carRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Invalid car ID: " + id));

        // Convert Car → CarDTO for form binding
        CarDTO carDTO = new CarDTO();
        carDTO.setLicensePlate(car.getLicensePlate());
        carDTO.setMake(car.getMake());
        carDTO.setModel(car.getModel());
        carDTO.setYear(car.getYear());
        carDTO.setColor(car.getColor());
        carDTO.setBodyType(car.getBodyType());
        carDTO.setEngineType(car.getEngineType());
        carDTO.setTransmission(car.getTransmission());

        model.addAttribute("car", carDTO);
        return "edit"; // edit.html
    }
}
