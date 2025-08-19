package com.limmonjuice.funcar;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/")
public class CarController {

    @Autowired
    private CarService carService;

    // Show all cars
    @GetMapping
    public String listCars(Model model) {
        model.addAttribute("car", carService.getAllCars());
        return "car"; // cars.html
    }

    // Show form to add car
    @GetMapping("/add")
    public String showAddForm(Model model) {
        model.addAttribute("car", new Car());
        return "new"; // new.html
    }

    // Handle saving car
    @PostMapping("/save")
    public String saveCar(@ModelAttribute Car car) {
        carService.addCar(car);
        return "redirect:/";
    }
}
