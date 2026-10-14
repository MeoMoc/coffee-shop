package com.coffeeshop.backend.category.dto;

import java.util.List;
import java.util.UUID;

public class CategoryRequest {
    public String name;
    public String description;
    public List<UUID> menuIds;
}
