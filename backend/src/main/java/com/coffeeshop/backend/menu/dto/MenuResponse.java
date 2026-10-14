package com.coffeeshop.backend.menu.dto;

import com.coffeeshop.backend.product.dto.ProductResponse;
import java.util.List;
import java.util.UUID;

public class MenuResponse {
    public UUID id;
    public String name;
    public String description;
    public List<ProductResponse> products;
}
