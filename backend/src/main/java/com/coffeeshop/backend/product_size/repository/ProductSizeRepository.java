package com.coffeeshop.backend.product_size.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;
import com.coffeeshop.backend.product_size.entity.ProductSize;

public interface ProductSizeRepository extends JpaRepository<ProductSize, UUID> {}
