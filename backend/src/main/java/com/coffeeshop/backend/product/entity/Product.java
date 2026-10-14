package com.coffeeshop.backend.product.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;
import java.util.UUID;
import com.coffeeshop.backend.common.entity.BaseEntity;
import com.coffeeshop.backend.menu.entity.Menu;
import com.coffeeshop.backend.product_size.entity.ProductSize;
import java.util.Set;
import java.util.LinkedHashSet;

@Entity
@Table(name="product")
@SQLDelete(sql="UPDATE product SET deleted_at=GETDATE() WHERE id=?")
@Where(clause="deleted_at IS NULL")
public class Product extends BaseEntity {
    @Column(name="name", nullable=false, columnDefinition="NVARCHAR(255)")
    private String name;
    
    @Column(name="description", nullable=false, columnDefinition="NVARCHAR(500)")
    private String description;
    
    @Column(name="image_url", nullable=false)
    private String imageUrl;
    
    @Column(name="component", nullable=false, columnDefinition="NVARCHAR(500)")
    private String component;
    
    @Column(name="discount_amount")
    private Integer discountAmount;
    
    @Column(name="is_best_seller")
    private Boolean isBestSeller=false;
    
    @ManyToOne
    @JoinColumn(name="menu_id")
    private Menu menu;
    
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<ProductSize> sizes = new LinkedHashSet<>();
    
    public UUID getId() {return this.id;}
    public String getName() {return this.name;}
    public String getDescription() {return this.description;}
    public String getImageUrl() {return this.imageUrl;}
    public String getComponent() {return this.component;}
    public Integer getDiscountAmount() {return this.discountAmount;}
    public Boolean getIsBestSeller() {return this.isBestSeller;}
    public Menu getMenu() {return this.menu;}
    public Set<ProductSize> getSizes() {return this.sizes;}
    
    public void setName(String name) {this.name = name;}
    public void setDescription(String description) {this.description = description;}
    public void setImageUrl(String imageUrl) {this.imageUrl = imageUrl;}
    public void setComponent(String component) {this.component = component;}
    public void setDiscountAmount(Integer discountAmount) {this.discountAmount = discountAmount;}
    public void setIsBestSeller(Boolean isBestSeller) {this.isBestSeller = isBestSeller;}
    public void setMenu(Menu menu) {
        this.menu = menu;
    }
    public void setSizes(Set<ProductSize> sizes) {
        this.sizes = sizes;
    }
}
