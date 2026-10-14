import "./style.scss";
import Layout from "../../components/layout/Layout";
import useTitle from "../../hooks/useTitle";

const NotFound = () => {
  useTitle("Không tìm thấy trang - Hot Coffee");

  return (
    <Layout>
      <div class="notfound-container">
        <h1 class="page_title">404</h1>
        <h2 class="page_subtitle">Oops! Trang bạn đang tìm kiếm không tồn tại rồi</h2>
        <p class="page_description">
          Trang có thể đã được di chuyển, đổi tên hoặc không còn tồn tại nữa
        </p>
        <div class="page_go_home">
          <a
            href="/"
            class="sc_button sc_button_square sc_button_style_border_1 sc_button_size_large"
          >
            VỀ TRANG CHỦ
          </a>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
