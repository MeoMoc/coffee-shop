package com.coffeeshop.backend.reservation.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;
import com.coffeeshop.backend.reservation.entity.Reservation;

public interface ReservationRepository extends JpaRepository<Reservation, UUID> {}
