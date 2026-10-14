package com.coffeeshop.backend.product.dto;

import com.coffeeshop.backend.product_size.dto.ProductSizeResponse;
import java.util.List;
import java.util.UUID;

public class ProductResponse {
    public UUID id;
    public String name;
    public String description;
    public String imageUrl;
    public String component;
    public Integer discountAmount;
    public Boolean isBestSeller;
    public List<ProductSizeResponse> sizes;
}
