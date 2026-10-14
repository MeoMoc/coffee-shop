package com.coffeeshop.backend.reservation.controller;

import org.springframework.web.bind.annotation.*;
import lombok.RequiredArgsConstructor;
import java.util.UUID;
import java.util.List;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.data.domain.*;
import com.coffeeshop.backend.reservation.service.ReservationService;
import com.coffeeshop.backend.reservation.dto.ReservationRequest;
import com.coffeeshop.backend.reservation.dto.ReservationResponse;
import com.coffeeshop.backend.common.dto.ApiResponse;
import com.coffeeshop.backend.common.dto.PageMeta;

@RestController
@RequestMapping("/api/reservation")
@RequiredArgsConstructor
public class ReservationController {
    private final ReservationService reservationService;
    
    @PostMapping
    public ReservationResponse create(@RequestBody ReservationRequest request) {
        return reservationService.create(request);
    }
    
    @GetMapping
    public ApiResponse<List<ReservationResponse>> getAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Page<ReservationResponse> result = reservationService.getAll(page, size);
        
        PageMeta meta = new PageMeta(
                result.getNumber(),
                result.getSize(),
                result.getTotalElements(),
                result.getTotalPages()
        );
        return new ApiResponse<>(result.getContent(), meta);
    }
    
    @GetMapping("/{id}")
    public ApiResponse<ReservationResponse> getById(@PathVariable UUID id) {
        return new ApiResponse<>(reservationService.getById(id));
    }
    
    @PutMapping("/{id}")
    public ReservationResponse update(@PathVariable UUID id, @RequestBody ReservationRequest request) {
        return reservationService.update(id, request);
    }
    
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public void delete(@PathVariable UUID id) {
        reservationService.delete(id);
    }
}
