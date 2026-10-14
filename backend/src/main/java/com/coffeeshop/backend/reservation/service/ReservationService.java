package com.coffeeshop.backend.reservation.service;

import java.util.UUID;
import org.springframework.data.domain.*;
import com.coffeeshop.backend.reservation.dto.ReservationRequest;
import com.coffeeshop.backend.reservation.dto.ReservationResponse;

public interface ReservationService {
    ReservationResponse create(ReservationRequest request);
    Page<ReservationResponse> getAll(int page, int size);
    ReservationResponse getById(UUID id);
    ReservationResponse update(UUID id, ReservationRequest request);
    void delete(UUID id);
}
