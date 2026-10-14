import { useState, useEffect, useRef, useMemo } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import Layout from "../../components/layout/Layout";
import ProductCard from "../../components/common/productCard/ProductCard";
import useTitle from "../../hooks/useTitle";
import { useCategories } from "../../services/index";
import "./style.scss";

const Product = () => {
  useTitle("Thực đơn");

  const { data: categories = [], isLoading } = useCategories();
  const [expanded, setExpanded] = useState({});
  const [activeMenuId, setActiveMenuId] = useState(null);

  const sidebarRef = useRef(null);
  const activeItemRef = useRef(null);
  const pauseObserver = useRef(false);

  const allMenus = useMemo(() => categories.flatMap((c) => c.menus ?? []), [categories]);
  const totalProducts = categories.reduce((sum, c) => sum + (c.totalProducts ?? 0), 0);

  // Expand all categories by default once data loads
  useEffect(() => {
    if (!categories.length) return;
    const init = {};
    categories.forEach((c) => { init[c.id] = true; });
    setExpanded(init);
    setActiveMenuId(String(categories[0]?.menus?.[0]?.id ?? ""));
  }, [categories]);

  // Scroll spy: highlight sidebar item as user scrolls
  useEffect(() => {
    if (!allMenus.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (pauseObserver.current) return;
        const topmost = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (topmost) {
          setActiveMenuId(topmost.target.id.replace("menu-", ""));
        }
      },
      { rootMargin: "-90px 0px -60% 0px", threshold: 0 }
    );

    allMenus.forEach((menu) => {
      const el = document.getElementById(`menu-${menu.id}`);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [allMenus]);

  // Keep active sidebar item scrolled into view
  useEffect(() => {
    activeItemRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [activeMenuId]);

  const toggleCategory = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const scrollToMenu = (menuId) => {
    pauseObserver.current = true;
    setActiveMenuId(String(menuId));
    document.getElementById(`menu-${menuId}`)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    setTimeout(() => { pauseObserver.current = false; }, 800);
  };

  return (
    <Layout>
      <div className="products-page">
        <section
          className="products-hero"
          style={{ backgroundImage: "url('/images/products-hero.webp')" }}
        />

        <div className="products-layout">
          {/* ── Sidebar ─────────────────────────────────────────── */}
          <aside className="products-sidebar" ref={sidebarRef}>
            <p className="products-sidebar__count">{totalProducts} sản phẩm</p>

            {categories.map((category) => (
              <div key={category.id} className="sidebar-category">
                <button
                  className="sidebar-category__title"
                  onClick={() => toggleCategory(category.id)}
                >
                  <span>{category.name}</span>
                  {expanded[category.id]
                    ? <ChevronDown size={13} />
                    : <ChevronRight size={13} />
                  }
                </button>

                {expanded[category.id] && (
                  <ul className="sidebar-menu-list">
                    {category.menus?.map((menu) => {
                      const isActive = activeMenuId === String(menu.id);
                      return (
                        <li key={menu.id}>
                          <button
                            ref={isActive ? activeItemRef : null}
                            className={`sidebar-menu-item ${isActive ? "active" : ""}`}
                            onClick={() => scrollToMenu(menu.id)}
                          >
                            {menu.name}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            ))}
          </aside>

          {/* ── Main content ─────────────────────────────────────── */}
          <main className="products-content">
            {isLoading && (
              <div className="products-grid">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="product-card product-card--skeleton" />
                ))}
              </div>
            )}

            {!isLoading && allMenus.map((menu) => {
              if (!menu.products?.length) return null;
              return (
                <section key={menu.id} id={`menu-${menu.id}`} className="menu-section">
                  <h2 className="menu-section__title">{menu.name}</h2>
                  <div className="products-grid">
                    {menu.products.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </section>
              );
            })}
          </main>
        </div>
      </div>
    </Layout>
  );
};

export default Product;
