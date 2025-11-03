package com.limmonjuice.DTO;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record ProductDTO(
        @NotBlank(message = "Name is required")
        String name,

        @NotBlank(message = "Description is required")
        String description,

        @Min(value = 1, message = "Stock must be at least 1")
        int stock,

        @NotBlank(message = "Unit is required")
        String unit,

        @NotNull(message = "Price is required")
        @Positive(message = "Price must be positive")
        Double price
) {}
