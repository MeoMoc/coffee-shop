package com.coffeeshop.backend.menu.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;
import com.coffeeshop.backend.common.entity.BaseEntity;
import com.coffeeshop.backend.category.entity.Category;
import com.coffeeshop.backend.product.entity.Product;
import java.util.UUID;
import java.util.Set;
import java.util.LinkedHashSet;

@Entity
@Table(name="menu")
@SQLDelete(sql="UPDATE menu SET deleted_at=GETDATE() WHERE id=?")
@Where(clause="deleted_at IS NULL")
public class Menu extends BaseEntity {
    @Column(name="name", nullable=false, columnDefinition="NVARCHAR(255)")
    private String name;
    
    @Column(name="description", nullable=false, columnDefinition="NVARCHAR(500)")
    private String description;
    
    @ManyToOne
    @JoinColumn(name="category_id")
    private Category category;
    
    @OneToMany(mappedBy = "menu", cascade = CascadeType.ALL)
    private Set<Product> products = new LinkedHashSet<>();

    public Set<Product> getProducts() {
        return products;
    }

    public void setProducts(Set<Product> menus) {
        this.products = menus;
    }
    
    public UUID getId() {return this.id;}
    public String getName() {return this.name;}
    public String getDescription() {return this.description;}
    public Category getCategory() {return this.category;}
    
    public void setName(String name) {this.name = name;}
    public void setDescription(String description) {this.description = description;}
    public void setCategory(Category category) {
        this.category = category;
    }
    
    public void addProduct(Product product) {
        products.add(product);
        product.setMenu(this);
    }

    public void removeProduct(Product product) {
        products.remove(product);
        product.setMenu(null);
    }
}
