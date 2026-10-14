import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { SwiperSlide } from "swiper/react";
import SwiperComponent from "../../../components/common/swiper/Swiper";
import ProductDetailModal from "../../../components/common/productDetailModal/ProductDetailModal";
import { useProducts } from "../../../services/index";
import { useState } from "react";

const ProductList = () => {
  const { data, isLoading } = useProducts();
  const bestSellers = (data?.data ?? []).filter((p) => p.isBestSeller);
  const [selectedProductId, setSelectedProductId] = useState(null);

  return (
    <section className="product-list-section">
      <div className="pl-header">
        <h2>Sản Phẩm Nổi Bật</h2>
        <p>Những thức uống được yêu thích nhất tại HOT COFFEE</p>
      </div>

      {isLoading && (
        <div className="pl-skeleton-row">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="pl-skeleton" />
          ))}
        </div>
      )}

      {!isLoading && bestSellers.length > 0 && (
        <SwiperComponent
          slidesPerView={4}
          spaceBetween={24}
          breakpoints={{
            320: { slidesPerView: 1 },
            600: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          loop={true}
          showPagination={false}
          showNavigation={true}
        >
          {bestSellers.map((product) => {
            const price = product.sizes?.[0]?.price ?? 0;
            return (
              <SwiperSlide key={product.id}>
                <div
                  className="pl-card"
                  onClick={() => setSelectedProductId(product.id)}
                >
                  <div className="pl-card-image">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      loading="lazy"
                    />
                    <span className="pl-card-badge">Bán chạy</span>
                  </div>
                  <div className="pl-card-info">
                    <h3 className="pl-card-name">{product.name}</h3>

                    <p className="pl-card-price">
                      {price.toLocaleString("vi-VN")} đ
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </SwiperComponent>
      )}

      {selectedProductId && (
        <ProductDetailModal
          productId={selectedProductId}
          open={!!selectedProductId}
          onCancel={() => setSelectedProductId(null)}
        />
      )}

      <div className="pl-footer">
        <Link to="/products">
          Xem tất cả <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
};

export default ProductList;
