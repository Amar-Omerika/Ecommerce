import React from "react";

const Home = () => {
	return (
		<>
			<div>
				<h2>Best Selling Products</h2>
				<p>Speakerx of many variations</p>
			</div>
			<div>{["product 1", "product 2"].map((product) => product)}</div>
		</>
	);
};

export default Home;
