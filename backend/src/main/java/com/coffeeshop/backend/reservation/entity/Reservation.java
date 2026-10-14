package com.coffeeshop.backend.reservation.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;
import com.coffeeshop.backend.common.entity.BaseEntity;
import com.coffeeshop.backend.user.entity.User;
import com.coffeeshop.backend.enums.ReservationStatusE;
import java.util.UUID;

@Entity
@Table(name="reservation")
@SQLDelete(sql="UPDATE reservation SET deleted_at=GETDATE() WHERE id=?")
@Where(clause="deleted_at IS NULL")
public class Reservation extends BaseEntity {
    @Column(name="customer_name", nullable=false, columnDefinition="NVARCHAR(255)")
    private String customerName;
    
    @Column(name="phone", nullable=false)
    private String phone;
    
    @Column(name="email")
    private String email;
    
    @Column(name="guest_number", nullable=false)
    private Integer guestNumber;
    
    @Column(name="schedule_time", nullable=false)
    private LocalDateTime scheduleTime;
    
    @Column(name="special_request", columnDefinition="NVARCHAR(500)")
    private String specialRequest;
    
    @Enumerated(EnumType.STRING)
    @Column(name="status")
    private ReservationStatusE status=ReservationStatusE.PENDING;
    
    @ManyToOne
    @JoinColumn(name="contact_id", nullable=true)
    private User contactBy;
    
    public UUID getId() {return this.id;}
    public String getCustomerName() {return this.customerName;}
    public String getPhone() {return this.phone;}
    public String getEmail() {return this.email;}
    public Integer getGuestNumber() {return this.guestNumber;}
    public LocalDateTime getScheduleTime() {return this.scheduleTime;}
    public String getSpecialRequest() {return this.specialRequest;}
    public ReservationStatusE getStatus() {return this.status;}
    public User getContactBy() {return this.contactBy;}
    
    public void setCustomerName(String customerName) {this.customerName = customerName;}
    public void setPhone(String phone) {this.phone = phone;}
    public void setEmail(String email) {this.email = email;}
    public void setGuestNumber(Integer guestNumber) {this.guestNumber = guestNumber;}
    public void setScheduleTime(LocalDateTime scheduleTime) {this.scheduleTime = scheduleTime;}
    public void setSpecialRequest(String specialRequest) {this.specialRequest = specialRequest;}
    public void setStatus(ReservationStatusE status) {this.status = status;}
    public void setContactBy(User contactBy) {this.contactBy = contactBy;}
}
