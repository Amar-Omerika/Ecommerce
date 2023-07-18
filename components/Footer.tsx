import { useStateContext } from "@/context/StateContext";
import React from "react";
import { AiFillInstagram, AiOutlineTwitter } from "react-icons/ai";

const Footer = () => {
	const { theme }: any = useStateContext();
	const style = theme === "dark" ? { color: "#fff" } : {};
	return (
		<div className="footer-container">
			<p style={style}>Email:amar.omerika@edu.fit.ba</p>
			<p className="icons">
				<AiFillInstagram style={style} />
				<AiOutlineTwitter style={style} />
			</p>
		</div>
	);
};

export default Footer;
