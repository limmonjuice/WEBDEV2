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

    // Show all employees
    @GetMapping
    public String listEmployees(Model model) {
        List<Employee> employees = employeeRepository.findAll();
        model.addAttribute("employees", employees);
        return "employee"; // employee.html
    }

    // Show add form
    @GetMapping("/add")
    public String showAddForm(Model model) {
        model.addAttribute("employee", new EmployeeDTO());
        return "new"; // new.html
    }

    // Handle create
    @PostMapping("/save")
    public String saveEmployee(
            @Valid @ModelAttribute("employee") EmployeeDTO employeeDTO,
            BindingResult result,
            Model model) {

        if (result.hasErrors()) {
            System.out.println("Validation errors: " + result.getAllErrors());
            model.addAttribute("employee", employeeDTO);
            return "new";
        }

        Employee newEmployee = new Employee();
        newEmployee.setName(employeeDTO.getName());
        newEmployee.setEmail(employeeDTO.getEmail());

        employeeRepository.save(newEmployee);
        return "redirect:/";
    }

    // Show edit form
    @GetMapping("/edit/{id}")
    public String showEditForm(@PathVariable int id, Model model) {
        Employee employee = employeeRepository.findById(id).orElse(null);

        if (employee == null) {
            model.addAttribute("message", "Sorry, we couldn't find the employee you're looking for!");
            return "error/error";
        }

        EmployeeDTO employeeDTO = new EmployeeDTO();
        employeeDTO.setName(employee.getName());
        employeeDTO.setEmail(employee.getEmail());

        model.addAttribute("employee", employeeDTO);
        model.addAttribute("id", id); // Pass id separately for update
        return "edit";
    }

    // Handle update
    @PostMapping("/update/{id}")
    public String updateEmployee(
            @PathVariable int id,
            @Valid @ModelAttribute("employee") EmployeeDTO employeeDTO,
            BindingResult result,
            Model model) {

        if (result.hasErrors()) {
            // 👇 Paste here
            System.out.println("Validation errors: " + result.getAllErrors());
            model.addAttribute("id", id);
            return "edit"; // go back to edit.html
        }

        Employee existingEmployee = employeeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        existingEmployee.setName(employeeDTO.getName());
        existingEmployee.setEmail(employeeDTO.getEmail());

        employeeRepository.save(existingEmployee);
        return "redirect:/";
    }

    // Handle delete
    @GetMapping("/delete/{id}")
    public String deleteEmployee(@PathVariable int id, Model model) {
        if (!employeeRepository.existsById(id)) {
            model.addAttribute("message", "Employee not found!");
            return "error/error";
        }
        employeeRepository.deleteById(id);
        return "redirect:/";
    }
}
