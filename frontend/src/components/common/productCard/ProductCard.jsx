import { useState } from "react";
import ProductDetailModal from "../productDetailModal/ProductDetailModal";

const ProductCard = ({ product }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const price = product?.sizes?.[0]?.price ?? 0;

  return (
    <>
      <div className="product-card" onClick={() => setIsModalOpen(true)}>
        <div className="product-card__image-wrap">
          <img
            src={product.imageUrl}
            alt={product.name}
            loading="lazy"
            className="product-card__image"
          />
          <div className="product-card__badges">
            {product.isBestSeller && (
              <span className="product-card__badge product-card__badge--hot">
                Bán chạy
              </span>
            )}
            {product.discountAmount > 0 && (
              <span className="product-card__badge product-card__badge--discount">
                -{product.discountAmount.toLocaleString("vi-VN")}đ
              </span>
            )}
          </div>
        </div>

        <div className="product-card__body">
          <h3 className="product-card__name">{product.name}</h3>
          <div className="product-card__footer">
            <span className="product-card__price">
              {price.toLocaleString("vi-VN")}đ
            </span>
            {product.sizes?.length > 1 && (
              <span className="product-card__sizes">
                {product.sizes.length} size
              </span>
            )}
          </div>
        </div>
      </div>
      {isModalOpen && (
        <ProductDetailModal
          productId={isModalOpen ? product.id : null}
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

export default ProductCard;
