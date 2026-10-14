package com.coffeeshop.backend.category.controller;

import com.coffeeshop.backend.category.dto.CategoryDetailResponse;
import org.springframework.web.bind.annotation.*;
import lombok.RequiredArgsConstructor;
import java.util.UUID;
import java.util.List;
import org.springframework.security.access.prepost.PreAuthorize;
import com.coffeeshop.backend.category.service.CategoryService;
import com.coffeeshop.backend.category.dto.CategoryRequest;
import com.coffeeshop.backend.category.dto.CategoryResponse;

@RestController
@RequestMapping("/api/category")
@RequiredArgsConstructor
public class CategoryController {
    private final CategoryService categoryService;
    
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public CategoryDetailResponse create(@RequestBody CategoryRequest request) {
        return categoryService.create(request);
    }
    
    @GetMapping("/{id}")
    public CategoryResponse getById(@PathVariable UUID id) {
        return categoryService.getById(id);
    }
    
    @GetMapping()
    public List<CategoryDetailResponse> getAll() {
        return categoryService.getAll();
    }
    
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public CategoryDetailResponse update(@PathVariable UUID id, @RequestBody CategoryRequest request) {
        return categoryService.update(id, request);
    }
    
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public void delete(@PathVariable UUID id) {
        categoryService.delete(id);
    }
}
