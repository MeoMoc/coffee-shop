package com.coffeeshop.backend.reservation.dto;

import com.coffeeshop.backend.enums.ReservationStatusE;
import com.coffeeshop.backend.user.entity.User;
import java.time.LocalDateTime;

public class ReservationRequest {
    public String customerName;
    public String phone;
    public String email;
    public Integer guestNumber;
    public LocalDateTime scheduleTime;
    public String specialRequest;
    public ReservationStatusE status;
    public User contactBy;
}
