import { Coffee, Leaf, Smile } from "lucide-react";

const features = [
  {
    icon: <Coffee size={40} />,
    title: "Premium Coffee",
    description:
      "Nguồn cà phê chất lượng cao, rang xay chuẩn vị để mang đến tách cà phê hoàn hảo nhất.",
  },
  {
    icon: <Leaf size={40} />,
    title: "Nguyên liệu tươi",
    description:
      "Chúng tôi chỉ sử dụng nguyên liệu tự nhiên, tươi sạch trong tất cả các thức uống.",
  },
  {
    icon: <Smile size={40} />,
    title: "Không gian ấm cúng",
    description:
      "Không gian được thiết kế dành cho bạn thư giãn, làm việc hoặc gặp gỡ bạn bè.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="features-section">
      <h2 className="features-title">Tại sao chọn chúng tôi?</h2>
      <div className="features-grid">
        {features.map((feature) => (
          <div key={feature.title} className="feature-card">
            <div className="feature-icon">{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
