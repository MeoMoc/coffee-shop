package com.coffeeshop.backend.common.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import com.coffeeshop.backend.user.entity.User;

@MappedSuperclass
public abstract class BaseEntity {
    @Id
    @GeneratedValue(strategy=GenerationType.UUID)
    @Column(name="id")
    protected UUID id;

    @CreatedDate
    @Column(name="created_at", nullable=false)
    protected LocalDateTime createdAt;

    @LastModifiedDate
    @Column(name="updated_at")
    protected LocalDateTime updatedAt;

    @Column(name="deleted_at")
    protected LocalDateTime deletedAt;

    @ManyToOne
    @JoinColumn(name="created_by")
    protected User createdBy;

    @ManyToOne
    @JoinColumn(name="updated_by")
    protected User updatedBy;

    @ManyToOne
    @JoinColumn(name="delete_by")
    protected User deletedBy;
    
    @PrePersist
    protected void onCreate() {
        this.createdAt=LocalDateTime.now();
    }
    
    @PreUpdate
    protected void onUpdate() {
        this.updatedAt=LocalDateTime.now();
    }
}
