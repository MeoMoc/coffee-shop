package com.coffeeshop.backend.menu.dto;

import java.util.List;
import java.util.UUID;

public class MenuRequest {
    public String name;
    public String description;
    public List<UUID> productIds;
}
