package com.coffeeshop.backend.product.service;

import java.util.UUID;
import org.springframework.data.domain.*;
import com.coffeeshop.backend.product.dto.ProductRequest;
import com.coffeeshop.backend.product.dto.ProductResponse;

public interface ProductService {
    ProductResponse create(ProductRequest request);
    Page<ProductResponse> getAll(int page, int size);
    ProductResponse getById(UUID id);
    ProductResponse update(UUID id, ProductRequest request);
    void delete(UUID id);
}
