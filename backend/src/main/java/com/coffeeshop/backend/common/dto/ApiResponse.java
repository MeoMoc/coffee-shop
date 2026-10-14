package com.coffeeshop.backend.common.dto;

public class ApiResponse<T> {
    public T data;
    public Object meta;
    
    public ApiResponse(T data) {
        this.data = data;
    }
    
    public ApiResponse(T data, Object meta) {
        this.data = data;
        this.meta = meta;
    }
}
