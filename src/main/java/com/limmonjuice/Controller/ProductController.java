package com.limmonjuice.Controller;

import com.limmonjuice.DTO.ProductDTO;
import com.limmonjuice.Service.ProductService;
import com.limmonjuice.model.Product;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ProductController {
    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/products")
    public List<Product> getAllProducts(){
        return productService.findAll();
    }

    @PostMapping("/products")
    public Product newProduct(@Valid @RequestBody ProductDTO car){
        return productService.save(car);
    }

    @PutMapping("/products/{id}")
    public Product updateProduct(@PathVariable int id, @Valid @RequestBody ProductDTO car){
        Product updateProduct = productService.findById(id);
        if (updateProduct == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Product with ID "+ id + " not found.");
        }
        return productService.updateProduct(updateProduct, car);
    }

    @DeleteMapping("/products/{id}")
    public void deleteProduct(@PathVariable int id){
        if(productService.findById(id) == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Product with ID "+ id + " not found.");
        }
        productService.deleteProduct(id);
    }

}
