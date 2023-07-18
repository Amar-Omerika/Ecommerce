import React from "react";
import Head from "next/head";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useStateContext } from "@/context/StateContext";

const Layout = ({ children }: any) => {
	const { theme }: any = useStateContext();
	return (
		<div className={theme === "dark" ? "dark-theme" : "light-theme"}>
			<Head>
				<title>Ammar¨s Ecommerce store</title>
			</Head>
			<header>
				<Navbar />
			</header>
			<main className="main-container">{children}</main>
			<footer>
				<Footer />
			</footer>
		</div>
	);
};

export default Layout;
