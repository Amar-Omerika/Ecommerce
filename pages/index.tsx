import React from "react";
import { client } from "../lib/client";
import { Product, FooterBanner, HeroBanner } from "@/components";

interface Props {
	products?: any[];
	bannerData?: any[];
}
const Home = ({ products, bannerData }: Props) => {
	return (
		<div>
			<HeroBanner heroBanner={bannerData?.length && bannerData[0]} />
			<div className="products-heading">
				<h2>Best Selling Products</h2>
				<p>Speakers of many variations</p>
			</div>
			<div className="products-container">
				{["product 1", "product 2"].map((product) => product)}
			</div>
			<FooterBanner />
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
