package com.coffeeshop.backend.product.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.UUID;
import java.util.Optional;
import java.util.List;

import com.coffeeshop.backend.product.entity.Product;

public interface ProductRepository extends JpaRepository<Product, UUID> {

    boolean existsByMenuId(UUID menuId);

    @Override
    @EntityGraph(attributePaths = "sizes")
    Optional<Product> findById(UUID id);

    @Override
    @EntityGraph(attributePaths = "sizes")
    Page<Product> findAll(Pageable pageable);

    @EntityGraph(attributePaths = "sizes")
    List<Product> findByMenuId(UUID menuId);
}