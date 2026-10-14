package com.coffeeshop.backend.reservation.service.impl;

import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;
import java.util.UUID;
import org.springframework.data.domain.*;
import com.coffeeshop.backend.reservation.service.ReservationService;
import com.coffeeshop.backend.reservation.repository.ReservationRepository;
import com.coffeeshop.backend.reservation.dto.ReservationRequest;
import com.coffeeshop.backend.reservation.dto.ReservationResponse;
import com.coffeeshop.backend.reservation.entity.Reservation;
import com.coffeeshop.backend.common.exception.NotFoundException;
import com.coffeeshop.backend.enums.ReservationStatusE;

@Service
@RequiredArgsConstructor
public class ReservationServiceImpl implements ReservationService {
    private final ReservationRepository reservationRepository;
    
    private ReservationResponse mapToResponse(Reservation reservation) {
        ReservationResponse res = new ReservationResponse();
        res.id = reservation.getId();
        res.customerName = reservation.getCustomerName();
        res.phone = reservation.getPhone();
        res.email = reservation.getEmail();
        res.guestNumber = reservation.getGuestNumber();
        res.scheduleTime = reservation.getScheduleTime();
        res.specialRequest = reservation.getSpecialRequest();
        res.status = reservation.getStatus();
        res.contactBy = reservation.getContactBy();
        
        return res;
    }
    
    @Override
    public ReservationResponse create(ReservationRequest request) {
        Reservation reservation = new Reservation();
        reservation.setCustomerName(request.customerName);
        reservation.setPhone(request.phone);
        reservation.setEmail(request.email);
        reservation.setGuestNumber(request.guestNumber);
        reservation.setScheduleTime(request.scheduleTime);
        reservation.setSpecialRequest(request.specialRequest);
        reservation.setStatus(ReservationStatusE.PENDING);
        reservation.setContactBy(request.contactBy);

        return mapToResponse(reservationRepository.save(reservation));
    }
    
    @Override
    public Page<ReservationResponse> getAll(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return reservationRepository.findAll(pageable).map(this::mapToResponse);
    }
    
    @Override
    public ReservationResponse getById(UUID id) {
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Reservation not found"));
        return mapToResponse(reservation);
    }
    
    @Override
    public ReservationResponse update(UUID id, ReservationRequest request) {
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Reservation not found"));
        
        if (request.customerName != null) {
            reservation.setCustomerName(request.customerName);
        }
        if (request.phone != null) {
            reservation.setPhone(request.phone);
        }
        if (request.email != null) {
            reservation.setEmail(request.email);
        }
        if (request.guestNumber != null) {
            reservation.setGuestNumber(request.guestNumber);
        }
        if (request.scheduleTime != null) {
            reservation.setScheduleTime(request.scheduleTime);
        }
        if (request.specialRequest != null) {
            reservation.setSpecialRequest(request.specialRequest);
        }
        if (request.status != null) {
            reservation.setStatus(request.status);
        }
        if (request.contactBy != null) {
            reservation.setContactBy(request.contactBy);
        }
        
        return mapToResponse(reservationRepository.save(reservation));
    }
    
    @Override
    public void delete(UUID id) {
        reservationRepository.deleteById(id);
    }
}
