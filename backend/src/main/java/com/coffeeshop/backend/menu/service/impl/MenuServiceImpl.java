package com.coffeeshop.backend.menu.service.impl;

import com.coffeeshop.backend.common.exception.BadRequestException;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;
import java.util.UUID;
import org.springframework.data.domain.*;
import com.coffeeshop.backend.menu.service.MenuService;
import com.coffeeshop.backend.menu.repository.MenuRepository;
import com.coffeeshop.backend.menu.dto.MenuRequest;
import com.coffeeshop.backend.menu.dto.MenuResponse;
import com.coffeeshop.backend.menu.entity.Menu;
import com.coffeeshop.backend.common.exception.NotFoundException;
import com.coffeeshop.backend.product.dto.ProductResponse;
import com.coffeeshop.backend.product.entity.Product;
import com.coffeeshop.backend.product.repository.ProductRepository;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MenuServiceImpl implements MenuService {
    private final MenuRepository menuRepository;
    private final ProductRepository productRepository;
    
    private MenuResponse mapToResponse(Menu menu) {
        MenuResponse res = new MenuResponse();
        res.id = menu.getId();
        res.name = menu.getName();
        res.description = menu.getDescription();
        if (menu.getProducts() != null) {
            res.products = menu.getProducts().stream().map(product -> {
                ProductResponse p = new ProductResponse();
                p.id = product.getId();
                p.name = product.getName();
                p.description = product.getDescription();
                p.component = product.getComponent();
                p.imageUrl = product.getImageUrl();
                p.discountAmount = product.getDiscountAmount();
                p.isBestSeller = product.getIsBestSeller();
                
                if (product.getSizes() != null) {
                    p.sizes = product.getSizes().stream().map(size -> {
                        var s = new com.coffeeshop.backend.product_size.dto.ProductSizeResponse();
                        s.size = size.getSize();
                        s.price = size.getPrice();
                        s.note = size.getNote();
                        return s;
                    }).toList();
                }
                return p;
            }).toList();
        }
        return res;
    }
    
    @Override
    public MenuResponse create(MenuRequest request) {
        Menu menu = new Menu();
        menu.setName(request.name);
        menu.setDescription(request.description);

        menu = menuRepository.save(menu);

        if (request.productIds != null && !request.productIds.isEmpty()) {
            List<Product> products = productRepository.findAllById(request.productIds);

            if (products.size() != request.productIds.size()) {
                throw new NotFoundException("Some products not found");
            }

            for (Product product : products) {
                menu.addProduct(product);
            }

            productRepository.saveAll(products);
        }

        Menu updatedMenu = menuRepository.findWithProductsById(menu.getId())
            .orElseThrow(() -> new NotFoundException("Menu not found"));

        return mapToResponse(updatedMenu);
    }
    
    @Override
    public Page<MenuResponse> getAll(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return menuRepository.findAll(pageable).map(this::mapToResponse);
    }
    
    @Override
    public MenuResponse getById(UUID id) {
        Menu menu = menuRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Menu not found"));
        return mapToResponse(menu);
    }
    
    @Override
    public MenuResponse update(UUID id, MenuRequest request) {
        Menu menu = menuRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Menu not found"));

        if (request.name != null) {
            menu.setName(request.name);
        }

        if (request.description != null) {
            menu.setDescription(request.description);
        }

        if (request.productIds != null) {

            List<Product> currentProducts = productRepository.findByMenuId(id);
            currentProducts.forEach(p -> p.setMenu(null));
            menu.getProducts().clear();
            List<Product> newProducts = productRepository.findAllById(request.productIds);

            if (newProducts.size() != request.productIds.size()) {
                throw new NotFoundException("Some products not found");
            }

            newProducts.forEach(menu::addProduct);

            List<Product> all = new java.util.ArrayList<>();
            all.addAll(currentProducts);
            all.addAll(newProducts);

            productRepository.saveAll(all);
        }

        menuRepository.save(menu);

        Menu fullMenu = menuRepository.findWithProductsById(menu.getId())
                .orElseThrow(() -> new NotFoundException("Menu not found"));

        return mapToResponse(fullMenu);
    }
    
    @Override
    public void delete(UUID id) {
        if (!menuRepository.existsById(id)) {
            throw new NotFoundException("Menu not found");
        }

        if (productRepository.existsByMenuId(id)) {
            throw new BadRequestException("Cannot delete menu because it has products");
        }
        
        menuRepository.deleteById(id);
    }
}
