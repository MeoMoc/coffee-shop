package com.coffeeshop.backend.menu.controller;

import org.springframework.web.bind.annotation.*;
import lombok.RequiredArgsConstructor;
import java.util.UUID;
import java.util.List;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.data.domain.*;
import com.coffeeshop.backend.menu.service.MenuService;
import com.coffeeshop.backend.menu.dto.MenuRequest;
import com.coffeeshop.backend.menu.dto.MenuResponse;
import com.coffeeshop.backend.common.dto.ApiResponse;
import com.coffeeshop.backend.common.dto.PageMeta;

@RestController
@RequestMapping("/api/menu")
@RequiredArgsConstructor
public class MenuController {
    private final MenuService menuService;
    
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public MenuResponse create(@RequestBody MenuRequest request) {
        return menuService.create(request);
    }
    
    @GetMapping
    public ApiResponse<List<MenuResponse>> getAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Page<MenuResponse> result = menuService.getAll(page, size);
        
        PageMeta meta = new PageMeta(
                result.getNumber(),
                result.getSize(),
                result.getTotalElements(),
                result.getTotalPages()
        );
        return new ApiResponse<>(result.getContent(), meta);
    }
    
    @GetMapping("/{id}")
    public MenuResponse getById(@PathVariable UUID id) {
        return menuService.getById(id);
    }
    
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public MenuResponse update(@PathVariable UUID id, @RequestBody MenuRequest request) {
        return menuService.update(id, request);
    }
    
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public void delete(@PathVariable UUID id) {
        menuService.delete(id);
    }
}
