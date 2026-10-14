package com.coffeeshop.backend.menu.service;

import java.util.UUID;
import org.springframework.data.domain.*;
import com.coffeeshop.backend.menu.dto.MenuRequest;
import com.coffeeshop.backend.menu.dto.MenuResponse;

public interface MenuService {
    MenuResponse create(MenuRequest request);
    Page<MenuResponse> getAll(int page, int size);
    MenuResponse getById(UUID id);
    MenuResponse update(UUID id, MenuRequest request);
    void delete(UUID id);
}
