import Banner from "./components/Banner";
import CTASection from "./components/CTASection";
import FeaturesSection from "./components/FeaturesSection";
import ProductList from "./components/ProductList";
import Layout from "../../components/layout/Layout";

const Home = () => {
  return (
    <Layout>
      <div className="home-container">
        <Banner />

        <section className="boxhome">
          <ProductList />
        </section>

        <FeaturesSection />

        <CTASection />
      </div>
    </Layout>
  );
};

export default Home;
