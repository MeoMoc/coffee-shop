package com.coffeeshop.backend.menu.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.UUID;
import com.coffeeshop.backend.menu.entity.Menu;
import java.util.List;
import java.util.Optional;

public interface MenuRepository extends JpaRepository<Menu, UUID> {
    @Override
    @EntityGraph(attributePaths = {"products", "products.sizes"})
    Page<Menu> findAll(Pageable pageable);

    @Override
    @EntityGraph(attributePaths = {"products", "products.sizes"})
    Optional<Menu> findById(UUID id);
    
    List<Menu> findByCategoryId(UUID categoryId);
    
    @EntityGraph(attributePaths = {"products", "products.sizes"})
    Optional<Menu> findWithProductsById(UUID id);
    
    boolean existsByCategoryId(UUID categoryId);
}