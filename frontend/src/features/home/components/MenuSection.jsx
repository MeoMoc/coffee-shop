import { Tabs } from "antd";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { SwiperSlide } from "swiper/react";
import ProductCard from "../../../components/common/productCard/ProductCard";
import SwiperComponent from "../../../components/common/swiper/Swiper";
import { useCategories } from "../../../services/index";

const MenuSection = () => {
  const [activeKey, setActiveKey] = useState();
  const { data: categoriesData } = useCategories();

  const categories = useMemo(() => {
    if (!categoriesData || categoriesData.length === 0) return [];

    return categoriesData.map((category) => {
      const allProducts =
        category.menus?.flatMap((menu) =>
          menu.products.map((product) => ({ ...product, type: menu.name })),
        ) || [];

      return {
        key: category.name,
        label: (
          <div className="tab-item">
            {category.name.toUpperCase()}
            <span>{category.totalProducts}</span>
          </div>
        ),
        children: (
          <SwiperComponent
            slidesPerView={4}
            spaceBetween={10}
            breakpoints={{
              320: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 4 },
            }}
            autoplay={{ delay: 2000, disableOnInteraction: false }}
            loop={true}
            showPagination={false}
          >
            {allProducts.map((item) => (
              <SwiperSlide key={item.id}>
                <ProductCard product={item} />
              </SwiperSlide>
            ))}
          </SwiperComponent>
        ),
      };
    });
  }, [categoriesData]);

  const effectiveActiveKey = activeKey ?? categoriesData?.[0]?.name;

  return (
    <div className="categories-container">
      <h2>SẢN PHẨM</h2>
      <div className="categories">
        <Tabs
          activeKey={effectiveActiveKey}
          items={categories}
          onChange={setActiveKey}
          tabBarGutter={60}
        />
      </div>
      <div className="view-all">
        <Link to="/collections">
          Xem tất cả <ArrowRight className="inline-block" />
        </Link>
      </div>
    </div>
  );
};

export default MenuSection;
