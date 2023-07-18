import React from "react";
import Link from "next/link";

import { urlFor } from "../lib/client";
import { ProductDataInterface } from "@/types/products";
import { useStateContext } from "@/context/StateContext";

interface Props {
	product: ProductDataInterface;
}

const Product = ({ product }: Props) => {
	const { theme }: any = useStateContext();
	const style = theme === "dark" ? { color: "#fff" } : {};
	return (
		<div>
			<Link href={`/product/${product.slug.current}`}>
				<div className="product-card">
					<img
						src={urlFor(product.image && product.image[0])}
						width={250}
						height={250}
						className="product-image"
					/>
					<p style={style} className="product-name">
						{product.name}
					</p>
					<p style={style} className="product-price">
						${product.price}
					</p>
				</div>
			</Link>
		</div>
	);
};

export default Product;
