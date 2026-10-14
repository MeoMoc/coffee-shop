import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section
      className="cta-section"
      style={{ backgroundImage: "url('/images/cta-bg.webp')" }}
    >
      <div className="cta-overlay" />
      <div className="cta-content">
        <h2>Đặt bàn ngay hôm nay</h2>
        <p>Trải nghiệm không gian cà phê đặc biệt cùng người thân và bạn bè.</p>
        <Link to="/booking" className="cta-button">
          Đặt bàn
        </Link>
      </div>
    </section>
  );
};

export default CTASection;
