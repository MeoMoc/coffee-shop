package com.coffeeshop.backend.product.service.impl;

import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;
import java.util.UUID;
import org.springframework.data.domain.*;
import com.coffeeshop.backend.product.service.ProductService;
import com.coffeeshop.backend.product.repository.ProductRepository;
import com.coffeeshop.backend.product.dto.ProductRequest;
import com.coffeeshop.backend.product.dto.ProductResponse;
import com.coffeeshop.backend.product.entity.Product;
import com.coffeeshop.backend.common.exception.NotFoundException;
import com.coffeeshop.backend.product_size.dto.ProductSizeResponse;
import com.coffeeshop.backend.product_size.entity.ProductSize;
import com.coffeeshop.backend.product_size.repository.ProductSizeRepository;
import java.util.List;
import java.util.Set;
@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {
    private final ProductRepository productRepository;
    private final ProductSizeRepository productSizeRepository;
    
    private ProductResponse mapToResponse(Product product) {
        ProductResponse res = new ProductResponse();
        res.id = product.getId();
        res.name = product.getName();
        res.description = product.getDescription();
        res.component = product.getComponent();
        res.imageUrl = product.getImageUrl();
        res.discountAmount = product.getDiscountAmount();
        res.isBestSeller = product.getIsBestSeller();
        
        if (product.getSizes() != null) {
            res.sizes = product.getSizes().stream().map(size -> {
                ProductSizeResponse sizeRes = new ProductSizeResponse();
                sizeRes.size = size.getSize();
                sizeRes.price = size.getPrice();
                sizeRes.note = size.getNote();
                return sizeRes;
            }).toList();
        }
        
        return res;
    }
    
    @Override
    public ProductResponse create(ProductRequest request) {
        Product product = new Product();
        product.setName(request.name);
        product.setDescription(request.description);
        product.setComponent(request.component);
        product.setImageUrl(request.imageUrl);
        product.setDiscountAmount(request.discountAmount);
        product.setIsBestSeller(request.isBestSeller);
        
        if (request.sizes != null && !request.sizes.isEmpty()) {
            Set<ProductSize> sizes = request.sizes.stream().map(sizeReq -> {
                ProductSize size = new ProductSize();
                size.setSize(sizeReq.size);
                size.setPrice(sizeReq.price);
                size.setNote(sizeReq.note);
                size.setProduct(product);
                return size;
            }).collect(java.util.stream.Collectors.toSet());

            product.setSizes(sizes);
        }
        Product savedProduct = productRepository.save(product);
        
        return mapToResponse(savedProduct);
    }
    
    @Override
    public Page<ProductResponse> getAll(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return productRepository.findAll(pageable).map(this::mapToResponse);
    }
    
    @Override
    public ProductResponse getById(UUID id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Product not found"));
        return mapToResponse(product);
    }
    
    @Override
    public ProductResponse update(UUID id, ProductRequest request) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Product not found"));
        
        if (request.name != null) {
            product.setName(request.name);
        }
        if (request.description != null) {
            product.setDescription(request.description);
        }
        if (request.component != null) {
            product.setComponent(request.component);
        }
        if (request.imageUrl != null) {
            product.setImageUrl(request.imageUrl);
        }
        if (request.discountAmount != null) {
            product.setDiscountAmount(request.discountAmount);
        }
        if (request.isBestSeller != null) {
            product.setIsBestSeller(request.isBestSeller);
        }
        
        if (request.sizes != null) {
            product.getSizes().clear();
            List<ProductSize> newSizes = request.sizes.stream().map(sizeReq -> {
                ProductSize size = new ProductSize();
                size.setSize(sizeReq.size);
                size.setPrice(sizeReq.price);
                size.setNote(sizeReq.note);
                size.setProduct(product);
                return size;
            }).toList();

            product.getSizes().addAll(newSizes);
        }
        Product savedProduct = productRepository.save(product);
        return mapToResponse(productRepository.save(savedProduct));
    }
    
    @Override
    public void delete(UUID id) {
        productRepository.deleteById(id);
    }
}
