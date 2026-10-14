import { Modal, Spin, Empty } from "antd";
import { useState, useEffect } from "react";
import { useProduct } from "../../../services/index";
import "./ProductDetailModal.scss";

const ProductDetailModal = ({ productId, open, onCancel }) => {
  const { data: product, isLoading, isError } = useProduct(productId);
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);

  const currentProduct = product?.data;
  const sizeOrder = { S: 1, M: 2, L: 3 };
  const sortedSizes = currentProduct?.sizes
    ? [...currentProduct.sizes].sort(
        (a, b) => sizeOrder[a.size] - sizeOrder[b.size],
      )
    : [];

  useEffect(() => {
    if (open) setSelectedSizeIndex(0);
  }, [open, productId]);

  const currentSize = sortedSizes?.[selectedSizeIndex];

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      footer={null}
      width={800}
      centered
      className="product-detail-modal"
    >
      {isLoading ? (
        <div className="modal-loading">
          <Spin size="large" />
        </div>
      ) : isError ? (
        <Empty description="Không tìm thấy thông tin sản phẩm" />
      ) : (
        <div className="modal-container">
          <div className="modal-left">
            <div className="image-wrapper">
              <img src={currentProduct?.imageUrl} alt={currentProduct?.name} />
            </div>
          </div>

          <div className="modal-right">
            <div className="product-header">
              <h2 className="product-name">{currentProduct?.name}</h2>
              <div className="product-price">
                {currentSize?.price?.toLocaleString("vi-VN")}đ
              </div>
              <p className="product-description">
                {currentProduct?.description}
              </p>
            </div>

            <div className="size-selection">
              <p className="label">Chọn size:</p>
              <div className="size-options">
                {sortedSizes.map((item, index) => (
                  <button
                    key={index}
                    className={`size-btn ${selectedSizeIndex === index ? "active" : ""}`}
                    onClick={() => setSelectedSizeIndex(index)}
                  >
                    <span className="size-name">
                      {item.size === "S"
                        ? "Nhỏ"
                        : item.size === "M"
                          ? "Vừa"
                          : "Lớn"}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default ProductDetailModal;
