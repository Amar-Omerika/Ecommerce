import React from "react";
import Link from "next/link";
import { AiOutlineShopping, AiFillEye } from "react-icons/ai";
import { Cart } from "./";
import { useStateContext } from "@/context/StateContext";

const Navbar = () => {
	const { showCart, setShowCart, totalQuantities, setTheme, theme }: any =
		useStateContext();
	const handleThemeChange = () => {
		setTheme(theme === "light" ? "dark" : "light");
	};
	const style = theme === "dark" ? { fontSize: "18px", color: "#fff" } : {};
	return (
		<div className="navbar-container">
			<p style={style} className="logo">
				<Link href="/">Ecommerce store</Link>
			</p>
			<button
				type="button"
				className="cart-icon"
				style={{ marginLeft: "auto", marginRight: "10px" }}
				onClick={() => handleThemeChange()}
			>
				<AiFillEye />
			</button>
			<button
				type="button"
				className="cart-icon"
				onClick={() => setShowCart(true)}
			>
				<AiOutlineShopping />

				<span className="cart-item-qty">{totalQuantities}</span>
			</button>
			{showCart && <Cart />}
		</div>
	);
};

export default Navbar;
