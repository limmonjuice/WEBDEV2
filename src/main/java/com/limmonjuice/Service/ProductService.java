package com.limmonjuice.Service;

import com.limmonjuice.DTO.ProductDTO;
import com.limmonjuice.Repository.ProductRepository;
import com.limmonjuice.model.Product;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ProductService {

    private final ProductRepository repository;

    public ProductService(ProductRepository repository) {
        this.repository = repository;
    }

    public List<Product> findAll() {
        return repository.findAll();
    }

    public Product findById(int id){
        return repository.findById(id).orElse(null);
    }

    public Product save(ProductDTO product) {
        Product newProduct = new Product();
        newProduct.setName(product.name());
        newProduct.setDescription(product.description());
        newProduct.setStock(product.stock());
        newProduct.setUnit(product.unit());
        newProduct.setPrice(product.price());
        return repository.save(newProduct);
    }

    public Product updateProduct(Product product, ProductDTO productDTO) {
        product.setName(productDTO.name());
        product.setDescription(productDTO.description());
        product.setStock(productDTO.stock());
        product.setUnit(productDTO.unit());
        product.setPrice(productDTO.price());
        return repository.save(product);
    }

    public void deleteProduct(int id) {
        repository.deleteById(id);
    }
}
