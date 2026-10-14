package com.coffeeshop.backend.category.service;

import com.coffeeshop.backend.category.dto.CategoryDetailResponse;
import java.util.UUID;
import org.springframework.data.domain.*;
import com.coffeeshop.backend.category.dto.CategoryRequest;
import com.coffeeshop.backend.category.dto.CategoryResponse;
import java.util.List;

public interface CategoryService {
    CategoryDetailResponse create(CategoryRequest request);
    List<CategoryDetailResponse> getAll();
    CategoryResponse getById(UUID id);
    CategoryDetailResponse update(UUID id, CategoryRequest request);
    void delete(UUID id);
}
