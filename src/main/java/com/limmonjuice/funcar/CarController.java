package com.limmonjuice.funcar;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
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
        model.addAttribute("car", cars); // renamed to 'cars' (plural) for clarity
        return "car"; // car.html (list view)
    }

    // Show form to add a car
    @GetMapping("/add")
    public String showAddForm(Model model) {
        model.addAttribute("car", new Car());
        return "new"; // new.html
    }

    // Handle saving a car (new or updated)
    @PostMapping("/save")
    public String saveCar(@ModelAttribute("car") Car car) {
        carRepository.save(car); // works for insert & update
        return "redirect:/";
    }

    // Delete car by id
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
        model.addAttribute("car", car);
        return "edit"; // edit.html
    }
}
