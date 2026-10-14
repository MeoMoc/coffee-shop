import logo from "../../assets/images/logo_footer.png";

const Footer = () => {
  return (
    <footer>
      <img src={logo} class="logo_footer" alt="" width="95" height="90"></img>
      <div class="contact">
        <div className="contact-item-left">
          <p>Km10, đường Nguyễn Trãi</p>
          <p>Hà Đông, Hà Nội</p>
        </div>
        <div className="contact-item-right">
          <p>Điện thoại: 0123 456 789</p>
          <p>Email: info@hotcoffee.vn</p>
        </div>
      </div>

      <p>&copy; 2026 My Company. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
