import React from "react";
import { client, urlFor } from "../../lib/client";
interface Props {
	product: any;
	products: any[];
}

const ProductDetails = ({ product, products }: Props) => {
	return (
		<div>
			<div className="product-detail-container">
				<div>
					<div className="image-container">
						<img src="" />
					</div>
				</div>
			</div>
		</div>
	);
};

/**
 * @description We use getStaticProps to fetch the specific data for specific product
 * @author Amar Omerika
 */
export const getStaticProps = async ({ params: { slug } }: any) => {
	const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
	const productsQuery = '*[_type == "product"]';

	const product = await client.fetch(query);
	const products = await client.fetch(productsQuery);

	console.log(product);

	return {
		props: { products, product },
	};
};
export default ProductDetails;
