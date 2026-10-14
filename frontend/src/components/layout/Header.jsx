import { useState, useEffect } from "react";
import { Drawer } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import logo from "../../assets/images/alternative-logo.png";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navClass = ({ isActive }) => (isActive ? "active" : "");

  return (
    <header className={`header ${scrolled ? "scrolled" : ""}`}>
      <nav className="logo">
        <NavLink to="/">
          <img src={logo} alt="HOT COFFEE" loading="lazy" />
        </NavLink>
      </nav>

      <nav className="nav-links">
        <NavLink to="/" className={navClass}>
          Trang chủ
        </NavLink>
        <NavLink to="/products" className={navClass}>
          Sản phẩm
        </NavLink>
        <NavLink to="/booking" className={navClass}>
          Đặt bàn
        </NavLink>
        <NavLink to="/contact" className={navClass}>
          Liên hệ
        </NavLink>
      </nav>

      <div className="menu-btn">
        <MenuOutlined onClick={() => setOpen(true)} />
      </div>

      <Drawer placement="right" onClose={() => setOpen(false)} open={open}>
        <nav className="drawer-menu">
          <NavLink to="/" className={navClass} onClick={() => setOpen(false)}>
            Trang chủ
          </NavLink>
          <NavLink
            to="/products"
            className={navClass}
            onClick={() => setOpen(false)}
          >
            Sản phẩm
          </NavLink>
          <NavLink
            to="/booking"
            className={navClass}
            onClick={() => setOpen(false)}
          >
            Đặt bàn
          </NavLink>
          <NavLink
            to="/contact"
            className={navClass}
            onClick={() => setOpen(false)}
          >
            Liên hệ
          </NavLink>
        </nav>
      </Drawer>
    </header>
  );
};

export default Header;
