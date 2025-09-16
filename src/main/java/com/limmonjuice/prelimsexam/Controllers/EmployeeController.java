package com.limmonjuice.prelimsexam.Controllers;

import com.limmonjuice.prelimsexam.DTO.EmployeeDTO;
import com.limmonjuice.prelimsexam.Models.Employee;
import com.limmonjuice.prelimsexam.Repositories.EmployeeRepo;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/")
public class EmployeeController {

    private final EmployeeRepo employeeRepository;

    @Autowired
    public EmployeeController(EmployeeRepo employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    @GetMapping
    public String listCars(Model model) {
        List<Employee> employees = employeeRepository.findAll();
        model.addAttribute("employee", employees);
        return "employee"; // car.html
    }

    @GetMapping("/add")
    public String showAddForm(Model model) {
        model.addAttribute("employess", new EmployeeDTO());
        return "new"; // new.html
    }

    @PostMapping("/save")
    public String saveCar(
            @Valid @ModelAttribute("employee") EmployeeDTO employeeDTO,
            BindingResult result) {

        if (result.hasErrors()) {
            return "new";
        }

        Employee newEmployee = new Employee();
        newEmployee.setId(employeeDTO.getId());
        newEmployee.setName(employeeDTO.getName());
        newEmployee.setEmail(employeeDTO.getEmail());

        employeeRepository.save(newEmployee);

        return "redirect:/";
    }

    @GetMapping("/edit/{id}")
    public String showEditForm(@PathVariable int id, Model model) {
        Employee employee = employeeRepository.findById(id).orElse(null);

        if (employee == null) {
            model.addAttribute("message", "Sorry, we couldn't find the car you're looking for!");
            return "error/error";
        }

        EmployeeDTO employeeDTO = new EmployeeDTO();
        employeeDTO.setId(employee.getId());
        employeeDTO.setName(employee.getName());
        employeeDTO.setEmail(employee.getEmail());

        model.addAttribute("employee", employeeDTO);
        return "edit";
    }

    @PostMapping("/update")
    public String updateCar(
            @Valid @ModelAttribute("employee") EmployeeDTO employeeDTO,
            BindingResult result) {

        if (result.hasErrors()) {
            return "edit";
        }

        Employee existingEmployee = employeeRepository.findById(employeeDTO.getId())
                .orElseThrow(() -> new RuntimeException("EMployee not found"));

        existingEmployee.setName(employeeDTO.getName());
        existingEmployee.setEmail(employeeDTO.getEmail());

        employeeRepository.save(existingEmployee);

        return "redirect:/";
    }

    @GetMapping("/delete/{id}")
    public String deleteCar(@PathVariable int id) {
        employeeRepository.deleteById(id);
        return "redirect:/";
    }
}