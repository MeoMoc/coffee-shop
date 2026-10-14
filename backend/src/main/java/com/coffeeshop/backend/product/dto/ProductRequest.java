package com.coffeeshop.backend.product.dto;

import com.coffeeshop.backend.product_size.dto.ProductSizeRequest;
import java.util.List;
import java.util.UUID;

public class ProductRequest {
    public String name;
    public String description;
    public String imageUrl;
    public String component;
    public Integer discountAmount;
    public Boolean isBestSeller;
    public UUID menuId;
    public List<ProductSizeRequest> sizes;
}