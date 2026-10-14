package com.coffeeshop.backend.category.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;
import java.util.UUID;
import com.coffeeshop.backend.common.entity.BaseEntity;
import com.coffeeshop.backend.menu.entity.Menu;
import java.util.Set;
import java.util.LinkedHashSet;

@Entity
@Table(name="category")
@SQLDelete(sql="UPDATE category SET deleted_at=GETDATE() WHERE id=?")
@Where(clause="deleted_at IS NULL")
public class Category extends BaseEntity {
    @Column(name="name", nullable=false, columnDefinition="NVARCHAR(255)")
    private String name;
    
    @Column(name="description", nullable=false, columnDefinition="NVARCHAR(500)")
    private String description;
    
    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL)
    private Set<Menu> menus = new LinkedHashSet<>();

    public Set<Menu> getMenus() {
        return menus;
    }

    public void setMenus(Set<Menu> menus) {
        this.menus = menus;
    }
    
    public UUID getId() {return this.id;}
    public String getName() {return this.name;}
    public String getDescription() {return this.description;}
    
    public void setName(String name) {this.name = name;}
    public void setDescription(String description) {this.description = description;}
}
