package com.coffeeshop.backend.user.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;
import com.coffeeshop.backend.enums.UserRoleE;

@Entity
@Table(name="[user]")
@SQLDelete(sql="UPDATE [user] SET deleted_at=GETDATE() WHERE id=?")
@Where(clause="deleted_at IS NULL")
public class User {
    @Id
    @GeneratedValue(strategy=GenerationType.UUID)
    @Column(name="id")
    private String id;
    
    @Column(name="username", nullable=false, unique=true)
    private String username;
    
    @Column(name="email", unique=true)
    private String email;
    
    @Column(name="password", nullable=false)
    private String password;
    
    @Enumerated(EnumType.STRING)
    @Column(name="role", nullable=false)
    private UserRoleE role;
    
    @Column(name="created_at", nullable=false)
    protected LocalDateTime createdAt;

    @Column(name="updated_at")
    protected LocalDateTime updatedAt;
    
    @Column(name="deleted_at")
    protected LocalDateTime deletedAt;
    
    @PrePersist
    protected void onCreate() {
        this.createdAt=LocalDateTime.now();
    }
    
    @PreUpdate
    protected void onUpdate() {
        this.updatedAt=LocalDateTime.now();
    }
        
    public String getUsername() {return this.username;}
    public String getPassword() {return this.password;}
    public String getId() {return this.id;}
    public UserRoleE getRole() {return this.role;}
    public void setUsername(String username) {this.username = username;}
    public void setEmail(String email) {this.email = email;}
    public void setPassword(String password) {this.password = password;}
    public void setRole(UserRoleE role) {this.role = role;}
}