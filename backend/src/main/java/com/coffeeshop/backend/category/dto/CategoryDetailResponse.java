package com.coffeeshop.backend.category.dto;

import com.coffeeshop.backend.menu.dto.MenuResponse;
import java.util.List;
import java.util.UUID;

public class CategoryDetailResponse {
    public UUID id;
    public String name;
    public String description;
    public int totalProducts;
    public List<MenuResponse> menus;
}
