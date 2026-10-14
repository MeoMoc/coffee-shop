package com.coffeeshop.backend.category.service.impl;

import com.coffeeshop.backend.category.dto.CategoryDetailResponse;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;
import java.util.UUID;
import com.coffeeshop.backend.category.service.CategoryService;
import com.coffeeshop.backend.category.repository.CategoryRepository;
import com.coffeeshop.backend.category.dto.CategoryRequest;
import com.coffeeshop.backend.category.dto.CategoryResponse;
import com.coffeeshop.backend.category.entity.Category;
import com.coffeeshop.backend.common.exception.NotFoundException;
import com.coffeeshop.backend.common.exception.BadRequestException;
import com.coffeeshop.backend.menu.dto.MenuResponse;
import com.coffeeshop.backend.menu.entity.Menu;
import com.coffeeshop.backend.menu.repository.MenuRepository;
import com.coffeeshop.backend.product.dto.ProductResponse;
import com.coffeeshop.backend.product.entity.Product;
import com.coffeeshop.backend.product_size.dto.ProductSizeResponse;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;
import org.springframework.transaction.annotation.Transactional;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {
    private final CategoryRepository categoryRepository;
    private final MenuRepository menuRepository;
    
    @PersistenceContext
    private final EntityManager entityManager;
    
    private CategoryResponse mapToResponse(Category category) {
        CategoryResponse res = new CategoryResponse();
        res.id = category.getId();
        res.name = category.getName();
        res.description = category.getDescription();

        List<Menu> menus = menuRepository.findByCategoryId(category.getId());

        res.menus = menus.stream().map(menu -> {
            MenuResponse m = new MenuResponse();
            m.name = menu.getName();
            m.description = menu.getDescription();
            return m;
        }).toList();
        
        return res;
    }
    
    private ProductResponse mapProductToResponse(Product product) {
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
                ProductSizeResponse s = new ProductSizeResponse();
                s.size = size.getSize();
                s.price = size.getPrice();
                s.note = size.getNote();
                return s;
            }).toList();
        }

        return res;
    }
    
    private CategoryDetailResponse mapToDetailResponse(Category category) {
        CategoryDetailResponse res = new CategoryDetailResponse();
        res.id = category.getId();
        res.name = category.getName();
        res.description = category.getDescription();

        AtomicInteger totalProducts = new AtomicInteger(0);

        res.menus = category.getMenus().stream().map(menu -> {
            MenuResponse menuRes = new MenuResponse();
            menuRes.id = menu.getId();
            menuRes.name = menu.getName();
            menuRes.description = menu.getDescription();

            menuRes.products = menu.getProducts().stream().map(product -> {
                totalProducts.incrementAndGet();
                return mapProductToResponse(product);
            }).toList();

            return menuRes;
        }).toList();

        res.totalProducts = totalProducts.get();

        return res;
    }
    
    @Override
    @Transactional
    public CategoryDetailResponse create(CategoryRequest request) {
        Category category = new Category();
        category.setName(request.name);
        category.setDescription(request.description);

        category = categoryRepository.save(category);

        if (request.menuIds != null && !request.menuIds.isEmpty()) {
            List<Menu> menus = menuRepository.findAllById(request.menuIds);
            if (menus.size() != request.menuIds.size()) {
                throw new NotFoundException("Some menus not found");
            }

            for (Menu menu : menus) {
                menu.setCategory(category);
            }
            menuRepository.saveAll(menus);
            
            entityManager.flush(); 
            entityManager.clear();
        }

        Category full = categoryRepository.findByIdWithDetails(category.getId())
                .orElseThrow(() -> new NotFoundException("Category not found after creation"));

        return mapToDetailResponse(full);
    }
    
    @Override
    public List<CategoryDetailResponse> getAll() {
        List<Category> categories = categoryRepository.findAllWithDetails();

        return categories.stream().map(category -> {
            CategoryDetailResponse res = new CategoryDetailResponse();
            res.id = category.getId();
            res.name = category.getName();
            res.description = category.getDescription();

            AtomicInteger totalProducts = new AtomicInteger(0);

            res.menus = category.getMenus().stream().map(menu -> {
                MenuResponse menuRes = new MenuResponse();
                menuRes.id = menu.getId();
                menuRes.name = menu.getName();
                menuRes.description = menu.getDescription();
                
                menuRes.products = menu.getProducts().stream().map(product -> {
                    totalProducts.incrementAndGet();
                    return mapProductToResponse(product);
                }).toList();

                return menuRes;
            }).toList();

            res.totalProducts = totalProducts.get();

            return res;
        }).toList();
    }
    
    @Override
    public CategoryResponse getById(UUID id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Category not found"));
        return mapToResponse(category);
    }
    
    @Override
    public CategoryDetailResponse update(UUID id, CategoryRequest request) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Category not found"));

        if (request.name != null) {
            category.setName(request.name);
        }
        if (request.description != null) {
            category.setDescription(request.description);
        }

        if (request.menuIds != null) {
            List<Menu> currentMenus = menuRepository.findByCategoryId(id);
            for (Menu menu : currentMenus) {
                menu.setCategory(null);
            }
            menuRepository.saveAll(currentMenus);

            List<Menu> newMenus = menuRepository.findAllById(request.menuIds);
            if (newMenus.size() != request.menuIds.size()) {
                throw new NotFoundException("Some menus not found");
            }

            for (Menu menu : newMenus) {
                menu.setCategory(category);
            }
            menuRepository.saveAll(newMenus);
        }

        categoryRepository.save(category);

        Category fullCategory = categoryRepository.findByIdWithDetails(id)
                .orElseThrow(() -> new NotFoundException("Category not found after update"));

        return mapToDetailResponse(fullCategory);
    }
    
    @Override
    public void delete(UUID id) {
        if (!categoryRepository.existsById(id)) {
            throw new NotFoundException("Category not found");
        }

        if (menuRepository.existsByCategoryId(id)) {
            throw new BadRequestException("Cannot delete category because it has menus");
        }
        categoryRepository.deleteById(id);
    }
}
