import { MapPin, Phone, Mail, Clock } from "lucide-react";
import Layout from "../../components/layout/Layout";
import useTitle from "../../hooks/useTitle";
import logo from "../../assets/images/alternative-logo.png";
import "./contact.style.scss";

const Contact = () => {
  useTitle("Liên hệ");

  return (
    <Layout>
      <div className="contact-page">
        {/* Hero */}
        <section
          className="contact-hero"
          style={{ backgroundImage: "url('/images/contact-hero.webp')" }}
        />

        {/* Content */}
        <section className="contact-body">
          {/* Info card */}
          <div className="contact-info">
            <img src={logo} alt="HOT COFFEE" className="contact-info__logo" />

            <ul className="contact-info__list">
              <li>
                <MapPin size={18} />
                <div>
                  <span className="contact-info__label">Địa chỉ</span>
                  <p>96A Đ. Trần Phú, P. Mộ Lao, Hà Đông, Hà Nội, Việt Nam</p>
                </div>
              </li>
              <li>
                <Phone size={18} />
                <div>
                  <span className="contact-info__label">Điện thoại</span>
                  <p>0123 456 789</p>
                </div>
              </li>
              <li>
                <Mail size={18} />
                <div>
                  <span className="contact-info__label">Email</span>
                  <p>info@hotcoffee.vn</p>
                </div>
              </li>
              <li>
                <Clock size={18} />
                <div>
                  <span className="contact-info__label">Giờ mở cửa</span>
                  <p>Thứ 2 – Chủ nhật: 07:00 – 22:00</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Map */}
          <div className="contact-map">
            <iframe
              title="HOT COFFEE location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3725.2924008216164!2d105.78741649999999!3d20.980913!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135accdd8a1ad71%3A0xa2f9b16036648187!2zSOG7jWMgdmnhu4duIEPDtG5nIG5naOG7hyBCxrB1IGNow61uaCB2aeG7hW4gdGjDtG5n!5e0!3m2!1svi!2s!4v1775153820368!5m2!1svi!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Contact;
