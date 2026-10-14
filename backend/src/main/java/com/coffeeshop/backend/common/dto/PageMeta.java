package com.coffeeshop.backend.common.dto;

public class PageMeta {
    public int page;
    public int size;
    public long total;
    public int totalPage;

    public PageMeta(int page, int size, long total, int totalPage) {
        this.page = page;
        this.size = size;
        this.total = total;
        this.totalPage = totalPage;
    }
}
