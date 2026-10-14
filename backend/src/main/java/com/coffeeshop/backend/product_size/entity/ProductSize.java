package com.coffeeshop.backend.product_size.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;
import com.coffeeshop.backend.product.entity.Product;
import com.coffeeshop.backend.common.entity.BaseEntity;

@Entity
@Table(name="product_size")
@SQLDelete(sql="UPDATE product_size SET deleted_at=GETDATE() WHERE id=?")
@Where(clause="deleted_at IS NULL")
public class ProductSize extends BaseEntity {
    @Column(name="size", nullable=false)
    private String size;
    
    @Column(name="price", nullable=false)
    private Double price;
    
    @Column(name="note", columnDefinition="NVARCHAR(500)")
    private String note;
    
    @ManyToOne
    @JoinColumn(name="product_id", nullable=false)
    private Product product;
    
    public String getSize() { return this.size; }
    public Double getPrice() { return this.price; }
    public String getNote() { return this.note; }
    public Product getProduct() { return this.product; }
    
    public void setSize(String size) { this.size = size; }
    public void setPrice(Double price) { this.price = price; }
    public void setNote(String note) { this.note = note; }
    public void setProduct(Product product) { this.product = product; }
}
