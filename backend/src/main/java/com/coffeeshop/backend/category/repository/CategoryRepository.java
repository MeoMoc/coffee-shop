package com.coffeeshop.backend.category.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;
import com.coffeeshop.backend.category.entity.Category;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.Query;

public interface CategoryRepository extends JpaRepository<Category, UUID> {
    @Query("""
        SELECT DISTINCT c FROM Category c
        LEFT JOIN FETCH c.menus m
        LEFT JOIN FETCH m.products p
        LEFT JOIN FETCH p.sizes s
    """)
    List<Category> findAllWithDetails();
    
    @Query("""
        SELECT DISTINCT c FROM Category c
        LEFT JOIN FETCH c.menus m
        LEFT JOIN FETCH m.products p
        LEFT JOIN FETCH p.sizes s
        WHERE c.id = :id
    """)
    Optional<Category> findByIdWithDetails(UUID id);
}
