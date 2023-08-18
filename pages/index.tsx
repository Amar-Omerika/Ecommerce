require("dotenv").config();
import React, { useEffect } from "react";
import { client } from "../lib/client";
import { Product, FooterBanner, HeroBanner } from "@/components";
import { useStateContext } from "@/context/StateContext";

interface Props {
  products?: any[];
  bannerData?: any[];
}
const Home = ({ products, bannerData }: Props) => {
  const { theme }: any = useStateContext();
  // useEffect(() => {
  // 	setQty(1);
  // }, []);
  const style = theme === "dark" ? { color: "#fff" } : {};
  return (
    <div>
      <HeroBanner heroBanner={bannerData?.length && bannerData[0]} />
      <div className="products-heading">
        <h2 style={style}>Best Selling Products</h2>
        <p style={style}>Speakers of many variations</p>
      </div>
      <div className="products-container">
        {products &&
          products.map((product) => (
            <Product key={product._id} product={product} />
          ))}
      </div>
      <FooterBanner footerBanner={bannerData?.length && bannerData[0]} />
    </div>
  );
};

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { products, bannerData },
  };
};
export default Home;
