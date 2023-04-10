import React, { useState } from "react";
import { client, urlFor } from "../../lib/client";
import { ProductDataInterface } from "@/types/products";
import { Product } from "@/components";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
interface Props {
	product: ProductDataInterface;
	products: any[];
}

const ProductDetails = ({ product, products }: Props) => {
	const [index, setIndex] = useState(0);
	return (
		<div>
			<div className="product-detail-container">
				<div>
					<div className="image-container">
						<img
							src={urlFor(product.image && product.image[index])}
							className="product-detail-image"
						/>
					</div>
					<div className="small-images-container">
						{product.image?.map((item: any, i: any) => (
							<img
								key={i}
								src={urlFor(item)}
								className={
									i === index ? "small-image selected-image" : "small-image"
								}
								onMouseEnter={() => setIndex(i)}
							/>
						))}
					</div>
				</div>

				<div className="product-detail-desc">
					<h1>{product.name}</h1>
					<div className="reviews">
						<div>
							<AiFillStar />
							<AiFillStar />
							<AiFillStar />
							<AiFillStar />
							<AiOutlineStar />
						</div>
						<p>(20)</p>
					</div>
					<h4>Details: </h4>
					<p>{product.details}</p>
					<p className="price">${product.price}</p>
					<div className="quantity">
						<h3>Quantity:</h3>
						{/* <p className="quantity-desc">
				<span className="minus" onClick={decQty}><AiOutlineMinus /></span>
				<span className="num">{qty}</span>
				<span className="plus" onClick={incQty}><AiOutlinePlus /></span>
			  </p> */}
					</div>
					{/* <div className="buttons">
			  <button type="button" className="add-to-cart" onClick={() => onAdd(product, qty)}>Add to Cart</button>
			  <button type="button" className="buy-now" onClick={handleBuyNow}>Buy Now</button>
			</div> */}
				</div>
			</div>

			<div className="maylike-products-wrapper">
				<h2>You may also like</h2>
				<div className="marquee">
					<div className="maylike-products-container track">
						{products.map((item) => (
							<Product key={item._id} product={item} />
						))}
					</div>
				</div>
			</div>
		</div>
	);
};
// export async function getStaticPaths() {
// 	const query = `*[_type == "product"]] {
// 		slug {
// 			current
// 		}
// 	}`;
// 	const products = await client.fetch(query);
// 	const paths = products.map((product: any) => ({
// 		params: {
// 			slug: product.slug.current,
// 		},
// 	}));
// 	return {
// 		paths,
// 		fallback: "blocking",
// 	};
// }
export const getStaticPaths = async () => {
	//give me data for product for current slug property
	const query = `*[_type == "product"] {
	  slug {
		current
	  }
	}
	`;

	const products = await client.fetch(query);

	//generating paths
	const paths = products.map((product: any) => ({
		params: {
			slug: product.slug.current,
		},
	}));

	return {
		paths,
		fallback: "blocking",
	};
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

	console.log("product", product);
	console.log("products", products);

	return {
		props: { products, product },
	};
};
export default ProductDetails;
