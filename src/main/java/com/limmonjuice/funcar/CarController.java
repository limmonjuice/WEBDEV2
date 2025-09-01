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
        model.addAttribute("car", cars);
        return "car"; // car.html (make sure your template name matches)
    }

    // Show form to add a car
    @GetMapping("/add")
    public String showAddForm(Model model) {
        model.addAttribute("car", new Car());
        return "new"; // new.html
    }

    // Handle saving a car
    @PostMapping("/save")
    public String saveCar(@ModelAttribute("car") Car car) {
        carRepository.save(car);
        return "redirect:/";
    }
}
